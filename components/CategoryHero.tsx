'use client'

import { Crown, Heart, Smile, Flame, Users, EyeOff, Rainbow, Gift, List, Star, CheckCircle, Sparkles } from 'lucide-react'
import { Kategorie, Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  heart: Heart,
  smile: Smile,
  flame: Flame,
  users: Users,
  'eye-off': EyeOff,
  rainbow: Rainbow,
  gift: Gift,
  list: List,
}

interface CategoryHeroProps {
  kategorie: Kategorie
  productCount: number
  eliteDate?: Produkt
}

export default function CategoryHero({ kategorie, productCount, eliteDate }: CategoryHeroProps) {
  const IconComponent = iconMap[kategorie.icon] || Heart

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-romantic-950 via-romantic-900 to-crimson-950 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-romantic-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-crimson-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ruby-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Heart className="w-4 h-4 text-romantic-400 animate-pulse" fill="#fb7185" />
            <span className="text-sm font-medium text-romantic-200">Ověřené recenze 2026</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl mb-6 border border-white/20 shadow-2xl">
            <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-romantic-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              {kategorie.metaTitle || kategorie.name}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-romantic-100/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            {kategorie.description}
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
              <Star className="w-5 h-5 text-amber-400" fill="#fbbf24" />
              <span className="font-bold text-white text-lg">{productCount}</span>
              <span className="text-romantic-200">seznamek</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-romantic-200">Aktualizováno</span>
              <span className="font-bold text-white">Leden 2026</span>
            </div>
          </div>

          {/* CTA Button */}
          {eliteDate && (
            <AffiliateLink
              produkt={eliteDate}
              source="category"
              placement="hero-cta"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 border border-white/20"
            >
              <span className="text-lg">🏆 Vyzkoušet #1 ELITE Date</span>
              <Sparkles className="w-5 h-5" />
            </AffiliateLink>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
