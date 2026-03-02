import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-[#D4AF37]/20">
      {/* Compliance Banner */}
      <div className="bg-amber-950 border-t-2 border-amber-600 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-amber-200 text-sm font-semibold">
            ⚠️ RESEARCH USE ONLY DISCLAIMER
          </p>
          <p className="text-amber-300/80 text-xs mt-1 max-w-3xl mx-auto">
            All products sold by Victory Bio Labs are strictly for laboratory and research purposes only.
            These products are not approved by the FDA and are not intended for human consumption, diagnosis,
            treatment, cure, or prevention of any disease or health condition. By purchasing from this site,
            you confirm you are a qualified researcher and will use these products only in appropriate research settings.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#D4AF37] font-bold text-lg mb-4">
              Victory<span className="text-white">BioLabs</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium research-grade peptide compounds. Rigorous quality control. Verified purity certificates.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=peptides" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Peptides</Link></li>
              <li><Link href="/shop?category=research-chemicals" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Research Chemicals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">About</Link></li>
              <li><Link href="/education" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Education</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/disclaimer" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Research Disclaimer</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/refund-policy" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Victory Bio Labs. All rights reserved.
            All products for research purposes only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  )
}
