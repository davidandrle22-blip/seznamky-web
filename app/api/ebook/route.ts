/**
 * E-book Lead Magnet API Route
 *
 * Zpracovává formulář pro stažení e-booku:
 * 1. Validuje email a honeypot
 * 2. Kontroluje rate limit (5 req / min / IP)
 * 3. Odesílá notifikační email adminovi přes Resend
 * 4. Vrací URL pro stažení PDF
 *
 * PDF je hostované veřejně: /downloads/ebook-seznamovani-2026.pdf
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

// Resend klient - API klíč POUZE na serveru
const resend = new Resend(process.env.RESEND_API_KEY)

// Konfigurace
const FROM_EMAIL = process.env.FROM_EMAIL || 'Seznamky.info <noreply@seznamky.info>'
const ADMIN_EMAIL = 'seznamky-info@seznam.cz'
const EBOOK_URL = '/downloads/ebook-seznamovani-2026.pdf'

// Typy
interface EbookRequestBody {
  email: string
  honeypot?: string  // Anti-spam pole (musí být prázdné)
  pageUrl?: string   // URL stránky kde byl formulář
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}

/**
 * Validace emailové adresy
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Formátování data a času pro email
 */
function formatDateTime(): string {
  return new Date().toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Prague'
  })
}

/**
 * Vytvoření HTML obsahu notifikačního emailu
 */
function createEmailHtml(data: {
  email: string
  dateTime: string
  pageUrl: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  ip: string
}): string {
  return `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Nový e-book lead</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #be123c; margin: 0 0 20px;">
      📚 Nový e-book lead!
    </h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 120px;">E-mail:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Datum a čas:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.dateTime}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Stránka:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.pageUrl || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">UTM Source:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.utmSource || '–'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">UTM Medium:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.utmMedium || '–'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">UTM Campaign:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.utmCampaign || '–'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Referrer:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.referrer || '–'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; color: #6b7280;">IP adresa:</td>
        <td style="padding: 12px 0; color: #111827;">${data.ip}</td>
      </tr>
    </table>

    <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center;">
      <a href="https://www.seznamky.info/admin/leads" style="display: inline-block; background: #be123c; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600;">
        Zobrazit v adminu →
      </a>
    </div>

    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 20px 0 0;">
      Seznamky.info – E-book Lead Magnet
    </p>
  </div>
</body>
</html>
`
}

/**
 * Vytvoření textového obsahu notifikačního emailu
 */
function createEmailText(data: {
  email: string
  dateTime: string
  pageUrl: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  ip: string
}): string {
  return `
NOVÝ E-BOOK LEAD – SEZNAMKY.INFO
================================

E-mail: ${data.email}
Datum a čas: ${data.dateTime}
Stránka: ${data.pageUrl || 'N/A'}

UTM parametry:
- Source: ${data.utmSource || '–'}
- Medium: ${data.utmMedium || '–'}
- Campaign: ${data.utmCampaign || '–'}

Referrer: ${data.referrer || '–'}
IP adresa: ${data.ip}

---
Admin: https://www.seznamky.info/admin/leads
`
}

export async function POST(request: NextRequest) {
  try {
    // 1. Získat IP pro rate limiting
    const ip = getClientIP(request)

    // 2. Rate limit: max 5 požadavků za minutu
    const rateLimit = checkRateLimit(`ebook:${ip}`, {
      max: 5,
      windowSeconds: 60
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Příliš mnoho požadavků. Zkuste to za chvíli.' },
        { status: 429 }
      )
    }

    // 3. Parsovat body
    const body: EbookRequestBody = await request.json()
    const { email, honeypot, pageUrl, utmSource, utmMedium, utmCampaign, referrer } = body

    // 4. Honeypot check - pokud je vyplněné, je to bot
    if (honeypot) {
      // Tiše "uspějeme" pro boty, ale nic neděláme
      console.log('[SPAM] Honeypot triggered:', { ip, email })
      return NextResponse.json({
        success: true,
        downloadUrl: EBOOK_URL
      })
    }

    // 5. Validace emailu
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'E-mail je povinný.' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim().toLowerCase()

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Zadejte prosím platnou e-mailovou adresu.' },
        { status: 400 }
      )
    }

    // 6. Připravit data pro email
    const dateTime = formatDateTime()
    const emailData = {
      email: trimmedEmail,
      dateTime,
      pageUrl: pageUrl || 'Neznámá',
      utmSource,
      utmMedium,
      utmCampaign,
      referrer,
      ip
    }

    // 7. Odeslat notifikační email adminovi
    let emailSent = false
    try {
      if (process.env.RESEND_API_KEY) {
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: 'Nový e-book lead – seznamky.info',
          html: createEmailHtml(emailData),
          text: createEmailText(emailData)
        })

        emailSent = !result.error

        if (result.error) {
          console.error('[RESEND ERROR]', result.error)
        } else {
          console.log('[RESEND] Email sent:', result.data?.id)
        }
      } else {
        // Development mode - jen logujeme
        console.log('[DEV] Would send email to:', ADMIN_EMAIL)
        console.log('[DEV] Lead data:', emailData)
        emailSent = true
      }
    } catch (emailError) {
      // Email selhal, ale uživateli stále dáme PDF
      console.error('[EMAIL ERROR]', emailError)
    }

    // 8. Vrátit úspěch s download URL
    // Uživatel dostane PDF i když email selže
    return NextResponse.json({
      success: true,
      downloadUrl: EBOOK_URL,
      emailSent // pro debugging
    })

  } catch (error) {
    console.error('[EBOOK API ERROR]', error)
    return NextResponse.json(
      { error: 'Něco se pokazilo. Zkuste to prosím znovu.' },
      { status: 500 }
    )
  }
}
