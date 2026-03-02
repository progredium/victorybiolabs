'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Product, ProductVariant } from '@/types'
import VariantSelector from '@/components/shop/VariantSelector'
import DisclaimerBox from '@/components/ui/DisclaimerBox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/cart/CartProvider'
import Link from 'next/link'

type ActiveTab = 'description' | 'research' | 'reviews'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<ActiveTab>('description')
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('slug', slug)
        .single()
      if (data) {
        setProduct(data as Product)
        const variants = (data as Product).product_variants ?? []
        if (variants.length > 0) setSelectedVariant(variants[0])
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Product not found.</p>
        <Link href="/shop">
          <Button variant="outline" className="border-[#D4AF37]/40 text-[#D4AF37]">
            Back to Shop
          </Button>
        </Link>
      </div>
    )
  }

  const price = selectedVariant?.price ?? product.price
  const variants = product.product_variants ?? []

  const handleAddToCart = () => {
    addItem(product, selectedVariant, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/shop" className="hover:text-[#D4AF37]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-[#0A1628] to-[#1a2d50] rounded-xl flex items-center justify-center border border-white/10">
            <div className="text-center">
              <div className="text-8xl mb-4">🧪</div>
              <Badge variant="outline" className="border-amber-500/50 text-amber-400 text-xs">
                Research Only
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs">
                {product.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#D4AF37] text-3xl font-bold">${price.toFixed(2)}</span>
              {product.compare_price && (
                <span className="text-gray-500 text-xl line-through">${product.compare_price.toFixed(2)}</span>
              )}
            </div>

            {/* Variant Selector */}
            {variants.length > 0 && (
              <div className="mb-6">
                <VariantSelector
                  variants={variants}
                  selected={selectedVariant}
                  onChange={setSelectedVariant}
                />
              </div>
            )}

            {/* Qty */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border border-white/20 text-white hover:border-[#D4AF37]/50 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-white w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg border border-white/20 text-white hover:border-[#D4AF37]/50 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold text-base py-6 mb-4"
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </Button>

            <Link href="/cart">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 mb-6">
                View Cart
              </Button>
            </Link>

            {/* Compliance Disclaimer */}
            <DisclaimerBox variant="warning" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-white/10 mb-8">
            <div className="flex gap-8">
              {(['description', 'research', 'reviews'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-[#D4AF37] text-[#D4AF37]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'description' ? 'Product Description' : tab === 'research' ? 'Research Details' : 'Reviews'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-4">
              <DisclaimerBox variant="info" />
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Research Context</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This compound has been the subject of published scientific research. All
                  research and published findings referenced on this page are for informational
                  purposes only and do not constitute medical advice. Researchers should consult
                  primary literature and follow all applicable institutional protocols.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Storage Recommendations</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Store lyophilized peptide at -20°C</li>
                  <li>• Avoid repeated freeze-thaw cycles</li>
                  <li>• Once reconstituted, store at 4°C and use within 30 days</li>
                  <li>• Use bacteriostatic water for reconstitution</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">⭐</div>
              <p className="text-gray-400">Reviews coming soon. Be the first to review this product.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
