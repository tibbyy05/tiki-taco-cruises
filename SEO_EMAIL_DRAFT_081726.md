# Reply to Kosta — 2026-08-17 (short)

**Subject:** Re: Tiki Taco — 4 of 5 live

---

Hi Kosta,

Four of five live. In your order.

**1. Pricing, capacity, duration** — done sitewide. The model changed, so your $200 / 12-included figures are superseded:

$225/hour · 3-hour minimum ($675) · 14 included · max 18 · guests 15–18 are $60 each

Price blocks now name which guests pay, rather than putting 14 and 18 in one sentence. Fixed "4 Hours" claims are gone — cruises sell by the hour. Exception: `/fort-lauderdale-sunset-cruise/` keeps a 2-hour minimum ($450), stated in the FAQ.

**2. Open Charter** — inverted, and the one item still open. It isn't discontinued; Square sells it right now at $60/person, 6-guest minimum. The blog is the only place documenting it. The other article's "$360 for up to six guests" is exactly $60 × 6 — correct, not stale.

So, branch B. But Square runs it in the same early-morning and evening slots `/fort-lauderdale-sunset-cruise/` already sells, so a separate page would put two of our URLs against each other. I'd add it as a second pricing tier on that page instead. Tell me if you'd rather have the standalone page.

With Taco either way — only he can confirm whether it's genuinely shared with other groups.

**3. Contextual links** — done, your anchors, in the body copy:

- *Fort Lauderdale sandbar cruise* → `/north-bound-scenic-cruise/`
- *pontoon boat rental in Fort Lauderdale* → `/pontoon-boat-rental-fort-lauderdale/`
- *corporate boat cruise in Fort Lauderdale* → `/intracoastal-waterway-corporate-cruise/`

Both end CTAs pointed at the bare homepage; now they hit the service pages.

**4. Review widget and schema** — done on all eight URLs. Rating, count and reviews come from one constant, so widget and markup can't drift. Count was wrong: **103**, not 95.

Two for your call: the cruise pages carried eight testimonials that aren't in the 78 real Google reviews, so I swapped them for the real-review widget. And your `@graph` already has a `Product` per cruise, so those pages now have two — `aggregateRating` on your existing node would be cleaner, but it's your schema.

**5. llms.txt** — live, 200, text/plain, no redirect, not blocked.

Your pricing block still had $200/hour. Since the file tells LLMs to treat itself as authoritative, I updated it; the rest is verbatim.

Best,
Danny
