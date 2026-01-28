import { CreditCard, Sparkles } from 'lucide-react'

interface PricingTier {
  name: string
  duration: string
  price: string
  pricePerMonth?: string
  features?: string[]
  isPopular?: boolean
  isFree?: boolean
}

interface PricingBoxProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  freeFeatures?: string[]
  note?: string
}

export default function PricingBox({
  title = 'Ceník členství',
  subtitle,
  tiers,
  freeFeatures,
  note
}: PricingBoxProps) {
  return (
    <div className="pricing-box">
      <div className="pricing-box-header">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <h3 className="pricing-box-title">{title}</h3>
        </div>
        {subtitle && <p className="pricing-box-subtitle">{subtitle}</p>}
      </div>

      <table className="pricing-table">
        <thead>
          <tr>
            <th>Členství</th>
            <th>Délka</th>
            <th>Cena</th>
            <th className="hidden sm:table-cell">Měsíčně</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, index) => (
            <tr key={index} className={tier.isPopular ? 'pricing-highlight' : ''}>
              <td className="font-medium">
                {tier.name}
                {tier.isPopular && (
                  <span className="pricing-badge">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Oblíbené
                  </span>
                )}
                {tier.isFree && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                    Zdarma
                  </span>
                )}
              </td>
              <td className="text-gray-600">{tier.duration}</td>
              <td className="font-semibold text-gray-900">{tier.price}</td>
              <td className="hidden sm:table-cell text-gray-500">
                {tier.pricePerMonth || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {freeFeatures && freeFeatures.length > 0 && (
        <div className="p-5 bg-gray-50 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Co získáte zdarma:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {note && (
        <div className="p-4 bg-amber-50 border-t border-amber-200 text-sm text-amber-800">
          <strong>Poznámka:</strong> {note}
        </div>
      )}
    </div>
  )
}
