import { NextRequest, NextResponse } from 'next/server'
import { getAllProdukty, saveProdukty } from '@/lib/data'
import { Produkt } from '@/lib/types'

// GET all products
export async function GET() {
  try {
    const produkty = await getAllProdukty()
    return NextResponse.json(produkty)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const produkty = await getAllProdukty()

    const newProdukt: Produkt = {
      id: String(Date.now()),
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      name: body.name,
      logo: body.logo || '/images/default.svg',
      description: body.description,
      fullDescription: body.fullDescription || '',
      affiliateUrl: body.affiliateUrl,
      rating: body.rating || 0,
      users: body.users || '0',
      ageRange: body.ageRange || '18+',
      categories: body.categories || [],
      pros: body.pros || [],
      cons: body.cons || [],
      features: body.features || [],
      order: body.order || produkty.length + 1,
      isActive: body.isActive ?? true,
      freeVersion: body.freeVersion ?? true,
      isNew: body.isNew ?? false,
      isFeatured: body.isFeatured ?? false
    }

    produkty.push(newProdukt)
    await saveProdukty(produkty)

    return NextResponse.json(newProdukt, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

// PUT update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const produkty = await getAllProdukty()

    const index = produkty.findIndex(p => p.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    produkty[index] = { ...produkty[index], ...body }
    await saveProdukty(produkty)

    return NextResponse.json(produkty[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const produkty = await getAllProdukty()
    const filtered = produkty.filter(p => p.id !== id)

    if (filtered.length === produkty.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await saveProdukty(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
