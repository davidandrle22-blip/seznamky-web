import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { Clanek } from '@/lib/types'

interface ArticleCardProps {
  clanek: Clanek
}

export default function ArticleCard({ clanek }: ArticleCardProps) {
  const formattedDate = new Date(clanek.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="card overflow-hidden group">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center">
        <span className="text-6xl">
          {clanek.category === 'tipy' && '💡'}
          {clanek.category === 'bezpecnost' && '🔒'}
          {clanek.category === 'vztahy' && '❤️'}
          {!['tipy', 'bezpecnost', 'vztahy'].includes(clanek.category) && '📝'}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {formattedDate}
          <span className="mx-2">•</span>
          <span className="capitalize">{clanek.category}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
          <Link href={`/clanky/${clanek.slug}`}>
            {clanek.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {clanek.excerpt}
        </p>

        <Link
          href={`/clanky/${clanek.slug}`}
          className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
        >
          Číst více
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
