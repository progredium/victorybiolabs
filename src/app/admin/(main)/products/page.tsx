'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LowStockBadge } from '@/components/admin/LowStockBadge'
import { Plus, Search, Archive, Pencil, Trash2 } from 'lucide-react'
import type { Product } from '@/types'

type StatusFilter = 'all' | Product['status']

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'draft', label: 'Draft' },
  { key: 'coming_soon', label: 'Coming Soon' },
]

function fmt(n: number) {
  return `$${n.toFixed(2)}`
}

interface ProductRow extends Product {
  min_stock?: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*, product_variants(stock_qty)')
        .order('created_at', { ascending: false })

      const rows: ProductRow[] = (data ?? []).map((p) => {
        const variants = (p.product_variants ?? []) as { stock_qty: number }[]
        return {
          ...p,
          min_stock: variants.length
            ? Math.min(...variants.map((v) => v.stock_qty))
            : 0,
        }
      })
      setProducts(rows)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let rows = products
    if (statusFilter !== 'all') rows = rows.filter((p) => p.status === statusFilter)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }
    return rows
  }, [products, statusFilter, search])

  async function archiveProduct(id: string) {
    const supabase = createClient()
    await supabase.from('products').update({ status: 'draft' }).eq('id', id)
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'draft' } : p)))
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const statusBadge = (status: Product['status']) => {
    const map: Record<Product['status'], string> = {
      active: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-gray-100 text-gray-600 border-gray-200',
      coming_soon: 'bg-blue-100 text-blue-800 border-blue-200',
    }
    const labels: Record<Product['status'], string> = {
      active: 'Active',
      draft: 'Draft',
      coming_soon: 'Coming Soon',
    }
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}
      >
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1628] text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-[#D4AF37]/60"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400 animate-pulse">
                  Loading products…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{product.category}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{fmt(product.price)}</td>
                  <td className="px-4 py-3">
                    <LowStockBadge qty={product.min_stock ?? 0} />
                  </td>
                  <td className="px-4 py-3">{statusBadge(product.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </Link>
                      <button
                        onClick={() => archiveProduct(product.id)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Archive"
                      >
                        <Archive className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
