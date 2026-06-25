import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Note: /investor-relations is intentionally omitted — it's de-listed (noindex)
  // because the live nav/footer point investors to the external portal instead.
  const staticRoutes = ["", "/about", "/portfolio", "/news"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${SITE_URL}/news/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
