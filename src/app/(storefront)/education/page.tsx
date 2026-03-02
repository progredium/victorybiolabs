import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research Education & Resources',
  description:
    'Educational resources about peptide research, laboratory best practices, and the science behind research compounds. For research purposes only.',
}

const BLOG_POSTS = [
  {
    slug: 'introduction-to-peptide-research',
    title: 'Introduction to Peptide Research: A Primer for Scientists',
    excerpt:
      'An overview of peptide chemistry, synthesis methods, and the foundational concepts researchers need to understand before working with peptide compounds in laboratory settings.',
    category: 'Research Fundamentals',
    date: '2024-12-15',
    readTime: '8 min read',
  },
  {
    slug: 'understanding-glp1-receptor-agonists',
    title: 'Understanding GLP-1 Receptor Agonists: Mechanisms and Research Applications',
    excerpt:
      'A scientific review of glucagon-like peptide-1 receptor biology, the pharmacological characteristics of GLP-1 agonist compounds, and their current research applications in metabolic science.',
    category: 'Compound Research',
    date: '2024-11-28',
    readTime: '12 min read',
  },
  {
    slug: 'bpc-157-research-review',
    title: 'BPC-157: A Review of Published Research Literature',
    excerpt:
      'Summary of the published scientific literature on BPC-157, covering cellular biology studies, preclinical research findings, and current understanding of its mechanisms of action.',
    category: 'Compound Research',
    date: '2024-11-10',
    readTime: '15 min read',
  },
  {
    slug: 'peptide-storage-and-handling',
    title: 'Peptide Storage, Reconstitution, and Laboratory Handling Best Practices',
    excerpt:
      'A practical guide for researchers on proper storage conditions, reconstitution protocols, and handling procedures to maintain compound integrity and research validity.',
    category: 'Laboratory Protocols',
    date: '2024-10-22',
    readTime: '10 min read',
  },
  {
    slug: 'growth-hormone-secretagogues-research',
    title: 'Growth Hormone Secretagogues: Classification and Research Overview',
    excerpt:
      'Scientific classification of growth hormone secretagogue compounds, their receptor interactions, and an overview of research studying their effects on the GH/IGF-1 axis.',
    category: 'Compound Research',
    date: '2024-10-05',
    readTime: '11 min read',
  },
  {
    slug: 'mitochondrial-peptide-research',
    title: 'Mitochondrial-Targeting Peptides: Emerging Research Applications',
    excerpt:
      'An exploration of mitochondria-targeting peptide research, focusing on compounds like SS-31 and MOTS-c and their roles in cellular bioenergetics research.',
    category: 'Advanced Research',
    date: '2024-09-18',
    readTime: '13 min read',
  },
]

export default function EducationPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#060f1e] py-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Research{' '}
            <span className="text-[#D4AF37]">Education</span>
          </h1>
          <p className="text-gray-300 text-xl">
            Science-backed educational resources for qualified researchers.
          </p>
          <div className="mt-4 bg-blue-950/30 border border-blue-500/20 rounded-lg px-4 py-2 inline-block">
            <p className="text-blue-300/70 text-xs">
              All content is for educational and research purposes only. Not medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="mt-4">
                  <span className="text-[#D4AF37] text-sm font-medium cursor-pointer hover:underline">
                    Read Article →
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 bg-amber-950/20 border border-amber-600/20 rounded-xl p-6 text-center">
            <p className="text-amber-300/70 text-sm max-w-2xl mx-auto">
              <strong className="text-amber-300">Educational Disclaimer:</strong> All content on
              this page is provided for educational and research purposes only. Nothing on this page
              constitutes medical advice, diagnosis, or treatment recommendations. Always consult
              qualified healthcare and research professionals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1628]/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to explore our research compounds?
          </h2>
          <Link href="/shop">
            <span className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold px-8 py-3 rounded-lg transition-colors cursor-pointer">
              Browse Research Compounds →
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
