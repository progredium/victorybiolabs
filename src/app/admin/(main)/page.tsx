'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { StatsCard } from '@/components/admin/StatsCard'
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge'
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Plus,
  Package,
  Download,
  TrendingUp,
} from 'lucide-react'
import type { Order, Product, ProductVariant } from '@/types'

interface DashboardStats {
  revenueToday: number
  revenueWeek: number
  revenueMonth: number
  totalOrders: number
  activeCustomers: number
  lowStockCount: number
}

interface RecentOrder extends Omit<Order, 'customers'> {
  customers?: { email: string; first_name: string | null; last_name: string | null } | null
}

interface TopProduct {
  id: string
  name: string
  total_revenue: number
  total_units: number
}

function fmt(n: number) {
  return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      const now = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const weekStart = new Date(now.getTime() - 7 * 86400000).toISOString()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      const [ordersRes, customersRes, variantsRes, recentRes] = await Promise.all([
        supabase.from('orders').select('total, created_at, status'),
        supabase.from('customers').select('id', { count: 'exact', head: true }),
        supabase.from('product_variants').select('stock_qty').lte('stock_qty', 5),
        supabase
          .from('orders')
          .select('*, customers(email, first_name, last_name)')
          .order('created_at', { ascending: false })
          .limit(10),
      ])

      const orders = ordersRes.data ?? []
      setRecentOrders((recentRes.data ?? []) as RecentOrder[])

      const revenueToday = orders
        .filter((o) => o.created_at >= todayStart)
        .reduce((s, o) => s + (o.total ?? 0), 0)
      const revenueWeek = orders
        .filter((o) => o.created_at >= weekStart)
        .reduce((s, o) => s + (o.total ?? 0), 0)
      const revenueMonth = orders
        .filter((o) => o.created_at >= monthStart)
        .reduce((s, o) => s + (o.total ?? 0), 0)

      setStats({
        revenueToday,
        revenueWeek,
        revenueMonth,
        totalOrders: orders.length,
        activeCustomers: customersRes.count ?? 0,
        lowStockCount: variantsRes.data?.length ?? 0,
      })

      // Top products via order_items
      const itemsRes = await supabase
        .from('order_items')
        .select('product_id, qty, unit_price, products(name)')

      const productMap: Record<string, TopProduct> = {}
      for (const item of itemsRes.data ?? []) {
        const pid = item.product_id
        const name = (item.products as unknown as { name: string } | null)?.name ?? pid
        if (!productMap[pid]) {
          productMap[pid] = { id: pid, name, total_revenue: 0, total_units: 0 }
        }
        productMap[pid].total_revenue += item.qty * item.unit_price
        productMap[pid].total_units += item.qty
      }
      setTopProducts(
        Object.values(productMap)
          .sort((a, b) => b.total_revenue - a.total_revenue)
          .slice(0, 5)
      )

      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Maxwell.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/orders/new"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Order
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1628] text-sm font-semibold rounded-lg transition-colors"
          >
            <Package className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Revenue Today"
            value={fmt(stats?.revenueToday ?? 0)}
            subtitle={`Week: ${fmt(stats?.revenueWeek ?? 0)}`}
            icon={<DollarSign className="h-5 w-5 text-[#D4AF37]" />}
            variant="gold"
          />
          <StatsCard
            title="Revenue This Month"
            value={fmt(stats?.revenueMonth ?? 0)}
            icon={<TrendingUp className="h-5 w-5 text-gray-500" />}
          />
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders ?? 0}
            icon={<ShoppingCart className="h-5 w-5 text-gray-500" />}
          />
          <StatsCard
            title="Low Stock Alerts"
            value={stats?.lowStockCount ?? 0}
            subtitle="Variants at ≤5 units"
            icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
            variant={stats && stats.lowStockCount > 0 ? 'warning' : 'default'}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#D4AF37] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-5 text-sm text-gray-400 animate-pulse">Loading orders…</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-5 text-sm text-gray-400">No orders yet.</div>
            ) : (
              recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-gray-500 shrink-0">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span className="text-sm text-gray-700 truncate">
                      {order.customers?.email ?? 'Guest'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-sm font-semibold text-gray-900">{fmt(order.total)}</span>
                    <span className="text-xs text-gray-400">{timeAgo(order.created_at)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Top Products + Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Top Products</h2>
              <Link href="/admin/analytics" className="text-xs text-[#D4AF37] hover:underline">
                Analytics →
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="p-5 text-sm text-gray-400 animate-pulse">Loading…</div>
              ) : topProducts.length === 0 ? (
                <div className="p-5 text-sm text-gray-400">No sales data yet.</div>
              ) : (
                topProducts.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      <span className="text-sm text-gray-700 truncate">{p.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 shrink-0 ml-2">
                      {fmt(p.total_revenue)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/products/new"
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-400" />
                Add Product
              </Link>
              <Link
                href="/admin/discounts"
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-400" />
                Create Discount Code
              </Link>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Download className="h-4 w-4 text-gray-400" />
                Export Orders CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
