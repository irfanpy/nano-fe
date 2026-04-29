import { useState } from 'react'
import { MdSearch, MdVisibility, MdBlock, MdFilterList, MdPeople } from 'react-icons/md'
import DataTable from '@components/admin/DataTable'

const FAMILIES = [
  { id: 1, name: 'Al-Mansouri Family', contact: 'Omar Al-Mansouri',  email: 'omar@example.com',  plan: 'premium', status: 'active',    helpers: 1, joined: '05 Jan 2024' },
  { id: 2, name: 'Al-Rashed Family',   contact: 'Sara Al-Rashed',    email: 'sara@example.com',   plan: 'basic',   status: 'active',    helpers: 2, joined: '12 Dec 2023' },
  { id: 3, name: 'Chen Family',        contact: 'Wei Chen',           email: 'wei@example.com',    plan: 'premium', status: 'active',    helpers: 1, joined: '20 Nov 2023' },
  { id: 4, name: 'Johnson Family',     contact: 'Lisa Johnson',       email: 'lisa@example.com',   plan: 'basic',   status: 'suspended', helpers: 0, joined: '01 Oct 2023' },
  { id: 5, name: 'Khalifa Family',     contact: 'Ahmed Khalifa',      email: 'ahmed@example.com',  plan: 'premium', status: 'active',    helpers: 3, joined: '15 Sep 2023' },
  { id: 6, name: 'Patel Family',       contact: 'Meena Patel',        email: 'meena@example.com',  plan: 'basic',   status: 'active',    helpers: 1, joined: '02 Aug 2023' },
  { id: 7, name: 'Santos Family',      contact: 'Carlos Santos',      email: 'carlos@example.com', plan: 'free',    status: 'active',    helpers: 0, joined: '10 Jan 2024' },
]

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  suspended: { label: 'Suspended', cls: 'badge-red' },
}

const PLAN_CONFIG = {
  premium: { label: 'Premium', cls: 'badge-gold' },
  basic:   { label: 'Basic',   cls: 'badge-gray' },
  free:    { label: 'Free',    cls: 'badge-gray' },
}

const PLANS    = ['All', 'premium', 'basic', 'free']
const STATUSES = ['All', 'active', 'suspended']

const COLUMNS = [
  {
    key: 'name', label: 'Family', sortable: true,
    render: (v, row) => (
      <div>
        <p className="font-medium text-navy-500 text-sm">{v}</p>
        <p className="text-xs text-neutral-400">{row.contact}</p>
      </div>
    ),
  },
  { key: 'email',   label: 'Email',   render: (v) => <span className="text-xs text-neutral-500">{v}</span> },
  {
    key: 'plan', label: 'Plan', sortable: true,
    render: (v) => {
      const { label, cls } = PLAN_CONFIG[v] ?? PLAN_CONFIG.free
      return <span className={`${cls} text-xs capitalize`}>{label}</span>
    },
  },
  {
    key: 'status', label: 'Status', sortable: true,
    render: (v) => {
      const { label, cls } = STATUS_CONFIG[v] ?? STATUS_CONFIG.active
      return <span className={`${cls} text-xs`}>{label}</span>
    },
  },
  { key: 'helpers', label: 'Helpers', sortable: true, render: (v) => <span className="text-sm text-neutral-600">{v}</span> },
  { key: 'joined',  label: 'Joined',  sortable: true, render: (v) => <span className="text-xs text-neutral-400 whitespace-nowrap">{v}</span> },
  {
    key: 'id', label: 'Actions',
    render: (_) => (
      <div className="flex items-center gap-1.5">
        <button className="btn-ghost btn-sm p-1.5" title="View"><MdVisibility size={15} /></button>
        <button className="btn-ghost btn-sm p-1.5 text-danger-500" title="Suspend"><MdBlock size={15} /></button>
      </div>
    ),
  },
]

export default function AdminFamilies() {
  const [search, setSearch]   = useState('')
  const [plan, setPlan]       = useState('All')
  const [status, setStatus]   = useState('All')

  const filtered = FAMILIES.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.contact.toLowerCase().includes(search.toLowerCase())
    const matchPlan   = plan === 'All'   || f.plan === plan
    const matchStatus = status === 'All' || f.status === status
    return matchSearch && matchPlan && matchStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Families</h2>
          <p className="text-neutral-500 mt-1">{FAMILIES.length} registered families on the platform.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <MdPeople size={18} className="text-primary-500" />
          <span className="font-medium text-navy-500">{FAMILIES.filter((f) => f.plan === 'premium').length}</span> premium
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="input pl-9 text-sm"
            placeholder="Search families..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList size={17} className="text-neutral-400" />
          <select className="select text-sm py-2 w-32" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {PLANS.map((p) => <option key={p} className="capitalize">{p}</option>)}
          </select>
          <select className="select text-sm py-2 w-36" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
          </select>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filtered} />
    </div>
  )
}
