'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { COA } from '@/types'
import COACard from './COACard'

interface LabReportsClientProps {
  coas: COA[]
}

export default function LabReportsClient({ coas }: LabReportsClientProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return coas
    const lower = query.toLowerCase()
    return coas.filter(
      (c) =>
        c.product_name.toLowerCase().includes(lower) ||
        c.lot_number.toLowerCase().includes(lower) ||
        (c.lab_name ?? '').toLowerCase().includes(lower)
    )
  }, [coas, query])

  return (
    <>
      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by product, lot number, or lab..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-gray-400 text-sm mb-6">
        {filtered.length} {filtered.length === 1 ? 'certificate' : 'certificates'} found
        {query && (
          <span className="text-gray-500"> for &ldquo;{query}&rdquo;</span>
        )}
      </p>

      {/* COA Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((coa) => (
            <COACard key={coa.id} coa={coa} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium text-gray-400 mb-1">No certificates found</p>
          <p className="text-sm">Try a different search term.</p>
        </div>
      )}
    </>
  )
}
