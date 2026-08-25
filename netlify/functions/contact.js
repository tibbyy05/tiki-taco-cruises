import sgMail from '@sendgrid/mail';

/**
 * Contact-form handler for /contact-us/.
 *
 * Replaces an earlier booking-request handler that took its destination
 * address from the request body — that let anyone POST here and send mail to
 * any address on our SendGrid account. The recipient is now server-side only.
 */

// Only these origins may POST here.
const ALLOWED_ORIGINS = [
  'https://tikitacocruises.com',
  'https://www.tikitacocruises.com',
  'http://localhost:5173',
  'http://localhost:8888',
];

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'Tikitacocruises@gmail.com';

// Sender must be a SendGrid-verified identity. We do not control DNS for
// tikitacocruises.com, so we send from the already-verified ai-genda.com and
// set replyTo to the customer. This only ever mails Taco's own inbox, so the
// sending domain does not affect customer-facing deliverability. If the Tiki
// domain is verified later, set CONTACT_FROM_EMAIL — no code change needed.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@ai-genda.com';

const LIMITS = { name: 120, email: 200, phone: 40, message: 5000 };

const esc = (v) =>
  String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Deliberately simple: reject the obviously malformed, let SendGrid bounce the rest.
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

export const handler = async (event) => {
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const headers = corsHeaders(origin);
  const fail = (statusCode, error) => ({ statusCode, headers, body: JSON.stringify({ error }) });

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return fail(405, 'Method not allowed');

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return fail(400, 'Invalid request body.');
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const message = String(body.message || '').trim();

  // Honeypot: real people never fill a field they cannot see. Return 200 so
  // bots get no signal that they were caught.
  if (String(body.company || '').trim()) {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (!name || !email || !message) return fail(400, 'Name, email, and message are required.');
  if (!isEmail(email)) return fail(400, 'Please enter a valid email address.');
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    message.length > LIMITS.message
  ) {
    return fail(400, 'One or more fields are too long.');
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('[contact] SENDGRID_API_KEY is not set');
    return fail(500, 'Email is not configured. Please call us at (954) 764-4344.');
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 14px;font:600 12px/1.4 Arial,sans-serif;color:#4A5568;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 14px;font:400 15px/1.5 Arial,sans-serif;color:#1a202c;">${value}</td>
    </tr>`;

  const msg = {
    to: TO_EMAIL,
    from: { email: FROM_EMAIL, name: 'Tiki Taco Cruises Website' },
    replyTo: { email, name: name || email },
    subject: `Website enquiry — ${name}`,
    text: [
      `New enquiry from the Tiki Taco Cruises website`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || '(not provided)'}`,
      ``,
      `Message:`,
      message,
      ``,
      `Reply directly to this email to respond to ${name}.`,
    ].join('\n'),
    html: `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#F5F7FA;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">
        <div style="background:#1E3A5F;padding:26px 24px;">
          <h1 style="margin:0;color:#fff;font:700 20px/1.3 Arial,sans-serif;">New Website Enquiry</h1>
          <p style="margin:6px 0 0;color:#a8c4e0;font:400 13px/1.4 Arial,sans-serif;">Sent from the contact form at tikitacocruises.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', esc(name))}
          ${row('Email', `<a href="mailto:${esc(email)}" style="color:#0891B2;">${esc(email)}</a>`)}
          ${row('Phone', phone ? `<a href="tel:${esc(phone)}" style="color:#0891B2;">${esc(phone)}</a>` : '<span style="color:#8a94a6;">Not provided</span>')}
        </table>
        <div style="padding:14px 14px 24px;">
          <div style="font:600 12px/1.4 Arial,sans-serif;color:#4A5568;text-transform:uppercase;letter-spacing:.5px;padding:0 0 8px;">Message</div>
          <div style="background:#F5F7FA;border-left:4px solid #FF6B6B;border-radius:6px;padding:14px 16px;font:400 15px/1.6 Arial,sans-serif;color:#1a202c;white-space:pre-wrap;">${esc(message)}</div>
        </div>
        <div style="background:#F5F7FA;padding:16px 24px;font:400 13px/1.5 Arial,sans-serif;color:#4A5568;">
          Hit reply to respond directly to ${esc(name)}.
        </div>
      </div>
    </body></html>`,
  };

  try {
    await sgMail.send(msg);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    // SendGrid puts the useful detail in response.body, not err.message.
    const detail = err && err.response && err.response.body;
    console.error('[contact] SendGrid send failed:', JSON.stringify(detail || (err && err.message)));
    return fail(502, 'We could not send your message. Please call us at (954) 764-4344.');
  }
};
