import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'
import { Clanek } from '@/lib/types'

interface ArticleCardProps {
  clanek: Clanek
  featured?: boolean
}

const categoryStyles: Record<string, {
  bg: string
  text: string
  border: string
}> = {
  tipy: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  bezpecnost: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  vztahy: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  profil: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  psychologie: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  recenze: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
  },
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  },
}

export default function ArticleCard({ clanek, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(clanek.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const style = categoryStyles[clanek.category] || categoryStyles.default
  const readTime = clanek.readTime || 5
  const hasImage = clanek.image && clanek.image.startsWith('/images/blog/')

  return (
    <Link
      href={`/clanky/${clanek.slug}`}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all flex flex-col h-full"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {hasImage ? (
          <Image
            src={clanek.image}
            alt={clanek.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-3 left-3 ${style.bg} ${style.text} ${style.border} border px-3 py-1 rounded text-xs font-semibold capitalize`}>
          {clanek.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {clanek.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {clanek.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <span>{clanek.author}</span>
          </div>

          <span className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Číst více
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
