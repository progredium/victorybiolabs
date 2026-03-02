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
  // Joined fields
  customers?: Customer | null
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  qty: number
  unit_price: number
  created_at: string
  products?: Product
  product_variants?: ProductVariant
}

export interface OrderNote {
  id: string
  order_id: string
  note: string
  created_by: string
  created_at: string
}

export interface Customer {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  created_at: string
  // Computed/joined
  total_orders?: number
  ltv?: number
  tags?: string[]
}

export interface DiscountCode {
  id: string
  code: string
  type: 'percent' | 'fixed' | 'free_shipping'
  value: number
  usage_count: number
  usage_limit: number | null
  expires_at: string | null
  active: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  role: 'owner' | 'staff' | 'readonly'
  created_at: string
}

export interface LowStockAlert {
  id: string
  variant_id: string
  threshold: number
  active: boolean
}
