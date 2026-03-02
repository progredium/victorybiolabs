import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ComplianceBar from '@/components/layout/ComplianceBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AgeVerificationModal from '@/components/ui/AgeVerificationModal'
import { CartProvider } from '@/components/cart/CartProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Victory Bio Labs — Research-Grade Peptide Compounds',
    template: '%s | Victory Bio Labs',
  },
  description:
    'Victory Bio Labs provides research-grade peptide compounds for qualified researchers. Verified purity. Fast discreet shipping. For research use only.',
  keywords: ['peptide research', 'research compounds', 'BPC-157', 'semaglutide', 'research chemicals'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://victorybiolabs.com',
    siteName: 'Victory Bio Labs',
    title: 'Victory Bio Labs — Research-Grade Peptide Compounds',
    description:
      'Premium research-grade peptide compounds for qualified researchers. For research use only.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060f1e] text-white`}
      >
        <CartProvider>
          <AgeVerificationModal />
          <ComplianceBar />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
