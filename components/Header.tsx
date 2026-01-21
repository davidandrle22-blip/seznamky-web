'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, Sparkles, ChevronDown, Crown, Smile, Flame, Users, EyeOff, Rainbow, Gift, List, Star } from 'lucide-react'

const kategorieItems = [
  { name: 'Nejlepší seznamky', href: '/kategorie/nejlepsi-seznamky', description: 'Kompletní žebříček', icon: Crown },
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy', description: 'Pro hledající partnera', icon: Heart },
  { name: 'Flirt & nezávazné', href: '/kategorie/flirt-seznamky', description: 'Zábava bez závazků', icon: Smile },
  { name: 'Sex seznamky', href: '/kategorie/sex-seznamky', description: 'Pro dospělé 18+', icon: Flame },
  { name: 'Senior 50+', href: '/kategorie/senior-seznamky', description: 'Pro zralé singles', icon: Users },
  { name: 'Pro zadané', href: '/kategorie/seznamky-pro-zadane', description: 'Diskrétní seznámení', icon: EyeOff },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky', description: 'LGBTQ+ komunita', icon: Rainbow },
  { name: 'Zdarma', href: '/kategorie/seznamky-zdarma', description: 'Bezplatné možnosti', icon: Gift },
  { name: 'Všechny seznamky', href: '/kategorie/vsechny-seznamky', description: 'Kompletní katalog 24 seznamek', icon: List },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Domů', href: '/' },
    {
      name: 'Kategorie',
      href: '/kategorie/nejlepsi-seznamky',
      dropdown: kategorieItems
    },
    { name: 'Srovnání', href: '/seznamky' },
    { name: 'Blog', href: '/clanky' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  const topSeznamky = [
    { name: 'ELITE Date', href: '/api/affiliate/elite-date?source=header&placement=top-nav', badge: '🏆', isAffiliate: true },
    { name: 'Victoria Milan', href: '/api/affiliate/victoria-milan?source=header&placement=top-nav', badge: '🔥', isAffiliate: true },
    { name: 'Academic Singles', href: '/api/affiliate/academic-singles?source=header&placement=top-nav', badge: '🎓', isAffiliate: true },
  ]

  return (
    <header className={`
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100'
        : 'bg-white/90 backdrop-blur-md border-b border-romantic-100'
      }
    `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-romantic-500 via-crimson-500 to-ruby-600 rounded-2xl flex items-center justify-center shadow-lg shadow-romantic-500/30 group-hover:shadow-xl group-hover:shadow-romantic-500/40 transition-all duration-300 group-hover:scale-105">
                  <Heart
                    className="h-7 w-7 lg:h-8 lg:w-8 text-white drop-shadow-sm"
                    fill="white"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-romantic-600 via-crimson-500 to-ruby-600 bg-clip-text text-transparent">Seznamky</span>
                  <span className="text-gray-700">.info</span>
                </span>
                <span className="text-[10px] text-gray-500 -mt-0.5 hidden sm:block tracking-wider uppercase font-semibold">
                  Najdi svou lásku online
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-1 px-4 py-2 rounded-xl font-medium
                    transition-all duration-200
                    ${isScrolled
                      ? 'text-gray-700 hover:text-romantic-600 hover:bg-romantic-50'
                      : 'text-gray-700 hover:text-romantic-600 hover:bg-romantic-50/80'
                    }
                  `}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {item.dropdown.map((dropItem) => {
                      const IconComponent = dropItem.icon
                      return (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-romantic-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-romantic-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-romantic-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 block">{dropItem.name}</span>
                            <span className="text-xs text-gray-500">{dropItem.description}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Top Seznamky Quick Links - Prioritní affiliate */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              {topSeznamky.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    index === 0
                      ? 'bg-gradient-to-r from-romantic-500 to-crimson-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                      : 'bg-romantic-50 hover:bg-romantic-100 text-romantic-700 hover:text-romantic-800'
                  }`}
                >
                  <span className="text-sm">{item.badge}</span>
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA Button - Maximum Eye-catching */}
            <Link
              href="/seznamky"
              className="ml-4 relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse group-hover:blur-xl" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-xl opacity-90" />
              <div className="relative bg-gradient-to-r from-romantic-600 via-crimson-600 to-ruby-600 hover:from-romantic-500 hover:via-crimson-500 hover:to-ruby-500 text-white font-extrabold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(244,63,94,0.5)] hover:-translate-y-1.5 hover:scale-105 flex items-center gap-3 border-2 border-white/30">
                <div className="relative">
                  <Heart className="w-6 h-6 animate-bounce" fill="currentColor" />
                  <Heart className="w-6 h-6 absolute inset-0 animate-ping opacity-50" fill="currentColor" />
                </div>
                <span className="text-lg tracking-wide">Najít partnera</span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/seznamky"
              className="bg-gradient-to-r from-romantic-600 to-romantic-500 text-white font-semibold py-2 px-4 rounded-lg text-sm"
            >
              Srovnat
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-romantic-500 p-2 rounded-xl hover:bg-romantic-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-gray-100 mt-2 animate-slide-down">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-gray-700 hover:text-romantic-600 hover:bg-romantic-50 font-medium rounded-xl transition-colors"
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdown.map((dropItem) => {
                        const IconComponent = dropItem.icon
                        return (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className="flex items-center gap-2 py-2 px-4 text-sm text-gray-600 hover:text-romantic-600 hover:bg-romantic-50 rounded-lg transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <IconComponent className="w-4 h-4 text-romantic-500" />
                            {dropItem.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Top Seznamky - Prioritní affiliate */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">
                ⭐ Doporučené seznamky
              </p>
              <div className="flex flex-wrap gap-2 px-4">
                {topSeznamky.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold ${
                      index === 0
                        ? 'bg-gradient-to-r from-romantic-500 to-crimson-500 text-white'
                        : 'bg-romantic-50 text-romantic-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-sm">{item.badge}</span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile CTA - Eye-catching */}
            <div className="mt-4 px-4">
              <Link
                href="/seznamky"
                className="relative block w-full group"
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-romantic-600 via-crimson-500 to-ruby-500 rounded-xl blur-md opacity-75" />
                <div className="relative text-center bg-gradient-to-r from-romantic-600 via-crimson-500 to-ruby-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl border border-white/20">
                  <span className="flex items-center justify-center gap-2.5">
                    <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
                    <span className="text-lg">Najít partnera</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
