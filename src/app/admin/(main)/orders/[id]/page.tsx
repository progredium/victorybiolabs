'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge'
import { ArrowLeft, Printer, RefreshCw, Plus, Save } from 'lucide-react'
import type { Order, OrderItem, OrderNote } from '@/types'

const ORDER_STATUSES: Order['status'][] = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]

function fmt(n: number) {
  return `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function fmtDate(s: string) {
  return new Date(s).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface FullOrder extends Omit<Order, 'customers'> {
  customers?: {
    email: string
    first_name: string | null
    last_name: string | null
    phone: string | null
  } | null
  order_items?: (OrderItem & {
    products?: { name: string } | null
    product_variants?: { name: string } | null
  })[]
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [order, setOrder] = useState<FullOrder | null>(null)
  const [notes, setNotes] = useState<OrderNote[]>([])
  const [newNote, setNewNote] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [statusUpdate, setStatusUpdate] = useState<Order['status']>('pending')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [orderRes, notesRes] = await Promise.all([
        supabase
          .from('orders')
          .select(
            '*, customers(email, first_name, last_name, phone), order_items(*, products(name), product_variants(name))'
          )
          .eq('id', id)
          .single(),
        supabase
          .from('order_notes')
          .select('*')
          .eq('order_id', id)
          .order('created_at', { ascending: false }),
      ])
      if (orderRes.data) {
        const o = orderRes.data as FullOrder
        setOrder(o)
        setStatusUpdate(o.status)
        setTrackingNumber(o.notes ?? '')
      }
      setNotes((notesRes.data ?? []) as OrderNote[])
      setLoading(false)
    }
    load()
  }, [id])

  async function saveStatus() {
    if (!order) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('orders')
      .update({ status: statusUpdate, notes: trackingNumber || null })
      .eq('id', order.id)
    if (!error) {
      setOrder({ ...order, status: statusUpdate, notes: trackingNumber || null })
    }
    setSaving(false)
  }

  async function addNote() {
    if (!newNote.trim() || !order) return
    const supabase = createClient()
    const { data } = await supabase
      .from('order_notes')
      .insert({ order_id: order.id, note: newNote.trim(), created_by: 'admin' })
      .select()
      .single()
    if (data) {
      setNotes([data as OrderNote, ...notes])
      setNewNote('')
    }
  }

  const addr = order?.shipping_address

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-48" />
          <div className="h-40 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Order not found.</p>
        <Link href="/admin/orders" className="text-[#D4AF37] hover:underline text-sm mt-2 inline-block">
          ← Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="text-sm text-gray-500">{fmtDate(order.created_at)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors">
            <Printer className="h-4 w-4" />
            Packing Slip
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-sm rounded-lg transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refund
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Line Items */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {(order.order_items ?? []).map((item) => (
                <div key={item.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.products?.name ?? 'Unknown Product'}
                    </p>
                    {item.product_variants?.name && (
                      <p className="text-xs text-gray-500">{item.product_variants.name}</p>
                    )}
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {fmt(item.qty * item.unit_price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>{fmt(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span><span>{fmt(order.shipping_cost)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-100">
                <span>Total</span><span>{fmt(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Internal Notes</h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex gap-2">
                <input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNote()}
                  placeholder="Add a note…"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20"
                />
                <button
                  onClick={addNote}
                  className="p-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {notes.length === 0 ? (
                <p className="text-sm text-gray-400">No notes yet.</p>
              ) : (
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{note.note}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {note.created_by} · {fmtDate(note.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Order Status</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Current:</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value as Order['status'])}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Tracking number…"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
              />
              <button
                onClick={saveStatus}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Customer</h2>
            {order.customers ? (
              <div className="space-y-1 text-sm">
                <p className="font-medium text-gray-800">
                  {[order.customers.first_name, order.customers.last_name].filter(Boolean).join(' ') || 'N/A'}
                </p>
                <p className="text-gray-600">{order.customers.email}</p>
                {order.customers.phone && (
                  <p className="text-gray-500">{order.customers.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Guest order</p>
            )}
          </div>

          {/* Shipping Address */}
          {addr && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 text-sm mb-3">Ship To</h2>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="font-medium text-gray-800">
                  {addr.first_name} {addr.last_name}
                </p>
                <p>{addr.address1}</p>
                {addr.address2 && <p>{addr.address2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p>{addr.country}</p>
              </div>
            </div>
          )}

          {/* Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 text-sm mb-2">Compliance</h2>
            <div className="space-y-1 text-xs">
              <p className={order.age_confirmed ? 'text-green-600' : 'text-red-500'}>
                {order.age_confirmed ? '✓' : '✗'} Age confirmed
              </p>
              <p className={order.research_confirmed ? 'text-green-600' : 'text-red-500'}>
                {order.research_confirmed ? '✓' : '✗'} Research use confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
