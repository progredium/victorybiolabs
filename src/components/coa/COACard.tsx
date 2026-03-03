import { COA } from '@/types'
import { ExternalLink, FlaskConical, Calendar, Building2, CheckCircle2 } from 'lucide-react'

interface COACardProps {
  coa: COA
}

export default function COACard({ coa }: COACardProps) {
  const purity = coa.purity_percent ?? 0
  const purityColor =
    purity >= 99
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : purity >= 95
      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      : 'bg-red-500/15 text-red-400 border-red-500/30'

  const testDateFormatted = coa.test_date
    ? new Date(coa.test_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const expiryDateFormatted = coa.expiry_date
    ? new Date(coa.expiry_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#D4AF37]/30 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base leading-tight group-hover:text-[#D4AF37] transition-colors truncate">
            {coa.product_name}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5 font-mono">Lot: {coa.lot_number}</p>
        </div>
        {purity > 0 && (
          <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${purityColor}`}>
            {purity.toFixed(1)}% Pure
          </span>
        )}
      </div>

      {/* Test Method Badge */}
      <div className="flex items-center gap-1.5 mb-3">
        <FlaskConical className="h-3.5 w-3.5 text-[#D4AF37]/70" />
        <span className="bg-[#D4AF37]/10 text-[#D4AF37]/80 text-xs px-2 py-0.5 rounded border border-[#D4AF37]/20 font-medium">
          {coa.test_method}
        </span>
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 ml-1" />
        <span className="text-emerald-400/70 text-xs">Verified</span>
      </div>

      {/* Dates */}
      {(testDateFormatted || expiryDateFormatted) && (
        <div className="flex items-start gap-4 mb-3 text-xs text-gray-400">
          {testDateFormatted && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-gray-500 flex-shrink-0" />
              <span>Tested: <span className="text-gray-300">{testDateFormatted}</span></span>
            </div>
          )}
          {expiryDateFormatted && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-gray-500 flex-shrink-0" />
              <span>Expiry: <span className="text-gray-300">{expiryDateFormatted}</span></span>
            </div>
          )}
        </div>
      )}

      {/* Lab */}
      {coa.lab_name && (
        <div className="flex items-center gap-1.5 mb-4 text-xs text-gray-400">
          <Building2 className="h-3 w-3 text-gray-500 flex-shrink-0" />
          <span className="truncate">{coa.lab_name}</span>
        </div>
      )}

      {/* View COA Button */}
      <div className="pt-3 border-t border-white/10">
        {coa.file_url ? (
          <a
            href={coa.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] text-xs font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Full COA
          </a>
        ) : (
          <button
            disabled
            className="flex items-center justify-center gap-2 w-full bg-white/5 text-gray-500 text-xs font-medium py-2 px-4 rounded-lg cursor-not-allowed border border-white/5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            PDF Available on Request
          </button>
        )}
      </div>
    </div>
  )
}
