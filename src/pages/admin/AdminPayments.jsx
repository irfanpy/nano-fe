import { useState } from 'react'
import { MdSearch, MdFilterList, MdDownload, MdPayment, MdAttachMoney, MdTrendingUp, MdPending } from 'react-icons/md'
import StatCard from '@components/admin/StatCard'
import DataTable from '@components/admin/DataTable'

const TRANSACTIONS = [
  { id: 'TXN-9041', family: 'Al-Mansouri Family', helper: 'Maria Santos',   type: 'salary',   amount: 1800, commission: 180, status: 'completed', date: '15 Jan 2024' },
  { id: 'TXN-9040', family: 'Chen Family',         helper: 'Ahmad Khalil',  type: 'salary',   amount: 2200, commission: 220, status: 'completed', date: '14 Jan 2024' },
  { id: 'TXN-9039', family: 'Al-Rashed Family',    helper: 'Priya Nair',    type: 'placement', amount: 500,  commission: 500, status: 'completed', date: '12 Jan 2024' },
  { id: 'TXN-9038', family: 'Khalifa Family',      helper: 'Laleh Getaneh', type: 'salary',   amount: 2500, commission: 250, status: 'pending',   date: '10 Jan 2024' },
  { id: 'TXN-9037', family: 'Patel Family',        helper: 'Amara Diallo',  type: 'refund',   amount: 1500, commission: -150,status: 'completed', date: '08 Jan 2024' },
  { id: 'TXN-9036', family: 'Santos Family',       helper: 'Chen Wei',      type: 'payout',   amount: 3600, commission: 0,   status: 'completed', date: '07 Jan 2024' },
  { id: 'TXN-9035', family: 'Johnson Family',      helper: 'Nour Al-Hassan',type: 'salary',   amount: 1700, commission: 170, status: 'failed',    date: '05 Jan 2024' },
]

const STATUS_CONFIG = {
  completed: { label: 'Completed', cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  failed:    { label: 'Failed',    cls: 'badge-red' },
}

const TYPE_CONFIG = {
  salary:    { label: 'Salary',    cls: 'badge-gray' },
  placement: { label: 'Placement', cls: 'badge-gold' },
  refund:    { label: 'Refund',    cls: 'badge-warning' },
  payout:    { label: 'Payout',    cls: 'badge-navy' },
}

const STATUSES = ['All', 'completed', 'pending', 'failed']
const TYPES    = ['All', 'salary', 'placement', 'refund', 'payout']

const totalRevenue  = TRANSACTIONS.filter((t) => t.status === 'completed' && t.commission > 0).reduce((s, t) => s + t.commission, 0)
const pendingVolume = TRANSACTIONS.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0)
const totalVolume   = TRANSACTIONS.filter((t) => t.status === 'completed').reduce((s, t) => s + t.amount, 0)

const COLUMNS = [
  { key: 'id',     label: 'Txn ID',    render: (v) => <span className="font-mono text-xs text-neutral-500">{v}</span> },
  { key: 'family', label: 'Family',    sortable: true, render: (v) => <span className="text-sm font-medium text-navy-500">{v}</span> },
  { key: 'helper', label: 'Helper',    sortable: true, render: (v) => <span className="text-sm text-neutral-700">{v}</span> },
  {
    key: 'type',   label: 'Type',      sortable: true,
    render: (v) => {
      const { label, cls } = TYPE_CONFIG[v] ?? TYPE_CONFIG.salary
      return <span className={`${cls} text-xs capitalize`}>{label}</span>
    },
  },
  {
    key: 'amount', label: 'Amount',    sortable: true,
    render: (v) => <span className="font-condensed font-bold text-navy-500 text-sm">AED {v.toLocaleString()}</span>,
  },
  {
    key: 'commission', label: 'Commission', sortable: true,
    render: (v) => (
      <span className={`font-condensed font-bold text-sm ${v < 0 ? 'text-danger-500' : v === 0 ? 'text-neutral-400' : 'text-accent-600'}`}>
        {v < 0 ? '-' : v === 0 ? '' : '+'}AED {Math.abs(v)}
      </span>
    ),
  },
  {
    key: 'status', label: 'Status', sortable: true,
    render: (v) => {
      const { label, cls } = STATUS_CONFIG[v] ?? STATUS_CONFIG.pending
      return <span className={`${cls} text-xs`}>{label}</span>
    },
  },
  { key: 'date', label: 'Date', sortable: true, render: (v) => <span className="text-xs text-neutral-400 whitespace-nowrap">{v}</span> },
  {
    key: 'id', label: 'Actions',
    render: (_) => (
      <button className="btn-ghost btn-sm p-1.5" title="Download receipt"><MdDownload size={15} /></button>
    ),
  },
]

export default function AdminPayments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [type, setType]     = useState('All')

  const filtered = TRANSACTIONS.filter((t) => {
    const matchSearch = t.family.toLowerCase().includes(search.toLowerCase()) || t.helper.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'All' || t.status === status
    const matchType   = type === 'All'   || t.type === type
    return matchSearch && matchStatus && matchType
  })

  const handleExport = () => {
    const csv = [
      ['Txn ID', 'Family', 'Helper', 'Type', 'Amount', 'Commission', 'Status', 'Date'],
      ...filtered.map((t) => [t.id, t.family, t.helper, t.type, t.amount, t.commission, t.status, t.date]),
    ].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'payments.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Payments</h2>
          <p className="text-neutral-500 mt-1">Platform-wide transaction ledger and revenue summary.</p>
        </div>
        <button onClick={handleExport} className="btn-outline btn-sm flex items-center gap-1.5">
          <MdDownload size={16} /> Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue"    value={`AED ${totalRevenue.toLocaleString()}`}   trend="+18%"  icon={MdTrendingUp}   color="bg-accent-50 text-accent-600" />
        <StatCard label="Transaction Volume" value={`AED ${totalVolume.toLocaleString()}`}  trend="+12%"  icon={MdAttachMoney}  color="bg-primary-50 text-primary-600" />
        <StatCard label="Pending Volume"   value={`AED ${pendingVolume.toLocaleString()}`}  trend={null}  icon={MdPending}      color="bg-warning-50 text-warning-600" />
        <StatCard label="Total Transactions" value={TRANSACTIONS.length.toString()}          trend="+5%"   icon={MdPayment}      color="bg-info-50 text-info-500" />
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
          <select className="select text-sm py-2 w-32" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => <option key={t} className="capitalize">{t}</option>)}
          </select>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filtered} />
    </div>
  )
}
