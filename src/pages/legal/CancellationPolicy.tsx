import { Link } from 'react-router-dom';
import LegalPage from '../../components/LegalPage';

export default function CancellationPolicy() {
  return (
    <LegalPage
      title="Cancellation Policy"
      metaTitle="Cancellation Policy | Tiki Taco Cruises Fort Lauderdale"
      metaDescription="How to change or cancel your Fort Lauderdale pontoon cruise with Tiki Taco Cruises, and what happens when the weather turns."
      lastUpdated="August 2, 2026"
    >
      <p>
        We know plans change and Florida weather has a mind of its own. This page explains how to change or cancel
        a cruise with Tiki Taco Cruises.
      </p>

      <h2>Bad Weather</h2>
      <p>
        If weather conditions are unsafe, your cruise will be <strong>rescheduled</strong> &mdash; you will not
        lose your booking because of the weather. We will contact you as early as we can to arrange a new date and
        time that works for you.
      </p>
      <p>
        The captain has sole discretion to delay, shorten, redirect, or cancel a cruise where conditions, vessel
        safety, or passenger safety require it. That call is always made in the interest of your group&rsquo;s
        safety.
      </p>

      <h2>Changing or Cancelling Your Booking</h2>
      <p>
        To change or cancel a cruise, contact us as early as possible &mdash; the more notice you give, the more
        easily we can move you to another slot:
      </p>
      <p>
        Phone: <a href="tel:+19547644344">(954) 764-4344</a><br />
        Email: <a href="mailto:Tikitacocruises@gmail.com">Tikitacocruises@gmail.com</a>
      </p>
      <p>
        The specific notice period, deposit, and refund terms that apply to your booking are the ones confirmed
        with you at the time you book. If you are unsure what applies to your reservation, call or email us and we
        will confirm it for you before your cruise date.
      </p>

      <h2>Late Arrivals</h2>
      <p>
        Cruises depart from The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316. Please arrive in good
        time &mdash; a late arrival may shorten your cruise, since the following booking&rsquo;s departure time
        cannot be moved.
      </p>

      <h2>Guest Numbers</h2>
      <p>
        Your booking covers up to 12 guests, with additional guests at $60 per person up to the vessel&rsquo;s
        maximum of 18. Let us know in advance if your numbers change so we can prepare the boat and confirm your
        total. Full booking terms are in our <Link to="/terms-of-service/">Terms of Service</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        Tiki Taco Cruises<br />
        The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316<br />
        Phone: <a href="tel:+19547644344">(954) 764-4344</a><br />
        Email: <a href="mailto:Tikitacocruises@gmail.com">Tikitacocruises@gmail.com</a>
      </p>
    </LegalPage>
  );
}
