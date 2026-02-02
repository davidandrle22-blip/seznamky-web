import { NextResponse } from 'next/server'
import { getClickStats, getRecentClicks, getClicks } from '@/lib/affiliate'
import { getAllProdukty } from '@/lib/data'
import { put, list } from '@vercel/blob'

export const runtime = 'nodejs'

export interface ProductTrackingStatus {
  slug: string
  name: string
  affiliateUrl: string | null
  clickCount: number
  trackingStatus: 'ACTIVE' | 'MISSING_PARAMS' | 'MISSING_URL' | 'INACTIVE'
  trackingDetails: string
  isActive: boolean
}

interface AffiliateOverrides {
  [slug: string]: string
}

const BLOB_FILENAME = 'affiliate-overrides.json'

/**
 * Načte affiliate URL overrides z Vercel Blob
 */
async function getAffiliateOverrides(): Promise<AffiliateOverrides> {
  try {
    const { blobs } = await list({ prefix: BLOB_FILENAME })
    if (blobs.length === 0) {
      return {}
    }

    const response = await fetch(blobs[0].url, { cache: 'no-store' })
    if (response.ok) {
      return await response.json()
    }
    return {}
  } catch (error) {
    console.error('Could not load affiliate overrides:', error)
    return {}
  }
}

/**
 * Uloží affiliate URL override do Vercel Blob
 */
async function saveAffiliateOverride(slug: string, url: string): Promise<void> {
  const overrides = await getAffiliateOverrides()

  if (url && url.trim()) {
    overrides[slug] = url.trim()
  } else {
    delete overrides[slug]
  }

  await put(BLOB_FILENAME, JSON.stringify(overrides, null, 2), {
    access: 'public',
    addRandomSuffix: false,
  })
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

    const searchParams = urlObj.searchParams
    const foundParams: string[] = []

    for (const param of trackingParams) {
      if (searchParams.has(param)) {
        foundParams.push(param)
      }
    }

    const pathIndicators = ['/aff_c', '/aff/', '/click/', '/track/', '/go/', '/redirect/']
    const hasPathTracking = pathIndicators.some(indicator =>
      urlObj.pathname.toLowerCase().includes(indicator.toLowerCase())
    )

    if (foundParams.length > 0) {
      return {
        hasParams: true,
        details: `Parametry: ${foundParams.join(', ')}`
      }
    }

    if (hasPathTracking) {
      return {
        hasParams: true,
        details: 'Affiliate path detected'
      }
    }

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
    const [stats, recentClicks, allClicks, produkty, overrides] = await Promise.all([
      getClickStats(),
      getRecentClicks(100),
      getClicks(),
      getAllProdukty(),
      getAffiliateOverrides(),
    ])

    const clickCountBySlug = new Map<string, number>()
    for (const click of allClicks) {
      const current = clickCountBySlug.get(click.produktSlug) || 0
      clickCountBySlug.set(click.produktSlug, current + 1)
    }

    const productTracking: ProductTrackingStatus[] = produkty.map((p) => {
      // Použít override pokud existuje, jinak původní URL
      const affiliateUrl = overrides[p.slug] || p.affiliateUrl || ''
      const hasUrl = Boolean(affiliateUrl && affiliateUrl.trim() !== '')
      const trackingCheck = hasUrl ? hasTrackingParams(affiliateUrl) : { hasParams: false, details: 'URL není nastavena' }

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
        affiliateUrl: affiliateUrl || null,
        clickCount: clickCountBySlug.get(p.slug) || 0,
        trackingStatus,
        trackingDetails: trackingCheck.details,
        isActive: p.isActive,
      }
    })

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

export async function POST(request: Request) {
  try {
    const { slug, affiliateUrl } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { error: 'Chybí slug produktu' },
        { status: 400 }
      )
    }

    // Uložit do Blob storage
    await saveAffiliateOverride(slug, affiliateUrl)

    const hasUrl = Boolean(affiliateUrl && affiliateUrl.trim() !== '')
    const trackingCheck = hasUrl ? hasTrackingParams(affiliateUrl) : { hasParams: false, details: 'URL není nastavena' }

    let trackingStatus: ProductTrackingStatus['trackingStatus']
    if (!hasUrl) {
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
