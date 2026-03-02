import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductGrid from '@/components/shop/ProductGrid'
import { Product } from '@/types'

export const metadata: Metadata = {
  title: 'Shop Research Compounds',
  description:
    'Browse our full catalog of research-grade peptide compounds. For research purposes only.',
}

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'peptides', label: 'Peptides' },
  { value: 'secretagogues', label: 'Secretagogues' },
  { value: 'metabolic', label: 'Metabolic Research' },
  { value: 'mitochondrial', label: 'Mitochondrial' },
]

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

async function getProducts(category?: string): Promise<Product[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('products')
      .select('*, product_variants(*)')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data } = await query
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const category = params.category ?? 'all'
  const products = await getProducts(category)

  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="bg-[#0A1628] border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Research Compounds
          </h1>
          <p className="text-gray-400">
            All products for laboratory research purposes only. Not for human consumption.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Categories
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <a
                      href={cat.value === 'all' ? '/shop' : `/shop?category=${cat.value}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.value
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-amber-400/70 leading-relaxed">
                  ⚠️ All compounds are strictly for research use only.
                </p>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
