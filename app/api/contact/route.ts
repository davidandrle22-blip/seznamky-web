import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

const CONTACT_EMAIL = 'seznamky-info@seznam.cz'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    // Validace
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Všechna pole jsou povinná' },
        { status: 400 }
      )
    }

    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Neplatný formát emailu' },
        { status: 400 }
      )
    }

    // Mapování předmětů
    const subjectMap: Record<string, string> = {
      'dotaz': 'Obecný dotaz',
      'spoluprace': 'Spolupráce',
      'recenze': 'Žádost o recenzi',
      'technicka-podpora': 'Technická podpora',
      'jine': 'Jiné',
    }

    const subjectText = subjectMap[data.subject] || data.subject

    const timestamp = new Date().toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // HTML email template
    const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Nová zpráva z kontaktního formuláře</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #be123c; margin: 0 0 20px; font-size: 24px;">
      📬 Nová zpráva z kontaktního formuláře
    </h2>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 120px;">Jméno:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #be123c;">${escapeHtml(data.email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Předmět:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(subjectText)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; color: #6b7280;">Čas odeslání:</td>
        <td style="padding: 12px 0;">${timestamp}</td>
      </tr>
    </table>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-top: 20px;">
      <h3 style="color: #374151; margin: 0 0 10px; font-size: 16px;">Zpráva:</h3>
      <p style="color: #4b5563; margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>

    <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${encodeURIComponent(subjectText)} - Seznamky.info" style="display: inline-block; background: #be123c; color: white; text-decoration: none; padding: 10px 25px; border-radius: 8px; font-weight: 600;">
        Odpovědět →
      </a>
    </div>

    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 20px 0 0;">
      Seznamky.info – Kontaktní formulář
    </p>
  </div>
</body>
</html>
`

    const text = `
Nová zpráva z kontaktního formuláře

Jméno: ${data.name}
Email: ${data.email}
Předmět: ${subjectText}
Čas odeslání: ${timestamp}

Zpráva:
${data.message}

---
Seznamky.info – Kontaktní formulář
`

    const result = await sendEmail({
      to: CONTACT_EMAIL,
      subject: `[Kontakt] ${subjectText} – ${data.name}`,
      html,
      text,
    })

    if (!result.success) {
      console.error('Failed to send contact email:', result.error)
      return NextResponse.json(
        { error: 'Nepodařilo se odeslat zprávu' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
