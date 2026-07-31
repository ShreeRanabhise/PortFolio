import { MetadataRoute } from 'next';
import { projects } from '@/data/portfolioData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shreeranabhise.vercel.app';

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
