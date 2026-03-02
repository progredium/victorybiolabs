'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Bell, Menu } from 'lucide-react'

interface AdminHeaderProps {
  userEmail?: string | null
  onMenuClick?: () => void
}

export function AdminHeader({ userEmail, onMenuClick }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-800 hidden sm:block">
          VictoryBioLabs Admin
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-gray-500" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="h-7 w-7 rounded-full bg-[#0A1628] flex items-center justify-center shrink-0">
            <span className="text-[#D4AF37] text-xs font-bold">
              {userEmail?.charAt(0).toUpperCase() ?? 'A'}
            </span>
          </div>
          {userEmail && (
            <span className="text-sm text-gray-700 hidden md:block max-w-[180px] truncate">
              {userEmail}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
