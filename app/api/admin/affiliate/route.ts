import { NextResponse } from 'next/server'
import { getClickStats, getRecentClicks } from '@/lib/affiliate'

export async function GET() {
  try {
    const [stats, recentClicks] = await Promise.all([
      getClickStats(),
      getRecentClicks(100),
    ])

    return NextResponse.json({
      stats,
      recentClicks,
    })
  } catch (error) {
    console.error('Failed to get affiliate stats:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se načíst statistiky' },
      { status: 500 }
    )
  }
}
