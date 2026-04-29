import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdNotifications, MdLogout, MdPerson, MdDashboard, MdExpandMore } from 'react-icons/md'
import { useAuth } from '@context/AuthContext'
import useUIStore from '@store/uiStore'

const TITLE_MAP = {
  '/family':                    'Dashboard',
  '/family/bookings':           'My Bookings',
  '/family/shortlist':          'My Shortlist',
  '/family/messages':           'Messages',
  '/family/payments':           'Payments',
  '/family/reviews':            'My Reviews',
  '/family/profile':            'My Profile',
  '/helper-dashboard':          'Dashboard',
  '/helper-dashboard/profile':  'My Profile',
  '/helper-dashboard/bookings': 'My Bookings',
  '/helper-dashboard/messages': 'Messages',
  '/helper-dashboard/documents':'My Documents',
  '/helper-dashboard/reviews':  'My Reviews',
  '/helper-dashboard/earnings': 'Earnings',
  '/admin':                     'Admin Dashboard',
  '/admin/helpers':             'Helpers',
  '/admin/families':            'Families',
  '/admin/bookings':            'Bookings',
  '/admin/verification':        'Verification',
  '/admin/payments':            'Payments',
  '/admin/disputes':            'Disputes',
  '/admin/reviews':             'Reviews',
  '/admin/settings':            'Settings',
}

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Maria Santos accepted your booking request', time: '2 min ago', read: false },
  { id: 2, text: 'Your contract has been signed', time: '1 hr ago', read: false },
  { id: 3, text: 'New message from Priya Nair', time: '3 hr ago', read: false },
]

export default function DashboardTopbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const addToast = useUIStore((s) => s.addToast)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const notifRef = useRef(null)
  const userRef = useRef(null)

  const title = TITLE_MAP[pathname] ?? 'Dashboard'
  const unread = notifications.filter((n) => !n.read).length

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    addToast({ type: 'info', message: 'Logged out successfully.' })
    navigate('/')
  }

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })))

  const initials = user
    ? ((user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? user.name?.[1] ?? '')).toUpperCase() || 'U'
    : 'U'
  const displayName = user?.firstName ?? user?.name ?? 'User'

  return (
    <header className="h-14 bg-white border-b border-neutral-200 flex items-center px-5 gap-4 flex-shrink-0 z-30">

      {/* Page title */}
      <h1 className="font-semibold text-neutral-900 text-base flex-1">
        {title}
      </h1>

      <div className="flex items-center gap-3">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen((o) => !o); setUserOpen(false) }}
            className="relative w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <MdNotifications size={20} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-card-hover border border-neutral-100 overflow-hidden animate-slide-down z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                <span className="font-semibold text-navy-500 text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-primary-500 hover:text-primary-600 font-medium">
                  Mark all read
                </button>
              </div>
              <ul className="divide-y divide-neutral-50 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className={`px-4 py-3 flex gap-3 text-sm ${n.read ? 'opacity-60' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-neutral-300' : 'bg-primary-500'}`} />
                    <div>
                      <p className="text-neutral-700 leading-snug">{n.text}</p>
                      <p className="text-neutral-400 text-xs mt-0.5">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => { setUserOpen((o) => !o); setNotifOpen(false) }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <span className="text-sm font-medium text-navy-500 hidden sm:block">{displayName}</span>
            <MdExpandMore size={16} className="text-neutral-400 hidden sm:block" />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-card-hover border border-neutral-100 overflow-hidden animate-slide-down z-50">
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="font-semibold text-navy-500 text-sm">{displayName}</p>
                <p className="text-xs text-neutral-400 truncate">{user?.email ?? ''}</p>
              </div>
              <ul className="py-1">
                <li>
                  <Link to={`/`} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-navy-500">
                    <MdDashboard size={16} /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-navy-500">
                    <MdPerson size={16} /> My Profile
                  </Link>
                </li>
                <li className="border-t border-neutral-100 mt-1 pt-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger-500 hover:bg-danger-50">
                    <MdLogout size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
