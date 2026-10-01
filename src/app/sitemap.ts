import type { MetadataRoute } from "next";

import { officialEvents } from "@/data/events";
import { siteUrl } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-14T15:00:00-03:00");
  const socialImage = `${siteUrl}/opengraph-image`;

  const institutionalPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [socialImage],
    },
    {
      url: `${siteUrl}/sobre`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [socialImage],
    },
    {
      url: `${siteUrl}/agenda`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [socialImage],
    },
    {
      url: `${siteUrl}/edital`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/credenciais`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/incursao-cmebe`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${siteUrl}/images/incursao-cmebe/capa-incursao-cmebe.jpg`],
    },
    {
      url: `${siteUrl}/empreendedores`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [socialImage],
    },
    {
      url: `${siteUrl}/beneficios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [socialImage],
    },
    {
      url: `${siteUrl}/escola-de-profetas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contato`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const eventPages: MetadataRoute.Sitemap = officialEvents.map((event) => ({
    url: `${siteUrl}/agenda/${event.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: event.featured ? 0.8 : 0.7,
    images: [event.image ? `${siteUrl}${event.image}` : socialImage],
  }));

  return [...institutionalPages, ...eventPages];
}
