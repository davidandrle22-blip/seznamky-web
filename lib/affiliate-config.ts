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
  /** Affiliate ID */
  affId?: string
  /** Podporuje sub tracking parametry */
  supportsSubTracking?: boolean
}

/**
 * Konfigurace affiliate odkazů podle produktu (slug)
 *
 * Přidejte sem nové seznamky s vlastními affiliate linky.
 * Ostatní seznamky bez záznamu použijí výchozí URL z produkty.json
 */
export const AFFILIATE_LINKS: Record<string, AffiliateConfig> = {
  'elite-date': {
    baseUrl: 'https://espolupracecz.go2cloud.org/aff_c',
    offerId: '1263',
    affId: '24115',
    supportsSubTracking: true,
  },
  // Příklad pro další seznamky:
  // 'victoria-milan': {
  //   baseUrl: 'https://tracking.example.com/aff_c',
  //   offerId: '999',
  //   affId: '123',
  //   supportsSubTracking: true,
  // },
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

  // Přidání základních parametrů
  if (config.offerId) {
    url.searchParams.set('offer_id', config.offerId)
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
