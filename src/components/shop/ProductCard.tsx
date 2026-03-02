import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

function getPriceRange(product: Product): string {
  const variants = product.product_variants
  if (!variants || variants.length === 0) {
    return `$${product.price.toFixed(2)}`
  }
  const prices = variants.map((v) => v.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (min === max) return `$${min.toFixed(2)}`
  return `$${min.toFixed(2)} – $${max.toFixed(2)}`
}

export default function ProductCard({ product }: ProductCardProps) {
  const isComingSoon = product.status === 'coming_soon'

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-[#0A1628] to-[#1a2d50] relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-5xl">🧪</span>
          </div>
        )}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge className="bg-[#D4AF37] text-[#0A1628] font-bold text-sm px-3 py-1">
              Coming Soon
            </Badge>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="border-amber-500/50 text-amber-400 text-xs bg-black/40">
            Research Only
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#D4AF37] font-bold text-lg">
              {getPriceRange(product)}
            </span>
            {product.compare_price && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${product.compare_price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="mt-3">
          {isComingSoon ? (
            <Button
              disabled
              className="w-full bg-gray-700 text-gray-400 cursor-not-allowed"
            >
              Coming Soon
            </Button>
          ) : (
            <Link href={`/shop/${product.slug}`}>
              <Button className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold">
                Select Options
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
