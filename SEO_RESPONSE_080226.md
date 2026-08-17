# Response to SEO Work Document (SEO-WORK-080226)

Prepared for Kosta Derkach — August 2, 2026

---

## 1. Internal Navigation and Server-Rendered HTML — no change needed

**Finding as reported:** navigating from `/cruise-destinations/` to `/blog/` changes the address bar,
but Redirect Path still reports `/cruise-destinations/` — suggesting the server response does not match
the URL.

**Assessment: this is a false positive.** The site is statically pre-rendered with `vite-react-ssg`.
Every public URL is a real, separate HTML file on disk with its own server response.

Verified directly against production:

```
$ curl -sD- https://tikitacocruises.com/blog/
HTTP/1.1 200 OK
<title>Blog | Tiki Taco Cruises Fort Lauderdale</title>
<h1>The Tiki Taco Blog</h1>
<link rel="canonical" href="https://tikitacocruises.com/blog/">

$ curl -sD- https://tikitacocruises.com/cruise-destinations/
HTTP/1.1 200 OK
<title>Charter Cruise Destinations | Ft Lauderdale Tiki Boat</title>
<h1>Charter Cruise Destinations in Fort Lauderdale</h1>
<link rel="canonical" href="https://tikitacocruises.com/cruise-destinations/">
```

Each URL returns its own 200, its own `<title>`, its own `<h1>`, and a correct self-referencing canonical.
The build output confirms it — `dist/blog/index.html` and `dist/cruise-destinations/index.html` are
distinct files, and there is deliberately **no** `/* → /index.html 200` catch-all in `_redirects` (a
comment in that file explains the omission: a catch-all would soft-404 every unknown URL).

### Test 1 — fetched as Googlebot

Both URLs requested with Googlebot's user-agent string:

| URL | Status | Title | H1 | Canonical |
|---|---|---|---|---|
| `/blog/` | 200 | Blog \| Tiki Taco Cruises Fort Lauderdale | The Tiki Taco Blog | `/blog/` |
| `/cruise-destinations/` | 200 | Charter Cruise Destinations \| Ft Lauderdale Tiki Boat | Charter Cruise Destinations in Fort Lauderdale | `/cruise-destinations/` |

### Test 2 — are these actually two different documents?

| URL | Size | SHA-256 (first 16) |
|---|---|---|
| `/blog/` | 49,420 bytes | `124b0024e8699420` |
| `/cruise-destinations/` | 86,514 bytes | `ab8b5f5202597918` |

160 differing lines between them. Searching the `/blog/` HTML for the cruise-destinations `<h1>` returns
**0 matches** — no content from the previously visited page is present. The served HTML also contains no
`location.replace`, `location.href =`, or `history.replaceState` calls, so nothing is rewriting the URL
client-side.

### Test 3 — rendered with JavaScript disabled

Chromium with `javaScriptEnabled: false`, so anything that appears came from the server HTML alone:

| URL | Status | Title | H1 |
|---|---|---|---|
| `/blog/` | 200 | Blog \| Tiki Taco Cruises Fort Lauderdale | The Tiki Taco Blog |
| `/cruise-destinations/` | 200 | Charter Cruise Destinations \| Ft Lauderdale Tiki Boat | Charter Cruise Destinations in Fort Lauderdale |

### Test 4 — reproducing the screenshot, and explaining it

Scripted in a real Chromium browser, logging every top-level **document** request — the same signal a
Redirect Path style extension watches:

```
STEP 1 — hard-load /cruise-destinations/
  address bar    https://tikitacocruises.com/cruise-destinations/
  document.title Charter Cruise Destinations | Ft Lauderdale Tiki Boat
  DOCUMENT requests: 1
     1. 200 https://tikitacocruises.com/cruise-destinations/

STEP 2 — click "Blog" in the nav          <-- this is your screenshot
  address bar    https://tikitacocruises.com/blog/     <-- URL changed
  document.title Blog | Tiki Taco Cruises Fort Lauderdale
  <h1>           The Tiki Taco Blog
  canonical      https://tikitacocruises.com/blog/
  DOCUMENT requests: 1                                  <-- still the OLD url
     1. 200 https://tikitacocruises.com/cruise-destinations/

STEP 3 — hard-reload that same /blog/ URL
  address bar    https://tikitacocruises.com/blog/
  DOCUMENT requests: 2
     1. 200 https://tikitacocruises.com/cruise-destinations/
     2. 200 https://tikitacocruises.com/blog/            <-- real /blog/ response, 200
```

**Step 2 is exactly what your screenshot captured**, and it shows the cause precisely: the address bar
reads `/blog/` while the last *document request* is still `/cruise-destinations/`, because React Router
handled the click without a new page fetch. That stale document request is what the extension displays.

Note that in the same step, the page's title, `<h1>`, and canonical are all correctly `/blog/` — the page
identity is right; only the extension's readout is stale. Step 3 then shows a genuine `/blog/` document
request returning 200 the moment a real navigation occurs.

**How to confirm independently:**

- Hard-load `/blog/` in a fresh tab (paste the URL) rather than clicking through, then View Source (`Ctrl+U`)
- Google Search Console → URL Inspection → View Crawled Page
- Google's Rich Results Test — renders the URL as Googlebot fetches it

One caveat worth flagging: DevTools' **Elements** panel shows the live DOM, not the server response, so
it can't distinguish these two cases. View Source or a `curl` is the valid check.

Googlebot requests each URL directly, exactly like Tests 1–3, so indexing is unaffected.

---

## 2. HTTP link in the sandbar blog article — **action needed from your side**

Confirmed present. The article body is stored in the database (Supabase `tiki_blog_posts`), not in the
site code, and the deployment key is read-only, so this one has to be changed through the admin editor.

- **Post:** `fort-lauderdale-sandbar-on-a-pontoon-what-to-expect`
- **Location:** final paragraph — "Book online at ..."
- **Change:** `[tikitacocruises.com](http://tikitacocruises.com)` → `[tikitacocruises.com](https://tikitacocruises.com/)`

---

## 3. Unified cruise prices and guest information — done

Canonical terms now applied consistently sitewide:

| Term | Value |
|---|---|
| Rate | $200/hour |
| Minimum booking | 2 hours |
| Included guests | Up to 12 |
| Maximum capacity | 18 |
| Additional guest fee | $60 per person |

Corrected:

- **Homepage cruise cards (×3)** — "Max capacity: 18 people" → "Up to 12 guests included · max 18 (+$60 per extra guest)". This was the contradiction in your screenshot, where the homepage said 18 and the cruise page said 12.
- **`/cruise-destinations/`** — card capacity "Up to 18 Guests" → "12 Guests Included (max 18)"; hourly-rental bullet "Up to 18 guests" → "Up to 12 guests included · max 18 (+$60 each)".
- **Two FAQ answers** (corporate cruise page, pontoon rental page) that answered "how many guests?" with a bare "up to 18" now state the 12-included / 18-max / $60-extra structure.

Already consistent and left unchanged: the FAQ page, all four cruise detail pages, the pontoon rental
landing page, and all four blog articles.

**Also found and removed (not in your list).** The site was still serving a July promotional banner on
every page: *"Celebrate 250 Years of Freedom — July Special: $200/hour for up to 15 guests."* It was
stale by a month and its "15 guests" matched nothing else on the site — a third conflicting number
alongside the 12 and 18 you flagged. The banner has been removed, and the layout offsets that were sized
to clear it were adjusted.

---

## 4. Legal page links — done, with one part pending

The three footer links were `href="#"` placeholders pointing nowhere. All three now resolve to real
pages, included in the sitemap:

- `/privacy-policy/` — complete. Documents the site's actual data flows (contact/booking form, first-party page-view logging, Google Analytics via GTM, and the Square/SendGrid/Supabase/Netlify processors).
- `/terms-of-service/` — complete. Covers pricing and guest limits, booking and payment, conduct on board, assumption of risk, and governing law.
- `/cancellation-policy/` — **published but not final.** It documents what is confirmed (unsafe weather = reschedule, captain's discretion, how to request a change) and directs guests to the terms confirmed at booking. It deliberately does **not** state a notice window, deposit rule, or refund percentage, because those were not documented anywhere and inventing them would put terms in writing that the business may not honour.

**Needed from Taco:** cancellation notice period, deposit terms, and refund rules. Once supplied, the page can be completed in minutes.

---

## 5. Reviews loaded on the homepage — done

The homepage was rendering **74 review cards** into the initial HTML. It now renders **9**, with the rest
loading on demand behind a "Load More Reviews" button. The 5.0 / 88 Google reviews badge and the
scrolling marquee are unchanged.

Measured on the production build: homepage HTML **148.7 KB → 116.2 KB (−22%)**.

---

## 6. Gallery without JavaScript — done

`/gallery/` previously shipped only a "Loading…" placeholder in its server HTML, with images injected
after a client-side database call. Image data is now seeded into the initial render, so the pre-rendered
HTML contains real `<img>` tags with `alt` text. The live database fetch still runs on hydration and
replaces the set when it returns.

Verified in the build output: `dist/gallery/index.html` contains **12 media elements and zero
"Loading…" placeholders** (previously 0 and 1 respectively).

---

## 7. Structured data on cruise pages — done

Your supplied `@graph` markup was extracted directly from the document (not retyped) and applied to all
six URLs. Each page now carries `LocalBusiness` + `WebSite` + `WebPage` + `BreadcrumbList` + `Product`
with the `$200/hour` `UnitPriceSpecification`. All six validated as parsing JSON in the built HTML.

| Page | Result |
|---|---|
| `/new-river-cruise/` | replaced |
| `/north-bound-scenic-cruise/` | replaced |
| `/las-olas-boat-tour/` | replaced |
| `/intracoastal-waterway-corporate-cruise/` | replaced |
| `/fort-lauderdale-sunset-cruise/` | replaced |
| `/pontoon-boat-rental-fort-lauderdale/` | replaced + FAQPage retained |

**One deliberate deviation.** `/pontoon-boat-rental-fort-lauderdale/` carried an `FAQPage` node with six
Q&A pairs that your replacement graph does not include. Removing it would have dropped the page's FAQ
rich-result eligibility, so it was appended to your graph rather than discarded. Say the word if you'd
prefer it removed.

Two incidental improvements from your markup: the previous `WebPage` nodes referenced a `#website` entity
that did not exist in the graph — your version defines it — and the old `PriceSpecification` of `800`
(a legacy 4-hour flat rate) is now gone.

---

## Summary

| # | Item | Status |
|---|---|---|
| 1 | Internal navigation / server HTML | No change needed — false positive, evidence above |
| 2 | HTTP link in blog article | **Pending** — needs admin-editor edit (details above) |
| 3 | Unify prices and guest info | Done (+ stale July banner removed) |
| 4 | Legal page links | Done — cancellation terms **pending from Taco** |
| 5 | Homepage reviews | Done — 74 → 9, HTML −22% |
| 6 | Gallery without JavaScript | Done |
| 7 | Structured data on cruise pages | Done — all 6 pages |
