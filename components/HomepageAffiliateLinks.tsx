'use client'

import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'
import Image from 'next/image'
import { Crown, Star, Users, CheckCircle, Zap, ExternalLink, Check, Award, Sparkles, Flame, EyeOff } from 'lucide-react'

interface EliteDateBannerProps {
  produkt: Produkt
}

export function EliteDateBanner({ produkt }: EliteDateBannerProps) {
  return (
    <section className="relative -mt-4 z-20 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-romantic-600 via-crimson-600 to-romantic-700 rounded-2xl p-1 shadow-2xl shadow-romantic-500/20">
          <div className="bg-gradient-to-br from-white to-romantic-50 rounded-xl p-5 lg:p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Badge */}
              <div className="flex items-center gap-3 lg:flex-shrink-0">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-romantic-200 bg-white">
                  <Image
                    src={produkt.logo}
                    alt={produkt.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="lg:hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-romantic-600 uppercase tracking-wider">Volba redakce 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{produkt.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow text-center lg:text-left">
                <div className="hidden lg:flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-romantic-600 uppercase tracking-wider">Volba redakce 2026</span>
                </div>
                <h3 className="hidden lg:block text-2xl font-bold text-gray-900 mb-2">{produkt.name}</h3>
                <p className="text-gray-600 mb-3 max-w-xl">{produkt.description}</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span className="font-bold text-amber-700">{produkt.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{produkt.users} uživatelů</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">92% úspěšnost párování</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-2 lg:flex-shrink-0">
                <AffiliateLink
                  produkt={produkt}
                  source="homepage"
                  placement="hero-banner"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-romantic-600 to-crimson-600 hover:from-romantic-700 hover:to-crimson-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-romantic-500/25 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Zap className="w-5 h-5" />
                  Vyzkoušet zdarma
                </AffiliateLink>
                <span className="text-xs text-gray-500">Registrace trvá jen 2 minuty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TopProductCardsProps {
  produkty: Produkt[]
}

export function TopProductCards({ produkty }: TopProductCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {produkty.slice(0, 3).map((produkt, index) => (
        <div
          key={produkt.id}
          className={`
            relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden
            transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
            ${index === 0 ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-gray-100'}
          `}
        >
          {/* Rank Badge */}
          <div className={`
            absolute top-0 left-0 px-4 py-2 rounded-br-xl font-bold text-white
            ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
              'bg-gradient-to-r from-amber-600 to-amber-700'}
          `}>
            <div className="flex items-center gap-1.5">
              {index === 0 && <Crown className="w-4 h-4" />}
              #{index + 1}
            </div>
          </div>

          {/* Featured Badge for #1 */}
          {index === 0 && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl">
              DOPORUČUJEME
            </div>
          )}

          <div className="p-5 pt-12">
            {/* Logo & Name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-md">
                <Image
                  src={produkt.logo}
                  alt={produkt.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900">{produkt.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{produkt.users} uživatelů</span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{produkt.description}</p>

            {/* Key Benefits */}
            <div className="space-y-1.5 mb-4">
              {produkt.pros.slice(0, 2).map((pro, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 line-clamp-1">{pro}</span>
                </div>
              ))}
            </div>

            {/* Free Badge */}
            {produkt.freeVersion && (
              <div className="mb-4">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  ZDARMA k vyzkoušení
                </span>
              </div>
            )}

            {/* CTA Button */}
            <AffiliateLink
              produkt={produkt}
              source="homepage"
              placement="top-card"
              className={`
                w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl
                transition-all duration-300 group
                ${index === 0
                  ? 'bg-gradient-to-r from-romantic-500 to-romantic-600 hover:from-romantic-600 hover:to-romantic-700 text-white shadow-lg shadow-romantic-500/30'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'}
              `}
            >
              Navštívit {produkt.name}
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </AffiliateLink>
          </div>
        </div>
      ))}
    </div>
  )
}

interface UrgencyBannerProps {
  produkt: Produkt
}

export function UrgencyBanner({ produkt }: UrgencyBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-romantic-50 to-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900">
              <span className="text-romantic-600">ELITE Date</span> - Exkluzivní nabídka
            </p>
            <p className="text-sm text-gray-600">Premium funkce na 7 dní zdarma pro nové členy</p>
          </div>
        </div>
        <AffiliateLink
          produkt={produkt}
          source="homepage"
          placement="urgency-banner"
          className="flex items-center gap-2 bg-gradient-to-r from-romantic-600 to-crimson-600 hover:from-romantic-700 hover:to-crimson-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Aktivovat nabídku
          <Sparkles className="w-4 h-4" />
        </AffiliateLink>
      </div>
    </div>
  )
}

interface VictoriaMilanBannerProps {
  produkt: Produkt
}

export function VictoriaMilanBanner({ produkt }: VictoriaMilanBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900">
              <span className="text-purple-600">Victoria Milan</span> - Pro diskrétní seznámení
            </p>
            <p className="text-sm text-gray-600">Zdarma pro ženy | 8M+ uživatelů | Maximální anonymita</p>
          </div>
        </div>
        <AffiliateLink
          produkt={produkt}
          source="homepage"
          placement="victoria-banner"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Vyzkoušet zdarma
          <Sparkles className="w-4 h-4" />
        </AffiliateLink>
      </div>
    </div>
  )
}
