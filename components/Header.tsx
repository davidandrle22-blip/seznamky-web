'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'

const kategorieItems = [
  { name: 'Nejlepší seznamky', href: '/kategorie/nejlepsi-seznamky', note: 'Top výběr redakce' },
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy', note: 'Pro dlouhodobý vztah' },
  { name: 'Senior seznamky 50+', href: '/kategorie/senior-seznamky', note: 'Pro zralé singles' },
  { name: 'Luxusní seznamky', href: '/kategorie/luxusni-seznamky', note: 'Pro náročné' },
  { name: 'Seznamky pro zadané', href: '/kategorie/seznamky-pro-zadane', note: 'Diskrétní seznámení' },
  { name: 'Flirt & nezávazné', href: '/kategorie/flirt-seznamky', note: 'Flirt a zábava' },
  { name: 'Sex seznamky 18+', href: '/kategorie/sex-seznamky', note: 'Pro dospělé' },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky', note: 'Pro LGBTQ+ komunitu' },
  { name: 'Seznamky zdarma', href: '/kategorie/seznamky-zdarma', note: 'Bez placení' },
]

const topRecenze = [
  { name: 'ELITE Date', href: '/seznamky/elite-date' },
  { name: 'Victoria Milan', href: '/seznamky/victoria-milan' },
  { name: 'Academic Singles', href: '/seznamky/academic-singles' },
  { name: 'Singles50', href: '/seznamky/singles50' },
  { name: 'be2', href: '/seznamky/be2' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setMegaOpen(false)
  }, [pathname])

  const navLink = (href: string) =>
    `px-3.5 py-2 rounded-lg text-[15px] font-medium transition-colors ${
      pathname === href ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(23,17,28,0.06),0_8px_24px_-16px_rgba(23,17,28,0.25)]' : 'bg-ivory'
      }`}
    >
      <nav className="container-wide" aria-label="Hlavní navigace">
        <div className="flex items-center justify-between h-[68px]">
          <Logo />

          <div className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-[15px] font-medium text-ink-500 hover:text-ink-900"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen(v => !v)}
              >
                Kategorie <ChevronDown className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              {megaOpen && (
                <div className="absolute left-0 top-full pt-2 w-[620px]">
                  <div className="panel p-5 grid grid-cols-[1fr_200px] gap-6">
                    <div className="grid grid-cols-2 gap-1">
                      {kategorieItems.map(item => (
                        <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2.5 hover:bg-ivory-100 transition-colors">
                          <span className="block text-sm font-semibold text-ink-900">{item.name}</span>
                          <span className="block text-xs text-ink-400">{item.note}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-l border-ivory-200 pl-5">
                      <p className="eyebrow mb-3">Nejčtenější recenze</p>
                      <ul className="space-y-2">
                        {topRecenze.map(r => (
                          <li key={r.href}>
                            <Link href={r.href} className="text-sm text-ink-600 hover:text-rose-700">{r.name} recenze</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/seznamky" className={navLink('/seznamky')}>Srovnání seznamek</Link>
            <Link href="/clanky" className={navLink('/clanky')}>Magazín</Link>
            <Link href="/jak-hodnotime" className={navLink('/jak-hodnotime')}>Jak hodnotíme</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/seznamky/elite-date" className="text-sm font-medium text-ink-500 hover:text-ink-900">
              Vítěz srovnání: <span className="text-ink-900 font-semibold">ELITE Date</span>
            </Link>
            <Link href="/kategorie/nejlepsi-seznamky" className="btn-wine !py-2.5 !px-5 text-sm">
              Najít seznamku
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 -mr-2 rounded-xl text-ink-700 hover:bg-ivory-100"
            aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-ivory-200">
            <p className="eyebrow mt-3 mb-2 px-1">Kategorie</p>
            <div className="grid grid-cols-2 gap-1">
              {kategorieItems.map(item => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-sm font-medium text-ink-700 hover:bg-ivory-100">
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 grid gap-1 border-t border-ivory-200 pt-3">
              <Link href="/seznamky" className="px-2 py-2 font-medium text-ink-800">Srovnání seznamek</Link>
              <Link href="/clanky" className="px-2 py-2 font-medium text-ink-800">Magazín o seznamování</Link>
              <Link href="/jak-hodnotime" className="px-2 py-2 font-medium text-ink-800">Jak hodnotíme</Link>
            </div>
            <Link href="/kategorie/nejlepsi-seznamky" className="btn-wine w-full mt-4">Najít seznamku</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
