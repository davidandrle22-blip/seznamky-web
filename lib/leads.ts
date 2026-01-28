import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { createHash } from 'crypto'

const dataDir = path.join(process.cwd(), 'data')
const leadsFile = path.join(dataDir, 'leads.json')

export type LeadStatus = 'active' | 'unsubscribed'
export type LeadSource = 'ebook' | 'newsletter' | 'popup' | 'sidebar' | 'blog' | 'review'

export interface Lead {
  id: string
  email: string
  source: LeadSource
  sourcePage?: string
  ipHash?: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
  emailSentAt?: string
  downloadedAt?: string
  unsubscribedAt?: string
}

export interface LeadsData {
  leads: Lead[]
}

export interface LeadStats {
  total: number
  active: number
  unsubscribed: number
  today: number
  thisWeek: number
  thisMonth: number
  bySource: { source: string; count: number }[]
}

/**
 * Anonymizuje IP adresu pomocí hash (GDPR)
 */
export function hashIP(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'seznamky-info-2026'
  return createHash('sha256').update(ip + salt).digest('hex').substring(0, 16)
}

/**
 * Načte všechny leady ze souboru
 */
export async function getLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(leadsFile, 'utf-8')
    const parsed: LeadsData = JSON.parse(data)
    return parsed.leads || []
  } catch {
    return []
  }
}

/**
 * Najde lead podle emailu
 */
export async function findLeadByEmail(email: string): Promise<Lead | null> {
  const leads = await getLeads()
  return leads.find(l => l.email.toLowerCase() === email.toLowerCase()) || null
}

/**
 * Uloží nový lead
 */
export async function saveLead(data: {
  email: string
  source: LeadSource
  sourcePage?: string
  ip?: string
}): Promise<{ lead: Lead; isNew: boolean }> {
  const leads = await getLeads()
  const normalizedEmail = data.email.toLowerCase().trim()

  // Zkontrolovat existující lead
  const existingIndex = leads.findIndex(l => l.email.toLowerCase() === normalizedEmail)

  if (existingIndex !== -1) {
    // Aktualizovat existující
    const existing = leads[existingIndex]
    existing.updatedAt = new Date().toISOString()
    if (existing.status === 'unsubscribed') {
      existing.status = 'active'
      existing.unsubscribedAt = undefined
    }

    await saveLeadsToFile(leads)
    return { lead: existing, isNew: false }
  }

  // Vytvořit nový lead
  const newLead: Lead = {
    id: randomUUID(),
    email: normalizedEmail,
    source: data.source,
    sourcePage: data.sourcePage,
    ipHash: data.ip ? hashIP(data.ip) : undefined,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  leads.push(newLead)
  await saveLeadsToFile(leads)

  return { lead: newLead, isNew: true }
}

/**
 * Aktualizuje lead
 */
export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const leads = await getLeads()
  const index = leads.findIndex(l => l.id === id)

  if (index === -1) return null

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  await saveLeadsToFile(leads)
  return leads[index]
}

/**
 * Označí lead jako odeslaný email
 */
export async function markEmailSent(id: string): Promise<void> {
  await updateLead(id, { emailSentAt: new Date().toISOString() })
}

/**
 * Označí lead jako stažený ebook
 */
export async function markDownloaded(id: string): Promise<void> {
  await updateLead(id, { downloadedAt: new Date().toISOString() })
}

/**
 * Odhlásí lead (GDPR)
 */
export async function unsubscribeLead(email: string): Promise<boolean> {
  const leads = await getLeads()
  const index = leads.findIndex(l => l.email.toLowerCase() === email.toLowerCase())

  if (index === -1) return false

  leads[index].status = 'unsubscribed'
  leads[index].unsubscribedAt = new Date().toISOString()
  leads[index].updatedAt = new Date().toISOString()

  await saveLeadsToFile(leads)
  return true
}

/**
 * Smaže lead (GDPR - právo na výmaz)
 */
export async function deleteLead(id: string): Promise<boolean> {
  const leads = await getLeads()
  const index = leads.findIndex(l => l.id === id)

  if (index === -1) return false

  leads.splice(index, 1)
  await saveLeadsToFile(leads)
  return true
}

/**
 * Vrátí statistiky leadů
 */
export async function getLeadStats(): Promise<LeadStats> {
  const leads = await getLeads()

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(todayStart.getTime() - 30 * 24 * 60 * 60 * 1000)

  const active = leads.filter(l => l.status === 'active').length
  const unsubscribed = leads.filter(l => l.status === 'unsubscribed').length
  const today = leads.filter(l => new Date(l.createdAt) >= todayStart).length
  const thisWeek = leads.filter(l => new Date(l.createdAt) >= weekStart).length
  const thisMonth = leads.filter(l => new Date(l.createdAt) >= monthStart).length

  // Podle zdroje
  const sourceCounts = new Map<string, number>()
  for (const lead of leads) {
    sourceCounts.set(lead.source, (sourceCounts.get(lead.source) || 0) + 1)
  }

  const bySource = Array.from(sourceCounts.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)

  return {
    total: leads.length,
    active,
    unsubscribed,
    today,
    thisWeek,
    thisMonth,
    bySource,
  }
}

/**
 * Export leadů do CSV
 */
export async function exportLeadsToCSV(): Promise<string> {
  const leads = await getLeads()

  const headers = ['ID', 'Email', 'Zdroj', 'Stránka', 'Stav', 'Vytvořeno', 'Email odeslán', 'Staženo']
  const rows = leads.map(l => [
    l.id,
    l.email,
    l.source,
    l.sourcePage || '',
    l.status,
    l.createdAt,
    l.emailSentAt || '',
    l.downloadedAt || '',
  ])

  const csv = [
    headers.join(','),
    ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  return csv
}

/**
 * Pomocná funkce pro uložení do souboru
 */
async function saveLeadsToFile(leads: Lead[]): Promise<void> {
  // Zajistit existenci adresáře
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }

  const data: LeadsData = { leads }
  await fs.writeFile(leadsFile, JSON.stringify(data, null, 2), 'utf-8')
}
