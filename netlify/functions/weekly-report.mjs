// Weekly analytics digest — runs every Monday at 12:00 UTC (~8am ET) and
// emails the owner + Ai-genda a one-screen summary of last week vs the week
// before. Self-contained: GA4 via service-account JWT (same env vars as
// analytics.js), call clicks via the tiki_analytics_summary RPC (service
// role key bypasses the admin-only RLS), delivery via SendGrid.
import crypto from 'node:crypto';
import sgMail from '@sendgrid/mail';

export const config = { schedule: '0 12 * * 1' };

const RECIPIENTS = ['tikitacocruises@gmail.com', 'contact.aigenda@gmail.com'];

const b64url = (input) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function googleToken(email, privateKey) {
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
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claims}.${signature}` })
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('google token exchange failed');
  return data.access_token;
}

const metric = (row, i) => Number(row?.metricValues?.[i]?.value ?? 0);

const pctChange = (cur, prev) => {
  if (!prev) return '';
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) return ' (±0%)';
  return ` (${pct > 0 ? '▲' : '▼'} ${Math.abs(pct)}%)`;
};

export const handler = async () => {
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    const saEmail = process.env.GA_SA_EMAIL;
    const saKey = (process.env.GA_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n');
    if (!propertyId || !saEmail || !saKey || !process.env.SENDGRID_API_KEY) {
      console.log('weekly-report: not configured, skipping');
      return { statusCode: 200, body: 'not configured' };
    }

    const token = await googleToken(saEmail, saKey);
    const twoWeeks = [
      { startDate: '7daysAgo', endDate: 'yesterday' },
      { startDate: '14daysAgo', endDate: '8daysAgo' }
    ];
    const lastWeek = [{ startDate: '7daysAgo', endDate: 'yesterday' }];
    const gaRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            { dateRanges: twoWeeks, metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }] },
            { dateRanges: lastWeek, dimensions: [{ name: 'sessionSourceMedium' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 3 },
            { dateRanges: lastWeek, dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 3 }
          ]
        })
      }
    );
    if (!gaRes.ok) throw new Error(`GA4 ${gaRes.status}`);
    const { reports = [] } = await gaRes.json();
    const [totals, sources, pages] = reports;
    const rowFor = (name) => (totals?.rows ?? []).find((r) => r.dimensionValues?.[0]?.value === name);
    const cur = rowFor('date_range_0');
    const prev = rowFor('date_range_1');

    // Call clicks from self-hosted tracking (optional — table may not exist yet)
    let callLine = '';
    try {
      const supaRes = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/tiki_analytics_summary`, {
        method: 'POST',
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ days: 7 })
      });
      if (supaRes.ok) {
        const summary = await supaRes.json();
        const calls = summary?.totals?.callClicks;
        const books = summary?.totals?.bookClicks;
        if (typeof calls === 'number') {
          callLine = `<li><strong>${calls}</strong> Call to Book clicks</li>`;
        }
        if (typeof books === 'number') {
          callLine += `<li><strong>${books}</strong> booking calendar opens</li>`;
        }
      }
    } catch { /* call tracking optional */ }

    const prettyPath = (p) => (p === '/' ? 'Home Page' : p);
    const topSources = (sources?.rows ?? [])
      .map((r) => `${r.dimensionValues[0].value} (${metric(r, 0)})`)
      .join(' · ');
    const topPages = (pages?.rows ?? [])
      .map((r) => `${prettyPath(r.dimensionValues[0].value)} (${metric(r, 0)})`)
      .join(' · ');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a2332">
        <h2 style="color:#1a2332">🌴 Tiki Taco Cruises — Weekly Website Report</h2>
        <p style="color:#555">Last 7 days vs the week before:</p>
        <ul style="line-height:1.9;font-size:15px">
          <li><strong>${metric(cur, 0).toLocaleString()}</strong> visitors${pctChange(metric(cur, 0), metric(prev, 0))}</li>
          <li><strong>${metric(cur, 1).toLocaleString()}</strong> sessions${pctChange(metric(cur, 1), metric(prev, 1))}</li>
          <li><strong>${metric(cur, 2).toLocaleString()}</strong> page views${pctChange(metric(cur, 2), metric(prev, 2))}</li>
          ${callLine}
        </ul>
        <p style="font-size:14px"><strong>Top sources:</strong> ${topSources || 'n/a'}</p>
        <p style="font-size:14px"><strong>Top pages:</strong> ${topPages || 'n/a'}</p>
        <p style="margin-top:24px">
          <a href="https://tikitacocruises.com/admin/analytics" style="background:#FF6B6B;color:#fff;padding:10px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Open Full Dashboard</a>
        </p>
        <p style="color:#999;font-size:12px;margin-top:24px">Automated weekly report · tikitacocruises.com</p>
      </div>`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: RECIPIENTS,
      from: { email: 'noreply@ai-genda.com', name: 'Tiki Taco Website Reports' },
      subject: `Tiki Taco weekly: ${metric(cur, 0).toLocaleString()} visitors${pctChange(metric(cur, 0), metric(prev, 0))}`,
      html
    });

    console.log('weekly-report: sent to', RECIPIENTS.join(', '));
    return { statusCode: 200, body: 'sent' };
  } catch (error) {
    console.error('weekly-report error:', error);
    return { statusCode: 500, body: 'error' };
  }
};
