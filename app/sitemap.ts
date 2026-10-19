import type { MetadataRoute } from 'next'
import { getProdukty, getClanky, getKategorie } from '@/lib/data'
import { SITE_URL, LAST_REVIEW_DATE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [produkty, clanky, kategorie] = await Promise.all([getProdukty(), getClanky(), getKategorie()])
  const reviewed = new Date(LAST_REVIEW_DATE)

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: reviewed, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/seznamky`, lastModified: reviewed, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/clanky`, lastModified: reviewed, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/o-nas`, lastModified: reviewed, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/jak-hodnotime`, lastModified: reviewed, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/ebook`, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const categoryPages: MetadataRoute.Sitemap = kategorie.map((k) => ({
    url: `${SITE_URL}/kategorie/${k.slug}`,
    lastModified: reviewed,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const reviewPages: MetadataRoute.Sitemap = produkty.map((p) => ({
    url: `${SITE_URL}/seznamky/${p.slug}`,
    lastModified: new Date(p.lastUpdated || LAST_REVIEW_DATE),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = clanky.map((c) => ({
    url: `${SITE_URL}/clanky/${c.slug}`,
    lastModified: new Date(c.updatedAt || c.createdAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...reviewPages, ...articlePages]
}
