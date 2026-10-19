export const ARTICLE_CATEGORIES: Record<string, string> = {
  pruvodce: 'Průvodce',
  tipy: 'Tipy a rady',
  profil: 'Profil a komunikace',
  rande: 'První rande',
  vztahy: 'Vztahy',
  psychologie: 'Psychologie',
  bezpecnost: 'Bezpečnost',
  recenze: 'Recenze a srovnání',
  '50plus': 'Seznamování 50+',
}

export function categoryLabel(slug: string): string {
  return ARTICLE_CATEGORIES[slug] || slug
}
