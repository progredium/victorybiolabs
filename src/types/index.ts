export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_price: number | null
  images: string[]
  category: string
  tags: string[]
  status: 'active' | 'draft' | 'coming_soon'
  research_use_only: boolean
  disclaimer: string | null
  created_at: string
  product_variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  price: number
  stock_qty: number
  sku: string | null
  weight_g: number | null
}

export interface CartItem {
  product: Product
  variant: ProductVariant | null
  qty: number
}

export interface ShippingAddress {
  first_name: string
  last_name: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
}

export interface Order {
  id: string
  customer_id: string | null
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  subtotal: number
  shipping_cost: number
  total: number
  shipping_address: ShippingAddress | null
  notes: string | null
  research_confirmed: boolean
  age_confirmed: boolean
  created_at: string
}
