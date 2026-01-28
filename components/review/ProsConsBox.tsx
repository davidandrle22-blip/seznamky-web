import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react'

interface ProsConsBoxProps {
  pros: string[]
  cons: string[]
  prosTitle?: string
  consTitle?: string
}

export default function ProsConsBox({
  pros,
  cons,
  prosTitle = 'Výhody',
  consTitle = 'Nevýhody'
}: ProsConsBoxProps) {
  return (
    <div className="pros-cons-grid">
      {/* Pros */}
      <div className="pros-box">
        <h4 className="pros-box-title">
          <ThumbsUp className="w-5 h-5" />
          {prosTitle}
        </h4>
        <ul className="pros-box-list">
          {pros.map((pro, index) => (
            <li key={index} className="pros-box-item">
              <Check className="w-5 h-5" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="cons-box">
        <h4 className="cons-box-title">
          <ThumbsDown className="w-5 h-5" />
          {consTitle}
        </h4>
        <ul className="cons-box-list">
          {cons.map((con, index) => (
            <li key={index} className="cons-box-item">
              <X className="w-5 h-5" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
