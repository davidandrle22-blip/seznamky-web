import { NextRequest, NextResponse } from 'next/server'
import { getProduktBySlug } from '@/lib/data'
import { saveClick, AffiliateClick } from '@/lib/affiliate'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, source, placement } = body

    if (!slug || !source) {
      return NextResponse.json(
        { error: 'Chybí povinné parametry: slug, source' },
        { status: 400 }
      )
    }

    // Validace source
    const validSources: AffiliateClick['source'][] = ['homepage', 'category', 'detail', 'table', 'sidebar']
    if (!validSources.includes(source)) {
      return NextResponse.json(
        { error: 'Neplatná hodnota source' },
        { status: 400 }
      )
    }

    // Najít produkt
    const produkt = await getProduktBySlug(slug)

    if (!produkt) {
      return NextResponse.json({ error: 'Produkt nenalezen' }, { status: 404 })
    }

    // Zaznamenat kliknutí
    const click = await saveClick({
      produktSlug: produkt.slug,
      produktName: produkt.name,
      source: source as AffiliateClick['source'],
      placement,
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
    })

    return NextResponse.json({ success: true, clickId: click.id })
  } catch (error) {
    console.error('Track error:', error)
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    )
  }
}
