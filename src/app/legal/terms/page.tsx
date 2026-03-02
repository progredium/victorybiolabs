import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Victory Bio Labs Terms of Service governing use of our website and purchase of research compounds.',
}

export default function TermsPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

        <div className="space-y-8 text-sm">
          {[
            {
              title: '1. Acceptance of Terms',
              content: `By accessing or using the Victory Bio Labs website and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.`,
            },
            {
              title: '2. Research Use Only',
              content: `All products sold by Victory Bio Labs are strictly for laboratory research purposes only. You agree that you will not purchase products for human consumption, personal use as a supplement, or any use other than legitimate scientific research conducted in an appropriate laboratory setting by qualified researchers.`,
            },
            {
              title: '3. Age Requirement',
              content: `You must be at least 18 years of age to purchase products from Victory Bio Labs. By placing an order, you represent and warrant that you are at least 18 years old.`,
            },
            {
              title: '4. Eligibility',
              content: `Our products are sold exclusively to qualified researchers, research institutions, and licensed laboratories. By purchasing, you represent that you are a qualified researcher with the appropriate credentials, institutional affiliation, or professional background to safely handle and appropriately use research compounds.`,
            },
            {
              title: '5. Product Information',
              content: `Product information, descriptions, and research information provided on this website are for informational purposes only. Victory Bio Labs makes no representations or warranties regarding the accuracy or completeness of product information. All product information should be independently verified by qualified researchers before use.`,
            },
            {
              title: '6. Ordering & Payment',
              content: `Orders are subject to acceptance by Victory Bio Labs. We reserve the right to refuse or cancel any order at our discretion. Prices are subject to change without notice. Payment must be received in full before orders are processed.`,
            },
            {
              title: '7. Shipping & Delivery',
              content: `Victory Bio Labs ships to addresses in the United States and select international locations. Delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery to the carrier. You are responsible for ensuring the legal importation of products to your location.`,
            },
            {
              title: '8. Returns & Refunds',
              content: `Due to the nature of research compounds, all sales are generally final. Please see our Refund Policy for specific circumstances under which returns or refunds may be accepted.`,
            },
            {
              title: '9. Intellectual Property',
              content: `All content on this website, including but not limited to text, images, logos, and product information, is the property of Victory Bio Labs and is protected by applicable intellectual property laws.`,
            },
            {
              title: '10. Limitation of Liability',
              content: `Victory Bio Labs shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or misuse of our products or website. Our liability, in any case, shall not exceed the amount paid for the specific product giving rise to the claim.`,
            },
            {
              title: '11. Governing Law',
              content: `These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.`,
            },
            {
              title: '12. Changes to Terms',
              content: `Victory Bio Labs reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.`,
            },
            {
              title: '13. Contact',
              content: `For questions regarding these Terms of Service, please contact us at support@victorybiolabs.com.`,
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-[#D4AF37] font-bold text-lg mb-2">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
