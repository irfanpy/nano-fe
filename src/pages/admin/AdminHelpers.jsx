import { useState } from 'react'
import { MdSearch, MdVerified, MdBlock, MdVisibility, MdFilterList, MdGroup } from 'react-icons/md'
import DataTable from '@components/admin/DataTable'

const HELPERS = [
  { id: 1,  name: 'Maria Santos',   category: 'Housemaid', nationality: 'Filipino',   status: 'active',   rating: 4.9, bookings: 3, joined: '10 Jan 2024', img: 'https://i.pravatar.cc/150?img=47' },
  { id: 2,  name: 'Priya Nair',     category: 'Nanny',     nationality: 'Indian',     status: 'pending',  rating: 4.8, bookings: 0, joined: '12 Jan 2024', img: 'https://i.pravatar.cc/150?img=44' },
  { id: 3,  name: 'Laleh Getaneh',  category: 'Caregiver', nationality: 'Ethiopian',  status: 'active',   rating: 5.0, bookings: 2, joined: '05 Dec 2023', img: 'https://i.pravatar.cc/150?img=48' },
  { id: 4,  name: 'Ahmad Khalil',   category: 'Driver',    nationality: 'Pakistani',  status: 'active',   rating: 4.7, bookings: 1, joined: '20 Nov 2023', img: 'https://i.pravatar.cc/150?img=51' },
  { id: 5,  name: 'Chen Wei',       category: 'Caregiver', nationality: 'Chinese',    status: 'suspended',rating: 3.2, bookings: 0, joined: '02 Oct 2023', img: 'https://i.pravatar.cc/150?img=60' },
  { id: 6,  name: 'Amara Diallo',   category: 'Housemaid', nationality: 'Senegalese', status: 'pending',  rating: null, bookings: 0, joined: '15 Jan 2024', img: 'https://i.pravatar.cc/150?img=56' },
  { id: 7,  name: 'Nour Al-Hassan', category: 'Nanny',     nationality: 'Lebanese',   status: 'active',   rating: 4.6, bookings: 1, joined: '08 Sep 2023', img: 'https://i.pravatar.cc/150?img=45' },
]

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  suspended: { label: 'Suspended', cls: 'badge-red' },
}

const CATEGORIES = ['All', 'Housemaid', 'Nanny', 'Driver', 'Caregiver']
const STATUSES   = ['All', 'active', 'pending', 'suspended']

const COLUMNS = [
  {
    key: 'name', label: 'Helper', sortable: true,
    render: (v, row) => (
      <div className="flex items-center gap-3">
        <img src={row.img} alt={v} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
        <div>
          <p className="font-medium text-navy-500 text-sm">{v}</p>
          <p className="text-xs text-neutral-400">{row.nationality}</p>
        </div>
      </div>
    ),
  },
  { key: 'category', label: 'Category', sortable: true, render: (v) => <span className="text-sm text-neutral-600 capitalize">{v}</span> },
  {
    key: 'status', label: 'Status', sortable: true,
    render: (v) => {
      const { label, cls } = STATUS_CONFIG[v] ?? STATUS_CONFIG.pending
      return <span className={`${cls} text-xs`}>{label}</span>
    },
  },
  {
    key: 'rating', label: 'Rating', sortable: true,
    render: (v) => v ? (
      <span className="flex items-center gap-1 text-sm font-medium text-navy-500">
        <span className="text-primary-500">★</span>{v}
      </span>
    ) : <span className="text-neutral-300 text-xs">—</span>,
  },
  { key: 'bookings', label: 'Bookings', sortable: true, render: (v) => <span className="text-sm text-neutral-600">{v}</span> },
  { key: 'joined',   label: 'Joined',   sortable: true, render: (v) => <span className="text-xs text-neutral-400 whitespace-nowrap">{v}</span> },
  {
    key: 'id', label: 'Actions',
    render: (_) => (
      <div className="flex items-center gap-1.5">
        <button className="btn-ghost btn-sm p-1.5" title="View profile"><MdVisibility size={15} /></button>
        <button className="btn-ghost btn-sm p-1.5 text-accent-600" title="Verify"><MdVerified size={15} /></button>
        <button className="btn-ghost btn-sm p-1.5 text-danger-500" title="Suspend"><MdBlock size={15} /></button>
      </div>
    ),
  },
]

export default function AdminHelpers() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus]     = useState('All')

  const filtered = HELPERS.filter((h) => {
    const matchSearch   = h.name.toLowerCase().includes(search.toLowerCase()) || h.nationality.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || h.category === category
    const matchStatus   = status === 'All'   || h.status === status
    return matchSearch && matchCategory && matchStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Helpers</h2>
          <p className="text-neutral-500 mt-1">{HELPERS.length} registered helpers on the platform.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <MdGroup size={18} className="text-primary-500" />
          <span className="font-medium text-navy-500">{HELPERS.filter((h) => h.status === 'active').length}</span> active
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="input pl-9 text-sm"
            placeholder="Search helpers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList size={17} className="text-neutral-400" />
          <select className="select text-sm py-2 w-36" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="select text-sm py-2 w-36" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
          </select>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filtered} />

      {filtered.length === 0 && (
        <p className="text-center text-neutral-400 text-sm py-4">No helpers match your filters.</p>
      )}
    </div>
  )
}
