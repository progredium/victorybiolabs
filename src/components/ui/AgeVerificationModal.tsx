'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function AgeVerificationModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('vbl_age_verified')
    if (!verified) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('vbl_age_verified', 'true')
    setShow(false)
  }

  const handleDecline = () => {
    window.location.href = 'https://www.google.com'
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <div className="bg-[#0A1628] border-2 border-[#D4AF37] rounded-xl max-w-md w-full p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-[#D4AF37] font-bold text-2xl mb-2">Age Verification</h2>
        <p className="text-white font-semibold mb-1">Victory Bio Labs</p>
        <p className="text-gray-400 text-sm mb-6">
          Research Compound Store
        </p>

        <div className="bg-amber-950/50 border border-amber-600/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-amber-200 text-xs leading-relaxed">
            <strong className="text-amber-300">NOTICE:</strong> This website sells research compounds
            for laboratory use only. All products are strictly for scientific research purposes
            and are not intended for human consumption.
          </p>
        </div>

        <p className="text-gray-300 text-sm mb-6">
          By entering this site, you confirm that:
        </p>
        <ul className="text-gray-400 text-sm text-left space-y-2 mb-8 list-none">
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37]">✓</span>
            <span>You are 18 years of age or older</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37]">✓</span>
            <span>You are a qualified researcher or research professional</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37]">✓</span>
            <span>You understand all products are for research use only</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#D4AF37]">✓</span>
            <span>You will not use these products for human consumption</span>
          </li>
        </ul>

        <div className="flex gap-3">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
          >
            Exit Site
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold"
          >
            I Confirm, Enter
          </Button>
        </div>
      </div>
    </div>
  )
}
