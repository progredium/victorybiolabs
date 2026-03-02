'use client'

import { ProductVariant } from '@/types'

interface VariantSelectorProps {
  variants: ProductVariant[]
  selected: ProductVariant | null
  onChange: (variant: ProductVariant) => void
}

export default function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  if (variants.length === 0) return null

  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        Select Size / Concentration
      </label>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onChange(variant)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              selected?.id === variant.id
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-white/20 text-gray-300 hover:border-[#D4AF37]/50 hover:text-white'
            } ${variant.stock_qty === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={variant.stock_qty === 0}
          >
            {variant.name}
            <span className="ml-1 text-xs opacity-75">${variant.price.toFixed(2)}</span>
            {variant.stock_qty === 0 && (
              <span className="ml-1 text-xs text-red-400">(Out of stock)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
