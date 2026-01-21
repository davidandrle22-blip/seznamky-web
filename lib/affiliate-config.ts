/**
 * Centrální konfigurace affiliate odkazů
 *
 * Všechny affiliate linky jsou definovány zde na jednom místě.
 * Pro změnu odkazu stačí upravit pouze tento soubor.
 */

export interface AffiliateConfig {
  /** Základní tracking URL */
  baseUrl: string
  /** Offer ID v affiliate síti */
  offerId?: string
  /** Offer ID pro mobilní zařízení (pokud se liší) */
  offerIdMobile?: string
  /** Offer ID pro desktop (pokud se liší) */
  offerIdDesktop?: string
  /** Affiliate ID */
  affId?: string
  /** Podporuje sub tracking parametry */
  supportsSubTracking?: boolean
  /** Má rozdílné offer ID podle zařízení */
  hasDeviceDetection?: boolean
}

/**
 * Konfigurace affiliate odkazů podle produktu (slug)
 *
 * Všechny seznamky s vlastními affiliate linky.
 * Ostatní seznamky bez záznamu použijí výchozí URL z produkty.json
 */
export const AFFILIATE_LINKS: Record<string, AffiliateConfig> = {
  // ===== ELITE Date =====
  'elite-date': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1263',
    affId: '24115',
    supportsSubTracking: true,
  },

  // ===== Academic Singles =====
  'academic-singles': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1199',        // Obecný
    offerIdMobile: '1127',  // 30+ mobilní
    offerIdDesktop: '1199', // Desktop
    affId: '24115',
    supportsSubTracking: true,
    hasDeviceDetection: true,
  },

  // ===== Victoria Milan =====
  'victoria-milan': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1137',
    affId: '24115',
    supportsSubTracking: true,
  },

  // ===== FlirtKontakt =====
  'flirtkontakt': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '762',
    affId: '24115',
    supportsSubTracking: true,
  },

  // ===== Be2 =====
  'be2': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1081',        // Desktop (výchozí)
    offerIdMobile: '1173',  // Mobilní
    offerIdDesktop: '1081', // Desktop
    affId: '24115',
    supportsSubTracking: true,
    hasDeviceDetection: true,
  },

  // ===== Rich Meet Beautiful =====
  'rich-meet-beautiful': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1139',
    affId: '24115',
    supportsSubTracking: true,
  },
}

export interface AffiliateParams {
  /** Zdroj kliknutí (homepage, category, detail, table, sidebar) */
  source?: string
  /** Umístění na stránce (hero, cta, table-row, etc.) */
  placement?: string
  /** Vlastní sub1 parametr pro tracking */
  sub1?: string
  /** Vlastní sub2 parametr pro tracking */
  sub2?: string
  /** Typ zařízení (mobile/desktop) - pro server-side */
  device?: 'mobile' | 'desktop'
}

/**
 * Detekuje typ zařízení z User-Agent (server-side)
 */
export function detectDevice(userAgent?: string): 'mobile' | 'desktop' {
  if (!userAgent) return 'desktop'

  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i
  return mobileRegex.test(userAgent) ? 'mobile' : 'desktop'
}

/**
 * Získá affiliate URL pro daný produkt
 *
 * @param slug - Slug produktu (např. 'elite-date')
 * @param fallbackUrl - Záložní URL pokud produkt nemá vlastní affiliate config
 * @param params - Volitelné parametry pro tracking
 * @returns Kompletní affiliate URL s parametry
 *
 * @example
 * // Základní použití
 * getAffiliateLink('elite-date')
 * // => https://espolupracecz.go2cloud.org/aff_c?offer_id=1263&aff_id=24115
 *
 * @example
 * // S tracking parametry
 * getAffiliateLink('elite-date', undefined, { source: 'homepage', placement: 'hero' })
 * // => https://espolupracecz.go2cloud.org/aff_c?offer_id=1263&aff_id=24115&aff_sub=homepage&aff_sub2=hero
 *
 * @example
 * // S detekcí zařízení (pro Be2)
 * getAffiliateLink('be2', undefined, { device: 'mobile' })
 * // => https://espolupracecz.go2cloud.org/aff_c?offer_id=1173&aff_id=24115
 */
export function getAffiliateLink(
  slug: string,
  fallbackUrl?: string,
  params?: AffiliateParams
): string {
  const config = AFFILIATE_LINKS[slug]

  // Pokud produkt nemá vlastní affiliate config, vrátíme fallback URL
  if (!config) {
    return fallbackUrl || ''
  }

  // Sestavení URL
  const url = new URL(config.baseUrl)

  // Určení správného offer ID (s detekcí zařízení)
  let offerId = config.offerId
  if (config.hasDeviceDetection && params?.device) {
    offerId = params.device === 'mobile'
      ? (config.offerIdMobile || config.offerId)
      : (config.offerIdDesktop || config.offerId)
  }

  // Přidání základních parametrů
  if (offerId) {
    url.searchParams.set('offer_id', offerId)
  }
  if (config.affId) {
    url.searchParams.set('aff_id', config.affId)
  }

  // Přidání tracking parametrů (pokud je podporuje)
  if (config.supportsSubTracking && params) {
    if (params.source) {
      url.searchParams.set('aff_sub', params.source)
    }
    if (params.placement) {
      url.searchParams.set('aff_sub2', params.placement)
    }
    if (params.sub1) {
      url.searchParams.set('aff_sub3', params.sub1)
    }
    if (params.sub2) {
      url.searchParams.set('aff_sub4', params.sub2)
    }
  }

  return url.toString()
}

/**
 * Zkontroluje, zda má produkt vlastní affiliate konfiguraci
 */
export function hasCustomAffiliateLink(slug: string): boolean {
  return slug in AFFILIATE_LINKS
}

/**
 * Získá konfiguraci affiliate pro daný produkt
 */
export function getAffiliateConfig(slug: string): AffiliateConfig | null {
  return AFFILIATE_LINKS[slug] || null
}

/**
 * Vrátí seznam všech produktů s vlastním affiliate
 */
export function getAffiliateProductSlugs(): string[] {
  return Object.keys(AFFILIATE_LINKS)
}
