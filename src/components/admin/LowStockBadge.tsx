import { cn } from '@/lib/utils'

interface LowStockBadgeProps {
  qty: number
  threshold?: number
}

export function LowStockBadge({ qty, threshold = 5 }: LowStockBadgeProps) {
  if (qty === 0) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
          'bg-red-100 text-red-800 border-red-200'
        )}
      >
        Out of Stock
      </span>
    )
  }

  if (qty <= threshold) {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
          'bg-amber-100 text-amber-800 border-amber-200'
        )}
      >
        Low: {qty} left
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        'bg-green-100 text-green-800 border-green-200'
      )}
    >
      {qty} in stock
    </span>
  )
}
