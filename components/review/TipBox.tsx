import { ReactNode } from 'react'
import { Info, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react'

type TipVariant = 'info' | 'tip' | 'success' | 'warning'

interface TipBoxProps {
  variant?: TipVariant
  title?: string
  children: ReactNode
}

const variantConfig = {
  info: {
    icon: Info,
    defaultTitle: 'Informace',
    className: 'tip-box-info'
  },
  tip: {
    icon: Lightbulb,
    defaultTitle: 'Tip',
    className: 'tip-box-tip'
  },
  success: {
    icon: CheckCircle,
    defaultTitle: 'Hotovo',
    className: 'tip-box-success'
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Upozornění',
    className: 'tip-box-warning'
  }
}

export default function TipBox({
  variant = 'info',
  title,
  children
}: TipBoxProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div className={`tip-box ${config.className}`}>
      <div className="tip-box-icon">
        <Icon className="w-5 h-5" />
      </div>
      <div className="tip-box-content">
        <p className="tip-box-title">{title || config.defaultTitle}</p>
        <div className="tip-box-text">{children}</div>
      </div>
    </div>
  )
}
