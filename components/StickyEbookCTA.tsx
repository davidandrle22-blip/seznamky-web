'use client'

import Link from 'next/link'
import { BookOpen, Gift } from 'lucide-react'

export default function StickyEbookCTA() {
  return (
    <div className="sticky-ebook-cta">
      <Link href="/ebook">
        <BookOpen className="ebook-icon" />
        <span>E-book zdarma: Tajemství seznamování</span>
        <span className="ebook-badge">
          <Gift className="w-3 h-3 inline" /> PDF
        </span>
      </Link>
    </div>
  )
}
