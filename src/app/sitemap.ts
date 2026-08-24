import { MetadataRoute } from 'next';
import { TOOLS, INFORMATIONAL_PAGES, getSiteUrl } from '../lib/toolsConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const toolRoutes: MetadataRoute.Sitemap = Object.keys(TOOLS).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const infoRoutes: MetadataRoute.Sitemap = INFORMATIONAL_PAGES.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolRoutes,
    ...infoRoutes,
  ];
}
