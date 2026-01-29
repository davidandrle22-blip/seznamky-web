'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, ChevronDown, BookOpen } from 'lucide-react'

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

  // E-book link - scrolls to lead magnet or goes to dedicated page
  const ebookLink = '/ebook'

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
                  Najděte svou lásku
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

            {/* Top 3 Dating Sites */}
            <div className="hidden xl:flex items-center gap-2 ml-2 pl-4 border-l border-rose-200">
              <Link
                href="/seznamky/elite-date"
                className="text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
              >
                ELITE Date
              </Link>
              <Link
                href="/seznamky/victoria-milan"
                className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded transition-colors"
              >
                Victoria Milan
              </Link>
              <Link
                href="/seznamky/academic-singles"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-2 py-1 rounded transition-colors"
              >
                Academic Singles
              </Link>
            </div>

            {/* E-book Button */}
            <Link
              href={ebookLink}
              className="header-cta-secondary--desktop ml-2"
            >
              <BookOpen className="header-cta-icon" />
              <span>E-book zdarma</span>
            </Link>

            {/* CTA Button */}
            <Link
              href="/seznamky"
              className="header-cta-primary--desktop ml-2"
            >
              <Heart className="header-cta-icon" fill="currentColor" />
              <span>Najít lásku</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/seznamky"
              className="header-cta-primary--mobile-header"
            >
              <Heart className="header-cta-icon" fill="currentColor" />
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
            <div className="mt-4 px-3 space-y-3">
              <Link
                href={ebookLink}
                className="header-cta-secondary--mobile-menu"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="header-cta-icon--mobile" />
                <span>E-book zdarma</span>
              </Link>
              <Link
                href="/seznamky"
                className="header-cta-primary--mobile-menu"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="header-cta-icon--mobile" fill="currentColor" />
                <span>Najít lásku</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
