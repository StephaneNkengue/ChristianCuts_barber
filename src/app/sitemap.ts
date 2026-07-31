import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/business";
import { SERVICES } from "@/lib/services";

/**
 * Sitemap généré depuis les routes réelles : les pages de prestations sortent
 * directement du catalogue, donc ajouter un service dans lib/services.ts suffit
 * à le référencer ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/service", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tarifs", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/modalite", priority: 0.5, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/service/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: service.featured ? 0.8 : 0.7,
    })),
  ];
}
