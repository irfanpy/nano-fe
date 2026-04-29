import { useState } from 'react'
import { MdCheck, MdClose, MdLocationOn, MdCalendarToday } from 'react-icons/md'

const BOOKINGS = [
  { id: 'B-2024-001', family: 'Al-Mansouri Family', area: 'Dubai Marina',    serviceType: 'Full-time Live-In', startDate: '15 Jan 2024', duration: 'Ongoing',   amount: 1800, status: 'active',    initial: 'AM' },
  { id: 'B-2024-005', family: 'Thornton Family',    area: 'Jumeirah',         serviceType: 'Full-time Live-In', startDate: '01 Apr 2024', duration: '6 months',  amount: 1900, status: 'pending',   initial: 'TF' },
  { id: 'B-2023-008', family: 'Al-Zahra Family',    area: 'Palm Jumeirah',    serviceType: 'Part-time',         startDate: '01 Jun 2023', duration: '3 months',  amount: 900,  status: 'completed', initial: 'AZ' },
  { id: 'B-2023-003', family: 'Khan Household',     area: 'Downtown Dubai',   serviceType: 'Full-time Live-Out',startDate: '01 Feb 2023', duration: '4 months',  amount: 1600, status: 'completed', initial: 'KH' },
]

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  completed: { label: 'Completed', cls: 'badge-gray' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
}

const TABS = ['all', 'active', 'pending', 'completed']

export default function HelperBookings() {
  const [tab, setTab] = useState('all')
  const [bookings, setBookings] = useState(BOOKINGS)

  const filtered = bookings.filter((b) => tab === 'all' || b.status === tab)

  const handleAccept = (id) => setBookings((bs) => bs.map((b) => b.id === id ? { ...b, status: 'active' } : b))
  const handleDecline = (id) => setBookings((bs) => bs.map((b) => b.id === id ? { ...b, status: 'cancelled' } : b))

  const count = (s) => bookings.filter((b) => s === 'all' || b.status === s).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Bookings</h2>
        <p className="text-neutral-500 mt-1">View and manage your placement requests.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 w-fit overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-condensed font-bold tracking-wide capitalize transition-all flex items-center gap-1.5 ${tab === t ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
            {t}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>{count(t)}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="card card-body text-center py-12 text-neutral-400 text-sm">No bookings in this category.</div>
        )}
        {filtered.map((b) => {
          const { label, cls } = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending
          return (
            <div key={b.id} className="card card-body flex items-center gap-5 flex-wrap hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg flex-shrink-0">{b.initial}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-navy-500">{b.family}</h4>
                  <span className={`${cls} text-xs`}>{label}</span>
                </div>
                <p className="text-sm text-neutral-500 mt-0.5">{b.serviceType}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><MdLocationOn size={12} />{b.area}</span>
                  <span className="flex items-center gap-1"><MdCalendarToday size={12} />{b.startDate} · {b.duration}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-condensed font-bold text-navy-500">AED {b.amount.toLocaleString()}/mo</span>
                {b.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleAccept(b.id)}
                      className="btn-sm bg-accent-500 text-white hover:bg-accent-600 rounded-xl flex items-center gap-1 px-3 py-1.5 text-xs font-semibold">
                      <MdCheck size={14} /> Accept
                    </button>
                    <button onClick={() => handleDecline(b.id)}
                      className="btn-sm bg-danger-50 text-danger-500 hover:bg-danger-500 hover:text-white rounded-xl flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-danger-200 transition-colors">
                      <MdClose size={14} /> Decline
                    </button>
                  </div>
                )}
                {b.status !== 'pending' && (
                  <span className="text-xs text-neutral-400">#{b.id}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
