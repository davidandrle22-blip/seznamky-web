import Image from 'next/image'
import { CheckCircle2, Shield, Calendar, User, Star, Users, CreditCard, Lock } from 'lucide-react'

interface EditorialBoxProps {
  authorName?: string
  authorRole?: string
  authorAvatar?: string
  lastUpdated?: string
  showMethodology?: boolean
  criteria?: string[]
}

const defaultCriteria = [
  'Uživatelské rozhraní',
  'Poměr cena/výkon',
  'Kvalita profilů',
  'Bezpečnost',
  'Zákaznická podpora',
  'Úspěšnost párování'
]

export default function EditorialBox({
  authorName = 'Redakce Seznamky.info',
  authorRole = 'Editor recenzí',
  authorAvatar = '/images/authors/default-avatar.jpg',
  lastUpdated,
  showMethodology = true,
  criteria = defaultCriteria
}: EditorialBoxProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="editorial-box">
      {/* Header with author info */}
      <div className="editorial-box-header">
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image
            src={authorAvatar}
            alt={authorName}
            fill
            className="editorial-box-avatar object-cover"
          />
        </div>
        <div className="editorial-box-author">
          <p className="editorial-box-author-name">{authorName}</p>
          <p className="editorial-box-author-role">{authorRole}</p>
        </div>
        {lastUpdated && (
          <div className="editorial-box-date flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(lastUpdated)}</span>
          </div>
        )}
      </div>

      {/* Methodology section */}
      {showMethodology && (
        <div className="editorial-box-body">
          <h4 className="editorial-box-title">
            <Shield className="w-5 h-5 text-romantic-500" />
            Jak hodnotíme seznamky
          </h4>
          <div className="editorial-box-content">
            <p>
              Každou seznamku testujeme osobně po dobu minimálně 2 týdnů.
              Zakládáme reálné profily, komunikujeme s ostatními uživateli
              a ověřujeme kvalitu služeb.
            </p>
            <p>
              Naše hodnocení je nezávislé a objektivní. Pokud doporučujeme
              prémiové členství, sami jsme ho vyzkoušeli.
            </p>
          </div>

          {/* Evaluation criteria */}
          <div className="editorial-box-criteria">
            {criteria.map((criterion, index) => {
              const icons = [User, Star, Users, Lock, CreditCard, CheckCircle2]
              const Icon = icons[index % icons.length]
              return (
                <div key={criterion} className="editorial-box-criterion">
                  <Icon className="w-4 h-4 text-romantic-500" />
                  <span>{criterion}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
