// Supabase Edge Function: expand-blog-post
// Takes a brief, returns a full markdown blog post via Claude Sonnet 4.6.
// Secrets: ANTHROPIC_API_KEY (set with `supabase secrets set ANTHROPIC_API_KEY=...`)

import Anthropic from "npm:@anthropic-ai/sdk@0.65.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You write blog posts for Tiki Taco Cruises, a tiki-style pontoon rental company in Fort Lauderdale, Florida.

About the business:
- Two main offerings: 4-Hour Private Cruise (custom routes, BYOB, up to 12 guests) and 2-Hour Open Charter (per-seat boarding for individuals/small groups)
- Popular cruise destinations: New River, North-Bound Scenic, Las Olas, Intracoastal Waterway, Fort Lauderdale Sunset
- Target audience: tourists visiting Fort Lauderdale, locals planning birthdays/bachelorettes/corporate events, snowbirds, and travel planners
- Brand voice: warm, fun, beachy, but professional. Confidence without hype. No emoji. No "Hey there!" or "Are you looking for...?" openers.

Writing rules:
- Lead with a concrete, vivid hook — a scene, a moment, a specific detail. Not a question.
- Use H2 (##) for main sections and H3 (###) for sub-sections. Never use H1 — the title is rendered separately.
- 600–1100 words for the content body.
- Include 3–5 H2 sections. Each section should be scannable: short paragraphs (2–4 sentences), occasional bullet lists where they help.
- Include one natural call-to-action toward the end pointing readers to book a cruise (e.g. "Reserve a 4-hour private cruise" or "Browse our open charter departures").
- Write in second person ("you") when describing the experience, third person when describing the area or attractions.
- No filler like "In conclusion," or "At the end of the day,". End on a concrete image or invitation.
- Use specific Fort Lauderdale details (street names, neighborhoods, landmarks) when relevant — don't be generic.

Output requirements:
- title: 50–65 characters, includes a primary keyword if natural, no clickbait, no colons-with-subtitle format unless it reads cleanly
- excerpt: 150–160 characters, meta-description quality — a complete sentence that would make someone click. Not a teaser ("Find out why..."). State the value.
- content: the markdown body only. Do not repeat the title. Start with the opening hook paragraph.`;

const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "The post title, 50-65 characters. No emoji, no quotation marks.",
    },
    excerpt: {
      type: "string",
      description:
        "Meta description / list-card summary, 150-160 characters, a complete sentence.",
    },
    content: {
      type: "string",
      description:
        "The full blog post body in markdown. 600-1100 words. H2/H3 only (no H1). Includes a CTA near the end.",
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

  let brief: string;
  try {
    const body = await req.json();
    brief = body?.brief;
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (typeof brief !== "string" || brief.trim().length < 10) {
    return json(
      { error: "Brief must be a string of at least 10 characters." },
      400,
    );
  }

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
      messages: [{ role: "user", content: brief.trim() }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      console.error("No text block in response", response);
      return json({ error: "AI returned no content." }, 502);
    }

    let parsed: { title: string; excerpt: string; content: string };
    try {
      parsed = JSON.parse(textBlock.text);
    } catch (err) {
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
