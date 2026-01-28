import { NextRequest, NextResponse } from 'next/server'
import { verifyDownloadToken } from '@/lib/download-token'
import { findLeadByEmail, markDownloaded } from '@/lib/leads'
import { promises as fs } from 'fs'
import path from 'path'

// Cesta k e-booku - zkusíme obě možné lokace
const EBOOK_PATHS = [
  path.join(process.cwd(), 'private', 'ebook.pdf'),
  path.join(process.cwd(), 'ebook.pdf'),
]

const EBOOK_FILENAME = 'Jak-najit-partnera-2026-Seznamky-info.pdf'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  // Nastavit headers proti indexaci
  const headers = new Headers()
  headers.set('X-Robots-Tag', 'noindex, nofollow')
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')

  if (!token) {
    return NextResponse.json(
      { error: 'Chybí token pro stažení.' },
      { status: 400, headers }
    )
  }

  // Ověřit token
  const verification = verifyDownloadToken(token)

  if (!verification.valid) {
    if (verification.expired) {
      return NextResponse.json(
        {
          error: 'Platnost odkazu vypršela. Vyžádejte si prosím nový e-book.',
          expired: true,
        },
        { status: 410, headers }
      )
    }

    return NextResponse.json(
      { error: 'Neplatný odkaz pro stažení.' },
      { status: 403, headers }
    )
  }

  // Najít lead a označit jako staženo
  if (verification.email) {
    const lead = await findLeadByEmail(verification.email)
    if (lead) {
      await markDownloaded(lead.id)
    }
  }

  // Najít soubor e-booku
  let ebookPath: string | null = null
  for (const potentialPath of EBOOK_PATHS) {
    try {
      await fs.access(potentialPath)
      ebookPath = potentialPath
      break
    } catch {
      // Soubor neexistuje, zkusit další
    }
  }

  if (!ebookPath) {
    console.error('E-book file not found in any location:', EBOOK_PATHS)
    return NextResponse.json(
      { error: 'E-book není momentálně dostupný. Kontaktujte nás prosím.' },
      { status: 503, headers }
    )
  }

  try {
    // Přečíst soubor
    const fileBuffer = await fs.readFile(ebookPath)

    // Nastavit headers pro stažení
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `attachment; filename="${EBOOK_FILENAME}"`)
    headers.set('Content-Length', fileBuffer.length.toString())

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error reading e-book file:', error)
    return NextResponse.json(
      { error: 'Chyba při stahování souboru.' },
      { status: 500, headers }
    )
  }
}
