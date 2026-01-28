import { generateDownloadUrl } from './download-token'

// Resend API
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'Seznamky.info <noreply@seznamky.info>'
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'info@seznamky.info'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Odešle email přes Resend API
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    // V development módu jen logujeme
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 [DEV] Would send email:', {
        to: options.to,
        subject: options.subject,
      })
      return { success: true }
    }
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: options.to,
        reply_to: REPLY_TO_EMAIL,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Odešle e-book email
 */
export async function sendEbookEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const downloadUrl = generateDownloadUrl(email)

  const subject = '📚 Váš e-book: Jak si efektivně najít partnera v roce 2026'

  const html = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Váš e-book je připraven ke stažení</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #9f1239 0%, #be123c 100%); padding: 40px 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                ❤️ Seznamky.info
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">
                Váš průvodce online seznamováním
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1f2937; margin: 0 0 20px; font-size: 24px; font-weight: 600;">
                Váš e-book je připraven! 📚
              </h2>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Děkujeme za váš zájem! Připravili jsme pro vás kompletního průvodce online seznamováním v roce 2026.
              </p>

              <div style="background-color: #fef2f2; border-radius: 12px; padding: 20px; margin: 30px 0; border-left: 4px solid #be123c;">
                <h3 style="color: #9f1239; margin: 0 0 10px; font-size: 18px;">
                  📖 Jak si efektivně najít partnera v roce 2026
                </h3>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  50+ stran praktických rad, tipů a strategií od expertů na online seznamování.
                </p>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Klikněte na tlačítko níže pro stažení e-booku. Link je platný <strong>72 hodin</strong>.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #be123c 0%, #9f1239 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 18px; font-weight: 600; box-shadow: 0 4px 14px rgba(190, 18, 60, 0.4);">
                      📥 Stáhnout e-book zdarma
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 20px 0 0;">
                Pokud tlačítko nefunguje, zkopírujte tento odkaz do prohlížeče:<br>
                <a href="${downloadUrl}" style="color: #be123c; word-break: break-all;">${downloadUrl}</a>
              </p>
            </td>
          </tr>

          <!-- What's inside -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">
                Co v e-booku najdete:
              </h3>
              <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Jak vybrat správnou seznamku pro vaše potřeby</li>
                <li>Tipy na vytvoření atraktivního profilu</li>
                <li>Strategie pro úspěšnou první zprávu</li>
                <li>Jak rozpoznat falešné profily</li>
                <li>Rady pro bezpečnou první schůzku</li>
                <li>Psychologie online seznamování</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px;">
                Přejeme vám hodně štěstí na cestě za láskou! ❤️
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Seznamky.info – Váš nezávislý průvodce online seznamováním
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 15px 0 0;">
                Tento email jste obdrželi, protože jste si vyžádali e-book na Seznamky.info.<br>
                <a href="https://www.seznamky.info/odhlasit?email=${encodeURIComponent(email)}" style="color: #be123c;">Odhlásit se z odběru</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
Váš e-book je připraven!

Děkujeme za váš zájem! Připravili jsme pro vás kompletního průvodce online seznamováním v roce 2026.

📖 Jak si efektivně najít partnera v roce 2026
50+ stran praktických rad, tipů a strategií od expertů na online seznamování.

Stáhněte si e-book zde (link platí 72 hodin):
${downloadUrl}

Co v e-booku najdete:
- Jak vybrat správnou seznamku pro vaše potřeby
- Tipy na vytvoření atraktivního profilu
- Strategie pro úspěšnou první zprávu
- Jak rozpoznat falešné profily
- Rady pro bezpečnou první schůzku
- Psychologie online seznamování

Přejeme vám hodně štěstí na cestě za láskou!

---
Seznamky.info – Váš nezávislý průvodce online seznamováním
`

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  })
}
