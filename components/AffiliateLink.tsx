'use client'

import { Produkt } from '@/lib/types'
import { ReactNode, MouseEvent } from 'react'

export type AffiliateSource =
  | 'homepage'
  | 'category'
  | 'detail'
  | 'table'
  | 'sidebar'
  | 'seznamky'
  | 'article'
  | 'hero'
  | 'pricing'
  | 'footer'
  | 'comparison'

export type AffiliatePlacement =
  | 'hero-cta'
  | 'info-box'
  | 'pricing-table'
  | 'mid-content'
  | 'bottom-cta'
  | 'alternative'
  | 'sidebar'
  | 'comparison-table'
  | string

interface AffiliateLinkProps {
  produkt: Produkt
  source: AffiliateSource
  placement?: AffiliatePlacement
  className?: string
  children: ReactNode
  variant?: 'button' | 'text' | 'card'
}

// Declare global window type for dataLayer
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * AffiliateLink - Centrální komponenta pro všechny affiliate odkazy
 *
 * Features:
 * - Server-side tracking přes /api/affiliate/[slug]
 * - Client-side backup tracking
 * - GA4/GTM dataLayer events
 * - Správné SEO atributy (sponsored, nofollow, noopener)
 */
export default function AffiliateLink({
  produkt,
  source,
  placement,
  className,
  children,
  variant = 'button',
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

  // Push event to dataLayer for GA4/GTM
  const pushDataLayerEvent = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'affiliate_click',
        affiliate_provider: produkt.slug,
        affiliate_name: produkt.name,
        affiliate_source: source,
        affiliate_placement: placement || 'default',
        affiliate_rating: produkt.rating,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
  }

  // Client-side tracking (backup, non-blocking)
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // 1. Push GA4/GTM dataLayer event
    pushDataLayerEvent()

    // 2. Async server tracking - neblokuje navigaci
    fetch('/api/affiliate/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: produkt.slug,
        name: produkt.name,
        source,
        placement,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {
      // Ignorovat chyby - server-side tracking je primární
    })
  }

  // Data attributes pro debugging a analytics
  const dataAttributes = {
    'data-affiliate': produkt.slug,
    'data-affiliate-source': source,
    'data-affiliate-placement': placement || 'default',
    'data-affiliate-variant': variant,
  }

  return (
    <a
      href={buildHref()}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={className}
      onClick={handleClick}
      {...dataAttributes}
    >
      {children}
    </a>
  )
}

/**
 * AffiliateButton - Stylovaný CTA button
 */
export function AffiliateButton({
  produkt,
  source,
  placement,
  children,
  variant = 'primary',
  size = 'default',
}: {
  produkt: Produkt
  source: AffiliateSource
  placement?: AffiliatePlacement
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'default' | 'large'
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-romantic-600 to-romantic-700 hover:from-romantic-700 hover:to-romantic-800 text-white shadow-lg shadow-romantic-500/25',
    secondary: 'bg-white hover:bg-gray-50 text-romantic-600 border-2 border-romantic-200 hover:border-romantic-400',
    outline: 'border-2 border-romantic-500 text-romantic-600 hover:bg-romantic-500 hover:text-white',
  }

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    default: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg',
  }

  return (
    <AffiliateLink
      produkt={produkt}
      source={source}
      placement={placement}
      variant="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </AffiliateLink>
  )
}

/**
 * AffiliateTextLink - Inline textový odkaz
 */
export function AffiliateTextLink({
  produkt,
  source,
  placement,
  children,
}: {
  produkt: Produkt
  source: AffiliateSource
  placement?: AffiliatePlacement
  children: ReactNode
}) {
  return (
    <AffiliateLink
      produkt={produkt}
      source={source}
      placement={placement}
      variant="text"
      className="text-romantic-600 underline decoration-romantic-300 underline-offset-2 hover:decoration-romantic-500 hover:text-romantic-700 transition-colors font-medium"
    >
      {children}
    </AffiliateLink>
  )
}
