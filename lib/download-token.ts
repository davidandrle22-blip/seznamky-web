import { createHmac } from 'crypto'

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'seznamky-ebook-secret-2026'
const TOKEN_EXPIRY_HOURS = 72 // Token platí 72 hodin

interface TokenPayload {
  email: string
  timestamp: number
}

/**
 * Generuje bezpečný download token pomocí HMAC
 */
export function generateDownloadToken(email: string): string {
  const timestamp = Date.now()
  const payload: TokenPayload = { email, timestamp }
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url')

  const signature = createHmac('sha256', SECRET)
    .update(payloadStr)
    .digest('base64url')

  return `${payloadStr}.${signature}`
}

/**
 * Ověří download token a vrátí email
 */
export function verifyDownloadToken(token: string): { valid: boolean; email?: string; expired?: boolean } {
  try {
    const [payloadStr, signature] = token.split('.')

    if (!payloadStr || !signature) {
      return { valid: false }
    }

    // Ověřit podpis
    const expectedSignature = createHmac('sha256', SECRET)
      .update(payloadStr)
      .digest('base64url')

    if (signature !== expectedSignature) {
      return { valid: false }
    }

    // Dekódovat payload
    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf-8')
    )

    // Ověřit expiraci
    const expiryTime = payload.timestamp + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
    if (Date.now() > expiryTime) {
      return { valid: false, expired: true, email: payload.email }
    }

    return { valid: true, email: payload.email }
  } catch {
    return { valid: false }
  }
}

/**
 * Generuje URL pro stažení e-booku
 */
export function generateDownloadUrl(email: string, baseUrl?: string): string {
  const token = generateDownloadToken(email)
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.seznamky.info'
  return `${base}/api/download/ebook?token=${encodeURIComponent(token)}`
}
