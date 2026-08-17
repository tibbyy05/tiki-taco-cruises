import { Link } from 'react-router-dom';
import LegalPage from '../../components/LegalPage';

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      metaTitle="Terms of Service | Tiki Taco Cruises Fort Lauderdale"
      metaDescription="The terms that apply when you book a private captained pontoon cruise with Tiki Taco Cruises in Fort Lauderdale, including pricing, guest limits, and conduct on board."
      lastUpdated="August 2, 2026"
    >
      <p>
        These Terms of Service govern your use of <a href="https://tikitacocruises.com/">tikitacocruises.com</a>{' '}
        and any cruise you book with Tiki Taco Cruises. By booking with us, you agree to these terms on behalf of
        yourself and everyone in your party.
      </p>

      <h2>What We Provide</h2>
      <p>
        Tiki Taco Cruises operates private, captained tiki-style pontoon cruises departing from The Hilton Marina,
        1881 SE 17th St, Fort Lauderdale, FL 33316. Every cruise is private to your group and includes a
        USCG-licensed captain and fuel. This is a captained charter &mdash; we do not offer bareboat rentals, and
        no boating licence is required of you.
      </p>

      <h2>Pricing and Guests</h2>
      <ul>
        <li>Cruises start at <strong>$225 per hour</strong>, with a <strong>three-hour minimum</strong> booking.</li>
        <li>The base rate covers <strong>14 guests</strong>.</li>
        <li>Guests 15 through 18 are <strong>$60 each</strong>.</li>
        <li>The vessel&rsquo;s <strong>maximum capacity is 18 guests</strong>, which cannot be exceeded under any circumstances.</li>
      </ul>
      <p>
        Prices shown on this site are current at the time of publication and may change. The price confirmed at
        the time of booking is the price that applies to your cruise.
      </p>

      <h2>Booking and Payment</h2>
      <p>
        Bookings are made through our online booking system or by contacting us directly, and are confirmed once
        we acknowledge them. Payment is processed by Square; we do not store your payment card details.
      </p>

      <h2>Changes, Cancellations, and Weather</h2>
      <p>
        If weather conditions are unsafe, your cruise will be rescheduled. The captain has sole discretion to
        delay, shorten, redirect, or cancel a cruise where conditions, vessel safety, or passenger safety require
        it. Full terms are set out in our <Link to="/cancellation-policy/">Cancellation Policy</Link>.
      </p>

      <h2>Conduct On Board</h2>
      <p>
        The captain is responsible for the safety of the vessel and everyone aboard, and their instructions must
        be followed at all times. We may refuse boarding to, or end the cruise for, any guest who behaves in a way
        that endangers themselves or others, and no refund will be given in that case.
      </p>
      <ul>
        <li>You are welcome to bring your own food and drinks, including alcohol, for guests of legal drinking age (21+).</li>
        <li>Guests must not be intoxicated at the time of boarding.</li>
        <li>Illegal substances are not permitted on board.</li>
        <li>Minors must be accompanied by a parent or guardian.</li>
        <li>You are responsible for any damage to the vessel or its equipment caused by your party.</li>
      </ul>

      <h2>Assumption of Risk</h2>
      <p>
        Boating, swimming, and water activities carry inherent risks. You participate voluntarily and accept
        those risks for yourself and your party. Guests may be asked to sign a waiver before departure. Swim only
        when and where the captain says it is safe to do so.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Tiki Taco Cruises is not liable for indirect, incidental, or
        consequential damages arising from your use of this site or participation in a cruise. Our total liability
        in connection with a booking will not exceed the amount you paid for that booking. Nothing in these terms
        limits liability that cannot be limited under applicable law.
      </p>

      <h2>Website Content</h2>
      <p>
        The text, photographs, and other content on this site belong to Tiki Taco Cruises or are used with
        permission, and may not be reproduced commercially without our consent. We aim to keep the site accurate
        and up to date, but it is provided on an &ldquo;as is&rdquo; basis.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Florida, and any dispute will be handled in the
        courts of Broward County, Florida.
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
