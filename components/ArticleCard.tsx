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
  icon: string
  gradient: string
}> = {
  tipy: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: '💡',
    gradient: 'from-amber-500 via-orange-500 to-yellow-600'
  },
  bezpecnost: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: '🔒',
    gradient: 'from-emerald-500 via-green-500 to-teal-600'
  },
  vztahy: {
    bg: 'bg-romantic-500/20',
    text: 'text-romantic-400',
    border: 'border-romantic-500/30',
    icon: '❤️',
    gradient: 'from-romantic-500 via-crimson-500 to-ruby-600'
  },
  profil: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    icon: '👤',
    gradient: 'from-purple-500 via-violet-500 to-indigo-600'
  },
  psychologie: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: '🧠',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600'
  },
  recenze: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    icon: '⭐',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600'
  },
  default: {
    bg: 'bg-gray-700',
    text: 'text-white',
    border: 'border-gray-600',
    icon: '📝',
    gradient: 'from-gray-600 via-gray-500 to-gray-700'
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

  if (featured) {
    return (
      <div className="group bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-romantic-500/50 transition-all duration-300 h-full">
        <div className="flex flex-col h-full">
          {/* Large image area */}
          <div className="relative h-72 lg:h-80 overflow-hidden">
            {hasImage ? (
              <>
                <Image
                  src={clanek.image}
                  alt={clanek.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-gray-950/20" />
              </>
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center text-9xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  {style.icon}
                </span>
              </>
            )}

            {/* Featured badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-romantic-500 to-crimson-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg z-10">
              <span>⭐</span>
              Doporučený článek
            </div>

            {/* Category badge */}
            <div className={`absolute top-4 left-4 ${style.bg} ${style.text} ${style.border} border px-4 py-2 rounded-full text-sm font-bold capitalize backdrop-blur-sm z-10`}>
              {clanek.category}
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-romantic-200 transition-colors drop-shadow-lg">
                <Link href={`/clanky/${clanek.slug}`}>
                  {clanek.title}
                </Link>
              </h3>
            </div>
          </div>

          <div className="p-6 lg:p-8 flex flex-col flex-grow">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-white mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime} min čtení
              </div>
            </div>

            <p className="text-white mb-6 text-lg leading-relaxed flex-grow">
              {clanek.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3 text-sm text-white">
                <div className="w-10 h-10 bg-romantic-500/20 rounded-full flex items-center justify-center border border-romantic-500/30">
                  <User className="w-5 h-5 text-romantic-400" />
                </div>
                <span className="font-medium">{clanek.author}</span>
              </div>

              <Link
                href={`/clanky/${clanek.slug}`}
                className="inline-flex items-center bg-gradient-to-r from-romantic-500 to-crimson-600 text-white font-bold py-3 px-6 rounded-xl hover:from-romantic-600 hover:to-crimson-700 transition-all shadow-lg shadow-romantic-500/25 group/link"
              >
                Číst článek
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-romantic-500/50 transition-all duration-300 flex flex-col h-full">
      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        {hasImage ? (
          <>
            <Image
              src={clanek.image}
              alt={clanek.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center text-7xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-xl">
              {style.icon}
            </span>
          </>
        )}

        {/* Category badge */}
        <div className={`absolute top-4 left-4 ${style.bg} ${style.text} ${style.border} border px-3 py-1 rounded-full text-xs font-semibold capitalize backdrop-blur-sm z-10`}>
          {clanek.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-white mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime} min čtení
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-romantic-400 transition-colors line-clamp-2">
          <Link href={`/clanky/${clanek.slug}`}>
            {clanek.title}
          </Link>
        </h3>

        <p className="text-white mb-4 line-clamp-2 flex-grow">
          {clanek.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-sm text-white">
            <div className="w-8 h-8 bg-romantic-500/20 rounded-full flex items-center justify-center border border-romantic-500/30">
              <User className="w-4 h-4 text-romantic-400" />
            </div>
            <span>{clanek.author}</span>
          </div>

          <Link
            href={`/clanky/${clanek.slug}`}
            className="inline-flex items-center text-romantic-400 font-semibold hover:text-romantic-300 transition-colors group/link"
          >
            Číst více
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
