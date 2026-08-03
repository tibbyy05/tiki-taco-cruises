// Supabase Edge Function: expand-blog-post
// Takes a working draft (title + description), returns a polished, SEO-optimized
// blog post via Claude Sonnet 4.6. Owner-friendly: handles rough notes through full drafts.
// Secrets: ANTHROPIC_API_KEY (set with `supabase secrets set ANTHROPIC_API_KEY=...`)

import Anthropic from "npm:@anthropic-ai/sdk@0.65.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You polish working drafts into publication-ready blog posts for Tiki Taco Cruises, a tiki-style pontoon rental company in Fort Lauderdale, Florida.

About the business:
- Two main offerings: 4-Hour Private Cruise (custom routes, BYOB, up to 12 guests) and 2-Hour Open Charter (per-seat boarding for individuals/small groups)
- Popular cruise destinations: New River, North-Bound Scenic, Las Olas, Intracoastal Waterway, Fort Lauderdale Sunset
- Target audience: tourists visiting Fort Lauderdale, locals planning birthdays/bachelorettes/corporate events, snowbirds, and travel planners
- Brand voice: warm, fun, beachy, but professional. Confidence without hype. No emoji. No "Hey there!" or "Are you looking for...?" openers.

Your task: the owner sends you a working draft — sometimes just a sentence or two of ideas, sometimes a full rough post. Your job is to return a polished, SEO-optimized blog post regardless of input size.

Always do all of the following:
1. **Rewrite the title** to be SEO-strong (50-65 chars, includes a primary keyword naturally, no clickbait). Keep the owner's intent but improve clarity and search appeal.
2. **Write an excerpt** (150-160 chars) that works as both a list-card summary and a meta description. State the value, not a teaser.
3. **Write the full body** in clean markdown — 600-1100 words, expanding rough notes into a complete post or polishing a longer draft to publication quality.

Body writing rules:
- Lead with a concrete, vivid hook — a scene, moment, or specific detail. Not a question.
- Use H2 (##) for main sections and H3 (###) for sub-sections. Never use H1 — the title is rendered separately.
- 3–5 H2 sections. Each scannable: short paragraphs (2–4 sentences), bullet lists where they genuinely help.
- Include one natural call-to-action toward the end (e.g. "Reserve a 4-hour private cruise" or "Browse our open charter departures").
- Write in second person ("you") for the experience, third person for area/attractions.
- No filler like "In conclusion," or "At the end of the day,". End on a concrete image or invitation.
- Use specific Fort Lauderdale details (street names, neighborhoods, landmarks) when relevant — never generic.
- Preserve the owner's specific facts, names, or details if they provided them. Don't invent claims they didn't make.`;

const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "SEO-optimized title, 50-65 characters. No emoji, no quotation marks.",
    },
    excerpt: {
      type: "string",
      description:
        "Meta description / list-card summary, 150-160 characters, complete sentence.",
    },
    content: {
      type: "string",
      description:
        "Full polished blog body in markdown. 600-1100 words. H2/H3 only (no H1). Includes a CTA near the end. Any link to our own site MUST use the exact canonical form https://tikitacocruises.com/ — always https, never http, and always with the trailing slash. Do not invent URLs for pages you are not certain exist; link to the homepage instead.",
    },
  },
  required: ["title", "excerpt", "content"],
  additionalProperties: false,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return json(
      { error: "AI service not configured (missing ANTHROPIC_API_KEY)." },
      500,
    );
  }

  let body: { title?: unknown; description?: unknown; brief?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  // Accept either the new shape {title, description} or the legacy {brief}.
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string"
      ? body.description.trim()
      : typeof body.brief === "string"
        ? body.brief.trim()
        : "";

  if (description.length < 10 && title.length < 10) {
    return json(
      {
        error:
          "Add a title and a sentence or two of description before improving.",
      },
      400,
    );
  }

  const userMessage = title
    ? `Working draft:\n\nTitle: ${title}\n\nDescription:\n${description || "(none yet — generate full body from the title)"}`
    : `Working draft (no title yet):\n\n${description}`;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      output_config: {
        effort: "low",
        format: { type: "json_schema", schema },
      },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      console.error("No text block in response", response);
      return json({ error: "AI returned no content." }, 502);
    }

    let parsed: { title: string; excerpt: string; content: string };
    try {
      parsed = JSON.parse(textBlock.text);
    } catch {
      console.error("JSON parse failed:", textBlock.text);
      return json({ error: "AI returned malformed output." }, 502);
    }

    return json({
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      usage: response.usage,
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
      return json(
        { error: `AI request failed: ${err.message}` },
        err.status ?? 502,
      );
    }
    console.error("Unexpected error:", err);
    return json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      500,
    );
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
