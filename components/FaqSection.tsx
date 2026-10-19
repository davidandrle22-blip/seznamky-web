import { ChevronDown } from 'lucide-react'
import { FaqItem } from '@/lib/types'

interface FaqSectionProps {
  title?: string
  items: FaqItem[]
  /** bez vlastní sekce/obalu (např. uvnitř článku) */
  bare?: boolean
}

// Odpovědi jsou vždy v HTML (kvůli SEO), rozbalování řeší nativní <details>.
export default function FaqSection({ title = 'Často kladené otázky', items, bare = false }: FaqSectionProps) {
  if (!items || items.length === 0) return null

  const list = (
    <div className="divide-y divide-ivory-200 panel overflow-hidden">
      {items.map((item, index) => (
        <details key={index} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 hover:bg-ivory/60 [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-base font-semibold text-ink-900">{item.question}</h3>
            <ChevronDown className="w-5 h-5 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-5 -mt-1 text-ink-600 leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  )

  if (bare) return list

  return (
    <section className="container-x py-16 lg:py-20">
      <p className="eyebrow text-center w-full justify-center flex">FAQ</p>
      <h2 className="h-section text-center mt-2 mb-10">{title}</h2>
      {list}
    </section>
  )
}
