'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/components/cart/CartProvider'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [researchConfirmed, setResearchConfirmed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const shipping = subtotal > 0 ? 9.99 : 0
  const total = subtotal + shipping

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="text-6xl">✅</div>
        <h1 className="text-3xl font-bold text-white">Order Submitted!</h1>
        <p className="text-gray-400 max-w-md">
          Thank you for your order. You will receive a confirmation email shortly.
          Our team will process your order within 1 business day.
        </p>
        <p className="text-amber-300/70 text-sm max-w-md">
          Reminder: All products are for research purposes only. Store according to the
          provided guidelines.
        </p>
        <Link href="/shop">
          <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold mt-4">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ageConfirmed || !researchConfirmed) return
    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#060f1e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">First Name</Label>
                    <Input
                      required
                      placeholder="First name"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">Last Name</Label>
                    <Input
                      required
                      placeholder="Last name"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-gray-300 text-sm mb-1.5 block">Email Address</Label>
                    <Input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-gray-300 text-sm mb-1.5 block">Phone (optional)</Label>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-gray-300 text-sm mb-1.5 block">Address Line 1</Label>
                    <Input
                      required
                      placeholder="Street address"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-gray-300 text-sm mb-1.5 block">Address Line 2 (optional)</Label>
                    <Input
                      placeholder="Apt, suite, etc."
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">City</Label>
                    <Input
                      required
                      placeholder="City"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">State</Label>
                    <Input
                      required
                      placeholder="State"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">ZIP Code</Label>
                    <Input
                      required
                      placeholder="ZIP"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">Country</Label>
                    <Input
                      required
                      defaultValue="United States"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Payment</h2>
                <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 text-lg">🔒</span>
                    <div>
                      <p className="text-blue-300 font-medium text-sm">Secure Payment Processing</p>
                      <p className="text-blue-300/70 text-xs mt-1">
                        Payment provider integration coming soon. For now, please contact us directly
                        to complete your order. We accept credit/debit cards, bank transfer, and
                        cryptocurrency payments.
                      </p>
                      <p className="text-blue-300/70 text-xs mt-2">
                        Contact: <span className="text-blue-300">support@victorybiolabs.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">Order Notes (optional)</h2>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37] min-h-24"
                />
              </div>

              {/* Confirmations */}
              <div className="space-y-4">
                <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="age-confirm"
                      checked={ageConfirmed}
                      onCheckedChange={(v) => setAgeConfirmed(v as boolean)}
                      className="mt-0.5 border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-amber-950"
                    />
                    <Label htmlFor="age-confirm" className="text-amber-200 text-sm leading-relaxed cursor-pointer">
                      <strong>Required:</strong> I confirm I am 18 years of age or older.
                    </Label>
                  </div>
                </div>

                <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="research-confirm"
                      checked={researchConfirmed}
                      onCheckedChange={(v) => setResearchConfirmed(v as boolean)}
                      className="mt-0.5 border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-amber-950"
                    />
                    <Label htmlFor="research-confirm" className="text-amber-200 text-sm leading-relaxed cursor-pointer">
                      <strong>Required:</strong> I confirm that all products in this order are
                      purchased for laboratory research purposes only. I understand these products
                      are not for human consumption and are not approved by the FDA. I am a
                      qualified researcher and will use these products in accordance with all
                      applicable laws and regulations.
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => {
                    const price = item.variant?.price ?? item.product.price
                    return (
                      <div key={`${item.product.id}-${item.variant?.id}`} className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {item.product.name}
                          {item.variant && ` (${item.variant.name})`} × {item.qty}
                        </span>
                        <span className="text-white">${(price * item.qty).toFixed(2)}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-[#D4AF37] text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!ageConfirmed || !researchConfirmed || items.length === 0}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold disabled:opacity-40"
                >
                  Place Order
                </Button>

                {(!ageConfirmed || !researchConfirmed) && (
                  <p className="text-amber-400/60 text-xs text-center mt-2">
                    Please confirm all required acknowledgments
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
