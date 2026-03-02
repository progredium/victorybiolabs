'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Warehouse,
  Tag,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, exact: false },
  { href: '/admin/products', label: 'Products', icon: Package, exact: false },
  { href: '/admin/customers', label: 'Customers', icon: Users, exact: false },
  { href: '/admin/inventory', label: 'Inventory', icon: Warehouse, exact: false },
  { href: '/admin/discounts', label: 'Discounts', icon: Tag, exact: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, exact: false },
  { href: '/admin/settings', label: 'Settings', icon: Settings, exact: false },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-[#0A1628] text-white transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-3 border-b border-white/10">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2 flex-1">
            <span className="text-[#D4AF37] font-bold text-xl">VBL</span>
            <span className="text-white/70 text-xs font-medium uppercase tracking-widest">
              Admin
            </span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== '/admin'
                ? true
                : item.exact === false && item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href

          // Simplified active check
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium',
                active
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            View Storefront →
          </Link>
        </div>
      )}
    </aside>
  )
}
