// Google Search Console proxy for the admin Analytics page: top search
// queries and pages with clicks, impressions, and average ranking position.
//
// Auth model matches analytics.js — Supabase admin token in, service-account
// JWT bearer flow to Google (RS256 via node:crypto, no googleapis dependency).
//
// Required Netlify environment variables:
//   GA_SA_EMAIL         - same service account as analytics.js
//   GA_SA_PRIVATE_KEY   - service account private key PEM (escaped \n allowed)
//   GSC_SITE_URL        - optional; defaults to sc-domain:tikitacocruises.com
// The service account must be added as a user on the Search Console property
// (Settings → Users and permissions — Restricted is enough).

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
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
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

// The GSC property may be a domain property (sc-domain:...) or a URL-prefix
// property (https://...) depending on how it was verified — ask Google which
// ones this service account can actually read instead of assuming.
async function resolveSiteUrl(accessToken, preferred) {
  const res = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) return preferred;
  const data = await res.json();
  const usable = (data.siteEntry ?? []).filter((s) => s.permissionLevel !== 'siteUnverifiedUser');
  if (usable.some((s) => s.siteUrl === preferred)) return preferred;
  const match = usable.find((s) => s.siteUrl.includes('tikitacocruises.com'));
  if (!match) console.error('GSC sites accessible to service account:', JSON.stringify(data.siteEntry ?? []));
  return match ? match.siteUrl : preferred;
}

// Search data has no hourly granularity and lags ~2 days, so single-day
// ranges fall back to a 7-day window (the UI shows the actual dates).
const RANGE_TO_DAYS = { today: 7, yesterday: 7, 7: 7, 30: 30, 90: 90 };

const fmt = (d) => d.toISOString().slice(0, 10);
const round1 = (n) => Math.round(n * 10) / 10;

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

  const saEmail = process.env.GA_SA_EMAIL;
  const saKey = (process.env.GA_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:tikitacocruises.com';

  if (!saEmail || !saKey) {
    return { statusCode: 501, headers, body: JSON.stringify({ error: 'not-configured' }) };
  }

  try {
    if (!(await verifyAdmin(event))) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'unauthorized' }) };
    }

    const days = RANGE_TO_DAYS[event.queryStringParameters?.range] ?? 30;
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - (days - 1));
    // Equal-length preceding window for position deltas.
    const prevEnd = new Date(start);
    prevEnd.setDate(start.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevEnd.getDate() - (days - 1));

    const accessToken = await getGoogleAccessToken(saEmail, saKey);
    const resolvedSiteUrl = await resolveSiteUrl(accessToken, siteUrl);
    const query = (body) =>
      fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(resolvedSiteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          // dataState 'all' includes the freshest (still partial) days.
          body: JSON.stringify({ dataState: 'all', ...body })
        }
      );

    const [curQ, prevQ, curP] = await Promise.all([
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['query'], rowLimit: 250 }),
      query({ startDate: fmt(prevStart), endDate: fmt(prevEnd), dimensions: ['query'], rowLimit: 250 }),
      query({ startDate: fmt(start), endDate: fmt(end), dimensions: ['page'], rowLimit: 100 })
    ]);

    if (!curQ.ok) {
      const detail = await curQ.text();
      console.error('GSC API error:', curQ.status, detail);
      // 403 = the service account hasn't been added to the property yet.
      return {
        statusCode: curQ.status === 403 ? 501 : 502,
        headers,
        body: JSON.stringify({ error: curQ.status === 403 ? 'not-configured' : 'gsc-error' })
      };
    }

    const cur = await curQ.json();
    const prev = prevQ.ok ? await prevQ.json() : { rows: [] };
    const pages = curP.ok ? await curP.json() : { rows: [] };
    const prevPos = new Map((prev.rows ?? []).map((r) => [r.keys[0], r.position]));

    const body = {
      days,
      startDate: fmt(start),
      endDate: fmt(end),
      queries: (cur.rows ?? []).map((r) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: round1(r.position),
        prevPosition: prevPos.has(r.keys[0]) ? round1(prevPos.get(r.keys[0])) : null
      })),
      pages: (pages.rows ?? []).map((r) => ({
        page: r.keys[0].replace(/^https?:\/\/[^/]+/, '') || '/',
        clicks: r.clicks,
        impressions: r.impressions,
        position: round1(r.position)
      }))
    };

    return { statusCode: 200, headers, body: JSON.stringify(body) };
  } catch (error) {
    console.error('Search rankings function error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'internal' }) };
  }
};
