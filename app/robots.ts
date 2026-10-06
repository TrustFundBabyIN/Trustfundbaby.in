import type { MetadataRoute } from "next";

// Required under `output: "export"` — without this Next 16 fails to collect the route.
export const dynamic = "force-static";

const BASE = "https://trustfundbaby.in";

/**
 * robots.txt — deliberately permissive for AI crawlers.
 *
 * The whole point of this file is that when someone asks ChatGPT, Perplexity,
 * Gemini or Google AI Overviews a question about investing for a child in India,
 * those engines can read our pages and cite us. Blocking them would be
 * self-defeating, so every major AI crawler is explicitly allowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/signin", "/signup"],
      },
      // Named explicitly so the intent is unambiguous, and so a future
      // "block all bots" change cannot silently cut off AI citation.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
