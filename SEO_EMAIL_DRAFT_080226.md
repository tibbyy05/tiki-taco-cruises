# Draft reply to Kosta Derkach — August 2, 2026

Attach `SEO_RESPONSE_080226.md`. Everything described below is already live.

**Two judgment calls to review before sending:**

1. Item 2's root cause is described as "the template that generated it" rather than
   stating the blog posts are LLM-generated. Telling an SEO consultant the blog is
   AI-written invites E-E-A-T scrutiny you may not want to open. Vague but not untrue —
   change it if you'd rather be direct.
2. The "worth a re-crawl" line points out his screenshot is outdated. Useful, slightly
   pointed. Easy to cut.

---

**Subject:** Re: new SEO work — additional SEO website changes

Hi Kosta,

Thanks for the detailed write-up — the screenshots made it much faster to track each item
down. All seven items are now resolved or answered, and everything below is live.

**1. Internal navigation / server-rendered HTML** — no change needed, and I'd like to show
you why rather than just assert it.

Your read of the mechanism is right: the URL *is* changing via client-side routing. But the
site is statically pre-rendered, so every URL is also a real separate HTML file with its own
server response. Four tests:

- Fetched as Googlebot: both URLs return 200 with correct, distinct title, H1, and
  self-referencing canonical
- The two documents are genuinely different files — 49 KB vs 87 KB, different hashes, and
  `/blog/` contains zero occurrences of the cruise-destinations H1
- Rendered with JavaScript fully disabled: both pages render correctly, which is only
  possible if the content is already in the server HTML
- Scripted your exact click-through while logging document requests: after the click, the
  address bar reads `/blog/` while the last document request is still
  `/cruise-destinations/` — reproducing your screenshot precisely. Hard-reloading that same
  URL then produces a real `/blog/` 200.

The detail that settles it is in your own screenshot: the heading renders as **"The Tiki
Taco Blog."** That text exists only in `/blog/`'s HTML — if the server had returned the
previous page, it would read "Charter Cruise Destinations in Fort Lauderdale." The address
bar, the rendered content, and the H1 all agree; only the Redirect Path panel is out of
step, because no document request happened for it to read.

Worth noting that Redirect Path reports the last *network* navigation, so it goes stale on
any client-side route change — as does DevTools' Elements panel, which shows the live DOM
rather than the server response. View Source or GSC's "View Crawled Page" are the checks
that separate the two cases. Full test output is attached.

If you're still seeing something odd, I'd genuinely like to know — happy to jump on a call
and step through it.

**2. HTTP link in the blog article** — fixed. Corrected in the article itself, and I also
fixed the template that generated it so it can't recur, plus added a normalizer that forces
any link to our own domain into the canonical `https://` + trailing-slash form as the page
renders. Belt and braces.

**3. Unified prices and guest information** — standardized sitewide to $200/hour, 2-hour
minimum, up to 12 guests included, max 18, $60 per additional guest. The mismatch you caught
was the homepage cards showing "Max capacity: 18 people" against the cruise pages' "Up to 12
Passengers"; the cards now carry the full structure. Also corrected the
`/cruise-destinations/` hub and two FAQ answers that gave a bare "up to 18" without the
included-guest split.

**4. Legal pages** — all three footer links were `href="#"` placeholders.
`/privacy-policy/` and `/terms-of-service/` are complete and in the sitemap. The privacy
policy documents our actual data flows and processors rather than boilerplate.
`/cancellation-policy/` is published but not final — see the request below.

**5. Homepage reviews** — was rendering 74 review cards into the initial HTML; now renders 9
with a "Load More" button. Homepage HTML dropped from 148.7 KB to 116.2 KB, about 22%. While
in there I also refreshed the review set and corrected the count, which was showing 88
against 95 on Google.

**6. Gallery without JavaScript** — image data is now in the initial server HTML, so images
and alt text are present with JS disabled. Verified: 12 media elements and zero "Loading…"
placeholders, against 1 and 1 before.

**7. Structured data** — your markup is applied to all six cruise URLs and validates. One
deliberate exception: `/pontoon-boat-rental-fort-lauderdale/` carried an FAQPage node with
six Q&A pairs your graph doesn't include. Rather than drop that page's FAQ rich-result
eligibility I appended it to your graph — happy to remove it if you'd prefer. Two useful
side effects of your version: it defines the `#website` entity the old `WebPage` nodes
referenced but never declared, and it clears out a legacy `PriceSpecification` of 800.

**Two things not on your list:**

The site was still serving a **July promotional banner** — "250 Years of Freedom — July
Special, $200/hour for up to 15 guests." Stale by a month, and that "15 guests" was a third
conflicting number alongside the 12 and 18. Removed.

Also, the **phone number varies between page loads** because of dynamic number insertion for
call tracking. It's intentional rather than a NAP inconsistency — our schema and source
consistently carry 954-764-4344, and that's what crawlers see, so no need to flag it.

One observation: your screenshot shows the banner at "$250/hour" where it has since read
"$200/hour," so the capture predates a change on our side. Might be worth a re-crawl before
the next round.

**A question for you:**

There's no `aggregateRating` anywhere on the site — the 5.0 from 95 Google reviews is
displayed as text only. I held off adding it since you own the schema spec, and because
self-serving reviews aren't eligible for review rich results on `LocalBusiness`, so I
suspect it wouldn't produce stars. Worth adding as accurate markup anyway, or leave it?
Your call.

**What we need from you:**

The **cancellation terms** — notice period, deposit rules, and refund policy. The page is
live and covers what's documented (unsafe weather means a reschedule, captain's discretion,
how to request a change), but I deliberately left out specific windows and refund
percentages rather than publish terms the business may not honor. Once Taco confirms, it's a
five-minute update.

Thanks again — the pricing inconsistency and the gallery issue were both worth catching.

Best,
Danny
