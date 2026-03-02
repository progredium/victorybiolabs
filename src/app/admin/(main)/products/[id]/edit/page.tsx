'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import type { Product, ProductVariant } from '@/types'

interface VariantInput {
  id?: string
  name: string
  price: string
  sku: string
  stock_qty: string
  weight_g: string
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('peptides')
  const [status, setStatus] = useState<Product['status']>('draft')
  const [description, setDescription] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [disclaimer, setDisclaimer] = useState('')
  const [researchOnly, setResearchOnly] = useState(true)
  const [variants, setVariants] = useState<VariantInput[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('id', id)
        .single()

      if (data) {
        setName(data.name)
        setSlug(data.slug)
        setCategory(data.category)
        setStatus(data.status)
        setDescription(data.description ?? '')
        setShortDescription(data.short_description ?? '')
        setDisclaimer(data.disclaimer ?? '')
        setResearchOnly(data.research_use_only)
        setVariants(
          ((data.product_variants ?? []) as ProductVariant[]).map((v) => ({
            id: v.id,
            name: v.name,
            price: String(v.price),
            sku: v.sku ?? '',
            stock_qty: String(v.stock_qty),
            weight_g: v.weight_g != null ? String(v.weight_g) : '',
          }))
        )
      }
      setLoading(false)
    }
    load()
  }, [id])

  function updateVariant(i: number, field: keyof VariantInput, value: string) {
    setVariants((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      { name: '', price: '', sku: '', stock_qty: '', weight_g: '' },
    ])
  }

  function removeVariant(i: number) {
    setVariants((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave(publish: boolean) {
    if (!name.trim()) { setError('Product name is required.'); return }
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const finalStatus = publish ? 'active' : status

    const { error: prodErr } = await supabase
      .from('products')
      .update({
        name: name.trim(),
        slug: slug || slugify(name),
        category,
        status: finalStatus,
        description: description || null,
        short_description: shortDescription || null,
        disclaimer,
        research_use_only: researchOnly,
      })
      .eq('id', id)

    if (prodErr) {
      setError(prodErr.message)
      setSaving(false)
      return
    }

    // Upsert variants
    const validVariants = variants.filter((v) => v.name.trim())
    for (const v of validVariants) {
      const payload = {
        product_id: id,
        name: v.name.trim(),
        price: parseFloat(v.price) || 0,
        sku: v.sku || null,
        stock_qty: parseInt(v.stock_qty) || 0,
        weight_g: parseFloat(v.weight_g) || null,
      }
      if (v.id) {
        await supabase.from('product_variants').update(payload).eq('id', v.id)
      } else {
        await supabase.from('product_variants').insert(payload)
      }
    }

    router.push('/admin/products')
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-48" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 font-mono focus:outline-none focus:border-[#D4AF37]/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Product['status'])}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 resize-y"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Compliance Disclaimer</label>
          <textarea
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 resize-y"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="researchOnly"
            checked={researchOnly}
            onChange={(e) => setResearchOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="researchOnly" className="text-sm text-gray-700">
            Research use only
          </label>
        </div>
      </div>

      {/* Variants */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Variants</h2>
          <button
            onClick={addVariant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#0A1628] border border-[#0A1628]/20 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Variant
          </button>
        </div>
        {variants.map((v, i) => (
          <div key={i} className="grid grid-cols-5 gap-3 items-center p-4 bg-gray-50 rounded-lg">
            <input
              value={v.name}
              onChange={(e) => updateVariant(i, 'name', e.target.value)}
              placeholder="Name"
              className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 bg-white"
            />
            <input
              value={v.price}
              onChange={(e) => updateVariant(i, 'price', e.target.value)}
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 bg-white"
            />
            <input
              value={v.stock_qty}
              onChange={(e) => updateVariant(i, 'stock_qty', e.target.value)}
              placeholder="Stock"
              type="number"
              min="0"
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 bg-white"
            />
            <div className="flex gap-2 items-center">
              <input
                value={v.sku}
                onChange={(e) => updateVariant(i, 'sku', e.target.value)}
                placeholder="SKU"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 bg-white"
              />
              {variants.length > 1 && (
                <button
                  onClick={() => removeVariant(i)}
                  className="p-1.5 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pb-4">
        <Link
          href="/admin/products"
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1628] text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save & Publish'}
        </button>
      </div>
    </div>
  )
}
