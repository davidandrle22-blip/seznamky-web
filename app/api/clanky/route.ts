import { NextRequest, NextResponse } from 'next/server'
import { getAllClanky, saveClanky } from '@/lib/data'
import { Clanek } from '@/lib/types'

// GET all articles
export async function GET() {
  try {
    const clanky = await getAllClanky()
    return NextResponse.json(clanky)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const clanky = await getAllClanky()

    const newClanek: Clanek = {
      id: String(Date.now()),
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image || '/images/blog/default.jpg',
      category: body.category || 'obecne',
      author: body.author || 'Admin',
      createdAt: body.createdAt || new Date().toISOString().split('T')[0],
      isPublished: body.isPublished ?? false
    }

    clanky.push(newClanek)
    await saveClanky(clanky)

    return NextResponse.json(newClanek, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

// PUT update article
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const clanky = await getAllClanky()

    const index = clanky.findIndex(c => c.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    clanky[index] = { ...clanky[index], ...body }
    await saveClanky(clanky)

    return NextResponse.json(clanky[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE article
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const clanky = await getAllClanky()
    const filtered = clanky.filter(c => c.id !== id)

    if (filtered.length === clanky.length) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    await saveClanky(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
