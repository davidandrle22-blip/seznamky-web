'use client'

import { Heart, ExternalLink, ArrowRight } from 'lucide-react'
import AffiliateLink from '@/components/AffiliateLink'
import type { Produkt } from '@/lib/types'
import type { AffiliateSource } from '@/components/AffiliateLink'

type CTAVariant = 'primary' | 'secondary' | 'light'

interface CTABoxProps {
  produkt: Produkt
  title?: string
  description?: string
  buttonText?: string
  variant?: CTAVariant
  source?: AffiliateSource
  placement?: string
  showIcon?: boolean
}

export default function CTABox({
  produkt,
  title,
  description,
  buttonText = 'Vyzkoušet zdarma',
  variant = 'primary',
  source = 'detail',
  placement = 'cta-box',
  showIcon = true
}: CTABoxProps) {
  const variantClass = {
    primary: 'cta-box-primary',
    secondary: 'cta-box-secondary',
    light: 'cta-box-light',
  }[variant]

  const buttonClass = {
    primary: 'bg-white hover:bg-gray-100 text-romantic-600 font-bold py-4 px-8 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg',
    secondary: 'bg-romantic-500 hover:bg-romantic-600 text-white font-bold py-4 px-8 rounded-xl transition-all inline-flex items-center gap-2',
    light: 'bg-gradient-to-r from-romantic-600 to-romantic-700 hover:from-romantic-700 hover:to-romantic-800 text-white font-bold py-4 px-8 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg',
  }[variant]

  return (
    <div className={`cta-box ${variantClass}`}>
      {showIcon && (
        <Heart className={`w-10 h-10 mx-auto mb-4 ${variant === 'light' ? 'text-romantic-500' : 'text-white/80'}`} fill="currentColor" />
      )}
      <h3 className="cta-box-title">
        {title || `Vyzkoušejte ${produkt.name}`}
      </h3>
      <p className="cta-box-description">
        {description || `Registrace je zdarma a nezávazná. Přidejte se k ${produkt.users} uživatelům.`}
      </p>
      <AffiliateLink
        produkt={produkt}
        source={source}
        placement={placement}
        className={buttonClass}
      >
        {buttonText}
        <ArrowRight className="w-5 h-5" />
      </AffiliateLink>
      <p className={`text-sm mt-4 ${variant === 'light' ? 'text-gray-500' : 'text-white/60'}`}>
        Registrace trvá pouze 2 minuty
      </p>
    </div>
  )
}
