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

    // Supported windows. Each defines the current range, the equal-length
    // preceding range (for period-over-period deltas), and the trend
    // granularity: hourly bars for single-day views, daily otherwise.
    const RANGES = {
      today: { cur: ['today', 'today'], prev: ['yesterday', 'yesterday'], trendDim: 'dateHour' },
      yesterday: { cur: ['yesterday', 'yesterday'], prev: ['2daysAgo', '2daysAgo'], trendDim: 'dateHour' },
      7: { cur: ['7daysAgo', 'today'], prev: ['15daysAgo', '8daysAgo'], trendDim: 'date' },
      28: { cur: ['28daysAgo', 'today'], prev: ['57daysAgo', '29daysAgo'], trendDim: 'date' },
      90: { cur: ['90daysAgo', 'today'], prev: ['181daysAgo', '91daysAgo'], trendDim: 'date' }
    };
    const rangeKey = Object.prototype.hasOwnProperty.call(RANGES, event.queryStringParameters?.range)
      ? event.queryStringParameters.range
      : '28';
    const R = RANGES[rangeKey];
    const dateRanges = [{ startDate: R.cur[0], endDate: R.cur[1] }];
    const comparisonRanges = [
      { startDate: R.cur[0], endDate: R.cur[1] },
      { startDate: R.prev[0], endDate: R.prev[1] }
    ];

    const accessToken = await getGoogleAccessToken(saEmail, saKey);

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              dateRanges: comparisonRanges,
              metrics: [
                { name: 'activeUsers' },
                { name: 'sessions' },
                { name: 'screenPageViews' },
                { name: 'averageSessionDuration' }
              ]
            },
            {
              dateRanges,
              dimensions: [{ name: R.trendDim }],
              metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
              orderBys: [{ dimension: { dimensionName: R.trendDim } }],
              limit: 200
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

    // batchRunReports caps at 5 requests — locations runs as its own call.
    const locRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges,
          dimensions: [{ name: 'country' }, { name: 'region' }, { name: 'city' }],
          metrics: [{ name: 'activeUsers' }],
          orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          limit: 12
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
    const locations = locRes.ok ? await locRes.json() : { rows: [] };

    // With two dateRanges GA adds an implicit dateRange dimension:
    // date_range_0 = current window, date_range_1 = previous window.
    const totalRows = totals?.rows ?? [];
    const rowFor = (rangeName) =>
      totalRows.find((r) => r.dimensionValues?.[0]?.value === rangeName) ?? (totalRows.length === 1 ? totalRows[0] : undefined);
    const currentRow = rowFor('date_range_0');
    const previousRow = rowFor('date_range_1');
    const parseTotals = (row) => ({
      users: metricRow(row, 0),
      sessions: metricRow(row, 1),
      pageViews: metricRow(row, 2),
      avgSessionSeconds: Math.round(metricRow(row, 3))
    });

    const body = {
      range: rangeKey,
      granularity: R.trendDim === 'dateHour' ? 'hour' : 'day',
      totals: parseTotals(currentRow),
      prevTotals: previousRow ? parseTotals(previousRow) : null,
      trend: (trend?.rows ?? []).map((r) => ({
        date: r.dimensionValues[0].value, // YYYYMMDD or YYYYMMDDHH
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
      })),
      locations: (locations?.rows ?? []).map((r) => ({
        country: r.dimensionValues[0].value,
        region: r.dimensionValues[1].value,
        city: r.dimensionValues[2].value,
        users: metricRow(r, 0)
      }))
    };

    return { statusCode: 200, headers, body: JSON.stringify(body) };
  } catch (error) {
    console.error('Analytics function error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'internal' }) };
  }
};
