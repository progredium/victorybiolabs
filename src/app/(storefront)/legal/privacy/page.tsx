import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Victory Bio Labs Privacy Policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

        <div className="space-y-8 text-sm">
          {[
            {
              title: '1. Information We Collect',
              content: `We collect information you provide directly to us, including: name, email address, shipping address, phone number, and payment information when you place an order. We also collect technical information about your visit, such as your IP address, browser type, pages visited, and other usage data through cookies and similar technologies.`,
            },
            {
              title: '2. How We Use Your Information',
              content: `We use the information we collect to: process and fulfill your orders; send order confirmations and updates; respond to your inquiries and provide customer support; send you information about products, promotions, and educational content (with your consent); improve our website and services; and comply with legal obligations.`,
            },
            {
              title: '3. Research Use Verification',
              content: `As part of our compliance obligations, we collect and retain confirmation of your research-use intent and age verification when you make purchases. This information is retained as part of our compliance records.`,
            },
            {
              title: '4. Information Sharing',
              content: `We do not sell your personal information to third parties. We may share your information with: shipping carriers to fulfill your orders; payment processors to process payments; service providers who assist in our operations (subject to confidentiality agreements); and law enforcement or regulatory authorities when required by law.`,
            },
            {
              title: '5. Data Security',
              content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
            },
            {
              title: '6. Cookies',
              content: `We use cookies and similar tracking technologies to operate our website, remember your preferences, and analyze website traffic. You can control cookie settings through your browser, but disabling cookies may affect website functionality.`,
            },
            {
              title: '7. Data Retention',
              content: `We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Order records are retained for a minimum of 7 years for compliance purposes.`,
            },
            {
              title: '8. Your Rights',
              content: `You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at privacy@victorybiolabs.com. Note that certain information may be retained as required by law.`,
            },
            {
              title: '9. Third-Party Links',
              content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
            },
            {
              title: '10. Changes to This Policy',
              content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of our website following any changes constitutes your acceptance of the revised policy.`,
            },
            {
              title: '11. Contact Us',
              content: `If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@victorybiolabs.com.`,
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
