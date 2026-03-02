import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Victory Bio Labs Refund and Return Policy for research compound purchases.',
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Refund Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

        <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-4 mb-10">
          <p className="text-blue-300/70 text-sm">
            Due to the specialized nature of research compounds and strict regulatory requirements,
            our refund policy differs from standard retail. Please read carefully before purchasing.
          </p>
        </div>

        <div className="space-y-8 text-sm">
          {[
            {
              title: 'General Policy',
              content: `Due to the nature of research compounds — which are temperature-sensitive, perishable, and subject to strict regulatory requirements — all sales are generally final. We are unable to accept returns of opened products.`,
            },
            {
              title: 'Eligible Refund Circumstances',
              content: `We will issue a refund or replacement in the following circumstances: (1) The product arrived damaged or broken; (2) The product was not what was ordered (wrong product shipped); (3) The product was significantly defective based on our certificate of analysis. Claims must be made within 7 days of delivery with supporting documentation and photos.`,
            },
            {
              title: 'Non-Eligible Circumstances',
              content: `We are unable to issue refunds for: Change of mind or orders placed in error; Products that were properly delivered but refused at delivery; Orders where incorrect shipping addresses were provided; Orders held or confiscated by customs or regulatory authorities; or any use of products outside of their intended research purpose.`,
            },
            {
              title: 'Damaged or Incorrect Products',
              content: `If you receive a damaged or incorrect product, contact us within 7 days at support@victorybiolabs.com with: your order number, photos of the damaged/incorrect item, photos of the packaging, and a description of the issue. We will work to resolve the situation promptly.`,
            },
            {
              title: 'Refund Processing',
              content: `Approved refunds will be processed to the original payment method within 5-10 business days. Shipping costs are non-refundable unless the error was ours.`,
            },
            {
              title: 'Order Cancellations',
              content: `Orders may be cancelled for a full refund if requested before the order has been shipped. Once an order has shipped, our standard refund policy applies. Contact support@victorybiolabs.com immediately if you need to cancel an order.`,
            },
            {
              title: 'International Orders',
              content: `For international orders, we are not responsible for packages held, seized, or destroyed by customs authorities. Customers are responsible for understanding the import regulations in their jurisdiction before ordering.`,
            },
            {
              title: 'Contact',
              content: `For refund requests or questions about this policy, contact us at support@victorybiolabs.com. Please include your order number in all correspondence.`,
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
