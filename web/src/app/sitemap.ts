import type { MetadataRoute } from 'next'

const BASE = 'https://aibrium.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
