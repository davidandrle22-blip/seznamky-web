'use client'

import { useEffect, useState } from 'react'
import { Produkt } from '@/lib/types'
import AffiliateLink, { type AffiliateSource } from './AffiliateLink'

interface Props {
  produkt: Produkt
  label?: string
  /** Malý popisek nad názvem, např. „Tip redakce" */
  kicker?: string
  source?: AffiliateSource
}

/** Spodní lišta s CTA na mobilu – objeví se po odscrollování hero sekce */
export default function MobileCtaBar({ produkt, label, kicker, source = 'detail' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`mobile-cta-bar transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`} aria-hidden={!visible}>
      <div className="flex items-center gap-3">
        <span className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-ink-900 text-white font-display text-lg font-semibold leading-none">
          {produkt.rating.toFixed(1)}
        </span>
        <div className="flex-1 min-w-0">
          {kicker && <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-700 truncate">{kicker}</p>}
          <p className="text-sm font-semibold text-ink-900 truncate">{produkt.name}</p>
          {!kicker && <p className="text-xs text-ink-400 truncate">Registrace zdarma</p>}
        </div>
        <AffiliateLink produkt={produkt} source={source} placement="mobile-sticky" className="btn-gold shrink-0 !py-2.5 !px-4 text-sm whitespace-nowrap">
          {label || 'Vyzkoušet zdarma'}
        </AffiliateLink>
      </div>
    </div>
  )
}
