'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { FaqItem } from '@/lib/types'

interface FaqSectionProps {
  title?: string
  items: FaqItem[]
}

export default function FaqSection({ title = "Často kladené otázky", items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items || items.length === 0) return null

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-romantic-100 rounded-xl mb-4">
            <HelpCircle className="w-6 h-6 text-romantic-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
