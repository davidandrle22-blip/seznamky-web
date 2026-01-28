/**
 * Jednoduchý in-memory rate limiter
 * Pro produkci by bylo lepší použít Redis, ale pro tento projekt stačí
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimits = new Map<string, RateLimitEntry>()

// Čištění starých záznamů každých 5 minut
setInterval(() => {
  const now = Date.now()
  Array.from(rateLimits.entries()).forEach(([key, entry]) => {
    if (entry.resetAt < now) {
      rateLimits.delete(key)
    }
  })
}, 5 * 60 * 1000)

interface RateLimitOptions {
  /** Maximální počet požadavků */
  max: number
  /** Časové okno v sekundách */
  windowSeconds: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Zkontroluje rate limit pro daný klíč (IP, email, atd.)
 */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const windowMs = options.windowSeconds * 1000

  let entry = rateLimits.get(key)

  // Nový záznam nebo expirovaný
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 1,
      resetAt: now + windowMs,
    }
    rateLimits.set(key, entry)
    return {
      success: true,
      remaining: options.max - 1,
      resetAt: entry.resetAt,
    }
  }

  // Existující záznam
  if (entry.count >= options.max) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  entry.count++
  return {
    success: true,
    remaining: options.max - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Vrátí IP adresu z požadavku
 */
export function getClientIP(request: Request): string {
  // Vercel / Cloudflare headers
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback
  return 'unknown'
}
