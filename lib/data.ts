import { promises as fs } from 'fs'
import path from 'path'
import { Produkt, Clanek, Nastaveni, Kategorie, CategoryContent } from './types'

const dataDir = path.join(process.cwd(), 'data')

// Prioritní pořadí seznamek - globálně dodrženo na celém webu
const PRIORITY_ORDER = ['elite-date', 'victoria-milan', 'academic-singles', 'divoke-rande']

function sortByPriority(produkty: Produkt[]): Produkt[] {
  const priorityMap = new Map(PRIORITY_ORDER.map((slug, index) => [slug, index]))

  return [...produkty].sort((a, b) => {
    const aPriority = priorityMap.get(a.slug) ?? 999
    const bPriority = priorityMap.get(b.slug) ?? 999

    // Prioritní seznamky vždy první
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    // Ostatní podle původního pořadí (order) nebo ratingu
    if (a.order !== b.order) {
      return a.order - b.order
    }

    return b.rating - a.rating
  })
}

// Produkty
export async function getProdukty(): Promise<Produkt[]> {
  const filePath = path.join(dataDir, 'produkty.json')
  const data = await fs.readFile(filePath, 'utf-8')
  const produkty: Produkt[] = JSON.parse(data)
  return sortByPriority(produkty.filter(p => p.isActive))
}

export async function getAllProdukty(): Promise<Produkt[]> {
  const filePath = path.join(dataDir, 'produkty.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getProduktBySlug(slug: string): Promise<Produkt | null> {
  const produkty = await getAllProdukty()
  return produkty.find(p => p.slug === slug) || null
}

export async function saveProdukty(produkty: Produkt[]): Promise<void> {
  const filePath = path.join(dataDir, 'produkty.json')
  await fs.writeFile(filePath, JSON.stringify(produkty, null, 2), 'utf-8')
}

// Články
export async function getClanky(): Promise<Clanek[]> {
  const filePath = path.join(dataDir, 'clanky.json')
  const data = await fs.readFile(filePath, 'utf-8')
  const clanky: Clanek[] = JSON.parse(data)
  return clanky
    .filter(c => c.isPublished)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAllClanky(): Promise<Clanek[]> {
  const filePath = path.join(dataDir, 'clanky.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getClanekBySlug(slug: string): Promise<Clanek | null> {
  const clanky = await getAllClanky()
  return clanky.find(c => c.slug === slug) || null
}

export async function saveClanky(clanky: Clanek[]): Promise<void> {
  const filePath = path.join(dataDir, 'clanky.json')
  await fs.writeFile(filePath, JSON.stringify(clanky, null, 2), 'utf-8')
}

// Nastavení
export async function getSettings(): Promise<Nastaveni> {
  const filePath = path.join(dataDir, 'nastaveni.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function saveSettings(nastaveni: Nastaveni): Promise<void> {
  const filePath = path.join(dataDir, 'nastaveni.json')
  await fs.writeFile(filePath, JSON.stringify(nastaveni, null, 2), 'utf-8')
}

// Kategorie
export async function getKategorie(): Promise<Kategorie[]> {
  const filePath = path.join(dataDir, 'kategorie.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getProduktyByKategorie(kategorieId: string): Promise<Produkt[]> {
  const produkty = await getProdukty()
  // Pro kategorii "vsechny-seznamky" vrátíme všechny aktivní produkty
  if (kategorieId === 'vsechny-seznamky') {
    return produkty // Already sorted by priority
  }
  // Filter and re-sort to ensure priority order is maintained
  return sortByPriority(produkty.filter(p => p.categories.includes(kategorieId)))
}

export async function getKategorieBySlug(slug: string): Promise<Kategorie | null> {
  const kategorie = await getKategorie()
  return kategorie.find(k => k.slug === slug) || null
}

export async function getCategoryContent(): Promise<CategoryContent[]> {
  const filePath = path.join(dataDir, 'category-content.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getCategoryContentBySlug(slug: string): Promise<CategoryContent | null> {
  const contents = await getCategoryContent()
  return contents.find(c => c.slug === slug) || null
}
