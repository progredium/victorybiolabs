'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LowStockBadge } from '@/components/admin/LowStockBadge'
import { Save, Search, RefreshCw } from 'lucide-react'

interface InventoryRow {
  variant_id: string
  product_name: string
  variant_name: string
  sku: string | null
  stock_qty: number
  threshold: number
  edited_qty: number | null
}

export default function InventoryPage() {
  const [rows, setRows] = useState<InventoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('product_variants')
      .select('id, name, sku, stock_qty, product_id, products(name), low_stock_alerts(threshold)')
      .order('created_at', { ascending: true })

    setRows(
      (data ?? []).map((v) => ({
        variant_id: v.id,
        product_name: (v.products as unknown as { name: string } | null)?.name ?? 'Unknown',
        variant_name: v.name,
        sku: v.sku,
        stock_qty: v.stock_qty,
        threshold: (v.low_stock_alerts as unknown as { threshold: number }[] | null)?.[0]?.threshold ?? 5,
        edited_qty: null,
      }))
    )
    setLoading(false)
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return rows
    const q = search.trim().toLowerCase()
    return rows.filter(
      (r) =>
        r.product_name.toLowerCase().includes(q) ||
        r.variant_name.toLowerCase().includes(q) ||
        (r.sku ?? '').toLowerCase().includes(q)
    )
  }, [rows, search])

  function editQty(variantId: string, value: string) {
    const num = parseInt(value)
    setRows((prev) =>
      prev.map((r) =>
        r.variant_id === variantId
          ? { ...r, edited_qty: isNaN(num) ? null : num }
          : r
      )
    )
    setSaved((prev) => {
      const next = new Set(prev)
      next.delete(variantId)
      return next
    })
  }

  async function saveQty(variantId: string, newQty: number) {
    setSaving((prev) => new Set(prev).add(variantId))
    const supabase = createClient()
    await supabase
      .from('product_variants')
      .update({ stock_qty: newQty })
      .eq('id', variantId)

    setRows((prev) =>
      prev.map((r) =>
        r.variant_id === variantId
          ? { ...r, stock_qty: newQty, edited_qty: null }
          : r
      )
    )
    setSaving((prev) => {
      const next = new Set(prev)
      next.delete(variantId)
      return next
    })
    setSaved((prev) => new Set(prev).add(variantId))
    setTimeout(() => {
      setSaved((prev) => {
        const next = new Set(prev)
        next.delete(variantId)
        return next
      })
    }, 2000)
  }

  const lowStockCount = rows.filter((r) => r.stock_qty > 0 && r.stock_qty <= r.threshold).length
  const outOfStockCount = rows.filter((r) => r.stock_qty === 0).length

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {outOfStockCount > 0 && (
              <span className="text-red-500 font-medium">{outOfStockCount} out of stock · </span>
            )}
            {lowStockCount > 0 && (
              <span className="text-amber-600 font-medium">{lowStockCount} low stock · </span>
            )}
            {rows.length} total variants
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product or SKU…"
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-[#D4AF37]/60"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Variant</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Alert At</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400 animate-pulse">
                  Loading inventory…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  No variants found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const displayQty = row.edited_qty !== null ? row.edited_qty : row.stock_qty
                const isDirty = row.edited_qty !== null && row.edited_qty !== row.stock_qty
                const isSaving = saving.has(row.variant_id)
                const wasSaved = saved.has(row.variant_id)

                return (
                  <tr
                    key={row.variant_id}
                    className={
                      row.stock_qty === 0
                        ? 'bg-red-50/40'
                        : row.stock_qty <= row.threshold
                        ? 'bg-amber-50/40'
                        : ''
                    }
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{row.product_name}</td>
                    <td className="px-4 py-3 text-gray-600">{row.variant_name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.sku ?? '—'}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={displayQty}
                        onChange={(e) => editQty(row.variant_id, e.target.value)}
                        className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-800 text-center focus:outline-none focus:border-[#D4AF37]/60"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{row.threshold}</td>
                    <td className="px-4 py-3">
                      <LowStockBadge qty={row.stock_qty} threshold={row.threshold} />
                    </td>
                    <td className="px-4 py-3">
                      {wasSaved ? (
                        <span className="text-xs text-green-600 font-medium">Saved ✓</span>
                      ) : isDirty ? (
                        <button
                          onClick={() => saveQty(row.variant_id, row.edited_qty!)}
                          disabled={isSaving}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Save className="h-3 w-3" />
                          Save
                        </button>
                      ) : null}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
