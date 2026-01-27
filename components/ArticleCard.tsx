import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { Clanek } from '@/lib/types'

interface ArticleCardProps {
  clanek: Clanek
  featured?: boolean
}

// Mapování autorů na fotografie - ženy mají ženské fotky, muži mužské
const authorPhotos: Record<string, string> = {
  // Ženská jména → ženské fotografie
  'Tereza Nováková': '/images/authors/tereza-novakova.jpg',
  'Jana Procházková': '/images/authors/jana-prochazkova.jpg',
  'Lucie Králová': '/images/authors/lucie-kralova.jpg',
  'Kateřina Novotná': '/images/authors/katerina-novotna.jpg',
  'Kateřina Veselá': '/images/authors/lucie-kralova.jpg',
  'Mgr. Anna Černá': '/images/authors/tereza-novakova.jpg',
  // Mužská jména → mužské fotografie
  'Martin Dvořák': '/images/authors/martin-dvorak.jpg',
  'Petr Svoboda': '/images/authors/petr-svoboda.jpg',
  'Tomáš Marek': '/images/authors/tomas-marek.jpg',
  'PhDr. Jan Malý': '/images/authors/tomas-marek.jpg',
  'Mgr. Pavel Novotný': '/images/authors/martin-dvorak.jpg',
  // Redakce a týmy
  'Finanční tým Seznamky.info': '/images/authors/redakce.jpg',
  'Anonymní přispěvatel': '/images/authors/redakce.jpg',
  'Redakce Seznamky.info': '/images/authors/redakce.jpg',
  'default': '/images/authors/redakce.jpg',
}

const categoryStyles: Record<string, {
  bg: string
  text: string
  border: string
}> = {
  tipy: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  bezpecnost: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  vztahy: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-pink-200',
  },
  profil: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  psychologie: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  recenze: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
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
  const authorPhoto = authorPhotos[clanek.author] || authorPhotos['default']

  return (
    <Link
      href={`/clanky/${clanek.slug}`}
      className="group bg-white rounded-xl border border-rose-100 overflow-hidden hover:shadow-lg hover:shadow-rose-100/50 hover:border-rose-300 transition-all flex flex-col h-full"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-rose-50">
        {hasImage ? (
          <Image
            src={clanek.image}
            alt={clanek.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
            <span className="text-4xl">💕</span>
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-3 left-3 ${style.bg} ${style.text} ${style.border} border px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
          {clanek.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            {readTime} min
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
          {clanek.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {clanek.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-rose-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-rose-200 flex-shrink-0">
              <Image
                src={authorPhoto}
                alt={clanek.author}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium truncate max-w-[120px]">{clanek.author}</span>
          </div>

          <span className="text-rose-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Číst
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
