import Link from 'next/link'
import { Heart, Smile, Rainbow, Users, Flame, LucideIcon } from 'lucide-react'
import { Kategorie } from '@/lib/types'

interface CategoryCardProps {
  kategorie: Kategorie
}

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  smile: Smile,
  rainbow: Rainbow,
  users: Users,
  flame: Flame,
}

export default function CategoryCard({ kategorie }: CategoryCardProps) {
  const Icon = iconMap[kategorie.icon] || Heart

  return (
    <Link
      href={`/seznamky?kategorie=${kategorie.slug}`}
      className="card p-6 text-center hover:border-primary-400 border-2 border-transparent transition-all group"
    >
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-400 transition-colors">
        <Icon className="w-8 h-8 text-primary-500 group-hover:text-gray-900 transition-colors" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{kategorie.name}</h3>
      <p className="text-sm text-gray-500">{kategorie.description}</p>
    </Link>
  )
}
