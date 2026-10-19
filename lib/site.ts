export const SITE_URL = 'https://www.seznamky.info'
export const SITE_NAME = 'Seznamky.info'
export const SITE_TAGLINE = 'Nezávislé srovnání seznamek'
export const EDITORIAL_NAME = 'Redakce Seznamky.info'

/** Datum poslední redakční aktualizace srovnání (YYYY-MM-DD) */
export const LAST_REVIEW_DATE = '2026-10-19'

const MONTHS = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']

/** „říjen 2026“ */
export function monthYear(date: string | Date = LAST_REVIEW_DATE): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

/** „Říjen 2026“ */
export function MonthYear(date: string | Date = LAST_REVIEW_DATE): string {
  const s = monthYear(date)
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const CURRENT_YEAR = new Date(LAST_REVIEW_DATE).getFullYear()

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function formatDateCz(date: string): string {
  return new Date(date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
}
