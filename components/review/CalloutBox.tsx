import { Info, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react'
import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'danger' | 'safety'

interface CalloutBoxProps {
  type: CalloutType
  title?: string
  children: ReactNode
}

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: XCircle,
  safety: Shield,
}

const styleMap = {
  info: 'callout-info',
  warning: 'callout-warning',
  success: 'callout-success',
  danger: 'callout-danger',
  safety: 'callout-success',
}

export default function CalloutBox({
  type,
  title,
  children
}: CalloutBoxProps) {
  const Icon = iconMap[type]

  return (
    <div className={`callout ${styleMap[type]}`}>
      <div className="callout-icon">
        <Icon className="w-4 h-4" />
      </div>
      <div className="pl-4">
        {title && <h4 className="callout-title">{title}</h4>}
        <div className="callout-content">{children}</div>
      </div>
    </div>
  )
}
