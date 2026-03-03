'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items } = useCart()
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0)

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/education', label: 'Education' },
    { href: '/lab-reports', label: 'Lab Reports' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-[#0A1628] border-b border-[#D4AF37]/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold text-xl tracking-tight">
              Victory<span className="text-white">BioLabs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#D4AF37] text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://victorybiolabs.com/community"
              className="text-gray-300 hover:text-[#D4AF37] text-sm font-medium transition-colors"
            >
              Community
            </a>
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative text-gray-300 hover:text-[#D4AF37] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0A1628] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-300 hover:text-[#D4AF37]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#D4AF37]/20 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-[#D4AF37] text-sm font-medium transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://victorybiolabs.com/community"
              className="block text-gray-300 hover:text-[#D4AF37] text-sm font-medium transition-colors py-1"
            >
              Community
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
