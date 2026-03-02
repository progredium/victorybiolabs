import ComplianceBar from '@/components/layout/ComplianceBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AgeVerificationModal from '@/components/ui/AgeVerificationModal'

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AgeVerificationModal />
      <ComplianceBar />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
