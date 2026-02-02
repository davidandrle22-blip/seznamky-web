import { NextRequest, NextResponse } from 'next/server'
import { getProduktBySlug } from '@/lib/data'
import { saveClick, buildAffiliateUrl, AffiliateClick } from '@/lib/affiliate'
import { list } from '@vercel/blob'

export const runtime = 'nodejs'

const BLOB_FILENAME = 'affiliate-overrides.json'

/**
 * Načte affiliate URL override z Vercel Blob (pokud existuje)
 */
async function getAffiliateOverride(slug: string): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_FILENAME })
    if (blobs.length === 0) {
      return null
    }

    const response = await fetch(blobs[0].url, { cache: 'no-store' })
    if (response.ok) {
      const overrides = await response.json()
      return overrides[slug] || null
    }
    return null
  } catch (error) {
    console.error('Could not load affiliate override:', error)
    return null
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  const searchParams = request.nextUrl.searchParams

  const source = (searchParams.get('source') || 'homepage') as AffiliateClick['source']
  const placement = searchParams.get('placement') || undefined

  // Najít produkt podle slug
  const produkt = await getProduktBySlug(slug)

  if (!produkt) {
    return NextResponse.json({ error: 'Produkt nenalezen' }, { status: 404 })
  }

  // Zaznamenat kliknutí
  try {
    await saveClick({
      produktSlug: produkt.slug,
      produktName: produkt.name,
      source,
      placement,
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
    })
  } catch (error) {
    // Log error but don't block redirect
    console.error('Failed to save click:', error)
  }

  // Zkontrolovat, zda existuje override URL z admin dashboardu
  const overrideUrl = await getAffiliateOverride(slug)
  const affiliateUrl = overrideUrl || produkt.affiliateUrl

  // Sestavit cílovou URL s tracking parametry
  const userAgent = request.headers.get('user-agent') || undefined
  const targetUrl = buildAffiliateUrl(
    affiliateUrl,
    { source, placement },
    produkt.slug,
    userAgent
  )

  // Přesměrovat na cílovou URL
  return NextResponse.redirect(targetUrl, { status: 302 })
}
