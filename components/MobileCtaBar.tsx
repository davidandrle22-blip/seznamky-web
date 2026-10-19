'use client'

import { useEffect, useState } from 'react'
import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'

/** Spodní lišta s CTA na mobilu – objeví se po odscrollování hero sekce */
export default function MobileCtaBar({ produkt, label }: { produkt: Produkt; label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="mobile-cta-bar">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink-900 truncate">{produkt.name}</p>
          <p className="text-xs text-ink-400">Hodnocení {produkt.rating.toFixed(1)}/10 · registrace zdarma</p>
        </div>
        <AffiliateLink produkt={produkt} source="detail" placement="mobile-sticky" className="btn-gold !py-2.5 !px-4 text-sm whitespace-nowrap">
          {label || 'Vyzkoušet zdarma'}
        </AffiliateLink>
      </div>
    </div>
  )
}
