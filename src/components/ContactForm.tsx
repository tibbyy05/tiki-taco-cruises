import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD_CLASS =
  'w-full rounded-lg border border-ocean/15 bg-white px-4 py-3 text-base text-ocean placeholder:text-gray-700/50 ' +
  'focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 transition-colors min-h-[48px]';

const LABEL_CLASS = 'block text-sm font-semibold text-ocean mb-1.5';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      message: String(data.get('message') || '').trim(),
      company: String(data.get('company') || ''), // honeypot
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setError('Please fill in your name, email, and message.');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-sand rounded-2xl p-6 sm:p-8 shadow-lg text-center">
        <CheckCircle2 className="w-12 h-12 text-teal mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-xl sm:text-2xl font-bold text-ocean mb-2">Message sent</h2>
        <p className="text-gray-700 text-base mb-6">
          Thanks — we&rsquo;ll get back to you shortly. For anything urgent, call{' '}
          <a href="tel:+19547644344" className="text-coral font-semibold hover:underline">
            <span className="cr-number" suppressHydrationWarning>(954) 764-4344</span>
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-ocean font-semibold underline hover:text-coral transition-colors min-h-[44px]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-sand rounded-2xl p-6 sm:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-ocean mb-2">Send us a message</h2>
      <p className="text-gray-700 text-sm sm:text-base mb-6">
        Questions about availability, group sizes, or corporate charters? Tell us what you need.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from people, catnip for bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={LABEL_CLASS} htmlFor="name">
              Name <span className="text-coral">*</span>
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" maxLength={120}
              className={FIELD_CLASS} placeholder="Your name" />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40}
              className={FIELD_CLASS} placeholder="(954) 555-0123" />
          </div>
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS} htmlFor="email">
            Email <span className="text-coral">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" maxLength={200}
            className={FIELD_CLASS} placeholder="you@example.com" />
        </div>

        <div className="mb-5">
          <label className={LABEL_CLASS} htmlFor="message">
            Message <span className="text-coral">*</span>
          </label>
          <textarea id="message" name="message" required rows={5} maxLength={5000}
            className={`${FIELD_CLASS} resize-y`}
            placeholder="Tell us your preferred date, group size, and what you have in mind." />
        </div>

        {status === 'error' && (
          <p role="alert" className="flex items-start gap-2 text-sm text-coral font-medium mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          data-gtm-id="contact-form-submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral/90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] min-h-[48px]"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        <p className="text-xs text-gray-700/70 mt-4">
          Prefer to book right away? Use the{' '}
          <a href="/#booking" className="text-ocean font-semibold hover:text-coral underline">
            booking calendar
          </a>{' '}
          for live availability.
        </p>
      </form>
    </div>
  );
}
