'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Download, Plus, ChevronDown, ChevronUp, X } from 'lucide-react'
import type { Customer } from '@/types'

const TAGS = ['VIP', 'First-Time', 'Repeat', 'Circle Member']

interface CustomerRow extends Customer {
  order_count?: number
  ltv?: number
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmt(n: number) {
  return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<Record<string, string[]>>({})
  const [tags, setTags] = useState<Record<string, string[]>>({})

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: custData } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: ordersData } = await supabase
        .from('orders')
        .select('customer_id, total')

      const ordersByCustomer: Record<string, { count: number; total: number }> = {}
      for (const o of ordersData ?? []) {
        if (!o.customer_id) continue
        if (!ordersByCustomer[o.customer_id]) {
          ordersByCustomer[o.customer_id] = { count: 0, total: 0 }
        }
        ordersByCustomer[o.customer_id].count++
        ordersByCustomer[o.customer_id].total += o.total ?? 0
      }

      setCustomers(
        (custData ?? []).map((c) => ({
          ...(c as Customer),
          order_count: ordersByCustomer[c.id]?.count ?? 0,
          ltv: ordersByCustomer[c.id]?.total ?? 0,
        }))
      )
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return customers
    const q = search.trim().toLowerCase()
    return customers.filter(
      (c) =>
        c.email.toLowerCase().includes(q) ||
        (c.first_name ?? '').toLowerCase().includes(q) ||
        (c.last_name ?? '').toLowerCase().includes(q)
    )
  }, [customers, search])

  function toggleTag(customerId: string, tag: string) {
    setTags((prev) => {
      const current = prev[customerId] ?? []
      return {
        ...prev,
        [customerId]: current.includes(tag)
          ? current.filter((t) => t !== tag)
          : [...current, tag],
      }
    })
  }

  function addNote(customerId: string) {
    if (!note.trim()) return
    setNotes((prev) => ({
      ...prev,
      [customerId]: [...(prev[customerId] ?? []), note.trim()],
    }))
    setNote('')
  }

  function exportCSV() {
    const header = 'Name,Email,Phone,Orders,LTV,Joined'
    const rows = filtered.map(
      (c) =>
        `"${[c.first_name, c.last_name].filter(Boolean).join(' ')}","${c.email}","${c.phone ?? ''}",${c.order_count ?? 0},${c.ltv ?? 0},"${fmtDate(c.created_at)}"`
    )
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} customers</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-[#D4AF37]/60"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Orders</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">LTV</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400 animate-pulse">
                  Loading customers…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <>
                  <tr
                    key={c.id}
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {[c.first_name, c.last_name].filter(Boolean).join(' ') || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-700">{c.order_count ?? 0}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{fmt(c.ltv ?? 0)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(tags[c.id] ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#D4AF37]/10 text-[#0A1628] border border-[#D4AF37]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{fmtDate(c.created_at)}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {expanded === c.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </td>
                  </tr>
                  {expanded === c.id && (
                    <tr key={`${c.id}-expanded`} className="border-b border-gray-100 bg-blue-50/30">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Tags */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {TAGS.map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => toggleTag(c.id, tag)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                    (tags[c.id] ?? []).includes(tag)
                                      ? 'bg-[#D4AF37] text-[#0A1628] border-[#D4AF37]'
                                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/50'
                                  }`}
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                          {/* Notes */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Internal Notes
                            </p>
                            <div className="flex gap-2 mb-2">
                              <input
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addNote(c.id)}
                                placeholder="Add a note…"
                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 bg-white"
                              />
                              <button
                                onClick={() => addNote(c.id)}
                                className="p-1.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-lg transition-colors"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {(notes[c.id] ?? []).map((n, i) => (
                              <p key={i} className="text-xs text-gray-600 bg-white rounded px-2 py-1 mb-1 border border-gray-100">
                                {n}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
