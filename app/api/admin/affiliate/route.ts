import { NextResponse } from 'next/server'
import { getClickStats, getRecentClicks, getClicks } from '@/lib/affiliate'
import { getAllProdukty, saveProdukty } from '@/lib/data'

export interface ProductTrackingStatus {
  slug: string
  name: string
  affiliateUrl: string | null
  clickCount: number
  trackingStatus: 'ACTIVE' | 'MISSING_PARAMS' | 'MISSING_URL' | 'INACTIVE'
  trackingDetails: string
  isActive: boolean
}

/**
 * Zkontroluje, zda URL obsahuje affiliate/tracking parametry
 */
function hasTrackingParams(url: string): { hasParams: boolean; details: string } {
  if (!url || url.trim() === '') {
    return { hasParams: false, details: 'URL není nastavena' }
  }

  try {
    const urlObj = new URL(url)

    // Seznam známých affiliate/tracking parametrů
    const trackingParams = [
      'aff', 'aff_id', 'affiliate', 'affiliate_id',
      'ref', 'referer', 'referrer', 'ref_id',
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'subid', 'sub_id', 'subid1', 'subid2', 'subid3',
      'clickid', 'click_id', 'clid',
      'partner', 'partner_id',
      'source', 'src',
      'offer_id', 'offer',
      'campaign', 'campaign_id',
      'tracking', 'track',
      'pid', 'sid', 'tid',
      'a_aid', 'a_bid', 'chan',
    ]

    // Zkontrolovat query parametry
    const searchParams = urlObj.searchParams
    const foundParams: string[] = []

    for (const param of trackingParams) {
      if (searchParams.has(param)) {
        foundParams.push(param)
      }
    }

    // Zkontrolovat i path - některé affiliate systémy používají path-based tracking
    // např. /aff_c?offer_id=123 nebo /click/123
    const pathIndicators = ['/aff_c', '/aff/', '/click/', '/track/', '/go/', '/redirect/']
    const hasPathTracking = pathIndicators.some(indicator =>
      urlObj.pathname.toLowerCase().includes(indicator.toLowerCase())
    )

    if (foundParams.length > 0) {
      return {
        hasParams: true,
        details: `Nalezené parametry: ${foundParams.join(', ')}`
      }
    }

    if (hasPathTracking) {
      return {
        hasParams: true,
        details: 'Affiliate path detected'
      }
    }

    // Zkontrolovat, zda URL není jen základní doména
    const isBasicDomain = (
      urlObj.pathname === '/' ||
      urlObj.pathname === ''
    ) && searchParams.toString() === ''

    if (isBasicDomain) {
      return {
        hasParams: false,
        details: 'Pouze základní doména bez parametrů'
      }
    }

    // URL má nějakou path, ale žádné známé tracking parametry
    return {
      hasParams: false,
      details: 'Žádné tracking parametry nenalezeny'
    }

  } catch {
    return { hasParams: false, details: 'Neplatná URL' }
  }
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
      const hasUrl = Boolean(p.affiliateUrl && p.affiliateUrl.trim() !== '')
      const trackingCheck = hasUrl ? hasTrackingParams(p.affiliateUrl) : { hasParams: false, details: 'URL není nastavena' }

      let trackingStatus: ProductTrackingStatus['trackingStatus']
      if (!p.isActive) {
        trackingStatus = 'INACTIVE'
      } else if (!hasUrl) {
        trackingStatus = 'MISSING_URL'
      } else if (trackingCheck.hasParams) {
        trackingStatus = 'ACTIVE'
      } else {
        trackingStatus = 'MISSING_PARAMS'
      }

      return {
        slug: p.slug,
        name: p.name,
        affiliateUrl: p.affiliateUrl || null,
        clickCount: clickCountBySlug.get(p.slug) || 0,
        trackingStatus,
        trackingDetails: trackingCheck.details,
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

// POST - Uložit affiliate URL pro produkt
export async function POST(request: Request) {
  try {
    const { slug, affiliateUrl } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { error: 'Chybí slug produktu' },
        { status: 400 }
      )
    }

    const produkty = await getAllProdukty()
    const produktIndex = produkty.findIndex(p => p.slug === slug)

    if (produktIndex === -1) {
      return NextResponse.json(
        { error: 'Produkt nenalezen' },
        { status: 404 }
      )
    }

    // Aktualizovat affiliate URL
    produkty[produktIndex].affiliateUrl = affiliateUrl?.trim() || ''

    // Uložit
    await saveProdukty(produkty)

    // Vrátit aktualizovaný stav
    const hasUrl = Boolean(affiliateUrl && affiliateUrl.trim() !== '')
    const trackingCheck = hasUrl ? hasTrackingParams(affiliateUrl) : { hasParams: false, details: 'URL není nastavena' }

    let trackingStatus: ProductTrackingStatus['trackingStatus']
    if (!produkty[produktIndex].isActive) {
      trackingStatus = 'INACTIVE'
    } else if (!hasUrl) {
      trackingStatus = 'MISSING_URL'
    } else if (trackingCheck.hasParams) {
      trackingStatus = 'ACTIVE'
    } else {
      trackingStatus = 'MISSING_PARAMS'
    }

    return NextResponse.json({
      success: true,
      trackingStatus,
      trackingDetails: trackingCheck.details,
    })
  } catch (error) {
    console.error('Failed to save affiliate URL:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se uložit' },
      { status: 500 }
    )
  }
}
