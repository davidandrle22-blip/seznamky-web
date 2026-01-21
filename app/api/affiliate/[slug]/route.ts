import { NextRequest, NextResponse } from 'next/server'
import { getProduktBySlug } from '@/lib/data'
import { saveClick, buildAffiliateUrl, AffiliateClick } from '@/lib/affiliate'

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

  // Sestavit cílovou URL s tracking parametry
  // Pro produkty s vlastním affiliate (např. EliteDate) se použije centrální config
  // Detekce zařízení pro správné offer_id (mobilní/desktop)
  const userAgent = request.headers.get('user-agent') || undefined
  const targetUrl = buildAffiliateUrl(
    produkt.affiliateUrl,
    { source, placement },
    produkt.slug,
    userAgent
  )

  // Přesměrovat na cílovou URL
  return NextResponse.redirect(targetUrl, { status: 302 })
}
