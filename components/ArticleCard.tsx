import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Clanek } from '@/lib/types'
import { categoryLabel } from '@/lib/article-categories'
import { formatDateCz } from '@/lib/site'

interface ArticleCardProps {
  clanek: Clanek
  featured?: boolean
}

export default function ArticleCard({ clanek, featured = false }: ArticleCardProps) {
  const hasImage = Boolean(clanek.image && clanek.image.startsWith('/images/'))

  return (
    <Link
      href={`/clanky/${clanek.slug}`}
      className={`group panel-hover overflow-hidden flex flex-col h-full ${featured ? 'md:flex-row' : ''}`}
    >
      <div className={`relative overflow-hidden bg-ink-100 ${featured ? 'md:w-1/2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}`}>
        {hasImage && (
          <Image
            src={clanek.image}
            alt={clanek.title}
            fill
            sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-4 top-4 chip bg-white/95 text-ink-700 shadow-sm">{categoryLabel(clanek.category)}</span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'md:p-10 md:justify-center' : ''}`}>
        <h3 className={`font-display font-semibold text-ink-900 group-hover:text-rose-700 transition-colors leading-snug ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {clanek.title}
        </h3>
        <p className="mt-3 text-[15px] text-ink-500 line-clamp-3 leading-relaxed">{clanek.excerpt}</p>
        <div className="mt-auto pt-5 flex items-center gap-3 text-xs text-ink-400">
          <span>{formatDateCz(clanek.updatedAt || clanek.createdAt)}</span>
          <span className="w-1 h-1 rounded-full bg-ink-200" />
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {clanek.readTime || 5} min čtení</span>
        </div>
      </div>
    </Link>
  )
}
