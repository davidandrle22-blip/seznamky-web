'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, ChevronDown } from 'lucide-react'

const kategorieItems = [
  { name: 'Nejlepší seznamky', href: '/kategorie/nejlepsi-seznamky' },
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy' },
  { name: 'Flirt & nezávazné', href: '/kategorie/flirt-seznamky' },
  { name: 'Sex seznamky 18+', href: '/kategorie/sex-seznamky' },
  { name: 'Senior 50+', href: '/kategorie/senior-seznamky' },
  { name: 'Pro zadané', href: '/kategorie/seznamky-pro-zadane' },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky' },
  { name: 'Zdarma', href: '/kategorie/seznamky-zdarma' },
  { name: 'Luxusní seznamky', href: '/kategorie/luxusni-seznamky' },
  { name: 'Všechny seznamky', href: '/seznamky' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Domů', href: '/' },
    {
      name: 'Kategorie',
      href: '/seznamky',
      dropdown: kategorieItems
    },
    { name: 'Srovnání', href: '/seznamky' },
    { name: 'Blog', href: '/clanky' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  return (
    <header className={`
      sticky top-0 z-50 transition-all duration-300 bg-white
      ${isScrolled ? 'shadow-md' : 'shadow-sm'}
      border-b border-rose-100
    `}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:from-rose-600 group-hover:to-rose-700 transition-all shadow-romantic">
                <Heart className="h-6 w-6 text-white" fill="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  Seznamky<span className="text-rose-600">.info</span>
                </span>
                <span className="text-[10px] text-gray-500 hidden sm:block">
                  Najdi svou lásku
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
                  className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-rose-100 py-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Top Dating Sites - Výrazné buttony */}
            <div className="hidden xl:flex items-center gap-3 ml-3 pl-4 border-l border-rose-200">
              <Link
                href="/seznamky/elite-date"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="text-rose-200">★</span>
                ELITE Date
              </Link>
              <Link
                href="/seznamky/victoria-milan"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="text-purple-200">♥</span>
                Victoria Milan
              </Link>
              <Link
                href="/seznamky/divoke-rande"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="text-orange-200">🔥</span>
                Divoké Rande
              </Link>
            </div>

            {/* CTA Button - Odlišený design */}
            <Link
              href="/seznamky"
              className="ml-6 inline-flex items-center gap-2 px-6 py-2.5 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white font-bold rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              <span>Najít lásku</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/seznamky"
              className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white font-bold rounded-lg text-sm transition-all bg-white/80"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              <span>Najít lásku</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-600 p-2.5 rounded-xl hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-rose-100 mt-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 px-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium rounded-lg transition-colors"
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block py-2 px-3 text-sm text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="mt-4 px-3">
              <Link
                href="/seznamky"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white font-bold rounded-xl transition-all bg-white"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                <span>Najít lásku</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
