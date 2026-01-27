'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, ChevronDown } from 'lucide-react'

const kategorieItems = [
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy' },
  { name: 'Flirt & nezávazné', href: '/kategorie/flirt-seznamky' },
  { name: 'Senior 50+', href: '/kategorie/senior-seznamky' },
  { name: 'Pro zadané', href: '/kategorie/seznamky-pro-zadane' },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky' },
  { name: 'Zdarma', href: '/kategorie/seznamky-zdarma' },
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

            {/* CTA Button */}
            <Link
              href="/seznamky"
              className="ml-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-2 px-5 rounded-lg transition-all shadow-romantic"
            >
              Najít lásku
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/seznamky"
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all"
            >
              Srovnat
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors"
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

            {/* Mobile CTA */}
            <div className="mt-4 px-3">
              <Link
                href="/seznamky"
                className="block w-full text-center bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Najít lásku
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
