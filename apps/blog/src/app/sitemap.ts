import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://demopeu.vercel.app/blog';
  const currentDate = new Date();

  const categories = ['reference', 'problem-solving', 'talk', 'dev', 'project'];

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/${category}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
