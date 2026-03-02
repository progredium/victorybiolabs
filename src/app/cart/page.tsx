'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useCart } from '@/components/cart/CartProvider'

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart()
  const [researchConfirmed, setResearchConfirmed] = useState(false)

  const shipping = subtotal > 0 ? 9.99 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🛒</div>
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="text-gray-400">Add some research compounds to get started.</p>
        <Link href="/shop">
          <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold">
            Browse Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.variant?.price ?? item.product.price
              const variantId = item.variant?.id ?? null
              return (
                <div
                  key={`${item.product.id}-${variantId}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0A1628] to-[#1a2d50] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🧪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold">{item.product.name}</h3>
                    {item.variant && (
                      <p className="text-gray-400 text-sm">{item.variant.name}</p>
                    )}
                    <p className="text-amber-400/60 text-xs mt-1">For research use only</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.product.id, variantId, item.qty - 1)}
                          className="w-7 h-7 rounded border border-white/20 text-white text-sm hover:border-[#D4AF37]/50 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-white w-6 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.product.id, variantId, item.qty + 1)}
                          className="w-7 h-7 rounded border border-white/20 text-white text-sm hover:border-[#D4AF37]/50 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, variantId)}
                        className="text-red-400 hover:text-red-300 text-xs transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#D4AF37] font-bold">${(price * item.qty).toFixed(2)}</p>
                    <p className="text-gray-500 text-xs">${price.toFixed(2)} each</p>
                  </div>
                </div>
              )
            })}

            {/* Research Acknowledgment */}
            <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="research-confirm"
                  checked={researchConfirmed}
                  onCheckedChange={(v) => setResearchConfirmed(v as boolean)}
                  className="mt-0.5 border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-amber-950"
                />
                <Label htmlFor="research-confirm" className="text-amber-200 text-sm leading-relaxed cursor-pointer">
                  <strong>Required:</strong> I confirm these products are for laboratory research
                  purposes only and I am a qualified researcher. I understand these products are
                  not for human consumption and have not been approved by the FDA.
                </Label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
              <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-[#D4AF37] font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  disabled={!researchConfirmed}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {researchConfirmed ? 'Proceed to Checkout' : 'Confirm Research Use Above'}
                </Button>
              </Link>

              {!researchConfirmed && (
                <p className="text-amber-400/60 text-xs text-center mt-2">
                  Please confirm research use to continue
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/shop" className="text-[#D4AF37] text-sm hover:underline">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
