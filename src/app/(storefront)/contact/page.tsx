'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-2xl font-bold text-white">Message Sent!</h1>
        <p className="text-gray-400 text-center max-w-md">
          Thank you for reaching out. Our team will respond within 1-2 business days.
        </p>
        <a href="/" className="text-[#D4AF37] hover:underline text-sm mt-4">
          Return to Home
        </a>
      </div>
    )
  }

  return (
    <div className="bg-[#060f1e] min-h-screen">
      <div className="bg-gradient-to-br from-[#0A1628] to-[#060f1e] py-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <p className="text-gray-300 text-xl">
            Questions about products, orders, or research? We&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Your Name</Label>
                <Input
                  required
                  placeholder="Full name"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Email Address</Label>
                <Input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Subject</Label>
                <Input
                  required
                  placeholder="How can we help?"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Message</Label>
                <Textarea
                  required
                  placeholder="Your message..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#D4AF37] min-h-32"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Support Info</h2>

            {[
              {
                icon: '📧',
                title: 'Email Support',
                value: 'support@victorybiolabs.com',
                desc: 'General inquiries, orders, returns',
              },
              {
                icon: '🔬',
                title: 'Research Questions',
                value: 'research@victorybiolabs.com',
                desc: 'Technical questions about compounds',
              },
              {
                icon: '⏱️',
                title: 'Response Time',
                value: '1-2 Business Days',
                desc: 'Mon–Fri, 9am–5pm EST',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-[#D4AF37] text-sm font-medium">{item.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-amber-950/20 border border-amber-600/20 rounded-xl p-5 mt-8">
              <p className="text-amber-300/70 text-xs leading-relaxed">
                <strong className="text-amber-300">Note:</strong> Victory Bio Labs only provides
                information about our research compounds in the context of legitimate scientific
                research. We are unable to provide medical advice, dosing recommendations for
                human use, or guidance on non-research applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
