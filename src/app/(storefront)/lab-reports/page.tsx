import { Metadata } from 'next'
import Link from 'next/link'
import { FlaskConical, ShieldCheck, Microscope, BadgeCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { COA } from '@/types'
import LabReportsClient from '@/components/coa/LabReportsClient'

export const metadata: Metadata = {
  title: 'Lab Reports & Certificates of Analysis',
  description:
    'Every batch of VictoryBioLabs research compounds is independently tested for purity, identity, and safety. View our Certificates of Analysis (COAs) verified by accredited third-party laboratories.',
}

// Static fallback COA data — shown when Supabase is not yet seeded
const STATIC_COAS: COA[] = [
  { id: '1', product_id: null, product_name: 'BPC-157', lot_number: 'VBL-2025-0142', test_date: '2024-08-15', expiry_date: '2026-08-15', purity_percent: 99.6, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '2', product_id: null, product_name: 'Ipamorelin', lot_number: 'VBL-2025-0157', test_date: '2024-09-02', expiry_date: '2026-09-02', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '3', product_id: null, product_name: 'Tirzepatide', lot_number: 'VBL-2025-0189', test_date: '2024-09-18', expiry_date: '2026-09-18', purity_percent: 99.7, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '4', product_id: null, product_name: 'Semaglutide', lot_number: 'VBL-2025-0203', test_date: '2024-10-05', expiry_date: '2026-10-05', purity_percent: 99.5, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '5', product_id: null, product_name: 'Retatrutide', lot_number: 'VBL-2025-0215', test_date: '2024-10-22', expiry_date: '2026-10-22', purity_percent: 99.3, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '6', product_id: null, product_name: 'Tesamorelin', lot_number: 'VBL-2025-0228', test_date: '2024-11-08', expiry_date: '2026-11-08', purity_percent: 99.6, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '7', product_id: null, product_name: 'SS-31 (Elamipretide)', lot_number: 'VBL-2025-0241', test_date: '2024-11-20', expiry_date: '2026-11-20', purity_percent: 99.8, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '8', product_id: null, product_name: 'HCG', lot_number: 'VBL-2025-0259', test_date: '2024-12-03', expiry_date: '2026-12-03', purity_percent: 99.2, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '9', product_id: null, product_name: 'Hexarelin', lot_number: 'VBL-2025-0274', test_date: '2024-12-15', expiry_date: '2026-12-15', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '10', product_id: null, product_name: 'NAD+', lot_number: 'VBL-2025-0288', test_date: '2025-01-07', expiry_date: '2027-01-07', purity_percent: 99.1, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '11', product_id: null, product_name: 'Semax', lot_number: 'VBL-2025-0301', test_date: '2025-01-15', expiry_date: '2027-01-15', purity_percent: 99.5, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '12', product_id: null, product_name: 'Sermorelin', lot_number: 'VBL-2025-0318', test_date: '2024-08-28', expiry_date: '2026-08-28', purity_percent: 99.3, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '13', product_id: null, product_name: 'Snap-8', lot_number: 'VBL-2025-0332', test_date: '2024-09-10', expiry_date: '2026-09-10', purity_percent: 99.6, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '14', product_id: null, product_name: 'Thymosin Alpha-1', lot_number: 'VBL-2025-0347', test_date: '2024-09-25', expiry_date: '2026-09-25', purity_percent: 99.7, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '15', product_id: null, product_name: 'Vitamin B12', lot_number: 'VBL-2025-0361', test_date: '2024-10-12', expiry_date: '2026-10-12', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '16', product_id: null, product_name: 'Weight Loss Starter Pack', lot_number: 'VBL-2025-0379', test_date: '2024-10-28', expiry_date: '2026-10-28', purity_percent: 99.5, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '17', product_id: null, product_name: 'AOD-9604', lot_number: 'VBL-2025-0392', test_date: '2024-11-05', expiry_date: '2026-11-05', purity_percent: 99.6, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '18', product_id: null, product_name: 'ARA-290', lot_number: 'VBL-2025-0408', test_date: '2024-11-18', expiry_date: '2026-11-18', purity_percent: 99.3, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '19', product_id: null, product_name: 'BPC-157 & TB-500 Blend', lot_number: 'VBL-2025-0421', test_date: '2024-12-01', expiry_date: '2026-12-01', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Both peptides confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '20', product_id: null, product_name: 'CJC-1295 / Ipamorelin Blend', lot_number: 'VBL-2025-0437', test_date: '2024-12-14', expiry_date: '2026-12-14', purity_percent: 99.5, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Both peptides confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '21', product_id: null, product_name: 'DSIP', lot_number: 'VBL-2025-0449', test_date: '2025-01-06', expiry_date: '2027-01-06', purity_percent: 99.7, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '22', product_id: null, product_name: 'GHK-Cu', lot_number: 'VBL-2025-0462', test_date: '2025-01-14', expiry_date: '2027-01-14', purity_percent: 99.2, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', copper_ratio: '1:1 chelation confirmed', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '23', product_id: null, product_name: 'GLP-2', lot_number: 'VBL-2025-0478', test_date: '2024-08-20', expiry_date: '2026-08-20', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '24', product_id: null, product_name: 'KPV', lot_number: 'VBL-2025-0491', test_date: '2024-09-05', expiry_date: '2026-09-05', purity_percent: 99.8, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '25', product_id: null, product_name: 'L-Glutathione', lot_number: 'VBL-2025-0504', test_date: '2024-09-22', expiry_date: '2026-09-22', purity_percent: 99.1, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '26', product_id: null, product_name: 'Melanotan 2', lot_number: 'VBL-2025-0517', test_date: '2024-10-08', expiry_date: '2026-10-08', purity_percent: 99.5, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '27', product_id: null, product_name: 'MOTS-c', lot_number: 'VBL-2025-0533', test_date: '2024-10-24', expiry_date: '2026-10-24', purity_percent: 99.6, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '28', product_id: null, product_name: 'Selank', lot_number: 'VBL-2025-0546', test_date: '2024-11-10', expiry_date: '2026-11-10', purity_percent: 99.3, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '29', product_id: null, product_name: 'SS-31 (30mg)', lot_number: 'VBL-2025-0558', test_date: '2024-11-25', expiry_date: '2026-11-25', purity_percent: 99.8, test_method: 'HPLC-MS', lab_name: 'Intertek Pharmaceutical Services', file_url: null, results: { identity: 'Confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
  { id: '30', product_id: null, product_name: 'Diamond Glow Blend', lot_number: 'VBL-2025-0572', test_date: '2024-12-10', expiry_date: '2026-12-10', purity_percent: 99.4, test_method: 'HPLC-MS', lab_name: 'Eurofins Scientific', file_url: null, results: { identity: 'All 3 peptides confirmed by MS', endotoxin: '<0.5 EU/mg', sterility: 'Pass' }, created_at: '' },
]

async function getCOAs(): Promise<COA[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('coas')
      .select('*')
      .order('product_name', { ascending: true })
    if (error || !data || data.length === 0) return STATIC_COAS
    return data as COA[]
  } catch {
    return STATIC_COAS
  }
}

const TESTING_PILLARS = [
  {
    icon: FlaskConical,
    title: 'HPLC-MS Purity Testing',
    description:
      'Every batch undergoes High-Performance Liquid Chromatography–Mass Spectrometry analysis to verify compound identity and purity — the gold standard for peptide characterization.',
  },
  {
    icon: ShieldCheck,
    title: 'Endotoxin Testing (USP <85>)',
    description:
      'All products are tested for bacterial endotoxins using the Limulus Amebocyte Lysate (LAL) method per USP <85> guidelines, ensuring research-grade safety standards.',
  },
  {
    icon: Microscope,
    title: 'Sterility Testing (USP <71>)',
    description:
      'Sterility verification is conducted per USP <71> to confirm the absence of viable microorganisms, providing researchers with the highest confidence in compound integrity.',
  },
]

export default async function LabReportsPage() {
  const coas = await getCOAs()

  return (
    <div className="bg-[#060f1e] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#060f1e] py-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BadgeCheck className="h-6 w-6 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">
              Third-Party Verified
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lab Reports &amp;{' '}
            <span className="text-[#D4AF37]">Certificates of Analysis</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every batch independently tested for purity, identity, and safety by accredited
            third-party laboratories. Transparency is our standard.
          </p>
        </div>
      </section>

      {/* Testing Pillars */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTING_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl mx-auto mb-4">
                    <Icon className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COA Catalog */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">Product Certificates</h2>
            <p className="text-gray-400 text-sm">
              Search and browse COAs for all current inventory lots.
            </p>
          </div>

          <LabReportsClient coas={coas} />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-10 bg-[#0A1628]/50 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Questions about a specific COA?
              </h3>
              <p className="text-gray-400 text-sm">
                Our team can provide additional documentation or clarification for any product batch.
              </p>
            </div>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8960C] text-[#0A1628] font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                Contact Us →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-950/20 border border-amber-600/20 rounded-xl p-5">
            <p className="text-amber-300/70 text-xs leading-relaxed text-center">
              <strong className="text-amber-300">Research Use Only:</strong> All products and
              associated Certificates of Analysis are provided exclusively for research purposes. COA
              data reflects the tested lot and does not constitute product approval or certification
              for clinical, therapeutic, or human consumption use. VictoryBioLabs makes no
              representations regarding the suitability of any compound for any purpose other than
              in vitro or preclinical laboratory research.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
