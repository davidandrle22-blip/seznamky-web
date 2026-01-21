'use client'

import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'
import Image from 'next/image'
import { Crown, Star, CheckCircle, Users, Zap, EyeOff, ArrowRight } from 'lucide-react'

interface CategoryEliteDateBannerProps {
  produkt: Produkt
}

export function CategoryEliteDateBanner({ produkt }: CategoryEliteDateBannerProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-romantic-300 shadow-lg p-5 lg:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
        #1 VOLBA REDAKCE
      </div>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-romantic-200">
            <Image
              src={produkt.logo}
              alt={produkt.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-romantic-600 uppercase">Naše doporučení</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
          </div>
        </div>

        <div className="flex-grow hidden lg:block">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="font-bold">{produkt.rating}/10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>92% úspěšnost</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-romantic-500" />
              <span>{produkt.users}</span>
            </div>
          </div>
        </div>

        <AffiliateLink
          produkt={produkt}
          source="category"
          placement="elite-banner"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-romantic-600 to-crimson-600 hover:from-romantic-700 hover:to-crimson-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-romantic-500/20 hover:shadow-xl whitespace-nowrap"
        >
          <Zap className="w-4 h-4" />
          Vyzkoušet zdarma
        </AffiliateLink>
      </div>
    </div>
  )
}

interface CategoryVictoriaMilanBannerProps {
  produkt: Produkt
}

export function CategoryVictoriaMilanBanner({ produkt }: CategoryVictoriaMilanBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl border-2 border-purple-300 shadow-lg p-5 lg:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
        #2 TOP DISKRÉTNÍ
      </div>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-purple-200">
            <Image
              src={produkt.logo}
              alt={produkt.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <EyeOff className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-bold text-purple-600 uppercase">Maximální diskrétnost</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
          </div>
        </div>

        <div className="flex-grow hidden lg:block">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="font-bold">{produkt.rating}/10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Zdarma pro ženy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{produkt.users}</span>
            </div>
          </div>
        </div>

        <AffiliateLink
          produkt={produkt}
          source="category"
          placement="victoria-banner"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/20 hover:shadow-xl whitespace-nowrap"
        >
          <Zap className="w-4 h-4" />
          Vyzkoušet zdarma
        </AffiliateLink>
      </div>
    </div>
  )
}

interface CategoryBottomCTAProps {
  produkt: Produkt
}

export function CategoryBottomCTA({ produkt }: CategoryBottomCTAProps) {
  return (
    <AffiliateLink
      produkt={produkt}
      source="category"
      placement="bottom-cta"
      className="inline-flex items-center bg-white text-romantic-600 font-bold py-4 px-8 rounded-xl hover:bg-romantic-50 transition-colors shadow-lg"
    >
      Navštívit {produkt.name}
      <ArrowRight className="w-5 h-5 ml-2" />
    </AffiliateLink>
  )
}
