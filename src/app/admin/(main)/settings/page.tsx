'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Plus, UserCheck } from 'lucide-react'
import type { AdminUser } from '@/types'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
      <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
      {children}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20"
      />
    </div>
  )
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<AdminUser['role']>('staff')

  // Store settings (would be persisted to a settings table in production)
  const [storeName, setStoreName] = useState('VictoryBioLabs')
  const [storeEmail, setStoreEmail] = useState('admin@victorybiolabs.com')
  const [storeAddress, setStoreAddress] = useState('')
  const [flatRate, setFlatRate] = useState('9.99')
  const [freeThreshold, setFreeThreshold] = useState('150')
  const [lowStockDefault, setLowStockDefault] = useState('5')
  const [ageGateEnabled, setAgeGateEnabled] = useState(true)
  const [disclaimerText, setDisclaimerText] = useState(
    'For research purposes only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.'
  )

  useEffect(() => {
    async function loadAdmins() {
      const supabase = createClient()
      const { data } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: true })
      setAdmins((data ?? []) as AdminUser[])
    }
    loadAdmins()
  }, [])

  async function saveSettings() {
    // In production, persist to a settings table
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function inviteAdmin() {
    if (!newAdminEmail.trim()) return
    const supabase = createClient()
    const { data } = await supabase
      .from('admin_users')
      .insert({ email: newAdminEmail.trim(), role: newAdminRole })
      .select()
      .single()
    if (data) {
      setAdmins((prev) => [...prev, data as AdminUser])
      setNewAdminEmail('')
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Store configuration and admin management</p>
      </div>

      {/* Store Info */}
      <Section title="Store Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Store Name" value={storeName} onChange={setStoreName} />
          <Field label="Contact Email" value={storeEmail} onChange={setStoreEmail} type="email" />
        </div>
        <Field
          label="Store Address"
          value={storeAddress}
          onChange={setStoreAddress}
          placeholder="123 Research Dr, Suite 100, City, ST 12345"
        />
      </Section>

      {/* Shipping */}
      <Section title="Shipping Rates">
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Flat Rate ($)"
            value={flatRate}
            onChange={setFlatRate}
            type="number"
            placeholder="9.99"
          />
          <Field
            label="Free Shipping Threshold ($)"
            value={freeThreshold}
            onChange={setFreeThreshold}
            type="number"
            placeholder="150"
          />
        </div>
        <p className="text-xs text-gray-400">
          Orders over ${freeThreshold} qualify for free shipping.
        </p>
      </Section>

      {/* Inventory Defaults */}
      <Section title="Inventory Alerts">
        <Field
          label="Default Low Stock Threshold"
          value={lowStockDefault}
          onChange={setLowStockDefault}
          type="number"
          placeholder="5"
        />
        <p className="text-xs text-gray-400">
          Variants with stock at or below this value trigger low-stock alerts.
        </p>
      </Section>

      {/* Compliance */}
      <Section title="Compliance Settings">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Age Verification Gate</p>
            <p className="text-xs text-gray-400 mt-0.5">Require 18+ confirmation on site entry</p>
          </div>
          <button
            onClick={() => setAgeGateEnabled(!ageGateEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              ageGateEnabled ? 'bg-[#D4AF37]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                ageGateEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Research Disclaimer Text
          </label>
          <textarea
            value={disclaimerText}
            onChange={(e) => setDisclaimerText(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60 resize-y"
          />
        </div>
      </Section>

      {/* Admin Users */}
      <Section title="Admin Users">
        <div className="divide-y divide-gray-100 -mx-6 px-6">
          {admins.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No admin users found in database.</p>
          ) : (
            admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#0A1628] flex items-center justify-center shrink-0">
                    <span className="text-[#D4AF37] text-xs font-bold">
                      {admin.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{admin.email}</p>
                    <p className="text-xs text-gray-400 capitalize">{admin.role}</p>
                  </div>
                </div>
                <UserCheck className="h-4 w-4 text-green-500" />
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Invite Admin</p>
          <div className="flex gap-2">
            <input
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="email@example.com"
              type="email"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
            />
            <select
              value={newAdminRole}
              onChange={(e) => setNewAdminRole(e.target.value as AdminUser['role'])}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#D4AF37]/60"
            >
              <option value="staff">Staff</option>
              <option value="readonly">Read Only</option>
              <option value="owner">Owner</option>
            </select>
            <button
              onClick={inviteAdmin}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Invite
            </button>
          </div>
        </div>
      </Section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1628] text-sm font-semibold rounded-lg transition-colors"
        >
          <Save className="h-4 w-4" />
          {saved ? 'Saved ✓' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
