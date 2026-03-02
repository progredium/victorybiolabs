'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, RefreshCw, Copy, Check } from 'lucide-react'
import type { DiscountCode } from '@/types'

function fmtDate(s: string | null) {
  if (!s) return '—'
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtValue(code: DiscountCode) {
  if (code.type === 'percent') return `${code.value}%`
  if (code.type === 'fixed') return `$${code.value.toFixed(2)}`
  return 'Free Shipping'
}

function randomCode(len = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function DiscountsPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    code: '',
    type: 'percent' as DiscountCode['type'],
    value: '',
    usage_limit: '',
    expires_at: '',
  })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('discount_codes')
      .select('*')
      .order('created_at', { ascending: false })
    setCodes((data ?? []) as DiscountCode[])
    setLoading(false)
  }

  async function toggleActive(id: string, active: boolean) {
    const supabase = createClient()
    await supabase.from('discount_codes').update({ active: !active }).eq('id', id)
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, active: !active } : c)))
  }

  async function createCode() {
    if (!form.code.trim() || !form.value.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('discount_codes')
      .insert({
        code: form.code.trim().toUpperCase(),
        type: form.type,
        value: parseFloat(form.value) || 0,
        usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
        expires_at: form.expires_at || null,
        active: true,
        usage_count: 0,
      })
      .select()
      .single()

    if (!error && data) {
      setCodes((prev) => [data as DiscountCode, ...prev])
      setForm({ code: '', type: 'percent', value: '', usage_limit: '', expires_at: '' })
      setShowForm(false)
    }
    setSaving(false)
  }

  function bulkGenerate() {
    const count = parseInt(prompt('How many codes to generate?', '10') ?? '0')
    if (!count || count <= 0) return
    const prefix = prompt('Prefix (optional):', 'VBL') ?? ''
    const generated = Array.from({ length: count }, () => ({
      code: `${prefix}${randomCode()}`,
      type: 'percent' as const,
      value: 10,
      usage_count: 0,
      usage_limit: 1,
      expires_at: null,
      active: true,
    }))
    alert(`Generated ${count} codes. Connect Supabase to persist them.`)
    const display: DiscountCode[] = generated.map((g, i) => ({
      ...g,
      id: `preview-${i}`,
      created_at: new Date().toISOString(),
    }))
    setCodes((prev) => [...display, ...prev])
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Discount Codes</h1>
          <p className="text-sm text-gray-500 mt-0.5">{codes.length} codes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={bulkGenerate}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Bulk Generate
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1628] text-sm font-semibold rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Code
          </button>
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm">New Discount Code</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Code</label>
              <div className="flex gap-2">
                <input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="VBL20OFF"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 font-mono"
                />
                <button
                  onClick={() => setForm({ ...form, code: randomCode() })}
                  className="px-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Generate random"
                >
                  <RefreshCw className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as DiscountCode['type'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
              >
                <option value="percent">Percent (%)</option>
                <option value="fixed">Fixed ($)</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>
            {form.type !== 'free_shipping' && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                <input
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder={form.type === 'percent' ? '10' : '5.00'}
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Usage Limit</label>
              <input
                value={form.usage_limit}
                onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
                placeholder="Unlimited"
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Expires At</label>
              <input
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={createCode}
              disabled={saving}
              className="px-4 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Creating…' : 'Create Code'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Value</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Uses</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Limit</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Expires</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400 animate-pulse">
                  Loading discount codes…
                </td>
              </tr>
            ) : codes.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                  No discount codes yet. Create one above.
                </td>
              </tr>
            ) : (
              codes.map((code) => (
                <tr key={code.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-gray-800">{code.code}</span>
                      <button
                        onClick={() => copyCode(code.code)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        title="Copy code"
                      >
                        {copied === code.code ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{code.type}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{fmtValue(code)}</td>
                  <td className="px-4 py-3 text-gray-700">{code.usage_count}</td>
                  <td className="px-4 py-3 text-gray-500">{code.usage_limit ?? '∞'}</td>
                  <td className="px-4 py-3 text-gray-500">{fmtDate(code.expires_at)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        code.active
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {code.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(code.id, code.active)}
                      className="text-xs text-[#D4AF37] hover:underline font-medium"
                    >
                      {code.active ? 'Disable' : 'Enable'}
                    </button>
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
