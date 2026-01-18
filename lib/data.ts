import { promises as fs } from 'fs'
import path from 'path'
import { Produkt, Clanek, Nastaveni, Kategorie } from './types'

const dataDir = path.join(process.cwd(), 'data')

// Produkty
export async function getProdukty(): Promise<Produkt[]> {
  const filePath = path.join(dataDir, 'produkty.json')
  const data = await fs.readFile(filePath, 'utf-8')
  const produkty: Produkt[] = JSON.parse(data)
  return produkty.filter(p => p.isActive).sort((a, b) => a.order - b.order)
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
  return produkty.filter(p => p.categories.includes(kategorieId))
}
