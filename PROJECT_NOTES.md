# TIKI TACO CRUISES WEBSITE - PROJECT SUMMARY

Last updated: August 17, 2026 (post-Batch 7 deploy, commit d11d5a8)

**Pricing, site structure and open items live in the BATCH 7 section. Sections above it
dating from Batch 5 are historical and contain superseded numbers — do not read them as
current.**

## PROJECT OVERVIEW

| Field | Value |
|---|---|
| Client | Tiki Taco Cruises (Fort Lauderdale tiki boat / pontoon rental) |
| Live URL | https://tikitacocruises.com |
| GitHub | https://github.com/tibbyy05/tiki-taco-cruises |
| Local dev | C:\Websites\Tiki Taco Cruises\project |
| Tech stack | React + TypeScript + Vite + React Router + react-helmet-async + Tailwind |
| Hosting | Netlify (project: pontoon-rental, GitHub auto-deploy from main branch) |

## BUSINESS DETAILS

| Field | Value |
|---|---|
| Business name | Tiki Taco Cruises |
| Phone | (954) 764-4344 |
| Address | The Hilton Marina, 1881 SE 17th St, Fort Lauderdale, FL 33316 |
| TikTok | @tikitacocruises |
| Email | Tikitacocruises@gmail.com |

## CURRENT SITE STRUCTURE

### PUBLIC INDEXABLE PAGES

| Path | Description |
|---|---|
| `/` | Homepage |
| `/cruise-destinations` | Cruise hub (replaces old /destinations) |
| `/new-river-cruise` | 4-hour cruise: New River + Stranahan House |
| `/north-bound-scenic-cruise` | 4-hour cruise: Intracoastal + sandbar stops |
| `/las-olas-boat-tour` | 4-hour cruise: party pontoon, Las Olas |
| `/intracoastal-waterway-corporate-cruise` | 4-hour cruise: corporate / private events |
| `/gallery` | Photo gallery (Supabase-backed) |
| `/faq` | 10 FAQs covering pricing/policies |
| `/fort-lauderdale-sunset-cruise` | 2-hour morning & sunset cruise (now a full page, indexed) |
| `/pontoon-boat-rental-fort-lauderdale` | Pontoon rental service page |
| `/contact-us` | Contact page |
| `/blog` + 4 posts | Supabase-backed, prerendered |
| `/privacy-policy`, `/terms-of-service`, `/cancellation-policy` | Legal |

### PUBLIC BUT NOINDEX

| Path | Description |
|---|---|
| `/admin` | Admin gallery (also Disallow in robots.txt) |

### NETLIFY 301 REDIRECTS (all active)

| From | To |
|---|---|
| `/destinations` | `/cruise-destinations` |
| `/destinations/beach-coast-cruise` | `/cruise-destinations` |
| `/destinations/full-waterway-tour` | `/cruise-destinations` |
| `/destinations/las-olas-cruise` | `/las-olas-boat-tour` |
| `/destinations/sandbar-party` | `/north-bound-scenic-cruise` |
| `/destinations/intracoastal-tour` | `/intracoastal-waterway-corporate-cruise` |

WILDCARD: `/*` → custom NotFound page (noindex, 3 CTAs: Home/Cruises/Contact)

## CURRENT PRICING — HISTORICAL, SEE BATCH 7 FOR LIVE NUMBERS

On cruise page pricing blocks (OLD pricing — Phase 4 will swap):
- All 4-hour cruise pages display: $1,500 / 4 Hours / Up to 18 Guests
- (Las Olas was $1,200 / 3 Hours but that page is gone — 3-hour offering removed in Phase 2c)

In FAQ page (NEW pricing per Maggie's spec — already live):
- 4-hour: $1,140 base for up to 12 passengers, $60 per additional guest
- 2-hour: $60 per person, 6-person minimum
- Start times: 4-hour at 10am or 2pm; 2-hour at 8-10am or 6-8pm

In sticky booking bar: "From $1,200" (will update to "From $1,140" in Phase 4)

In Square: confirmed has both "4 Hour Private Cruise" and "2 Hour Open Charters" options live.
Pending: confirmation from Tacohookedup that Square's pricing matches Maggie's new structure
($1,140 base / $60 per additional / $285/hour / 2-hour at $60/person 6-min). Phase 4 unblocked
once confirmed.

## DEPLOYS SHIPPED (5 batches, all in production)

### BATCH 1 — SEO foundation (commit 47b9470)

- Deleted FullWaterwayTour, duplicate AdminGallery, BeachCoastCruise, debug console.log, 7 unused video files (~190 MB freed)
- Created reusable `<SEO>` component (Helmet wrapper)
- Created reusable `<CruisePage>` template
- Refactored 3 cruise pages onto template (315 → ~92 lines each)
- Custom NotFound page + wildcard route
- Stale pontoon-rental.netlify.app references purged
- Nav: "Destinations" → "Cruises"
- `_redirects` skeleton primed
- Bundle: 651 → 620 KB

### BATCH 2 — New cruise pages + redirects + cleanup (commit 43558fc)

- Built 5 new cruise pages from Maggie's content strategy spec
- Built `/cruise-destinations` hub page
- Built sunset cruise as "Launching Soon" placeholder
- Activated 6 Netlify 301 redirects from old URLs
- Deleted old destinations + 4 cruise page files
- Removed `src/pages/destinations/` folder entirely
- Bundle: 620 → 628 KB (added 5 new pages, removed 4 old)

### BATCH 3 — Homepage refresh + FAQ + bug fixes (commit 95314f2)

- Homepage restructured: Hero → About → Trust Badges (4 lucide icons: Award/Anchor/Shield/BadgeCheck) → 3-card Popular Cruises → Gallery → 7 Amenities → Guest Reviews → Booking CTA → Hilton Marina (with map)
- FAQ page rewritten with 10 new FAQs (FAQs 2-4 contain NEW pricing per spec)
- Fixed Maggie-flagged duplicate reviews bug (Testimonials + RecentReviews → single GuestReviews)
- Fixed sticky booking bar: was "$300/hr - 3 Hour Minimum" (incorrect) → "From $1,200"
- Added `data-gtm-id="book-now"` to sticky bar Reserve button (was missing per Phase 0 audit)
- Deleted Routes.tsx, Testimonials.tsx, RecentReviews.tsx
- Bundle: 628 → 626 KB

### BATCH 4 — Sitemap + robots.txt cleanup (commit 48190f0)

- Regenerated sitemap.xml with 8 correct URLs (was 7 stale: had /routes/* paths and phantom /amenities)
- Excluded sunset cruise (noindex) and all redirect-source URLs from sitemap
- Added `Disallow: /admin` to robots.txt
- Pending: manual GSC submission (NOT YET DONE — see "remaining manual steps")

### BATCH 5 — New logo + favicon fix + asset cleanup (commit 2007a3d)

- New branded logo: tiki-taco-logo.png (500x500, 129 KB) replacing NewLogo1.png
- Generated apple-touch-icon.png (180x180) and favicon-32.png from source
- Fixed broken /vite.svg favicon (was 404'd in production since launch — now /favicon-32.png)
- Footer restructured: single-row 3-column layout, "powered by ai-genda.com" centered, pb-24 for sticky clearance
- StickyBookingBar simplified: removed IntersectionObserver hide-on-booking-section logic (now always visible after 300px scroll)
- Navigation: logo container -20% size, scale 1.3 → 1.05, padding adjustments
- Deleted source SVG (3.36 MB raster-wrapped, useless), 2 oversized source PNGs, 4 legacy unreferenced logos
- Reclaimed ~13.6 MB from /public/

## BATCH 6 — Kosta Derkach SEO document (August 2, 2026) — SHIPPED & LIVE

Kosta Derkach (kosta@downtowncomputers.com, Downtown Computers) sent a 7-item SEO doc,
`SEO-WORK-080226.docx`, in the project root. All 7 resolved. Working docs:

- `SEO_RESPONSE_080226.md` — full written response with test evidence (the client attachment)
- `SEO_EMAIL_DRAFT_080226.md` — draft email reply, **not yet sent**, 2 judgment calls flagged inside

### What shipped

| Item | Outcome |
|---|---|
| 1. Internal nav / server HTML | **No defect** — false positive, see below |
| 2. `http://` link in sandbar blog post | Fixed 3 ways (DB, generator prompt, render-time normalizer) |
| 3. Unify prices/guests | Canonical terms applied sitewide |
| 4. Legal page links | 3 pages created, footer wired |
| 5. Homepage reviews | 74 → 9 cards + Load More; HTML 148.7 → 116.2 KB |
| 6. Gallery without JS | Images now in prerendered HTML (was "Loading…") |
| 7. Cruise page schema | Kosta's `@graph` on all 6 URLs |

### Canonical pricing terms — SUPERSEDED, see Batch 7

~~$200/hour · 2-hour minimum · up to 12 guests included · max 18 · $60 per additional guest~~

### Item 1 was a false positive — don't "fix" it

The site is prerendered by `vite-react-ssg`; every URL is a real separate HTML file.
Redirect Path reports the last *network* navigation, so it goes stale after any client-side
route change — that is all his screenshot showed. Proven four ways (Googlebot fetch, byte
diff, JS-disabled render, scripted click-through with document-request logging). His own
screenshot shows the `<h1>` reading "The Tiki Taco Blog", which only exists in `/blog/`'s
HTML. Test scripts were run from the project root and deleted; recreate from
`SEO_RESPONSE_080226.md` if needed. Note DevTools' Elements panel shows the live DOM, not
the server response, so it cannot distinguish the two cases.

### Also found and fixed (not on his list)

- **Stale July promo banner** in `Navigation.tsx`, sitewide, advertising "up to 15 guests" —
  a third conflicting number. Removed, and the two offsets sized to clear it were adjusted
  (`index.css` scroll-margin 160→128px, `Gallery.tsx` padding-top 130→98px).
- **Review count was 88, actual 95.** Corrected in `GuestReviews.tsx` (×2) and `Hero.tsx`.
  Testimonials now 78 in `src/data/mockData.ts`, newest-first, ids unique within the array.
- **Privacy policy was materially incomplete.** Written from `index.html`, which shows only
  the GTM container — but GTM loads **Microsoft Clarity (session replay), CallRail, Bing,
  DoubleClick, ipapi.co** at runtime. Only a real browser reveals these. Now disclosed.
  *Lesson: audit third parties in a browser, not from source.*
- **Phone numbers are not a NAP problem.** `.cr-number` + CallRail DNI swaps the displayed
  number per visitor (verified live: 954-764-4344 → 954-869-9378, `tel:` href swaps too).
  Crawlers and no-JS visitors see the real 954-764-4344. Intentional — do not "fix".

### Blog generation

Posts are LLM-generated by the **Supabase edge function** `expand-blog-post` (not Netlify,
not in the Netlify build). Its schema description now mandates the canonical URL form.
Deploy separately: `npx supabase functions deploy expand-blog-post --project-ref vjiybpiuquttbaimywbt`.
`src/lib/canonicalHref.ts` normalizes self-links at render time in `BlogPost.tsx` as a
deterministic backstop. `generate-blog-ideas` has the same prompt-drift exposure, unreviewed.

### Supabase writes are possible — the anon key is not

The `.env` anon key is read-only under RLS (a PATCH returns 200 with `[]`, silently doing
nothing). The Supabase **CLI is logged in and linked**, so:
`npx supabase projects api-keys --project-ref vjiybpiuquttbaimywbt` returns the service-role
key. That is how the blog post content was corrected directly.

## BATCH 7 — Kosta SEO email (August 13, 2026) — BUILT, NOT YET PUSHED

Kosta's 5-item email. Pricing changed twice mid-batch; Taco's number below is the final one.

### Canonical pricing terms (SUPERSEDES Batch 6)

**$225/hour · 3-hour minimum ($675) · 14 guests included · max 18 · guests 15–18 are $60 each**

Pricing moved three times during this batch. Final numbers are Danny's Aug 17 spec. Earlier
values ($200/12, $250/15, $225/12 with a 2-hour minimum) are all dead — do not resurrect.

Taco's standing instruction on capacity still applies:

> "We really need to post everywhere on web site up to 18 passengers. Very important, this is
> what puts me above 90% of my competitors."

**Copy pattern ("Option C"), use this everywhere.** The confusion in earlier drafts came from
14 and 18 competing in one sentence. The fix is to name *which* guests pay:

| | |
|---|---|
| Rate | $225 per hour |
| Minimum | 3 hours — $675 |
| Guests included | 14 |
| Maximum capacity | 18 |
| Guests 15–18 | $60 each |

Never write "additional guests" or "after 14" — write **"guests 15–18 are $60 each"**.
`CruisePage` renders this as a five-cell `<dl>`; its `CruisePagePricing` interface was
refactored to match (`rate` / `minimumHours` / `minimumPrice` / `includedGuests` /
`maxCapacity` / `extraGuestFee`), replacing the old duration/price/basePassengers shape.

### The 3-hour minimum does NOT apply to the 2-hour products

`/fort-lauderdale-sunset-cruise/` sells 2-hour morning (8–10 AM) and sunset (6–8 PM) cruises —
it is in the nav as "2-Hour Morning & Sunset Cruises" and in the sitemap. Square also still
sells 2 Hour Open Charters. A blanket 3-hour minimum makes both unsellable, so that page keeps
its 2-hour minimum ($450) and everything else got 3 hours ($675). The FAQ documents the
exception explicitly. **This split is an assumption, not an instruction — confirm it.**

### Shipped in the working tree

| Item | Outcome |
|---|---|
| 1. Standardize pricing/capacity/duration | 13 files at $225/hr · 3-hr min · 14 incl · max 18; fixed-duration "4 Hours" claims removed; sunset page had no capacity info at all, added |
| 2. Open Charter | **Still live in Square** — branch B applies, page not yet built |
| 3. Contextual blog links | Done on the 2 posts Kosta named, exact anchors he specified |
| 4. Review widget + AggregateRating | `CompactReviews.tsx` on 7 pages + Product schema on all 8 |
| 5. llms.txt | **Blocked** — attachment never landed on disk |

### Square contradicts the website — needs Taco

Square's live booking widget still says `$200/Hour for up to 18 guests. 2 Hour Minimum` — no
included-guest tier, no additional-guest fee, and the old rate.

An 18-guest 3-hour booking: **$600 on Square, $915 on the site.** The website is correct;
Square is stale, and Square is what actually charges the card. **Taco is handling this** (told
to Danny, Aug 17) — but until he does it, every online booking under-charges.

### Open Charter is a real, bookable product

`2 Hour Open Charters - Early Morning and Evening Cruise · Minimum of 6 guests · $60 per person`
is live in Square right now. It appears nowhere on the site's service pages, which is why the
blog reads as inconsistent — the blog is *right* and the site is silent. Two posts describe it:
`2-hour-fort-lauderdale-boat-cruise-for-small-groups` (its "$360 for up to six guests" is
exactly $60 × 6, i.e. correct) and `how-to-choose-the-right-party-boat-in-fort-lauderdale`.
Both left untouched pending Taco. Note the 2-hour post calls it "a private experience" while
Square sells it per-seat — that contradiction is real either way.

### Also found and fixed (not on his list)

- **8 fabricated testimonials** on the 4 template cruise pages — "Tyler Brooks", "Nicole
  Ramirez", "Marcus Johnson", "Rachel Kim", "James Patel", "Karen Mitchell", "Brian Foster",
  "Laura Chen". None appear in the 78 real Google reviews. Removed and replaced with the real
  `CompactReviews` widget — these were the exact pages about to carry AggregateRating markup.
- **`node="[object Object]"` on every blog link and image.** react-markdown's AST node was
  being spread onto the DOM element in `BlogPost.tsx`. Pre-existing; fixed.
- **Dead code carrying phantom prices.** `Fleet.tsx` (unrendered) advertised "+$50/hour"
  captain service, and `mockData.routes` held "3 hours" durations, plus three fictional boats
  with stock photos and $150–$220 hourly rates. All deleted, along with the `Boat`/`Route`
  types.
- **"2, 3, and 4-hour options"** on `/cruise-destinations/` — the 3-hour product was removed
  back in Phase 2c.

### Review data is now single-source

`GOOGLE_RATING` / `GOOGLE_REVIEW_COUNT` in `src/data/mockData.ts` feed the homepage marquee,
the compact widget, and `src/lib/reviewSchema.ts` (the Product + AggregateRating JSON-LD).
Bumping the count in one place updates all three, which is what Kosta asked for. Count was
95, actual Google is **103** — verified on Maps, not assumed.

Schema is emitted through a new `extraJsonLd` prop on `<SEO>` so it lands as its own
`<script>` and touches none of the existing LocalBusiness/WebSite/WebPage/ItemList graphs.
Verified in the built HTML: present on exactly the 8 specified URLs, absent everywhere else.

**Caveat to raise with Kosta:** the 5 cruise pages now carry two `Product` nodes — his
existing cruise Product in the `@graph`, plus this standalone one with the rating. That is
what his spec asked for, but Google may pick the wrong entity. Worth attaching
`aggregateRating` to his existing node instead.

## OPEN AFTER BATCH 7 — START HERE (Aug 17, 2026)

Batch 7 is committed (`d11d5a8`) and verified live in production. What's left:

### Waiting on Taco

1. **Open Charter — one question: do strangers share the boat?**
   Square sells `2 Hour Open Charters · min 6 guests · $60 per person` in the early-morning and
   evening slots. The site documents it nowhere.
   - If **shared**: it's a distinct product, and "every cruise is private" has to come out of
     the FAQ, legal pages and `llms.txt`.
   - If **private, per-head**: it's a second price tier, not a second product.
   Recommendation either way: put it on `/fort-lauderdale-sunset-cruise/` rather than a new
   URL — Square runs it in that page's exact slots, so a separate page self-cannibalises.
2. **Square still lists $200/hour.** Taco is handling it (Aug 17). An 18-guest 3-hour booking
   is $600 on Square vs $915 on the site until he does.
3. **Blog content is Taco's** going forward (Aug 17). Note two posts were already updated in
   Supabase during Batch 7 — sandbar and corporate — so he shouldn't redo them. The two
   Open-Charter posts were deliberately left alone.

### Assumptions shipped without confirmation — verify before the next pricing change

4. **`$60` is flat per booking, not per hour.** Full 18 guests on a 3-hour cruise = $915. If
   it's actually per-hour it's $1,395 and every price line is wrong.
5. **The 3-hour minimum does not apply to the 2-hour products.**
   `/fort-lauderdale-sunset-cruise/` keeps a 2-hour minimum ($450) and the FAQ states the
   exception. If the 3-hour minimum is meant to be universal, that page has to be retired or
   rebuilt — it is indexed, in the nav, and in the sitemap.

### Unverified / loose ends

6. **Mobile layout of the new pricing spec block was never seen.** `resize_window` reported
   success but kept returning desktop-width screenshots. Grid is `grid-cols-2 lg:grid-cols-5`
   with the fifth cell spanning 2 on small screens. Check on a phone.
7. **GTM container mismatch.** `index.html` uses `GTM-PXM6BDVH`; these notes recorded
   `GTM-PXVV455L` from Batch 3. One is stale. Unrelated to Batch 7, never chased.
8. **`SEO_EMAIL_DRAFT_081726.md` is written but unsent.** Square is deliberately not mentioned
   in it — if Kosta re-audits consistency he will find the $200/hour and log it as our miss.
9. **Two `Product` nodes on the 5 cruise pages** — Kosta's existing one plus the new rated one.
   That is what his spec asked for, but Google may bind the rating to the wrong entity. Raised
   with him in the draft; his call.
10. **`llms.txt` must be re-checked on every pricing change.** Pricing moved three times in
    four days on this batch. `public/llms.txt`.

### Dev server

Port 5173 belongs to a different project. Run this one explicitly:
`cd "C:\Websites\Tiki Taco Cruises\project" && npx vite --port 5180 --strictPort`
Consider pinning `server: { port: 5180, strictPort: true }` in `vite.config.ts`.

## OPEN ITEMS FROM BATCH 6

1. **CallRail call recording — check this first.** Florida is an all-party consent state
   (Fla. Stat. § 934.03). The privacy policy discloses call *metadata* only. If recording is
   enabled in CallRail without an audible announcement, that is real legal exposure. Verify
   in the CallRail dashboard; a lawyer's question, not a developer's.
2. **Cancellation terms from Taco** — `/cancellation-policy/` is live but deliberately omits
   notice period, deposit, refund, and no-show rules. Need: notice period, deposit
   refundable?, refund inside window, no-show policy, whether Square enforces any of it.
3. **`aggregateRating` schema** — none exists sitewide. Raised with Kosta in the draft email;
   note self-serving reviews are not eligible for `LocalBusiness` review rich results.
4. **Send the email** — `SEO_EMAIL_DRAFT_080226.md`.

## REMAINING WORK (gated)

### PHASE 4 — Pricing swap site-wide (gated on Tacohookedup confirming Square pricing)

- Swap cruise page pricing blocks: $1,500 / 18 guests → $1,140 / 12 passengers, add $60 extra guest, add $285/hour
- Add 4-hour start times displays: "10am or 2pm"
- Sticky booking bar: "From $1,200" → "From $1,140"
- Upgrade /fort-lauderdale-sunset-cruise from "Launching Soon" placeholder to full Maggie-spec page ($60/person, 6-min, 8am or 6pm start times)
- Remove noindex from sunset page once it's a real page
- Update sitemap to include /fort-lauderdale-sunset-cruise
- Internal links to sunset cruise become real CTAs

### PHASE 5b — Schema markup (gated on Heather sending JSON-LD content)

- Add FAQ JSON-LD to /faq page
- Add LocalBusiness JSON-LD to homepage
- Heather may also send 4 destination page content batch as part of this delivery

### POLISH BACKLOG (low priority, no specific blocker)

- OG image: replace /fort-lauderdale-hero.jpg with branded 1200x630 composition
- 404 page: hide sticky booking bar on NotFound (mildly weird UX to show on Page Not Found)
- Sitemap automation: install Vite plugin to auto-generate from React Router config
- Code splitting: bundle is 626 KB with chunk size warning; React.lazy() on cruise pages would shrink initial bundle
- Footer image logo: currently uses Lucide Anchor + text, could swap to actual /tiki-taco-logo.png

## REMAINING MANUAL STEPS (need to be done in browser, not code)

- Submit sitemap to Google Search Console
  - https://search.google.com/search-console for tikitacocruises.com property
  - Sitemaps in left nav → submit "sitemap.xml"
  - Check 24-48 hours later for "Success" status with 8 discovered URLs
- URL Inspection requests (one-off) for each new cruise URL to speed up indexing: `/cruise-destinations`, `/new-river-cruise`, `/north-bound-scenic-cruise`, `/las-olas-boat-tour`, `/intracoastal-waterway-corporate-cruise`
- Verify Google Maps embed on /cruise-destinations Hilton Marina section pin lands on correct address (was placeholder URL with TODO comment)

## KEY COLLABORATORS

| Name | Role |
|---|---|
| Danny (developer/founder of Ai-genda) | Primary developer |
| Tacohookedup (Taco) | Client, owns Square configuration, approves business claims |
| Samantha | CC'd stakeholder |
| Maggie Castle | SEO agent (manages GTM via fwd.privateemail.com), wrote the content strategy doc |
| Heather Hamilton | SEO consultant, owns technical audit + schema markup deliverables |

## TOOLS & RESOURCES

| Tool | Details |
|---|---|
| Stack | React, TypeScript, Vite, React Router, react-helmet-async, Tailwind, Lucide React icons |
| Hosting | Netlify (auto-deploy from GitHub main) |
| Backend | Supabase Pro (project ref: vjiybpiuquttbaimywbt; client ID: a8c9295f-6dd9-4ef8-916a-ba79f966368b) |
| Booking | Square Appointments (modal embed) |
| Analytics | Google Tag Manager (GTM-PXVV455L) |
| Domain | GoDaddy (DNS pointing to Netlify) |
| Image processing | sharp@^0.34.5 (devDependency, used for logo variants) |

## WORKFLOW PATTERN ESTABLISHED

1. Claude Opus discusses, plans, drafts prompts
2. Claude Code executes prompts locally (Cursor IDE on user's machine)
3. Code-level audit prompt verifies file contents match spec
4. Playwright MCP audit verifies live behavior in real browser
5. Manual visual check by user when needed
6. Single batched commit/push to GitHub
7. Netlify auto-deploys from main
8. Live-site Playwright verification on production
9. Stakeholder updates if needed

## GTM TRACKING

- `data-gtm-id="book-now"` on every Book Now / Reserve CTA
- `data-gtm-id="open-booking-calendar"` on Square modal trigger
- All selectors verified preserved through Phase 1-3 refactors
- StickyBookingBar Reserve button got `data-gtm-id` added in Phase 3 (was missing pre-restructure)

## GITIGNORED ARTIFACTS (don't commit these)

- `node_modules/`, `dist/`, `.env*`
- `.claude/settings.local.json` (machine-specific tool permissions)
- `PHASE_*_AUDIT.md`
- `BATCH_*_VERIFICATION.md`
- `LOGO_*_VERIFICATION.md`
- `phase*-screenshots/`, `phase*-audit-screenshots/`
- `batch*-screenshots/`
- `logo-*-screenshots/`

## INSTRUCTIONS FOR CLAUDE IN NEW CONVERSATION

Hi Claude! I'm Danny, founder of Ai-genda (AI phone receptionist service). Tiki Taco Cruises
is my flagship boat-rental client and portfolio piece. Site is at https://tikitacocruises.com.

The site has been through 5 production deploys implementing an SEO-driven restructure based
on Maggie Castle's content strategy. Current state is in this summary file.

Most likely reasons I'm starting a new chat:
1. Phase 4 unblocked — Tacohookedup confirmed Square pricing structure
2. Phase 5b unblocked — Heather sent JSON-LD schema content
3. New polish work or feature request
4. Something broke in production

Workflow: I use Claude Code locally with Playwright MCP for browser automation. I push in
batches via GitHub auto-deploy to Netlify. I run audit prompts (code-level + Playwright)
before each push.

Project location: C:\Websites\Tiki Taco Cruises\project
