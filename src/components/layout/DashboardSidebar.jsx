import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  MdDashboard, MdBookOnline, MdFavorite, MdChat, MdPayment,
  MdStar, MdPerson, MdGroup, MdPeople, MdVerified, MdGavel,
  MdSettings, MdFolder, MdAttachMoney, MdChevronLeft,
  MdChevronRight, MdClose, MdMenu,
} from 'react-icons/md'
import { ROLES } from '@constants'

const NAV = {
  [ROLES.FAMILY]: [
    { to: '/family',           label: 'Dashboard',  icon: MdDashboard,    end: true },
    { to: '/family/bookings',  label: 'Bookings',   icon: MdBookOnline },
    { to: '/family/shortlist', label: 'Shortlist',  icon: MdFavorite },
    { to: '/family/messages',  label: 'Messages',   icon: MdChat },
    { to: '/family/payments',  label: 'Payments',   icon: MdPayment },
    { to: '/family/reviews',   label: 'Reviews',    icon: MdStar },
    { to: '/family/profile',   label: 'Profile',    icon: MdPerson },
  ],
  [ROLES.HELPER]: [
    { to: '/helper-dashboard',              label: 'Dashboard',  icon: MdDashboard,   end: true },
    { to: '/helper-dashboard/profile',      label: 'My Profile', icon: MdPerson },
    { to: '/helper-dashboard/bookings',     label: 'Bookings',   icon: MdBookOnline },
    { to: '/helper-dashboard/messages',     label: 'Messages',   icon: MdChat },
    { to: '/helper-dashboard/documents',    label: 'Documents',  icon: MdFolder },
    { to: '/helper-dashboard/reviews',      label: 'Reviews',    icon: MdStar },
    { to: '/helper-dashboard/earnings',     label: 'Earnings',   icon: MdAttachMoney },
  ],
  [ROLES.ADMIN]: [
    { to: '/admin',               label: 'Dashboard',     icon: MdDashboard,  end: true },
    { to: '/admin/helpers',       label: 'Helpers',       icon: MdGroup },
    { to: '/admin/families',      label: 'Families',      icon: MdPeople },
    { to: '/admin/bookings',      label: 'Bookings',      icon: MdBookOnline },
    { to: '/admin/verification',  label: 'Verification',  icon: MdVerified },
    { to: '/admin/payments',      label: 'Payments',      icon: MdPayment },
    { to: '/admin/disputes',      label: 'Disputes',      icon: MdGavel },
    { to: '/admin/reviews',       label: 'Reviews',       icon: MdStar },
    { to: '/admin/settings',      label: 'Settings',      icon: MdSettings },
  ],
}

const ROLE_LABEL = {
  [ROLES.FAMILY]: 'Family',
  [ROLES.HELPER]: 'Helper',
  [ROLES.ADMIN]:  'Admin',
}

export default function DashboardSidebar({ role }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('sidebar-collapsed') === 'true' } catch { return false }
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c
      try { localStorage.setItem('sidebar-collapsed', String(next)) } catch {}
      return next
    })
  }

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const items = NAV[role] ?? []

  const SidebarContent = () => (
    <div className={`flex flex-col h-full bg-white border-r border-neutral-200 transition-all duration-300 ${collapsed ? 'w-14' : 'w-56'}`}>

      {/* Logo */}
      <div className={`flex items-center border-b border-neutral-100 min-h-[60px] ${collapsed ? 'px-3 justify-center' : 'px-4'}`}>
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-500">
            <span className="text-white font-bold text-xs font-condensed">TH</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-neutral-900 text-sm whitespace-nowrap">
              Trusted<span className="text-primary-500">Home</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button className="lg:hidden ml-auto text-neutral-400 hover:text-neutral-700 p-1" onClick={() => setMobileOpen(false)}>
            <MdClose size={18} />
          </button>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-1">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
            {ROLE_LABEL[role]}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative
              ${isActive
                ? 'bg-primary-50 text-primary-600'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
              } ${collapsed ? 'justify-center px-0' : ''}`
            }
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-neutral-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="hidden lg:flex items-center justify-end px-2 py-3 border-t border-neutral-100">
        <button
          onClick={toggleCollapse}
          className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          {collapsed ? <MdChevronRight size={15} /> : <MdChevronLeft size={15} />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden lg:flex flex-col h-screen flex-shrink-0">
        <SidebarContent />
      </div>

      <button
        id="sidebar-mobile-trigger"
        className="lg:hidden fixed bottom-5 left-4 z-40 w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <MdMenu size={20} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex-shrink-0 shadow-xl">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
