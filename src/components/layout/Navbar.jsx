import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useAuth } from '@context/AuthContext'
import { ROLES } from '@constants'
import useUIStore from '@store/uiStore'

const NAV_LINKS = [
  { to: '/search',       label: 'Find Helpers' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing',      label: 'Pricing' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
]

const DASHBOARD_ROUTE = {
  [ROLES.FAMILY]: '/family',
  [ROLES.HELPER]: '/helper-dashboard',
  [ROLES.ADMIN]:  '/admin',
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const openModal = useUIStore((state) => state.openModal)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const handleOpenAuth = (type) => { setMobileOpen(false); openModal(type) }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container-app">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs font-condensed">TH</span>
            </div>
            <span className="font-semibold text-neutral-900 text-sm">
              Trusted<span className="text-primary-500">Home</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to={DASHBOARD_ROUTE[user.role] ?? '/'} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-outline btn-sm">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleOpenAuth('auth-login')} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5">
                  Sign In
                </button>
                <button onClick={() => handleOpenAuth('auth-register')} className="btn-primary btn-sm">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-0.5 mt-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'text-primary-600 bg-primary-50' : 'text-neutral-700 hover:bg-neutral-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-neutral-100">
            {user ? (
              <>
                <Link to={DASHBOARD_ROUTE[user.role] ?? '/'} className="btn-navy w-full" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="btn-outline w-full">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleOpenAuth('auth-login')} className="btn-outline w-full">Sign In</button>
                <button onClick={() => handleOpenAuth('auth-register')} className="btn-primary w-full">Get Started</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
