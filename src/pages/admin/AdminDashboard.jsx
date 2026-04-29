import { Link } from 'react-router-dom'
import {
  MdGroup, MdPeople, MdBookOnline, MdPayment, MdGavel,
  MdVerified, MdArrowForward, MdTrendingUp, MdStar,
  MdCheckCircle, MdWarning, MdInfo,
} from 'react-icons/md'
import StatCard from '@components/admin/StatCard'

const STATS = [
  { label: 'Total Helpers',   value: '1,284', trend: '+12%', icon: MdGroup,     color: 'bg-primary-50 text-primary-600' },
  { label: 'Total Families',  value: '3,671', trend: '+8%',  icon: MdPeople,    color: 'bg-info-50 text-info-500' },
  { label: 'Active Bookings', value: '847',   trend: '+5%',  icon: MdBookOnline, color: 'bg-accent-50 text-accent-600' },
  { label: 'Monthly Revenue', value: 'AED 284K', trend: '+18%', icon: MdPayment, color: 'bg-warning-50 text-warning-600' },
]

const RECENT_SIGNUPS = [
  { id: 1, name: 'Priya Nair',     role: 'Helper',  category: 'Nanny',     joined: '10 min ago', img: 'https://i.pravatar.cc/150?img=44', status: 'pending' },
  { id: 2, name: 'Al-Rashed Fam', role: 'Family',  category: '',          joined: '1 hr ago',   img: null,                              status: 'active' },
  { id: 3, name: 'Ahmad Khalil',  role: 'Helper',  category: 'Driver',    joined: '2 hrs ago',  img: 'https://i.pravatar.cc/150?img=51', status: 'pending' },
  { id: 4, name: 'Chen Wei',      role: 'Helper',  category: 'Caregiver', joined: '3 hrs ago',  img: 'https://i.pravatar.cc/150?img=60', status: 'active' },
  { id: 5, name: 'Mansouri Fam',  role: 'Family',  category: '',          joined: '5 hrs ago',  img: null,                              status: 'active' },
]

const PENDING_VERIFICATIONS = [
  { id: 1, name: 'Maria Santos',  category: 'Housemaid', docs: 3, img: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Laleh Getaneh', category: 'Caregiver', docs: 4, img: 'https://i.pravatar.cc/150?img=48' },
  { id: 3, name: 'Priya Nair',    category: 'Nanny',     docs: 2, img: 'https://i.pravatar.cc/150?img=44' },
]

const OPEN_DISPUTES = [
  { id: 1, family: 'Al-Rashed Family', helper: 'Maria Santos', issue: 'Non-payment of salary', priority: 'high',   opened: '2 days ago' },
  { id: 2, family: 'Chen Family',      helper: 'Ahmad Khalil',  issue: 'Contract breach',      priority: 'medium', opened: '4 days ago' },
]

const ACTIVITY = [
  { icon: MdCheckCircle, color: 'text-accent-500',  text: "Ahmad Khalil's profile was approved",        time: '5 min ago' },
  { icon: MdWarning,     color: 'text-warning-500', text: 'New dispute opened by Al-Rashed Family',     time: '20 min ago' },
  { icon: MdInfo,        color: 'text-info-500',    text: 'Booking #BK-0482 marked as completed',        time: '1 hr ago' },
  { icon: MdTrendingUp,  color: 'text-primary-500', text: 'Platform revenue crossed AED 280K this month', time: '3 hrs ago' },
  { icon: MdStar,        color: 'text-primary-500', text: '12 new reviews submitted today',              time: '4 hrs ago' },
]

const QUICK = [
  { icon: MdVerified,   label: 'Review Verifications', to: '/admin/verification', cls: 'btn-primary' },
  { icon: MdGavel,      label: 'Open Disputes',        to: '/admin/disputes',     cls: 'btn-outline' },
  { icon: MdGroup,      label: 'Manage Helpers',       to: '/admin/helpers',      cls: 'btn-outline' },
  { icon: MdPayment,    label: 'View Payments',        to: '/admin/payments',     cls: 'btn-outline' },
]

const PRIORITY_CONFIG = {
  high:   { label: 'High',   cls: 'badge-red' },
  medium: { label: 'Medium', cls: 'badge-gold' },
  low:    { label: 'Low',    cls: 'badge-gray' },
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Platform Overview</h2>
          <p className="text-neutral-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <Link to="/admin/verification" className="btn-primary flex items-center gap-2">
          <MdVerified size={18} /> Pending Verifications
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="card card-body">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK.map(({ icon: Icon, label, to, cls }) => (
              <Link key={label} to={to}
                className={`${cls} flex flex-col items-center gap-1.5 py-3 px-2 text-xs font-medium rounded-xl`}>
                <Icon size={20} />
                <span className="text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Open Disputes */}
        <div className="card lg:col-span-2">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Open Disputes</h3>
            <Link to="/admin/disputes" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {OPEN_DISPUTES.map((d) => {
              const { label, cls } = PRIORITY_CONFIG[d.priority]
              return (
                <div key={d.id} className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-navy-500 text-sm">{d.issue}</p>
                      <span className={`${cls} text-xs`}>{label}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{d.family} vs {d.helper} · {d.opened}</p>
                  </div>
                  <Link to="/admin/disputes" className="btn-ghost btn-sm text-xs">Review</Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Pending Verifications */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Pending Verification</h3>
            <Link to="/admin/verification" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {PENDING_VERIFICATIONS.map((h) => (
              <div key={h.id} className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors">
                <img src={h.img} alt={h.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-500 text-sm truncate">{h.name}</p>
                  <p className="text-xs text-neutral-400">{h.category} · {h.docs} docs</p>
                </div>
                <span className="badge-gold text-xs">Pending</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Signups */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Recent Signups</h3>
            <Link to="/admin/helpers" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {RECENT_SIGNUPS.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors">
                {u.img
                  ? <img src={u.img} alt={u.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  : <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">{u.name[0]}</div>
                }
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-500 text-sm truncate">{u.name}</p>
                  <p className="text-xs text-neutral-400">{u.role}{u.category ? ` · ${u.category}` : ''} · {u.joined}</p>
                </div>
                <span className={u.status === 'active' ? 'badge-green text-xs' : 'badge-gray text-xs'}>
                  {u.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card card-body">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Activity Feed</h3>
          <ul className="space-y-4">
            {ACTIVITY.map(({ icon: Icon, color, text, time }, i) => (
              <li key={i} className="flex gap-3">
                <Icon size={18} className={`${color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm text-neutral-700 leading-snug">{text}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
