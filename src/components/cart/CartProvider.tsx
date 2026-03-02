'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product, ProductVariant } from '@/types'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant | null, qty?: number) => void
  removeItem: (productId: string, variantId: string | null) => void
  updateQty: (productId: string, variantId: string | null, qty: number) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vbl_cart')
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('vbl_cart', JSON.stringify(items))
  }, [items])

  const getKey = (productId: string, variantId: string | null) =>
    `${productId}::${variantId ?? 'none'}`

  const addItem = (product: Product, variant: ProductVariant | null, qty = 1) => {
    setItems((prev) => {
      const key = getKey(product.id, variant?.id ?? null)
      const existing = prev.find(
        (i) => getKey(i.product.id, i.variant?.id ?? null) === key
      )
      if (existing) {
        return prev.map((i) =>
          getKey(i.product.id, i.variant?.id ?? null) === key
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [...prev, { product, variant, qty }]
    })
  }

  const removeItem = (productId: string, variantId: string | null) => {
    const key = getKey(productId, variantId)
    setItems((prev) =>
      prev.filter((i) => getKey(i.product.id, i.variant?.id ?? null) !== key)
    )
  }

  const updateQty = (productId: string, variantId: string | null, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, variantId)
      return
    }
    const key = getKey(productId, variantId)
    setItems((prev) =>
      prev.map((i) =>
        getKey(i.product.id, i.variant?.id ?? null) === key ? { ...i, qty } : i
      )
    )
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price ?? item.product.price
    return sum + price * item.qty
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
