import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductGrid from '@/components/shop/ProductGrid'
import { createClient } from '@/lib/supabase/server'
import { Product } from '@/types'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('status', 'active')
      .limit(3)
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <div className="bg-[#060f1e]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f3c] to-[#060f1e]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#D4AF37] text-sm font-medium">⚗ Research-Grade Quality</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Pure Science.{' '}
            <span className="text-[#D4AF37]">Real Results.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Victory Bio Labs delivers verified, research-grade peptide compounds to qualified researchers.
            Every batch tested. Every vial certified.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold px-8 text-base">
                Browse Research Compounds
              </Button>
            </Link>
            <Link href="/education">
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 text-base"
              >
                Research Library
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-amber-400/60 text-xs">
            For research purposes only. Not for human consumption.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                title: 'Verified Purity',
                desc: 'Every compound independently verified with third-party HPLC and mass spectrometry testing. Certificates of analysis available for every product.',
              },
              {
                icon: '🏆',
                title: 'Research-Grade Quality',
                desc: 'Pharmaceutical-grade synthesis processes ensure consistent quality and concentration. Rigorous quality control from production to delivery.',
              },
              {
                icon: '📦',
                title: 'Fast Discreet Shipping',
                desc: 'Orders ship within 24 hours. Discreet packaging with no external labeling. Temperature-controlled shipping available for sensitive compounds.',
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Research Compounds
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Our most studied compounds, trusted by researchers worldwide.
              All products for research purposes only.
            </p>
          </div>
          {featured.length > 0 ? (
            <ProductGrid products={featured} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['BPC-157', 'Semaglutide', 'Tirzepatide'].map((name) => (
                <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🧪</div>
                  <h3 className="text-white font-semibold text-lg">{name}</h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Run schema.sql &amp; seed.sql in Supabase to populate products.
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10">
                View All Products →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Victory Life Circle Community CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0A1628] to-[#0d1f3c] border-y border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the{' '}
            <span className="text-[#D4AF37]">Victory Life Circle</span>
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Connect with a community of forward-thinking researchers and health professionals.
            Exclusive education, early access to new compounds, and direct access to Maxwell and the Victory team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold px-8">
              Join the Community
            </Button>
            <Link href="/about">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Meet Maxwell
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Footer Banner */}
      <section className="bg-amber-950/30 border-t border-amber-600/30 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300/80 text-sm">
            ⚠️ <strong>Important Notice:</strong> All products sold by Victory Bio Labs are for{' '}
            <strong>laboratory and research purposes only</strong>. These products are not intended
            for human consumption and have not been approved by the FDA. Must be 18+ to purchase.
          </p>
        </div>
      </section>
    </div>
  )
}
