import { createFileRoute } from "@tanstack/react-router";

import { sections } from "@/config/site";

const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const paths = ["/", ...sections.map((s) => `/#${s.id}`)];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = new Date().toISOString().slice(0, 10);

        const urls = paths
          .map((p) =>
            [
              "  <url>",
              `    <loc>${origin}${p}</loc>`,
              `    <lastmod>${today}</lastmod>`,
              "    <changefreq>monthly</changefreq>",
              `    <priority>${p === "/" ? "1.0" : "0.7"}</priority>`,
              "  </url>",
            ].join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${NS}">\n${urls}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
