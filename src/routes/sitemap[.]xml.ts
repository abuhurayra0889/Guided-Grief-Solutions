import { createFileRoute } from "@tanstack/react-router";
import { seedKbArticles } from "@/lib/ggs/mock";

const BASE_URL = "https://embrace-compassion-appn.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/faqs", changefreq: "monthly", priority: "0.7" },
          { path: "/support-groups", changefreq: "monthly", priority: "0.7" },
          { path: "/resource-library", changefreq: "monthly", priority: "0.7" },
          { path: "/knowledge-base", changefreq: "weekly", priority: "0.8" },
          { path: "/articles/helping-children-deal-with-grief", changefreq: "monthly", priority: "0.7" },
          { path: "/at-a-glance", changefreq: "monthly", priority: "0.7" },
          { path: "/navigator", changefreq: "monthly", priority: "0.7" },
          { path: "/daily-affirmation", changefreq: "weekly", priority: "0.6" },
          { path: "/onboarding", changefreq: "monthly", priority: "0.6" },
        ];

        for (const article of seedKbArticles) {
          if (article.published) {
            entries.push({
              path: `/knowledge-base/${article.id}`,
              changefreq: "monthly",
              priority: "0.6",
              lastmod: new Date(article.updated_at).toISOString().slice(0, 10),
            });
          }
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : `    <lastmod>${today}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
