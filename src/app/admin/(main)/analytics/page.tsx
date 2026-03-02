'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StatsCard } from '@/components/admin/StatsCard'
import { Download, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react'
import type { Order } from '@/types'

type Period = 'day' | 'week' | 'month' | 'year'

function fmt(n: number) {
  return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function getPeriodStart(period: Period): string {
  const now = new Date()
  switch (period) {
    case 'day':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    case 'week':
      return new Date(now.getTime() - 7 * 86400000).toISOString()
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    case 'year':
      return new Date(now.getFullYear(), 0, 1).toISOString()
  }
}

interface ProductRevenue {
  name: string
  revenue: number
  units: number
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('month')
  const [orders, setOrders] = useState<Order[]>([])
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [topProducts, setTopProducts] = useState<ProductRevenue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()

      const [ordersRes, itemsRes] = await Promise.all([
        supabase
          .from('orders')
          .select('id, total, status, created_at, customer_id')
          .order('created_at', { ascending: true }),
        supabase
          .from('order_items')
          .select('product_id, qty, unit_price, products(name)'),
      ])

      setAllOrders((ordersRes.data ?? []) as Order[])

      const productMap: Record<string, ProductRevenue> = {}
      for (const item of itemsRes.data ?? []) {
        const pid = item.product_id
        const name = (item.products as unknown as { name: string } | null)?.name ?? pid
        if (!productMap[pid]) productMap[pid] = { name, revenue: 0, units: 0 }
        productMap[pid].revenue += item.qty * item.unit_price
        productMap[pid].units += item.qty
      }
      setTopProducts(
        Object.values(productMap)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10)
      )
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const start = getPeriodStart(period)
    setOrders(allOrders.filter((o) => o.created_at >= start))
  }, [period, allOrders])

  const revenue = orders.reduce((s, o) => s + (o.total ?? 0), 0)
  const orderCount = orders.length
  const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0

  const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {})

  const uniqueCustomers = new Set(orders.filter((o) => o.customer_id).map((o) => o.customer_id)).size

  const allUniqueCustomers = new Set(allOrders.filter((o) => o.customer_id).map((o) => o.customer_id))
  const returningCustomers = orders.filter((o) => {
    if (!o.customer_id) return false
    const prevOrders = allOrders.filter(
      (prev) => prev.customer_id === o.customer_id && prev.created_at < o.created_at
    )
    return prevOrders.length > 0
  }).length
  const newCustomers = uniqueCustomers - returningCustomers

  function exportCSV() {
    const header = 'Date,Total,Status'
    const rows = allOrders.map(
      (o) => `"${o.created_at}",${o.total},"${o.status}"`
    )
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'analytics.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const PERIODS: { key: Period; label: string }[] = [
    { key: 'day', label: 'Today' },
    { key: 'week', label: '7 Days' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Store performance overview</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              period === p.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Revenue"
          value={loading ? '…' : fmt(revenue)}
          icon={<DollarSign className="h-5 w-5 text-[#D4AF37]" />}
          variant="gold"
        />
        <StatsCard
          title="Orders"
          value={loading ? '…' : orderCount}
          icon={<ShoppingCart className="h-5 w-5 text-gray-500" />}
        />
        <StatsCard
          title="Avg Order Value"
          value={loading ? '…' : fmt(avgOrderValue)}
          icon={<TrendingUp className="h-5 w-5 text-gray-500" />}
        />
        <StatsCard
          title="Active Customers"
          value={loading ? '…' : uniqueCustomers}
          icon={<Users className="h-5 w-5 text-gray-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 text-sm mb-4">Revenue Over Time</h2>
          <div className="h-48 flex items-end gap-1 px-2">
            {orders.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-400">No data for this period.</p>
              </div>
            ) : (
              // Simple bar chart visualization
              (() => {
                // Group by day
                const byDay: Record<string, number> = {}
                for (const o of orders) {
                  const day = o.created_at.slice(0, 10)
                  byDay[day] = (byDay[day] ?? 0) + (o.total ?? 0)
                }
                const entries = Object.entries(byDay).slice(-30)
                const maxVal = Math.max(...entries.map(([, v]) => v), 1)
                return entries.map(([day, val]) => (
                  <div key={day} className="flex-1 flex flex-col items-center justify-end gap-1 group">
                    <div
                      className="w-full bg-[#D4AF37]/80 rounded-t hover:bg-[#D4AF37] transition-colors relative"
                      style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {fmt(val)}
                      </div>
                    </div>
                  </div>
                ))
              })()
            )}
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Daily revenue — {PERIODS.find((p) => p.key === period)?.label}
          </p>
        </div>

        {/* Status Breakdown + Customer Split */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Orders by Status</h2>
            {Object.entries(byStatus).length === 0 ? (
              <p className="text-sm text-gray-400">No orders in this period.</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(byStatus).map(([s, count]) => (
                  <div key={s} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 capitalize">{s}</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Customer Acquisition</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">New Customers</span>
                <span className="font-semibold text-green-700">{newCustomers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Returning</span>
                <span className="font-semibold text-blue-700">{returningCustomers}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="text-gray-500">Total Active</span>
                <span className="font-bold text-gray-900">{uniqueCustomers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Top Products by Revenue (All Time)</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-5 text-sm text-gray-400 animate-pulse">Loading…</div>
          ) : topProducts.length === 0 ? (
            <div className="p-5 text-sm text-gray-400">No sales data yet.</div>
          ) : (
            topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-gray-300 w-5 shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700 truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-6 shrink-0 ml-4">
                  <span className="text-xs text-gray-400">{p.units} units</span>
                  <span className="text-sm font-semibold text-gray-900">{fmt(p.revenue)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
