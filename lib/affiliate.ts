import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { getAffiliateLink, hasCustomAffiliateLink, detectDevice } from './affiliate-config'

const dataDir = path.join(process.cwd(), 'data')
const clicksFile = path.join(dataDir, 'affiliate-clicks.json')

export interface AffiliateClick {
  id: string
  produktSlug: string
  produktName: string
  source: 'homepage' | 'category' | 'detail' | 'table' | 'sidebar'
  placement?: string
  timestamp: string
  userAgent?: string
  referer?: string
}

export interface ClicksData {
  clicks: AffiliateClick[]
}

export interface ClickStats {
  totalClicks: number
  todayClicks: number
  weekClicks: number
  monthClicks: number
  topProducts: { slug: string; name: string; count: number }[]
  topSources: { source: string; count: number }[]
  dailyClicks: { date: string; count: number }[]
}

/**
 * Sestaví affiliate URL s tracking parametry
 *
 * Pro produkty s vlastní affiliate konfigurací (např. EliteDate) používá
 * centrální affiliate-config.ts. Pro ostatní přidává UTM parametry.
 *
 * @param baseUrl - Základní URL produktu
 * @param params - Parametry pro tracking
 * @param produktSlug - Slug produktu (volitelné, pro detekci vlastního affiliate)
 * @param userAgent - User-Agent pro detekci zařízení (mobilní/desktop)
 */
export function buildAffiliateUrl(
  baseUrl: string,
  params: {
    source: string
    placement?: string
  },
  produktSlug?: string,
  userAgent?: string
): string {
  // Pokud má produkt vlastní affiliate konfiguraci, použijeme ji
  if (produktSlug && hasCustomAffiliateLink(produktSlug)) {
    const device = detectDevice(userAgent)
    return getAffiliateLink(produktSlug, baseUrl, {
      source: params.source,
      placement: params.placement,
      device,
    })
  }

  // Pro ostatní produkty přidáváme UTM parametry
  const url = new URL(baseUrl)

  url.searchParams.set('utm_source', 'seznamky-info')
  url.searchParams.set('utm_medium', 'affiliate')
  url.searchParams.set('utm_campaign', params.source)

  if (params.placement) {
    url.searchParams.set('utm_content', params.placement)
  }

  return url.toString()
}

/**
 * Načte všechna kliknutí ze souboru
 */
export async function getClicks(): Promise<AffiliateClick[]> {
  try {
    const data = await fs.readFile(clicksFile, 'utf-8')
    const parsed: ClicksData = JSON.parse(data)
    return parsed.clicks || []
  } catch {
    // Soubor neexistuje nebo je prázdný
    return []
  }
}

/**
 * Uloží kliknutí do souboru
 */
export async function saveClick(clickData: {
  produktSlug: string
  produktName: string
  source: AffiliateClick['source']
  placement?: string
  userAgent?: string
  referer?: string
}): Promise<AffiliateClick> {
  const clicks = await getClicks()

  const newClick: AffiliateClick = {
    id: randomUUID(),
    produktSlug: clickData.produktSlug,
    produktName: clickData.produktName,
    source: clickData.source,
    placement: clickData.placement,
    timestamp: new Date().toISOString(),
    userAgent: clickData.userAgent,
    referer: clickData.referer,
  }

  clicks.push(newClick)

  // Uložit zpět do souboru
  const data: ClicksData = { clicks }
  await fs.writeFile(clicksFile, JSON.stringify(data, null, 2), 'utf-8')

  return newClick
}

/**
 * Vrátí agregované statistiky kliknutí
 */
export async function getClickStats(): Promise<ClickStats> {
  const clicks = await getClicks()

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Počet kliknutí podle období
  const todayClicks = clicks.filter(c => new Date(c.timestamp) >= todayStart).length
  const weekClicks = clicks.filter(c => new Date(c.timestamp) >= weekStart).length
  const monthClicks = clicks.filter(c => new Date(c.timestamp) >= monthStart).length

  // Top produkty
  const productCounts = new Map<string, { name: string; count: number }>()
  for (const click of clicks) {
    const existing = productCounts.get(click.produktSlug)
    if (existing) {
      existing.count++
    } else {
      productCounts.set(click.produktSlug, { name: click.produktName, count: 1 })
    }
  }

  const topProducts = Array.from(productCounts.entries())
    .map(([slug, data]) => ({ slug, name: data.name, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Top zdroje
  const sourceCounts = new Map<string, number>()
  for (const click of clicks) {
    sourceCounts.set(click.source, (sourceCounts.get(click.source) || 0) + 1)
  }

  const topSources = Array.from(sourceCounts.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)

  // Denní kliknutí za posledních 30 dní
  const dailyClicksMap = new Map<string, number>()

  // Inicializovat posledních 30 dní s 0
  for (let i = 29; i >= 0; i--) {
    const date = new Date(todayStart.getTime() - i * 24 * 60 * 60 * 1000)
    const dateStr = date.toISOString().split('T')[0]
    dailyClicksMap.set(dateStr, 0)
  }

  // Spočítat kliknutí podle dne
  for (const click of clicks) {
    const dateStr = click.timestamp.split('T')[0]
    if (dailyClicksMap.has(dateStr)) {
      dailyClicksMap.set(dateStr, (dailyClicksMap.get(dateStr) || 0) + 1)
    }
  }

  const dailyClicks = Array.from(dailyClicksMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return {
    totalClicks: clicks.length,
    todayClicks,
    weekClicks,
    monthClicks,
    topProducts,
    topSources,
    dailyClicks,
  }
}

/**
 * Vrátí poslední kliknutí
 */
export async function getRecentClicks(limit: number = 50): Promise<AffiliateClick[]> {
  const clicks = await getClicks()
  return clicks
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}
