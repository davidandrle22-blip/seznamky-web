import { NextRequest, NextResponse } from 'next/server'
import { getSettings, saveSettings } from '@/lib/data'

// GET settings
export async function GET() {
  try {
    const nastaveni = await getSettings()
    return NextResponse.json(nastaveni)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const currentSettings = await getSettings()

    const updatedSettings = {
      ...currentSettings,
      ...body,
      socialLinks: {
        ...currentSettings.socialLinks,
        ...(body.socialLinks || {})
      },
      seo: {
        ...currentSettings.seo,
        ...(body.seo || {})
      }
    }

    await saveSettings(updatedSettings)

    return NextResponse.json(updatedSettings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
