import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdSearch, MdStar, MdVerified, MdAdd, MdArrowForward } from 'react-icons/md'

const BOOKINGS = [
  { id: 'B-2024-001', helper: { name: 'Maria Santos',  img: 'https://i.pravatar.cc/150?img=47', category: 'Housemaid', nationality: 'Filipino'   }, startDate: '15 Jan 2024', endDate: 'Ongoing',      price: 1800, status: 'active',    rating: 4.9 },
  { id: 'B-2024-002', helper: { name: 'Priya Nair',    img: 'https://i.pravatar.cc/150?img=44', category: 'Nanny',     nationality: 'Indian'     }, startDate: '10 Feb 2024', endDate: '10 Aug 2024',  price: 2200, status: 'pending',   rating: 4.8 },
  { id: 'B-2023-008', helper: { name: 'Laleh Getaneh', img: 'https://i.pravatar.cc/150?img=48', category: 'Caregiver', nationality: 'Ethiopian'  }, startDate: '01 Jun 2023', endDate: '01 Dec 2023',  price: 2500, status: 'completed', rating: 5.0 },
  { id: 'B-2023-005', helper: { name: 'Ahmad Khalil',  img: 'https://i.pravatar.cc/150?img=51', category: 'Driver',    nationality: 'Pakistani'  }, startDate: '01 Mar 2023', endDate: '01 Sep 2023',  price: 1600, status: 'completed', rating: 4.7 },
  { id: 'B-2024-003', helper: { name: 'Sunita Tamang', img: 'https://i.pravatar.cc/150?img=45', category: 'Housemaid', nationality: 'Nepali'     }, startDate: '01 Mar 2024', endDate: '15 Mar 2024',  price: 1700, status: 'cancelled', rating: 4.6 },
]

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  confirmed: { label: 'Confirmed', cls: 'badge-navy' },
  completed: { label: 'Completed', cls: 'badge-gray' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
  disputed:  { label: 'Disputed',  cls: 'badge-warning' },
}

const TABS = ['all', 'active', 'pending', 'completed', 'cancelled']

export default function FamilyBookings() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = BOOKINGS.filter((b) => {
    const matchTab = activeTab === 'all' || b.status === activeTab
    const matchSearch = b.helper.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const count = (s) => BOOKINGS.filter((b) => s === 'all' || b.status === s).length

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Bookings</h2>
          <p className="text-neutral-500 mt-1">Manage all your helper placements.</p>
        </div>
        <Link to="/search" className="btn-primary flex items-center gap-2">
          <MdAdd size={18} /> New Booking
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 overflow-x-auto scrollbar-hide w-fit max-w-full">
        {TABS.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-condensed font-bold tracking-wide whitespace-nowrap transition-all capitalize flex items-center gap-1.5 ${activeTab === t ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
            {t}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === t ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>{count(t)}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input type="text" placeholder="Search by helper or booking ID…" value={search}
          onChange={(e) => setSearch(e.target.value)} className="input pl-9 text-sm" />
      </div>

      {/* Booking list */}
      {filtered.length === 0 ? (
        <div className="card card-body flex flex-col items-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
            <MdSearch size={28} className="text-neutral-300" />
          </div>
          <h3 className="font-semibold text-navy-500 mb-1">No bookings found</h3>
          <p className="text-neutral-500 text-sm">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const { label, cls } = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending
            return (
              <div key={b.id} className="card card-body flex items-center gap-5 flex-wrap hover:shadow-card-hover transition-shadow duration-300">
                <img src={b.helper.img} alt={b.helper.name}
                  className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-navy-500">{b.helper.name}</h4>
                    <MdVerified className="text-accent-500" size={15} />
                    <span className={`${cls} text-xs`}>{label}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-0.5 capitalize">{b.helper.category} · {b.helper.nationality}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-neutral-400">
                    <span>#{b.id}</span>
                    <span>📅 {b.startDate} → {b.endDate}</span>
                    <span className="flex items-center gap-1"><MdStar size={12} className="text-primary-500" />{b.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-condensed font-bold text-navy-500">AED {b.price.toLocaleString()}/mo</span>
                  <Link to={`/family/bookings/${b.id}`} className="btn-primary btn-sm flex items-center gap-1">
                    Details <MdArrowForward size={14} />
                  </Link>
                  {(b.status === 'active' || b.status === 'pending') && (
                    <button className="text-xs text-danger-500 hover:text-danger-600 font-medium">Cancel</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
