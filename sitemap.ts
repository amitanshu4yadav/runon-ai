import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/login', '/privacy', '/terms'].map((p) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.5,
  }));
}
