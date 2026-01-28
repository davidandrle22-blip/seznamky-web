'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Clock, ChevronDown } from 'lucide-react'
import type { Produkt } from '@/lib/types'
import type { AffiliateSource } from '@/components/AffiliateLink'
import AffiliateLink from '@/components/AffiliateLink'

interface TableOfContentsItem {
  id: string
  title: string
  level?: number
}

interface ReviewPageLayoutProps {
  produkt: Produkt
  lastUpdated?: string
  tableOfContents?: TableOfContentsItem[]
  children: ReactNode
  source?: AffiliateSource
}

export default function ReviewPageLayout({
  produkt,
  lastUpdated,
  tableOfContents = [],
  children,
  source = 'detail'
}: ReviewPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [tocOpen, setTocOpen] = useState(false)

  // Track active section on scroll
  useEffect(() => {
    if (tableOfContents.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px' }
    )

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tableOfContents])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setTocOpen(false)
    }
  }

  return (
    <div className="review-container py-8 lg:py-12">
      {/* Mobile TOC - collapsible */}
      {tableOfContents.length > 0 && (
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 font-semibold text-gray-900"
          >
            <span>Obsah recenze</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
          </button>
          {tocOpen && (
            <nav className="mt-2 bg-white rounded-xl border border-gray-200 p-4 space-y-1">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-romantic-50 text-romantic-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${item.level === 2 ? 'pl-6' : ''}`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          )}
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main content */}
        <article className="prose-review">
          {/* Last updated badge */}
          {lastUpdated && (
            <div className="mb-8">
              <span className="last-updated">
                <Clock className="w-4 h-4" />
                Aktualizováno: {lastUpdated}
              </span>
            </div>
          )}

          {children}
        </article>

        {/* Desktop Sidebar */}
        {tableOfContents.length > 0 && (
          <aside className="hidden lg:block">
            <div className="review-sidebar">
              {/* TOC */}
              <nav className="review-toc mb-6">
                <h4 className="review-toc-title">
                  Obsah
                </h4>
                <ul className="review-toc-list">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`review-toc-item w-full text-left ${
                          activeSection === item.id ? 'active' : ''
                        } ${item.level === 2 ? 'pl-4 text-xs' : ''}`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sticky CTA */}
              <div className="bg-gradient-to-br from-romantic-50 to-pink-50 rounded-xl p-5 border border-romantic-200">
                <p className="font-semibold text-gray-900 mb-2">
                  {produkt.name}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-romantic-600">
                    {produkt.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">/10</span>
                </div>
                <AffiliateLink
                  produkt={produkt}
                  source={source}
                  placement="sidebar-cta"
                  className="block w-full bg-gradient-to-r from-romantic-600 to-romantic-700 hover:from-romantic-700 hover:to-romantic-800 text-white font-bold py-3 px-4 rounded-xl transition-all text-center shadow-lg shadow-romantic-500/25"
                >
                  Navštívit stránky
                </AffiliateLink>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Registrace zdarma
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="sticky-cta lg:hidden">
        <AffiliateLink
          produkt={produkt}
          source={source}
          placement="mobile-sticky-cta"
          className="block w-full bg-gradient-to-r from-romantic-600 to-romantic-700 text-white font-bold py-4 px-6 rounded-xl text-center"
        >
          Vyzkoušet {produkt.name}
        </AffiliateLink>
      </div>
      <div className="sticky-cta-spacer lg:hidden" />
    </div>
  )
}
