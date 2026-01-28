'use client'

import { useCallback } from 'react'

type EventCategory = 'lead_magnet' | 'affiliate' | 'navigation' | 'engagement'

interface AnalyticsEvent {
  category: EventCategory
  action: string
  label?: string
  value?: number
}

/**
 * Hook pro analytics tracking
 *
 * Připraveno pro integraci s:
 * - Google Analytics 4
 * - Plausible
 * - Vlastní analytics
 *
 * Použití:
 * ```tsx
 * const { trackEvent } = useAnalytics()
 * trackEvent({ category: 'lead_magnet', action: 'view', label: 'ebook_sidebar' })
 * ```
 */
export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      })
    }

    // Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(event.action, {
        props: {
          category: event.category,
          label: event.label,
          value: event.value,
        },
      })
    }

    // Console log v development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event)
    }
  }, [])

  // Předpřipravené eventy pro lead magnet
  const trackLeadMagnetView = useCallback((placement: string) => {
    trackEvent({
      category: 'lead_magnet',
      action: 'view',
      label: placement,
    })
  }, [trackEvent])

  const trackLeadMagnetSubmit = useCallback((placement: string) => {
    trackEvent({
      category: 'lead_magnet',
      action: 'submit',
      label: placement,
    })
  }, [trackEvent])

  const trackLeadMagnetSuccess = useCallback((placement: string) => {
    trackEvent({
      category: 'lead_magnet',
      action: 'success',
      label: placement,
    })
  }, [trackEvent])

  const trackLeadMagnetError = useCallback((placement: string, error: string) => {
    trackEvent({
      category: 'lead_magnet',
      action: 'error',
      label: `${placement}:${error}`,
    })
  }, [trackEvent])

  const trackDownload = useCallback((source: string) => {
    trackEvent({
      category: 'lead_magnet',
      action: 'download',
      label: source,
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackLeadMagnetView,
    trackLeadMagnetSubmit,
    trackLeadMagnetSuccess,
    trackLeadMagnetError,
    trackDownload,
  }
}

// Export typu pro server-side použití
export type { AnalyticsEvent, EventCategory }
