import Link from 'next/link'
import Image from 'next/image'
import {
  Star, Users, ExternalLink, ChevronRight, Check, X,
  Crown, TrendingUp, Shield, Heart, Zap, Gift,
  Globe, Award, Sparkles, Clock, Flame
} from 'lucide-react'
import { Produkt } from '@/lib/types'

interface ProductCardProps {
  produkt: Produkt
  rank?: number
  variant?: 'default' | 'compact' | 'featured'
}

export default function ProductCard({ produkt, rank, variant = 'default' }: ProductCardProps) {
  const isTopRated = rank === 1
  const isTop3 = rank && rank <= 3

  const getRankStyle = () => {
    if (rank === 1) return 'rank-1'
    if (rank === 2) return 'rank-2'
    if (rank === 3) return 'rank-3'
    return 'rank-default'
  }

  const getRankBanner = () => {
    if (rank === 1) return {
      icon: Crown,
      text: 'Nejlepší volba 2026',
      gradient: 'from-amber-400 via-amber-500 to-yellow-500',
      glow: 'shadow-amber-500/30'
    }
    if (rank === 2) return {
      icon: TrendingUp,
      text: 'Velmi populární',
      gradient: 'from-gray-400 via-gray-500 to-slate-500',
      glow: 'shadow-gray-500/20'
    }
    if (rank === 3) return {
      icon: Heart,
      text: 'Doporučujeme',
      gradient: 'from-amber-500 via-amber-600 to-orange-600',
      glow: 'shadow-amber-500/25'
    }
    return null
  }

  const rankBanner = getRankBanner()

  // Rating bar width calculation
  const ratingPercent = (produkt.rating / 10) * 100

  return (
    <div className={`
      relative overflow-hidden rounded-2xl bg-white border
      transition-all duration-500 ease-out
      ${isTopRated
        ? 'ring-2 ring-romantic-500 ring-offset-4 shadow-xl shadow-romantic-500/10 border-romantic-200'
        : 'border-gray-100 shadow-card hover:shadow-card-hover'
      }
      ${isTopRated ? 'hover:-translate-y-1' : 'hover:-translate-y-0.5'}
    `}>
      {/* Top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
        isTopRated
          ? 'from-romantic-500 via-crimson-500 to-ruby-500'
          : 'from-romantic-400 via-romantic-500 to-crimson-500'
      }`} />

      {/* Award banner for top 3 */}
      {rankBanner && (
        <div className={`
          bg-gradient-to-r ${rankBanner.gradient}
          text-white py-2.5 px-4
          flex items-center justify-center gap-2
          shadow-lg ${rankBanner.glow}
        `}>
          <rankBanner.icon className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">{rankBanner.text}</span>
          {isTopRated && <Sparkles className="w-4 h-4 animate-pulse" />}
        </div>
      )}

      {/* New badge */}
      {produkt.isNew && (
        <div className="absolute top-4 left-4 z-10">
          <span className="badge-new flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Novinka
          </span>
        </div>
      )}

      {/* Rank badge */}
      {rank && (
        <div className={`
          absolute ${rankBanner ? 'top-16' : 'top-6'} right-6
          w-14 h-14 rounded-2xl
          flex items-center justify-center
          font-bold text-xl
          shadow-lg z-10
          ${getRankStyle()}
          ${isTopRated ? 'animate-pulse-slow' : ''}
        `}>
          #{rank}
        </div>
      )}

      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Logo & Rating Section */}
          <div className="flex-shrink-0 flex flex-col items-center lg:w-44">
            {/* Logo */}
            <div className={`
              w-28 h-28 rounded-2xl
              bg-gradient-to-br from-gray-50 to-gray-100
              flex items-center justify-center
              shadow-inner overflow-hidden
              border-2 ${isTopRated ? 'border-romantic-200' : 'border-gray-100'}
              transition-transform duration-300 hover:scale-105
            `}>
              {produkt.logo ? (
                <Image
                  src={produkt.logo}
                  alt={produkt.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              ) : (
                <span className="text-4xl font-bold gradient-text">{produkt.name.charAt(0)}</span>
              )}
            </div>

            {/* Rating Circle */}
            <div className="mt-5 relative">
              <div className={`
                w-20 h-20 rounded-full
                bg-gradient-to-br from-romantic-500 to-crimson-600
                flex flex-col items-center justify-center
                shadow-lg shadow-romantic-500/30
                ${isTopRated ? 'ring-4 ring-romantic-200' : ''}
              `}>
                <span className="text-2xl font-bold text-white">{produkt.rating}</span>
                <span className="text-[10px] text-romantic-100">z 10</span>
              </div>
              {isTopRated && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-0.5 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(produkt.rating / 2)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-grow min-w-0">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                {produkt.name}
                {produkt.isFeatured && (
                  <span className="badge-hot">Hot</span>
                )}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">{produkt.description}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="bg-gradient-to-br from-romantic-50 to-romantic-100/50 rounded-xl p-3 text-center border border-romantic-100">
                <Users className="w-5 h-5 text-romantic-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">{produkt.users}</div>
                <div className="text-xs text-gray-500">uživatelů</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl p-3 text-center border border-green-100">
                <Heart className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">{produkt.successRate || '75%'}</div>
                <div className="text-xs text-gray-500">úspěšnost</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 text-center border border-blue-100">
                <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">{produkt.ageRange}</div>
                <div className="text-xs text-gray-500">věk</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 text-center border border-amber-100">
                <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="font-bold text-gray-900">{produkt.pricing}</div>
                <div className="text-xs text-gray-500">cena</div>
              </div>
            </div>

            {/* Rating bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Celkové hodnocení</span>
                <span className="text-sm font-bold text-romantic-600">{produkt.rating}/10</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-romantic-500 via-crimson-500 to-romantic-400 rounded-full transition-all duration-1000"
                  style={{ width: `${ratingPercent}%` }}
                />
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-green-700 uppercase tracking-wide">Výhody</span>
                </div>
                <ul className="space-y-2">
                  {produkt.pros.slice(0, 3).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-romantic-50/50 rounded-xl p-4 border border-romantic-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-romantic-500 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-romantic-700 uppercase tracking-wide">Nevýhody</span>
                </div>
                <ul className="space-y-2">
                  {produkt.cons.slice(0, 3).map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <X className="w-4 h-4 text-romantic-400 flex-shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features Tags */}
            <div className="flex flex-wrap gap-2">
              {produkt.features.slice(0, 5).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-romantic-100 text-gray-700 hover:text-romantic-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-default"
                >
                  {feature}
                </span>
              ))}
              {produkt.features.length > 5 && (
                <span className="bg-romantic-100 text-romantic-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  +{produkt.features.length - 5} dalších
                </span>
              )}
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="flex flex-col gap-3 lg:w-56 lg:flex-shrink-0 lg:border-l lg:border-gray-100 lg:pl-6">
            {/* Free version badge */}
            {produkt.freeVersion && (
              <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2 px-4 rounded-xl border border-green-200 mb-2">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-semibold">Má bezplatnou verzi</span>
              </div>
            )}

            {/* Price highlight */}
            <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 mb-2">
              <div className="text-xs text-gray-500 mb-1">Cena od</div>
              <div className="text-xl font-bold gradient-text">{produkt.pricing}</div>
            </div>

            {/* CTA Buttons */}
            <a
              href={produkt.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-center
                flex items-center justify-center gap-2
                transition-all duration-300
                ${isTopRated
                  ? 'bg-gradient-to-r from-romantic-600 via-romantic-500 to-crimson-500 hover:from-romantic-700 hover:via-romantic-600 hover:to-crimson-600 text-white shadow-lg shadow-romantic-500/30 hover:shadow-xl hover:-translate-y-0.5 animate-pulse-slow'
                  : 'bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white shadow-md hover:shadow-lg'
                }
              `}
            >
              {isTopRated ? (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Registrovat se ZDARMA</span>
                </>
              ) : (
                <>
                  <span>Navštívit {produkt.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </a>

            {isTopRated && (
              <div className="text-center text-xs text-green-600 font-medium bg-green-50 py-2 px-3 rounded-lg border border-green-200">
                Registrace trvá jen 2 minuty
              </div>
            )}

            <Link
              href={`/seznamky/${produkt.slug}`}
              className="w-full btn-secondary py-3 text-center group"
            >
              <span>Přečíst recenzi</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Trust indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Ověřený a bezpečný web</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
