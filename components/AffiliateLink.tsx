'use client'

import { Produkt } from '@/lib/types'
import { ReactNode, MouseEvent } from 'react'

export type AffiliateSource = 'homepage' | 'category' | 'detail' | 'table' | 'sidebar'

interface AffiliateLinkProps {
  produkt: Produkt
  source: AffiliateSource
  placement?: string
  className?: string
  children: ReactNode
}

export default function AffiliateLink({
  produkt,
  source,
  placement,
  className,
  children,
}: AffiliateLinkProps) {
  // Sestavit URL pro redirect endpoint
  const buildHref = () => {
    const params = new URLSearchParams()
    params.set('source', source)
    if (placement) {
      params.set('placement', placement)
    }
    return `/api/affiliate/${produkt.slug}?${params.toString()}`
  }

  // Client-side tracking (backup, non-blocking)
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Async tracking - neblokuje navigaci
    fetch('/api/affiliate/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: produkt.slug,
        source,
        placement,
      }),
      // Použijeme keepalive pro zajištění dokončení requestu
      keepalive: true,
    }).catch(() => {
      // Ignorovat chyby - server-side tracking je primární
    })

    // Nechat výchozí navigaci proběhnout
  }

  return (
    <a
      href={buildHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
