'use client'

import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'
import { ExternalLink } from 'lucide-react'

interface DetailCTAButtonProps {
  produkt: Produkt
  placement?: string
}

export function DetailCTAButton({ produkt, placement = 'header' }: DetailCTAButtonProps) {
  return (
    <AffiliateLink
      produkt={produkt}
      source="detail"
      placement={placement}
      className="bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-romantic-500/25"
    >
      Navštívit {produkt.name}
      <ExternalLink className="w-4 h-4" />
    </AffiliateLink>
  )
}

interface DetailBottomCTAProps {
  produkt: Produkt
}

export function DetailBottomCTA({ produkt }: DetailBottomCTAProps) {
  return (
    <div className="bg-gradient-to-r from-romantic-600 to-crimson-600 rounded-2xl p-8 text-center my-12">
      <h2 className="text-2xl font-bold text-white mb-4">
        Vyzkoušejte {produkt.name} ještě dnes
      </h2>
      <p className="text-romantic-100 mb-6">
        {produkt.freeVersion
          ? 'Registrace je zdarma a můžete ihned začít hledat svého partnera.'
          : 'Začněte hledat svého partnera ještě dnes.'}
      </p>
      <AffiliateLink
        produkt={produkt}
        source="detail"
        placement="bottom-cta"
        className="bg-white text-romantic-600 hover:bg-romantic-50 font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center shadow-lg"
      >
        Registrovat se na {produkt.name}
        <ExternalLink className="w-5 h-5 ml-2" />
      </AffiliateLink>
    </div>
  )
}
