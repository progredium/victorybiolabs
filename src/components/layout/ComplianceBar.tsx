'use client'

export default function ComplianceBar() {
  return (
    <div className="bg-[#0A1628] text-[#D4AF37] text-center text-xs py-2 px-4 font-medium tracking-wide z-50">
      <span className="inline-flex items-center gap-2">
        <span>⚠</span>
        <span>
          All products are for <strong>research purposes only</strong> | Not for human consumption | Must be 18+ to purchase
        </span>
        <span>⚠</span>
      </span>
    </div>
  )
}
