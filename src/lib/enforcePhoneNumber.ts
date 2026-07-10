// The owner's directive: (954) 764-4344 is the ONLY number allowed on the
// site. CallRail's dynamic number insertion (loaded via GTM) swaps phone
// numbers per visitor for call attribution; the calltrk-noswap class asks it
// not to, and this module enforces it regardless — any swap on a tel link is
// reverted immediately.

const REAL_DISPLAY = '(954) 764-4344';
const REAL_HREF = 'tel:+19547644344';
const PHONE_PATTERN = /\(?\d{3}\)?[\s.\-–]?\d{3}[\s.\-–]?\d{4}/g;

function normalizeAnchor(a: HTMLAnchorElement): void {
  if (a.getAttribute('href') !== REAL_HREF) {
    a.setAttribute('href', REAL_HREF);
  }
  const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? '';
    if (PHONE_PATTERN.test(text)) {
      PHONE_PATTERN.lastIndex = 0;
      const fixed = text.replace(PHONE_PATTERN, REAL_DISPLAY);
      if (fixed !== text) node.textContent = fixed;
    }
    PHONE_PATTERN.lastIndex = 0;
  }
}

function sweep(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach(normalizeAnchor);
}

let started = false;

export function enforcePhoneNumber(): void {
  if (started || typeof window === 'undefined') return;
  started = true;

  sweep();

  // Revert any later swap (CallRail loads seconds after the page via GTM).
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sweep();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}
