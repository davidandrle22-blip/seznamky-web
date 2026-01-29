import { NextResponse } from 'next/server'
import { getClickStats, getRecentClicks, getClicks } from '@/lib/affiliate'
import { getAllProdukty } from '@/lib/data'

export interface ProductTrackingStatus {
  slug: string
  name: string
  affiliateUrl: string | null
  clickCount: number
  trackingStatus: 'OK' | 'MISSING' | 'INACTIVE'
  isActive: boolean
}

export async function GET() {
  try {
    const [stats, recentClicks, allClicks, produkty] = await Promise.all([
      getClickStats(),
      getRecentClicks(100),
      getClicks(),
      getAllProdukty(),
    ])

    // Spočítat kliknutí pro každý produkt
    const clickCountBySlug = new Map<string, number>()
    for (const click of allClicks) {
      const current = clickCountBySlug.get(click.produktSlug) || 0
      clickCountBySlug.set(click.produktSlug, current + 1)
    }

    // Vytvořit přehled produktů s tracking statusem
    const productTracking: ProductTrackingStatus[] = produkty.map((p) => {
      const hasAffiliateUrl = Boolean(p.affiliateUrl && p.affiliateUrl.trim() !== '')

      let trackingStatus: 'OK' | 'MISSING' | 'INACTIVE'
      if (!p.isActive) {
        trackingStatus = 'INACTIVE'
      } else if (hasAffiliateUrl) {
        trackingStatus = 'OK'
      } else {
        trackingStatus = 'MISSING'
      }

      return {
        slug: p.slug,
        name: p.name,
        affiliateUrl: p.affiliateUrl || null,
        clickCount: clickCountBySlug.get(p.slug) || 0,
        trackingStatus,
        isActive: p.isActive,
      }
    })

    // Seřadit podle kliknutí (DESC), pak podle názvu
    productTracking.sort((a, b) => {
      if (b.clickCount !== a.clickCount) {
        return b.clickCount - a.clickCount
      }
      return a.name.localeCompare(b.name)
    })

    return NextResponse.json({
      stats,
      recentClicks,
      productTracking,
    })
  } catch (error) {
    console.error('Failed to get affiliate stats:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se načíst statistiky' },
      { status: 500 }
    )
  }
}
