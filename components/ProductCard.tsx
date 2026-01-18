import Link from 'next/link'
import { Star, Users, ExternalLink, ChevronRight } from 'lucide-react'
import { Produkt } from '@/lib/types'

interface ProductCardProps {
  produkt: Produkt
  rank?: number
}

export default function ProductCard({ produkt, rank }: ProductCardProps) {
  return (
    <div className="card p-6 relative">
      {rank && (
        <div className="absolute -top-3 -left-3 bg-primary-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg">
          {rank}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center justify-center md:w-32">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold text-primary-500">
            {produkt.name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{produkt.name}</h3>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="flex items-center bg-primary-100 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-primary-500 fill-primary-400" />
                <span className="ml-1 font-semibold text-gray-900">{produkt.rating}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{produkt.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {produkt.users} uživatelů
            </div>
            <div>Věk: {produkt.ageRange}</div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {produkt.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 md:w-48">
          <a
            href={produkt.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center"
          >
            Navštívit
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          <Link
            href={`/seznamky/${produkt.slug}`}
            className="btn-secondary flex items-center justify-center"
          >
            Recenze
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
