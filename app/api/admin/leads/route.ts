import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getLeads, getLeadStats, deleteLead, unsubscribeLead, exportLeadsToCSV } from '@/lib/leads'

// Ověření admin session
async function checkAuth() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function GET(request: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')

  try {
    if (action === 'stats') {
      const stats = await getLeadStats()
      return NextResponse.json(stats)
    }

    if (action === 'export') {
      const csv = await exportLeadsToCSV()
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }

    // Default: vrátit seznam leadů
    const leads = await getLeads()

    // Řazení - nejnovější první
    const sortedLeads = leads.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ leads: sortedLeads })
  } catch (error) {
    console.error('Admin leads error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const success = await deleteLead(id)

    if (!success) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete lead error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, action } = await request.json()

    if (action === 'unsubscribe' && email) {
      const success = await unsubscribeLead(email)
      if (!success) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Patch lead error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
