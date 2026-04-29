import { Link } from 'react-router-dom'
import {
  MdBookOnline, MdChat, MdPayment, MdSearch,
  MdStar, MdVerified, MdArrowForward, MdPerson,
} from 'react-icons/md'

const STATS = [
  { label: 'Active Helpers',  value: 1,  icon: MdPerson,    color: 'bg-accent-50 text-accent-600',   trend: null },
  { label: 'Active Bookings', value: 2,  icon: MdBookOnline, color: 'bg-primary-50 text-primary-600', trend: '+1' },
  { label: 'Pending Reviews', value: 1,  icon: MdStar,       color: 'bg-warning-50 text-warning-600', trend: null },
  { label: 'Unread Messages', value: 3,  icon: MdChat,       color: 'bg-info-50 text-info-500',       trend: null },
]

const SHORTLIST = [
  { id: 2, name: 'Priya Nair',    category: 'Nanny',     nationality: 'Indian',   rating: 4.8, img: 'https://i.pravatar.cc/150?img=44' },
  { id: 4, name: 'Ahmad Khalil',  category: 'Driver',    nationality: 'Pakistani', rating: 4.7, img: 'https://i.pravatar.cc/150?img=51' },
  { id: 3, name: 'Laleh Getaneh', category: 'Caregiver', nationality: 'Ethiopian', rating: 5.0, img: 'https://i.pravatar.cc/150?img=48' },
]

const MESSAGES = [
  { id: 1, name: 'Maria Santos',  preview: 'I will arrive at 8am tomorrow as agreed.', time: '10 min ago', unread: 2, img: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Priya Nair',    preview: 'Thank you for the booking request!', time: '1 hr ago', unread: 1, img: 'https://i.pravatar.cc/150?img=44' },
  { id: 3, name: 'Platform Team', preview: 'Your contract has been approved.', time: '2 hrs ago', unread: 0, img: null },
]

const QUICK_ACTIONS = [
  { icon: MdSearch,    label: 'Find New Helper',   to: '/search',          cls: 'btn-primary' },
  { icon: MdBookOnline,label: 'View Bookings',     to: '/family/bookings', cls: 'btn-outline' },
  { icon: MdPayment,   label: 'Pay Invoice',       to: '/family/payments', cls: 'btn-outline' },
  { icon: MdStar,      label: 'Leave a Review',    to: '/family/reviews',  cls: 'btn-outline' },
]

export default function FamilyDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* Welcome */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Welcome back, Sarah! 👋</h2>
          <p className="text-neutral-500 mt-1">Here's what's happening with your home helpers.</p>
        </div>
        <Link to="/search" className="btn-primary flex items-center gap-2">
          <MdSearch size={18} /> Find Helpers
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, trend }) => (
          <div key={label} className="card card-body flex items-center gap-4 hover:shadow-card-hover transition-shadow duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <div className="font-condensed font-bold text-navy-500 text-2xl flex items-center gap-1.5">
                {value}
                {trend && <span className="text-xs text-accent-600 font-bold bg-accent-50 px-1.5 py-0.5 rounded-full">{trend}</span>}
              </div>
              <p className="text-neutral-500 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Current Booking */}
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Current Booking</h3>
            <Link to="/family/bookings" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="card-body flex items-center gap-5 flex-wrap">
            <img src="https://i.pravatar.cc/150?img=47" alt="Maria Santos"
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border-2 border-primary-200" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-navy-500">Maria Santos</h4>
                <MdVerified className="text-accent-500" size={16} />
                <span className="badge-green text-xs">Active</span>
              </div>
              <p className="text-sm text-neutral-500 mt-0.5 capitalize">Housemaid · Filipino</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">📅 Started: 15 Jan 2024</span>
                <span className="flex items-center gap-1">📍 Dubai Marina</span>
                <span className="flex items-center gap-1">💰 AED 1,800/mo</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="badge-gold text-xs">Visa: In Progress</span>
                <span className="badge-green text-xs">Contract: Signed</span>
              </div>
              <Link to="/family/bookings/1" className="btn-primary btn-sm">View Details</Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card card-body">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(({ icon: Icon, label, to, cls }) => (
              <Link key={label} to={to}
                className={`${cls} flex flex-col items-center gap-1.5 py-3 px-2 text-xs font-medium rounded-xl`}>
                <Icon size={20} />
                <span className="text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Shortlist */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">My Shortlist</h3>
            <Link to="/family/shortlist" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {SHORTLIST.map((h) => (
              <div key={h.id} className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition-colors">
                <img src={h.img} alt={h.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-500 text-sm truncate">{h.name}</p>
                  <p className="text-xs text-neutral-400 capitalize">{h.category} · {h.nationality}</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <MdStar className="text-primary-500" size={13} />
                  <span className="font-medium text-navy-500">{h.rating}</span>
                </div>
                <Link to={`/helper/${h.id}`} className="btn-outline btn-sm text-xs px-2.5 py-1">View</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Recent Messages</h3>
            <Link to="/family/messages" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {MESSAGES.map((m) => (
              <Link key={m.id} to="/family/messages"
                className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition-colors">
                {m.img
                  ? <img src={m.img} alt={m.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  : <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">{m.name[0]}</div>
                }
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-500 text-sm truncate">{m.name}</p>
                  <p className="text-xs text-neutral-400 truncate">{m.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-neutral-400 whitespace-nowrap">{m.time}</span>
                  {m.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">{m.unread}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
