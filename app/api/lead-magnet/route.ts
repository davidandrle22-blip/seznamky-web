import { NextRequest, NextResponse } from 'next/server'
import { saveLead, markEmailSent, LeadSource } from '@/lib/leads'
import { sendEbookEmail, sendAdminNotification } from '@/lib/email'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)

    // Rate limiting: max 5 requests per IP per hour
    const rateLimit = checkRateLimit(`lead-magnet:${ip}`, {
      max: 5,
      windowSeconds: 3600,
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Příliš mnoho požadavků. Zkuste to prosím později.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, source, sourcePage } = body

    // Validace
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'E-mail je povinný.' },
        { status: 400 }
      )
    }

    // Validace formátu emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Zadejte prosím platnou e-mailovou adresu.' },
        { status: 400 }
      )
    }

    // Validace source
    const validSources: LeadSource[] = ['ebook', 'newsletter', 'popup', 'sidebar', 'blog', 'review']
    const leadSource: LeadSource = validSources.includes(source as LeadSource) ? source : 'ebook'

    // Uložit lead
    const { lead, isNew } = await saveLead({
      email,
      source: leadSource,
      sourcePage: sourcePage || undefined,
      ip,
    })

    // Odeslat email (vždy, i pro existující uživatele - mohou chtít nový link)
    const emailResult = await sendEbookEmail(email)

    if (emailResult.success) {
      await markEmailSent(lead.id)
    } else {
      console.error('Failed to send email:', emailResult.error)
      // Nevracíme chybu uživateli, lead je uložený
    }

    // Odeslat notifikaci adminovi
    await sendAdminNotification({
      email,
      source: leadSource,
      sourcePage: sourcePage || undefined,
      isNew,
    })

    return NextResponse.json({
      success: true,
      message: isNew
        ? 'E-book byl odeslán na váš email.'
        : 'E-book byl znovu odeslán na váš email.',
    })
  } catch (error) {
    console.error('Lead magnet error:', error)
    return NextResponse.json(
      { error: 'Něco se pokazilo. Zkuste to prosím znovu.' },
      { status: 500 }
    )
  }
}
