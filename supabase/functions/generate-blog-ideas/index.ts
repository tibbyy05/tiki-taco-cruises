// Supabase Edge Function: generate-blog-ideas
// Pitches 3 distinct, marketable blog post ideas for Tiki Taco Cruises.
// Each idea is a starting point — owner picks one, then "Improve with AI"
// expands it into a full polished post.
// Secrets: ANTHROPIC_API_KEY

import Anthropic from "npm:@anthropic-ai/sdk@0.65.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You pitch blog post ideas for Tiki Taco Cruises, a tiki-style pontoon rental company in Fort Lauderdale, Florida.

About the business:
- 4-Hour Private Cruise (custom routes, BYOB, up to 12 guests) and 2-Hour Open Charter (per-seat for individuals/small groups)
- Routes: New River, North-Bound Scenic (sandbar), Las Olas, Intracoastal Waterway, Sunset Cruise
- Audiences: tourists, locals planning birthdays/bachelorettes/corporate events/date nights, snowbirds, travel planners
- Departs from The Hilton Marina

Pitch exactly 3 blog post ideas. Make them DISTINCT — different audiences, occasions, seasons, or angles. The goal is marketable content that drives bookings and ranks for relevant searches.

For each idea:
- title: SEO-strong working title (50-65 chars). Includes a primary keyword naturally. Specific, not generic — name the audience, occasion, or destination.
- description: 2-3 sentences. Set up what the post will cover: angle, key points, who it's for. Give enough that a writer (or AI) could expand it into a full polished post.

Mix the three across these dimensions when possible: audience type (couples vs. groups vs. business), occasion (date night, birthday, corporate), specific destination, seasonal hook (winter snowbird, summer sunset, holiday). Avoid two ideas that both target the same audience.

Examples of strong vs weak titles:
- WEAK: "Pontoon Boat Rentals in Fort Lauderdale" — too generic, no hook
- STRONG: "Planning a Bachelorette in Fort Lauderdale? Charter the Sandbar Cruise"
- STRONG: "5 Reasons Snowbirds Love a Winter Sunset Cruise on the Intracoastal"
- STRONG: "What to Pack for a 4-Hour Private Pontoon Charter in Fort Lauderdale"`;

const schema = {
  type: "object",
  properties: {
    ideas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "SEO-strong working title, 50-65 characters.",
          },
          description: {
            type: "string",
            description:
              "2-3 sentences pitching the post angle, key points, and audience.",
          },
        },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
  },
  required: ["ideas"],
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

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
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
      messages: [
        {
          role: "user",
          content:
            "Pitch 3 distinct, marketable blog post ideas right now. Cover different audiences and angles.",
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      console.error("No text block in response", response);
      return json({ error: "AI returned no content." }, 502);
    }

    let parsed: { ideas: Array<{ title: string; description: string }> };
    try {
      parsed = JSON.parse(textBlock.text);
    } catch {
      console.error("JSON parse failed:", textBlock.text);
      return json({ error: "AI returned malformed output." }, 502);
    }

    if (!Array.isArray(parsed.ideas) || parsed.ideas.length === 0) {
      return json({ error: "AI returned no ideas." }, 502);
    }

    return json({ ideas: parsed.ideas, usage: response.usage });
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
