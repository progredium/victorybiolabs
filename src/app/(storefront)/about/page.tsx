import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About — Maxwell Francks & Victory Bio Labs',
  description:
    'Meet Maxwell Francks, the founder of Victory Bio Labs. Our mission, values, and commitment to research-grade quality.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#060f1e] py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Face Behind{' '}
            <span className="text-[#D4AF37]">Victory Bio Labs</span>
          </h1>
          <p className="text-gray-300 text-xl">
            Built on a passion for science, performance, and human potential.
          </p>
        </div>
      </section>

      {/* Maxwell&apos;s Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2d50] rounded-2xl aspect-[4/5] flex items-center justify-center border border-[#D4AF37]/20">
              <div className="text-center">
                <div className="text-8xl mb-4">👤</div>
                <p className="text-[#D4AF37] font-semibold">Maxwell Francks</p>
                <p className="text-gray-400 text-sm">Founder, Victory Bio Labs</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Victory Bio Labs was born from a personal journey — one driven by a relentless
                  pursuit of understanding human performance, longevity, and the cutting edge of
                  peptide science.
                </p>
                <p>
                  As someone deeply embedded in the research and wellness space, I saw firsthand
                  the gap between what science was revealing and what was actually available to
                  qualified researchers. Products were inconsistent, documentation was lacking,
                  and the community deserved better.
                </p>
                <p>
                  So I built Victory Bio Labs — a company committed to transparency, quality, and
                  education. Every product we carry is selected based on published research interest,
                  verified with independent testing, and delivered with full documentation.
                </p>
                <p>
                  This isn&apos;t just a business. It&apos;s a mission to advance research and build a
                  community of people who take their work seriously.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/shop">
                  <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold mr-4">
                    Browse Our Compounds
                  </Button>
                </Link>
                <Link href="/education">
                  <Button variant="outline" className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10">
                    Research Library
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#0A1628]/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-xl leading-relaxed mb-8">
            To provide qualified researchers with the highest-quality, best-documented
            research compounds available — backed by transparency, third-party verification,
            and a community dedicated to advancing science.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔬', title: 'Science First', desc: 'Every product selected based on published research interest and scientific merit.' },
              { icon: '✅', title: 'Verified Quality', desc: 'Third-party tested. Certificates of analysis available for every batch.' },
              { icon: '🤝', title: 'Community Driven', desc: 'Built by and for a community of serious researchers and health professionals.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Compliance Matters */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Why Compliance Matters to Us
          </h2>
          <div className="bg-amber-950/30 border border-amber-600/30 rounded-xl p-8">
            <p className="text-amber-200 text-sm leading-relaxed mb-4">
              At Victory Bio Labs, compliance is not a checkbox — it is central to everything
              we do. Research compounds exist in a complex regulatory landscape, and we take
              our responsibilities seriously.
            </p>
            <ul className="text-amber-200/80 text-sm space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                <span>All products are sold strictly for laboratory and research purposes only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                <span>We require age verification (18+) and research-use confirmation for all purchases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                <span>Our product descriptions focus on documented research contexts, not outcome claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                <span>We maintain transparent records and are committed to regulatory compliance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Victory Life Circle */}
      <section className="py-20 bg-gradient-to-r from-[#0A1628] to-[#0d1f3c] border-y border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            The <span className="text-[#D4AF37]">Victory Life Circle</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Beyond the products, Victory Bio Labs is building a community. The Victory Life Circle
            is our inner circle — a group of dedicated researchers, health professionals, and
            performance-focused individuals who get exclusive access to education, early product
            releases, and direct lines of communication with our team.
          </p>
          <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold px-8">
            Join the Victory Life Circle
          </Button>
        </div>
      </section>
    </div>
  )
}
