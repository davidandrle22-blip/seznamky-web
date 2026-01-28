'use client'

import { useState, useEffect, useRef } from 'react'
import { BookOpen, Mail, Check, AlertCircle, Loader2, Shield, Gift } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

type LeadMagnetVariant = 'default' | 'compact' | 'sidebar' | 'inline'

interface LeadMagnetProps {
  variant?: LeadMagnetVariant
  source?: string
  placement?: string
  className?: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function LeadMagnet({
  variant = 'default',
  source = 'ebook',
  placement = 'unknown',
  className = '',
}: LeadMagnetProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [hasTrackedView, setHasTrackedView] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const { trackLeadMagnetView, trackLeadMagnetSubmit, trackLeadMagnetSuccess, trackLeadMagnetError } = useAnalytics()

  // Track view on mount (only once)
  useEffect(() => {
    if (!hasTrackedView) {
      trackLeadMagnetView(placement)
      setHasTrackedView(true)
    }
  }, [placement, trackLeadMagnetView, hasTrackedView])

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (honeypot) {
      console.log('Honeypot triggered')
      setFormState('success') // Fake success for bots
      return
    }

    // Validation
    if (!validateEmail(email)) {
      setErrorMessage('Zadejte prosím platnou e-mailovou adresu.')
      setFormState('error')
      return
    }

    if (!consent) {
      setErrorMessage('Pro odeslání musíte souhlasit se zpracováním údajů.')
      setFormState('error')
      return
    }

    setFormState('loading')
    setErrorMessage('')
    trackLeadMagnetSubmit(placement)

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : placement,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Něco se pokazilo')
      }

      setFormState('success')
      trackLeadMagnetSuccess(placement)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Něco se pokazilo'
      setErrorMessage(message)
      setFormState('error')
      trackLeadMagnetError(placement, message)
    }
  }

  // Success state
  if (formState === 'success') {
    return (
      <div className={`lead-magnet lead-magnet-${variant} lead-magnet-success ${className}`}>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            E-book je na cestě! 📚
          </h3>
          <p className="text-gray-600 mb-4">
            Zkontrolujte svou e-mailovou schránku (a případně složku spam).
            Link pro stažení je platný 72 hodin.
          </p>
          <p className="text-sm text-gray-500">
            Odeslali jsme vám e-mail na <strong>{email}</strong>
          </p>
        </div>
      </div>
    )
  }

  // Compact variant (sidebar, inline)
  if (variant === 'compact' || variant === 'sidebar') {
    return (
      <div className={`lead-magnet lead-magnet-${variant} ${className}`}>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              Stáhněte si ZDARMA e-book
            </h3>
          </div>

          <p className="text-xs text-gray-600 mb-4">
            50+ stran rad pro úspěšné online seznamování
          </p>

          <form onSubmit={handleSubmit} ref={formRef}>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Váš e-mail"
                className="w-full px-3 py-2 text-sm rounded-lg border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
                disabled={formState === 'loading'}
              />

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                  disabled={formState === 'loading'}
                />
                <span className="text-xs text-gray-600 leading-tight">
                  Souhlasím se zpracováním e-mailu pro zaslání e-booku
                </span>
              </label>

              {formState === 'error' && errorMessage && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    Stáhnout zdarma
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Bez spamu. Odhlášení kdykoliv.
          </p>
        </div>
      </div>
    )
  }

  // Default (full) variant
  return (
    <div className={`lead-magnet lead-magnet-${variant} ${className}`}>
      <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 rounded-2xl p-8 md:p-10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
              <Gift className="w-4 h-4 text-rose-300" />
              <span className="text-sm font-medium text-rose-200">Zdarma ke stažení</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Jak si efektivně najít partnera v roce 2026
            </h3>

            <p className="text-rose-200 mb-6">
              Stáhněte si zdarma 50+ stránkový e-book plný praktických rad,
              tipů a strategií od expertů na online seznamování.
            </p>

            <ul className="space-y-2 text-sm text-rose-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Jak vybrat správnou seznamku
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Tipy pro atraktivní profil
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Strategie první zprávy
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Bezpečné online seznamování
              </li>
            </ul>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">E-book zdarma</p>
                <p className="text-sm text-gray-500">PDF, 50+ stran</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} ref={formRef}>
              {/* Honeypot field - hidden from real users */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mailová adresa
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vas@email.cz"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                      disabled={formState === 'loading'}
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                    disabled={formState === 'loading'}
                  />
                  <span className="text-sm text-gray-600">
                    Souhlasím se zpracováním e-mailu za účelem zaslání e-booku
                    a případných tipů na online seznamování.
                    <a href="/ochrana-soukromi" className="text-rose-600 hover:underline ml-1">
                      Zásady ochrany soukromí
                    </a>
                  </span>
                </label>

                {formState === 'error' && errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Odesílám...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" />
                      Stáhnout e-book zdarma
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Bez spamu. Odhlášení kdykoliv jedním klikem.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
