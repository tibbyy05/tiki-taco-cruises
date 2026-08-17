# Reply to Kosta — 2026-08-04 (short)

**Subject:** Re: Tiki Taco — gallery fixed, plus one item for Taco

---

Hi Kosta,

In your order.

**1. Legal terms** — with Taco. Cancellation page stays as is until we have notice period, deposit rules and refund percentages. Privacy Policy and Terms of Service are done.

**2. NAP and call tracking** — understood, leaving the number as is. For the file: our HTML and schema carry 954-764-4344 everywhere; the variation is a browser-side display swap, so a JavaScript-enabled crawl may show a tracking number in the visible text while the schema still reads 954-764-4344.

One real gap turned up on Yelp — hours, not name or address. Our site says 8:00 AM–8:00 PM, Yelp says 7:00 AM–10:30 PM. **Can you get Taco's actual hours?** Quick fix either way, and it's the only discrepancy I can find; address and phone match exactly.

**3. Google reviews markup** — holding off, nothing added.

**4. Review cadence** — agreed. Yelp is claimed, 5.0 from 6 reviews, with 4 more filtered as "not currently recommended" — normal without steady volume, and it argues for exactly the cadence you're describing.

On our side, `sameAs` had only ever declared Instagram, so Google and Yelp — the two listings holding reviews — weren't declared at all. Now expanded to Google, Yelp, Facebook, Instagram and TikTok on the homepage and FAQ. Live.

Your cruise-page schema has no `sameAs` on the `LocalBusiness` node, so those six URLs declare the business without linking it to any profile. Add the same five, or keep your spec as written?

**5. Gallery** — fixed and live. Good catch; it was deeper than the headings.

The cards rendered a hover-caption `<h3>` duplicating the caption already below each image. But the reason they vanished was separate: a quoted font name in the inlined stylesheet was HTML-escaped during pre-rendering, and browsers don't decode entities inside `<style>`, so the server's CSS didn't match what JavaScript produced. React discarded the whole pre-rendered gallery and re-rendered it in the browser — what you were seeing.

That was the real fix. Removing the headings alone would have hidden the symptom while the page kept throwing away its server content on every visit.

Now: `<h3>` 12 → 0, hydration errors 8 → 0, images still in the initial HTML, source and rendered page matching exactly.

Best,
Danny
