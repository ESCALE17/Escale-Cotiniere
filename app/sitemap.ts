import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://escalealacotiniere.fr";
  const now = new Date();

  const villas = ["logis", "ecole", "mouettes", "parour"];

  const villaPages = villas.map((slug) => ({
    url: `${base}/villas/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...villaPages,
    {
      url: `${base}/conditions-generales`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
