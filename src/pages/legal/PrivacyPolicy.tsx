import LegalPage from '../../components/LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      metaTitle="Privacy Policy | Tiki Taco Cruises Fort Lauderdale"
      metaDescription="How Tiki Taco Cruises collects, uses, and protects your information when you browse our site, contact us, or book a Fort Lauderdale pontoon cruise."
      lastUpdated="August 2, 2026"
    >
      <p>
        This Privacy Policy explains how Tiki Taco Cruises (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        collects, uses, and protects information when you visit{' '}
        <a href="https://tikitacocruises.com/">tikitacocruises.com</a>, contact us, or book a cruise.
      </p>

      <h2>Information You Give Us</h2>
      <p>
        When you request a booking or send us an enquiry, we collect the details you enter in the form &mdash;
        typically your <strong>name, email address, phone number</strong>, and the cruise details you select
        (date, time, guest count, and any notes). We use this only to respond to you, arrange your cruise, and
        keep a record of the booking.
      </p>
      <p>
        If you call or email us directly, we keep that correspondence for the same purposes.
      </p>

      <h2>Information Collected Automatically</h2>
      <p>We run two forms of analytics on this site:</p>
      <ul>
        <li>
          <strong>Our own page-view logging.</strong> We record the page path you viewed, the referring source,
          and a broad device category (mobile, tablet, or desktop), tied to a random per-tab session identifier
          stored in your browser&rsquo;s session storage. This identifier is discarded when you close the tab. It
          uses no cookies and collects no personal information.
        </li>
        <li>
          <strong>Google Analytics, loaded via Google Tag Manager.</strong> This uses cookies and similar
          technologies to measure site traffic and how visitors move through the site. Google may process this
          data on our behalf; see{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&rsquo;s Privacy Policy
          </a>
          . You can opt out using the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        The cookies on this site come from Google Analytics and Google Tag Manager, and are used for traffic
        measurement. You can block or delete cookies through your browser settings; the site will continue to
        work normally without them.
      </p>

      <h2>Service Providers We Share Data With</h2>
      <p>
        We do not sell your personal information. We share it only with the providers needed to run the site and
        fulfil your booking:
      </p>
      <ul>
        <li><strong>Square</strong> &mdash; booking and payment processing. Payment card details are entered directly with Square and are never stored on our servers.</li>
        <li><strong>SendGrid</strong> &mdash; delivers booking and enquiry emails to our team.</li>
        <li><strong>Supabase</strong> &mdash; database and media hosting for site content and booking records.</li>
        <li><strong>Netlify</strong> &mdash; website hosting and delivery.</li>
        <li><strong>Google</strong> &mdash; analytics and tag management, as described above.</li>
      </ul>
      <p>
        We may also disclose information where required by law, or to protect our legal rights.
      </p>

      <h2>How Long We Keep It</h2>
      <p>
        Booking and enquiry records are retained for as long as needed to run our business and meet legal and
        accounting obligations. Analytics data is retained according to the settings in Google Analytics and our
        own logs.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can ask us to access, correct, or delete the personal information we hold about you, or ask us to
        stop contacting you. Email <a href="mailto:Tikitacocruises@gmail.com">Tikitacocruises@gmail.com</a> and
        we will respond as promptly as we can. Some information may need to be retained where the law requires it.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal information from
        them. Minors are welcome aboard our cruises when accompanied by a parent or guardian, who makes the booking.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and we rely on established providers for data storage and payment handling.
        No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of this page
        reflects the most recent revision.
      </p>

      <h2>Contact Us</h2>
      <p>
        Tiki Taco Cruises<br />
        The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316<br />
        Phone: <a href="tel:+19547644344">(954) 764-4344</a><br />
        Email: <a href="mailto:Tikitacocruises@gmail.com">Tikitacocruises@gmail.com</a>
      </p>
    </LegalPage>
  );
}
