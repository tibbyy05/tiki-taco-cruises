import { supabase } from './supabase';

// First-party page-view tracking into tiki_page_views (see
// supabase/migrations/20260709_tiki_page_views.sql). No cookies, no PII —
// path, referrer-derived source, device class, and a per-tab session id.
// Fails silently: analytics must never break the site.

const SESSION_KEY = 'tiki-visit-session';

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function deriveSource(): string {
  const utm = new URLSearchParams(window.location.search).get('utm_source');
  if (utm) return utm.toLowerCase();
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) return host.replace(/^www\./, '');
    } catch {
      // ignore malformed referrers
    }
  }
  return 'direct';
}

function deriveDevice(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
  return 'desktop';
}

function logEvent(event: 'pageview' | 'call_click' | 'book_click', path: string): void {
  try {
    if (path.startsWith('/admin')) return;
    if (navigator.webdriver) return; // headless bots / Lighthouse

    void supabase
      .from('tiki_page_views')
      .insert({
        event,
        path,
        referrer: document.referrer ? document.referrer.slice(0, 500) : null,
        source: deriveSource().slice(0, 100),
        device: deriveDevice(),
        session_id: getSessionId(),
      })
      .then(() => undefined);
  } catch {
    // never let analytics affect the page
  }
}

export function trackPageView(path: string): void {
  logEvent('pageview', path);
}

// Wired to a delegated click listener in Layout — covers every element
// tagged data-gtm-id="call-to-book" / "book-now", current and future.
export function trackCtaClick(gtmId: string): void {
  if (gtmId === 'call-to-book') {
    logEvent('call_click', window.location.pathname);
  } else if (gtmId === 'book-now') {
    logEvent('book_click', window.location.pathname);
  }
}
