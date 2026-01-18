import Link from 'next/link'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'
import { Clanek } from '@/lib/types'

interface ArticleCardProps {
  clanek: Clanek
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  tipy: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '💡' },
  bezpecnost: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🔒' },
  vztahy: { bg: 'bg-romantic-100', text: 'text-romantic-700', icon: '❤️' },
  profil: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '👤' },
  psychologie: { bg: 'bg-green-100', text: 'text-green-700', icon: '🧠' },
  default: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '📝' },
}

export default function ArticleCard({ clanek }: ArticleCardProps) {
  const formattedDate = new Date(clanek.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const categoryStyle = categoryColors[clanek.category] || categoryColors.default

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image placeholder with gradient */}
      <div className="relative h-52 bg-gradient-to-br from-romantic-400 via-romantic-500 to-ruby-500 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="text-7xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
          {categoryStyle.icon}
        </span>

        {/* Category badge */}
        <div className={`absolute top-4 left-4 ${categoryStyle.bg} ${categoryStyle.text} px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
          {clanek.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            5 min čtení
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-romantic-600 transition-colors line-clamp-2">
          <Link href={`/clanky/${clanek.slug}`}>
            {clanek.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
          {clanek.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-8 h-8 bg-romantic-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-romantic-500" />
            </div>
            <span>{clanek.author}</span>
          </div>

          <Link
            href={`/clanky/${clanek.slug}`}
            className="inline-flex items-center text-romantic-600 font-semibold hover:text-romantic-700 transition-colors group/link"
          >
            Číst více
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
