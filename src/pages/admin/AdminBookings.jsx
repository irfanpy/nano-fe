import { useState } from 'react'
import { MdSearch, MdFilterList, MdDownload, MdVisibility, MdBookOnline } from 'react-icons/md'
import DataTable from '@components/admin/DataTable'

const BOOKINGS = [
  { id: 'BK-0501', family: 'Al-Mansouri Family', helper: 'Maria Santos',   category: 'Housemaid', status: 'active',    amount: 1800, start: '15 Jan 2024', end: '15 Jan 2025' },
  { id: 'BK-0500', family: 'Chen Family',         helper: 'Ahmad Khalil',  category: 'Driver',    status: 'active',    amount: 2200, start: '01 Jan 2024', end: '01 Jan 2025' },
  { id: 'BK-0499', family: 'Al-Rashed Family',    helper: 'Priya Nair',    category: 'Nanny',     status: 'pending',   amount: 1600, start: '20 Jan 2024', end: '20 Jan 2025' },
  { id: 'BK-0498', family: 'Khalifa Family',      helper: 'Laleh Getaneh', category: 'Caregiver', status: 'completed', amount: 2500, start: '01 Jun 2023', end: '01 Dec 2023' },
  { id: 'BK-0497', family: 'Patel Family',        helper: 'Amara Diallo',  category: 'Housemaid', status: 'cancelled', amount: 1500, start: '10 Oct 2023', end: null },
  { id: 'BK-0496', family: 'Johnson Family',      helper: 'Nour Al-Hassan',category: 'Nanny',     status: 'completed', amount: 1700, start: '01 Mar 2023', end: '01 Sep 2023' },
  { id: 'BK-0495', family: 'Santos Family',       helper: 'Chen Wei',      category: 'Caregiver', status: 'disputed',  amount: 2000, start: '15 Aug 2023', end: null },
]

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  completed: { label: 'Completed', cls: 'badge-gray' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
  disputed:  { label: 'Disputed',  cls: 'badge-warning' },
}

const STATUSES    = ['All', 'active', 'pending', 'completed', 'cancelled', 'disputed']
const CATEGORIES  = ['All', 'Housemaid', 'Nanny', 'Driver', 'Caregiver']

const COLUMNS = [
  { key: 'id',       label: 'Booking ID', sortable: true,  render: (v) => <span className="font-mono text-xs text-neutral-500">{v}</span> },
  {
    key: 'family',   label: 'Family',     sortable: true,
    render: (v) => <span className="font-medium text-navy-500 text-sm">{v}</span>,
  },
  {
    key: 'helper',   label: 'Helper',     sortable: true,
    render: (v) => <span className="text-sm text-neutral-700">{v}</span>,
  },
  {
    key: 'category', label: 'Category',   sortable: true,
    render: (v) => <span className="text-xs text-neutral-500 capitalize">{v}</span>,
  },
  {
    key: 'status',   label: 'Status',     sortable: true,
    render: (v) => {
      const { label, cls } = STATUS_CONFIG[v] ?? STATUS_CONFIG.pending
      return <span className={`${cls} text-xs`}>{label}</span>
    },
  },
  {
    key: 'amount',   label: 'Amount/mo',  sortable: true,
    render: (v) => <span className="font-condensed font-bold text-navy-500 text-sm">AED {v.toLocaleString()}</span>,
  },
  { key: 'start',   label: 'Start Date', sortable: true,  render: (v) => <span className="text-xs text-neutral-400 whitespace-nowrap">{v}</span> },
  {
    key: 'id',       label: 'Actions',
    render: (_) => (
      <div className="flex items-center gap-1.5">
        <button className="btn-ghost btn-sm p-1.5" title="View"><MdVisibility size={15} /></button>
        <button className="btn-ghost btn-sm p-1.5" title="Export"><MdDownload size={15} /></button>
      </div>
    ),
  },
]

export default function AdminBookings() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('All')
  const [category, setCategory] = useState('All')

  const filtered = BOOKINGS.filter((b) => {
    const matchSearch   = b.family.toLowerCase().includes(search.toLowerCase()) || b.helper.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus   = status === 'All'   || b.status === status
    const matchCategory = category === 'All' || b.category === category
    return matchSearch && matchStatus && matchCategory
  })

  const handleExport = () => {
    const csv = [
      ['Booking ID', 'Family', 'Helper', 'Category', 'Status', 'Amount', 'Start Date'],
      ...filtered.map((b) => [b.id, b.family, b.helper, b.category, b.status, b.amount, b.start]),
    ].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'bookings.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Bookings</h2>
          <p className="text-neutral-500 mt-1">{BOOKINGS.length} total bookings across the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <MdBookOnline size={18} className="text-primary-500" />
            <span className="font-medium text-navy-500">{BOOKINGS.filter((b) => b.status === 'active').length}</span> active
          </div>
          <button onClick={handleExport} className="btn-outline btn-sm flex items-center gap-1.5">
            <MdDownload size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="input pl-9 text-sm"
            placeholder="Search by family, helper, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList size={17} className="text-neutral-400" />
          <select className="select text-sm py-2 w-36" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
          </select>
          <select className="select text-sm py-2 w-36" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filtered} />
    </div>
  )
}
