'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Měřicí kód Skliku (SEM – Seznam Event Measurement) */
export const SEM_ID = 'hixfyio6midcczs25pjegz9l'

declare global {
  interface Window {
    SEM?: (...args: unknown[]) => void
  }
}

export function semTrack(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.SEM === 'function') {
    window.SEM('track', event, data)
  }
}

/** Načte SEM a posílá PageView při načtení i při každé změně stránky (Next.js navigace bez reloadu). */
export default function SemTracking() {
  const pathname = usePathname()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    semTrack('PageView')
  }, [pathname])

  if (pathname?.startsWith('/admin')) return null

  return (
    <Script
      id="sklik-sem"
      src={`https://l.seznam.cz/sul.js?id=${SEM_ID}`}
      strategy="afterInteractive"
      onLoad={() => semTrack('PageView')}
    />
  )
}
