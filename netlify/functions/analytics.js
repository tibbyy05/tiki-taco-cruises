// GA4 Data API proxy for the site admin's Analytics page.
//
// Auth model: the caller must send the Supabase access token of a logged-in
// admin user (Authorization: Bearer <token>); we verify it against Supabase
// before touching Google. Google auth uses a service account (JWT bearer
// flow, RS256 via node:crypto — no googleapis dependency).
//
// Required Netlify environment variables:
//   GA4_PROPERTY_ID     - numeric GA4 property id (Admin > Property settings)
//   GA_SA_EMAIL         - service account email (...@...iam.gserviceaccount.com)
//   GA_SA_PRIVATE_KEY   - service account private key PEM (escaped \n allowed)
// The service account must be added as Viewer on the GA4 property.

import crypto from 'node:crypto';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// Keep in sync with src/lib/adminAllowlist.ts — the Supabase auth pool is
// shared with other sites, so a valid login alone is not admin access.
const ADMIN_EMAILS = ['tikitacocruises@gmail.com', 'contact.aigenda@gmail.com'];

const b64url = (input) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function verifyAdmin(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return false;
  const user = await res.json();
  return ADMIN_EMAILS.includes((user.email || '').toLowerCase());
}

async function getGoogleAccessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  }));
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(privateKey).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

const metricRow = (row, i) => Number(row?.metricValues?.[i]?.value ?? 0);

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  const saEmail = process.env.GA_SA_EMAIL;
  const saKey = (process.env.GA_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!propertyId || !saEmail || !saKey) {
    return { statusCode: 501, headers, body: JSON.stringify({ error: 'not-configured' }) };
  }

  try {
    if (!(await verifyAdmin(event))) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'unauthorized' }) };
    }

    const days = ['7', '28', '90'].includes(event.queryStringParameters?.days)
      ? event.queryStringParameters.days
      : '28';
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];

    const accessToken = await getGoogleAccessToken(saEmail, saKey);

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              dateRanges,
              metrics: [
                { name: 'activeUsers' },
                { name: 'sessions' },
                { name: 'screenPageViews' },
                { name: 'averageSessionDuration' }
              ]
            },
            {
              dateRanges,
              dimensions: [{ name: 'date' }],
              metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
              orderBys: [{ dimension: { dimensionName: 'date' } }],
              limit: 100
            },
            {
              dateRanges,
              dimensions: [{ name: 'sessionSourceMedium' }],
              metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
              orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
              limit: 10
            },
            {
              dateRanges,
              dimensions: [{ name: 'pagePath' }],
              metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
              orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
              limit: 10
            },
            {
              dateRanges,
              dimensions: [{ name: 'deviceCategory' }],
              metrics: [{ name: 'activeUsers' }],
              orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
              limit: 5
            }
          ]
        })
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error('GA4 API error:', res.status, detail);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'ga4-error', status: res.status }) };
    }

    const { reports = [] } = await res.json();
    const [totals, trend, sources, pages, devices] = reports;

    const totalsRow = totals?.rows?.[0];
    const body = {
      days: Number(days),
      totals: {
        users: metricRow(totalsRow, 0),
        sessions: metricRow(totalsRow, 1),
        pageViews: metricRow(totalsRow, 2),
        avgSessionSeconds: Math.round(metricRow(totalsRow, 3))
      },
      trend: (trend?.rows ?? []).map((r) => ({
        date: r.dimensionValues[0].value, // YYYYMMDD
        users: metricRow(r, 0),
        pageViews: metricRow(r, 1)
      })),
      sources: (sources?.rows ?? []).map((r) => ({
        source: r.dimensionValues[0].value,
        sessions: metricRow(r, 0),
        users: metricRow(r, 1)
      })),
      pages: (pages?.rows ?? []).map((r) => ({
        path: r.dimensionValues[0].value,
        pageViews: metricRow(r, 0),
        users: metricRow(r, 1)
      })),
      devices: (devices?.rows ?? []).map((r) => ({
        device: r.dimensionValues[0].value,
        users: metricRow(r, 0)
      }))
    };

    return { statusCode: 200, headers, body: JSON.stringify(body) };
  } catch (error) {
    console.error('Analytics function error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'internal' }) };
  }
};
