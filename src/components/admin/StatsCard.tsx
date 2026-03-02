import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: { value: number; label: string }
  icon?: React.ReactNode
  className?: string
  variant?: 'default' | 'gold' | 'warning' | 'danger'
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  className,
  variant = 'default',
}: StatsCardProps) {
  const styles = {
    default: {
      card: 'bg-white border-gray-200',
      label: 'text-gray-500',
      value: 'text-gray-900',
      sub: 'text-gray-400',
      icon: 'bg-gray-100',
    },
    gold: {
      card: 'bg-[#0A1628] border-[#D4AF37]/30',
      label: 'text-white/60',
      value: 'text-[#D4AF37]',
      sub: 'text-white/40',
      icon: 'bg-[#D4AF37]/20',
    },
    warning: {
      card: 'bg-amber-50 border-amber-200',
      label: 'text-amber-700',
      value: 'text-amber-900',
      sub: 'text-amber-500',
      icon: 'bg-amber-100',
    },
    danger: {
      card: 'bg-red-50 border-red-200',
      label: 'text-red-700',
      value: 'text-red-900',
      sub: 'text-red-400',
      icon: 'bg-red-100',
    },
  }

  const s = styles[variant]

  return (
    <div className={cn('rounded-xl border p-5 shadow-sm', s.card, className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className={cn('text-xs font-medium uppercase tracking-wide mb-1', s.label)}>
            {title}
          </p>
          <p className={cn('text-2xl font-bold truncate', s.value)}>{value}</p>
          {subtitle && (
            <p className={cn('text-xs mt-1', s.sub)}>{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-xs mt-1.5 font-medium',
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn('p-2.5 rounded-xl shrink-0', s.icon)}>{icon}</div>
        )}
      </div>
    </div>
  )
}
