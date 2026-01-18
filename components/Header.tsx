'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, Sparkles, ChevronDown, ExternalLink } from 'lucide-react'

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
      name: 'Srovnání',
      href: '/seznamky',
      dropdown: [
        { name: 'Všechny seznamky', href: '/seznamky', description: 'Kompletní přehled' },
        { name: 'Vážné vztahy', href: '/seznamky?kategorie=vazne-vztahy', description: 'Pro hledající partnera' },
        { name: 'Flirt & zábava', href: '/seznamky?kategorie=flirt', description: 'Nezávazné seznámení' },
        { name: 'Senior 50+', href: '/seznamky?kategorie=senior', description: 'Pro zralé singles' },
      ]
    },
    { name: 'Blog', href: '/clanky' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  const topSeznamky = [
    { name: 'ELITE Date', href: '/seznamky/elite-date', badge: '#1' },
    { name: 'Victoria Milan', href: '/seznamky/victoria-milan', badge: '#2' },
    { name: 'Singles50', href: '/seznamky/singles50', badge: '#3' },
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
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative">
                <Heart
                  className={`h-10 w-10 transition-all duration-300 group-hover:scale-110 ${
                    isScrolled ? 'text-romantic-500' : 'text-romantic-600'
                  }`}
                  fill="#e11d48"
                />
                <Sparkles className="h-4 w-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-romantic-600 via-crimson-500 to-ruby-500 bg-clip-text text-transparent">
                  NajdiLásku.cz
                </span>
                <span className="text-[10px] text-gray-500 -mt-0.5 hidden sm:block tracking-wide">
                  Srovnání nejlepších seznamek
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
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        href={dropItem.href}
                        className="flex flex-col px-4 py-3 hover:bg-romantic-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{dropItem.name}</span>
                        <span className="text-sm text-gray-500">{dropItem.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Top Seznamky Quick Links */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              {topSeznamky.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-romantic-50 rounded-lg text-sm font-medium text-gray-600 hover:text-romantic-600 transition-colors"
                >
                  <span className="text-xs bg-romantic-100 text-romantic-700 px-1.5 py-0.5 rounded font-bold">
                    {item.badge}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/seznamky"
              className="ml-4 bg-gradient-to-r from-romantic-600 via-romantic-500 to-crimson-500 hover:from-romantic-700 hover:via-romantic-600 hover:to-crimson-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-romantic-500/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              Najít partnera
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
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block py-2 px-4 text-sm text-gray-600 hover:text-romantic-600 hover:bg-romantic-50 rounded-lg transition-colors"
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

            {/* Mobile Top Seznamky */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">
                Top seznamky
              </p>
              <div className="flex flex-wrap gap-2 px-4">
                {topSeznamky.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-2 bg-romantic-50 rounded-lg text-sm font-medium text-romantic-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xs bg-romantic-200 px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-4 px-4">
              <Link
                href="/seznamky"
                className="block w-full text-center bg-gradient-to-r from-romantic-600 to-romantic-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  Najít partnera
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
