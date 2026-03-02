import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Use Disclaimer',
  description: 'Important disclaimer regarding the research-only nature of Victory Bio Labs products.',
}

export default function DisclaimerPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Research Use Disclaimer</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

        <div className="bg-amber-950/40 border-2 border-amber-600/50 rounded-xl p-6 mb-10">
          <p className="text-amber-200 font-bold text-lg mb-2">⚠️ IMPORTANT NOTICE</p>
          <p className="text-amber-200/90 text-sm leading-relaxed">
            ALL PRODUCTS SOLD BY VICTORY BIO LABS ARE STRICTLY FOR LABORATORY AND RESEARCH
            PURPOSES ONLY. THESE PRODUCTS ARE NOT INTENDED FOR HUMAN CONSUMPTION AND ARE NOT
            APPROVED BY THE FOOD AND DRUG ADMINISTRATION (FDA).
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">1. Research Use Only</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Victory Bio Labs sells research compounds exclusively for use in certified research
              laboratories and scientific research settings by qualified researchers. All products
              are intended solely for in vitro (outside the body) research and are not suitable,
              safe, or intended for in vivo use in humans or animals outside of properly authorized
              research protocols.
            </p>
          </section>

          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">2. Not for Human Consumption</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              The products offered by Victory Bio Labs are research chemicals and peptide compounds.
              They are NOT approved for human use, human consumption, or human administration of
              any kind. These products have not been evaluated by the FDA for safety or efficacy
              in humans. The use of these products for any purpose other than scientific research
              is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">3. No Medical Claims</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Victory Bio Labs makes no medical claims regarding any of its products. No product
              sold by Victory Bio Labs is intended to diagnose, treat, cure, or prevent any disease
              or health condition in humans or animals. Any information provided on this website
              about research findings is strictly for educational purposes and does not constitute
              medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">4. Purchaser Responsibility</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              By purchasing from Victory Bio Labs, you represent and warrant that: (a) you are at
              least 18 years of age; (b) you are a qualified researcher or research professional;
              (c) you will use purchased products solely for legitimate scientific research; (d)
              you understand and accept all applicable laws and regulations in your jurisdiction
              regarding research chemicals; and (e) you assume all responsibility for compliance
              with applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">5. Regulatory Compliance</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              It is the sole responsibility of the purchaser to ensure compliance with all
              applicable local, state, federal, and international laws and regulations regarding
              the purchase, possession, use, and disposal of research chemicals. Victory Bio Labs
              is not responsible for any illegal or improper use of its products.
            </p>
          </section>

          <section>
            <h2 className="text-[#D4AF37] font-bold text-xl mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Victory Bio Labs shall not be liable for any damages, losses, or injuries arising
              from the misuse of its products or from any use inconsistent with the research-only
              purpose for which they are sold. All products are sold as-is for research purposes
              only.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
