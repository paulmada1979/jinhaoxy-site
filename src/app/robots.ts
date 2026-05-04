import type { MetadataRoute } from "next";

const SITE = "https://jinhaoxy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything except API routes
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Explicit AI crawler allowlist (matches what's on the WordPress site)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
