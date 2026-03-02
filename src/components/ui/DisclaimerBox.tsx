interface DisclaimerBoxProps {
  variant?: 'warning' | 'info'
  className?: string
}

export default function DisclaimerBox({ variant = 'warning', className = '' }: DisclaimerBoxProps) {
  if (variant === 'info') {
    return (
      <div className={`border border-blue-500/30 bg-blue-950/40 rounded-lg p-4 ${className}`}>
        <p className="text-blue-200 text-sm">
          <span className="font-semibold">Research Information:</span> This compound is provided
          for qualified researchers and research institutions. All research should be conducted
          in accordance with applicable laws, regulations, and institutional guidelines.
        </p>
      </div>
    )
  }

  return (
    <div className={`border-2 border-amber-500 bg-amber-950/50 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="text-amber-400 text-xl mt-0.5">⚠️</span>
        <div>
          <p className="text-amber-300 font-bold text-sm mb-1">FOR RESEARCH USE ONLY</p>
          <p className="text-amber-200/80 text-xs leading-relaxed">
            Not for human consumption. Not intended to diagnose, treat, cure, or prevent any
            disease or health condition. This product has not been approved by the FDA.
            For use by qualified researchers in appropriate laboratory settings only.
            Must be 18+ to purchase. By purchasing, you confirm research-only intent.
          </p>
        </div>
      </div>
    </div>
  )
}
