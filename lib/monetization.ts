/**
 * Monetizace – jediný zdroj pravdy pro to, které seznamky web tlačí.
 *
 * Pořadí PRIORITY_ORDER vychází z průzkumu affiliate podmínek (10/2026):
 * výše provize × konverzní poměr pro český traffic × šíře publika.
 * Seznamky mimo seznam se řadí za ně podle `order` a hodnocení.
 *
 * Při změně podmínek stačí upravit tento soubor (a affiliate-config.ts pro samotné odkazy).
 */

export type MonetizationStatus =
  | 'tracking'   // trackovací odkaz je nasazený a funguje
  | 'available'  // program existuje, je potřeba požádat o spolupráci
  | 'none'       // affiliate program pro CZ neexistuje / není znám

export interface Monetization {
  status: MonetizationStatus
  network?: string
  /** Stručně model provize – zobrazuje se jen v adminu / interně */
  commission?: string
}

export const MONETIZATION: Record<string, Monetization> = {
  'elite-date':       { status: 'tracking', network: 'eSpolupráce (offer 1263)', commission: '25 Kč / registrace 30+ + 15 % z plateb' },
  'victoria-milan':   { status: 'tracking', network: 'eSpolupráce (offer 1137)', commission: 'CPL / CPA – nejvyšší sazba v portfoliu' },
  'academic-singles': { status: 'tracking', network: 'eSpolupráce (offer 1199 / 1127 mobil)', commission: 'CPL za registraci 30+' },
  'singles50':        { status: 'tracking', network: 'eSpolupráce (offer 1165)', commission: '≈ 50 Kč / registrace 40+' },
  'be2':              { status: 'tracking', network: 'eSpolupráce (offer 1081 / 1173 mobil)', commission: 'CPL za registraci' },
  'flirtkontakt':     { status: 'tracking', network: 'eSpolupráce (offer 762)', commission: 'CPL / CPS' },
  'elite-meets-beauty': { status: 'tracking', network: 'eSpolupráce (offer 1139)', commission: 'CPL / CPA (LoveRevenue)' },
  'eroticky-kontakt': { status: 'available', network: 'Paysale (CB Media)', commission: '≈ 5,04 $ / registrace DOI' },
  'dateefy':          { status: 'available', network: 'Conversand / Paysale (CB Media)', commission: '≈ 18,75 $ CPS nebo 1,67 $ CPL' },
  'zrala-laska':      { status: 'available', network: 'Paysale (CB Media)', commission: 'CPL DOI (sazba po registraci)' },
  'chci-sex-rande':   { status: 'available', network: 'Paysale', commission: 'CPL DOI (sazba po registraci)' },
  'flirt-com':        { status: 'available', network: 'Together Networks (affiliates.flirt.com)', commission: 'PPL / PPS / revshare' },
  'divoke-rande':     { status: 'available', network: 'přímo provozovatel', commission: 'neznámé – vyžádat' },
  'c-date':           { status: 'available', network: 'vlastní program / Awin', commission: 'CPS' },
  'ashley-madison':   { status: 'available', network: 'vlastní program', commission: 'CPS (první platba)' },
  'adult-friend-finder': { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'passion':           { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'sexfinder':         { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'xmatch':            { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'heated-affairs':    { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'hornywife':         { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'swapfinder':        { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'tsdates':           { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 130 $ / objednávka (PMOB) nebo 75 % + 55 % revshare, CPL až 5 $' },
  'alt-com':           { status: 'available', network: 'FriendFinder Networks (cash.ffn.com)', commission: 'až 100 $ / objednávka (PMOB) nebo 75 % + 55 % revshare' },
  'be-naughty':       { status: 'available', network: 'Together Networks (partners.benaughty.com)', commission: 'PPL / PPS / revshare' },
  'gleeden':          { status: 'available', network: 'Kwanko / přímo', commission: 'CPL' },
  'edarling':         { status: 'none' },
  'badoo':            { status: 'none' },
  'tinder':           { status: 'none' },
  'seznamte-se':      { status: 'none' },
  'libimseti':        { status: 'none' },
  'okcupid':          { status: 'none' },
  'grindr':           { status: 'none' },
  'planetromeo':      { status: 'none' },
  'her':              { status: 'none' },
}

/** Globální pořadí na celém webu – monetizované seznamky vždy první */
export const PRIORITY_ORDER = [
  'elite-date',
  'victoria-milan',
  'academic-singles',
  'singles50',
  'be2',
  'elite-meets-beauty',
  'flirtkontakt',
  // čekají na affiliate odkaz – seřazeno podle provize
  // FriendFinder Networks: až 130 $ za objednávku / 75 % revshare / CPL až 5 $
  'adult-friend-finder',
  'passion',
  'sexfinder',
  'heated-affairs',
  'xmatch',
  'hornywife',
  'swapfinder',
  'tsdates',
  'alt-com', // FFN, strop 100 $ za objednávku
  // Paysale / Together Networks
  'eroticky-kontakt',
  'dateefy',
  'zrala-laska',
  'chci-sex-rande',
  'flirt-com',
]

/**
 * Doporučené seznamky pro jednotlivé kategorie (bannery nad tabulkou + hero CTA).
 * První položka = hlavní doporučení kategorie.
 */
export const CATEGORY_PICKS: Record<string, string[]> = {
  'nejlepsi-seznamky': ['elite-date', 'victoria-milan', 'academic-singles'],
  'vsechny-seznamky': ['elite-date', 'victoria-milan', 'academic-singles'],
  'vazne-vztahy': ['elite-date', 'academic-singles', 'be2'],
  'senior-seznamky': ['singles50', 'elite-date', 'academic-singles', 'zrala-laska'],
  'luxusni-seznamky': ['elite-date', 'academic-singles', 'elite-meets-beauty', 'victoria-milan'],
  'seznamky-pro-zadane': ['victoria-milan', 'elite-meets-beauty', 'flirtkontakt', 'heated-affairs'],
  'sex-seznamky': ['victoria-milan', 'flirtkontakt', 'adult-friend-finder', 'passion', 'eroticky-kontakt', 'dateefy', 'chci-sex-rande'],
  'flirt-seznamky': ['flirtkontakt', 'victoria-milan', 'dateefy', 'passion', 'flirt-com'],
  'seznamky-zdarma': ['elite-date', 'flirtkontakt', 'victoria-milan'],
  'gay-seznamky': ['tsdates'],
}

/** Krátké štítky „ocenění“ pro top seznamky */
export const AWARDS: Record<string, string> = {
  'elite-date': 'Volba redakce',
  'victoria-milan': 'Nejlepší pro diskrétní seznámení',
  'academic-singles': 'Pro vzdělané singles',
  'singles50': 'Nejlepší pro 50+',
  'be2': 'Vědecké párování',
  'flirtkontakt': 'Nejlepší český flirt',
  'elite-meets-beauty': 'Luxusní seznamování',
  'eroticky-kontakt': 'Česká erotická seznamka',
  'zrala-laska': 'Česká seznamka 50+',
  'adult-friend-finder': 'Největší sex seznamka světa',
  'heated-affairs': 'Diskrétní poměry',
  'swapfinder': 'Pro páry a swingers',
  'tsdates': 'Trans seznamování',
  'alt-com': 'BDSM a fetiš',
  'hornywife': 'Zralé ženy (MILF)',
}

export function isTracked(slug: string): boolean {
  return MONETIZATION[slug]?.status === 'tracking'
}

export function priorityIndex(slug: string): number {
  const i = PRIORITY_ORDER.indexOf(slug)
  return i === -1 ? 999 : i
}

export function sortByPriority<T extends { slug: string; order: number; rating: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const pa = priorityIndex(a.slug)
    const pb = priorityIndex(b.slug)
    if (pa !== pb) return pa - pb
    if (a.order !== b.order) return a.order - b.order
    return b.rating - a.rating
  })
}
