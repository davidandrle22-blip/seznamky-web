import Link from 'next/link'
import Image from 'next/image'
import { Check, ChevronRight, Users, CalendarRange, Gift } from 'lucide-react'
import { Produkt } from '@/lib/types'
import AffiliateLink, { AffiliateSource } from './AffiliateLink'
import { AWARDS, isTracked } from '@/lib/monetization'

export function ratingLabel(rating: number): string {
  if (rating >= 9) return 'Výjimečné'
  if (rating >= 8.5) return 'Vynikající'
  if (rating >= 8) return 'Velmi dobré'
  if (rating >= 7) return 'Dobré'
  return 'Průměrné'
}

export function ScoreBadge({ rating, size = 'md' }: { rating: number; size?: 'md' | 'lg' }) {
  const big = size === 'lg'
  return (
    <div className={`score-badge ${big ? '!w-[92px] !h-[92px]' : '!w-[80px]'}`} aria-label={`Hodnocení ${rating} z 10`}>
      <span className={`font-display font-semibold leading-none ${big ? 'text-4xl' : 'text-[1.7rem]'}`}>{rating.toFixed(1)}</span>
      <span className="mt-1 px-1 text-[9px] leading-tight uppercase tracking-wide text-gold-300 text-center whitespace-nowrap">{ratingLabel(rating)}</span>
    </div>
  )
}

function medalClass(rank: number) {
  if (rank === 1) return 'bg-gradient-to-b from-gold-200 to-gold-500 text-ink-950 shadow-gold'
  if (rank === 2) return 'bg-gradient-to-b from-ink-100 to-ink-300 text-ink-900'
  if (rank === 3) return 'bg-gradient-to-b from-[#f1d3b8] to-[#c08a5c] text-ink-950'
  return 'bg-ivory-100 text-ink-500 ring-1 ring-ivory-300'
}

interface RankedListProps {
  produkty: Produkt[]
  source: AffiliateSource
  limit?: number
  startRank?: number
  /** Zvýraznit první položku jako vítěze */
  highlightFirst?: boolean
}

export default function RankedList({ produkty, source, limit, startRank = 1, highlightFirst = true }: RankedListProps) {
  const items = typeof limit === 'number' ? produkty.slice(0, limit) : produkty

  return (
    <ol className="space-y-4">
      {items.map((p, i) => {
        const rank = startRank + i
        const winner = highlightFirst && rank === 1
        const tracked = isTracked(p.slug)
        const award = AWARDS[p.slug]

        return (
          <li
            key={p.id}
            className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-premium-lg ${
              winner ? 'border-gold-300 shadow-premium-lg ring-1 ring-gold-200' : 'border-ivory-300/80 shadow-premium'
            }`}
          >
            {winner && (
              <div className="absolute -top-3 left-6 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300 shadow">
                ★ Vítěz srovnání
              </div>
            )}
            <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              {/* Identita */}
              <div className="flex items-center gap-4 md:w-[290px]">
                <span className={`rank-medal ${medalClass(rank)}`}>{rank}</span>
                <Link href={`/seznamky/${p.slug}`} className="relative w-16 h-16 shrink-0 rounded-xl border border-ivory-300 bg-white overflow-hidden">
                  <Image src={p.logo} alt={`${p.name} logo`} fill sizes="64px" className="object-contain p-1.5" />
                </Link>
                <div className="min-w-0">
                  <Link href={`/seznamky/${p.slug}`} className="font-display text-xl font-semibold text-ink-900 hover:text-rose-700">
                    {p.name}
                  </Link>
                  {award ? (
                    <div className="mt-1"><span className="chip-gold">{award}</span></div>
                  ) : (
                    <p className="mt-1 text-xs text-ink-400 line-clamp-1">{p.targetAudience || p.ageRange}</p>
                  )}
                </div>
              </div>

              {/* Výhody */}
              <div className="md:border-l md:border-ivory-200 md:pl-6">
                <ul className="space-y-1.5">
                  {p.pros.slice(0, 3).map((pro, k) => (
                    <li key={k} className="flex items-start gap-2 text-[15px] text-ink-600">
                      <Check className="w-4 h-4 mt-1 shrink-0 text-emerald-600" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-400">
                  <span className="inline-flex items-center gap-1"><CalendarRange className="w-3.5 h-3.5" /> Věk {p.ageRange}</span>
                  {p.users && <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {p.users} registrací</span>}
                  {p.freeVersion && <span className="inline-flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> Registrace zdarma</span>}
                </div>
              </div>

              {/* Skóre + CTA */}
              <div className="flex items-center gap-4 md:flex-col md:items-stretch md:w-[200px]">
                <div className="flex items-center gap-3 md:justify-center">
                  <ScoreBadge rating={p.rating} />
                </div>
                <div className="flex-1 md:flex-none">
                  <AffiliateLink
                    produkt={p}
                    source={source}
                    placement={`rank-${rank}`}
                    className={`${tracked ? (winner ? 'btn-gold' : 'btn-wine') : 'btn-line'} w-full !px-4 text-[15px]`}
                  >
                    {tracked ? 'Registrace zdarma' : 'Navštívit web'}
                    <ChevronRight className="w-4 h-4" />
                  </AffiliateLink>
                  <Link href={`/seznamky/${p.slug}`} className="mt-2 block text-center text-sm font-medium text-ink-500 hover:text-rose-700">
                    Přečíst recenzi
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
