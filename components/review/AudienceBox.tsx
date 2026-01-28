import { UserCheck, UserX, Check, X } from 'lucide-react'

interface AudienceBoxProps {
  idealFor: string[]
  notFor: string[]
  idealTitle?: string
  notForTitle?: string
}

export default function AudienceBox({
  idealFor,
  notFor,
  idealTitle = 'Ideální pro',
  notForTitle = 'Není vhodné pro'
}: AudienceBoxProps) {
  return (
    <div className="audience-grid">
      {/* Ideal For */}
      <div className="audience-box audience-box-yes">
        <h4 className="audience-box-title">
          <UserCheck className="w-5 h-5 text-green-600" />
          {idealTitle}
        </h4>
        <ul className="audience-list">
          {idealFor.map((item, index) => (
            <li key={index} className="audience-item text-green-800">
              <Check className="w-4 h-4 text-green-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Not For */}
      <div className="audience-box audience-box-no">
        <h4 className="audience-box-title">
          <UserX className="w-5 h-5 text-gray-500" />
          {notForTitle}
        </h4>
        <ul className="audience-list">
          {notFor.map((item, index) => (
            <li key={index} className="audience-item text-gray-600">
              <X className="w-4 h-4 text-gray-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
