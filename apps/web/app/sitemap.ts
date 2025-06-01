import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/config";

const getSiteMapData = async () => {
  return {
    pages: [
      {
        slug: "/",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        slug: "/example",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ],
    articles: [
      {
        slug: "/blog",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ],
  };
};

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, articles } = await getSiteMapData();
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((page) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
