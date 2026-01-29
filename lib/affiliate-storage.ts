import { put, head, del } from '@vercel/blob'

const BLOB_NAME = 'affiliate-urls.json'

export interface AffiliateUrlOverrides {
  [slug: string]: string
}

/**
 * Načte uložené affiliate URL overrides z Vercel Blob
 */
export async function getAffiliateUrlOverrides(): Promise<AffiliateUrlOverrides> {
  try {
    // Zkusit načíst z Blob storage
    const blobUrl = `${process.env.BLOB_READ_WRITE_TOKEN ? 'https://blob.vercel-storage.com/' : ''}${BLOB_NAME}`

    const response = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    })

    if (response.ok) {
      return await response.json()
    }

    return {}
  } catch (error) {
    console.log('Blob storage not configured or empty, using defaults')
    return {}
  }
}

/**
 * Uloží affiliate URL override do Vercel Blob
 */
export async function saveAffiliateUrlOverride(
  slug: string,
  affiliateUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      // Fallback: pokus o zápis do file systému (funguje lokálně)
      return await saveToFileSystem(slug, affiliateUrl)
    }

    // Načíst existující data
    const overrides = await getAffiliateUrlOverrides()

    // Aktualizovat
    if (affiliateUrl && affiliateUrl.trim()) {
      overrides[slug] = affiliateUrl.trim()
    } else {
      delete overrides[slug]
    }

    // Uložit zpět do Blob
    await put(BLOB_NAME, JSON.stringify(overrides, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to save to Blob storage:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Nepodařilo se uložit'
    }
  }
}

/**
 * Fallback pro lokální vývoj - ukládá do produkty.json
 */
async function saveToFileSystem(
  slug: string,
  affiliateUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { getAllProdukty, saveProdukty } = await import('./data')

    const produkty = await getAllProdukty()
    const produktIndex = produkty.findIndex(p => p.slug === slug)

    if (produktIndex === -1) {
      return { success: false, error: 'Produkt nenalezen' }
    }

    produkty[produktIndex].affiliateUrl = affiliateUrl?.trim() || ''
    await saveProdukty(produkty)

    return { success: true }
  } catch (error) {
    console.error('Failed to save to file system:', error)
    return {
      success: false,
      error: 'Nepodařilo se uložit do souboru'
    }
  }
}
