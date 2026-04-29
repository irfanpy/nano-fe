import { useState } from 'react'
import { MdDownload, MdCreditCard, MdPayment } from 'react-icons/md'

const PAYMENTS = [
  { id: 'INV-2024-003', helper: 'Maria Santos', month: 'March 2024',    amount: 1800, status: 'pending',  dueDate: '15 Mar 2024' },
  { id: 'INV-2024-002', helper: 'Maria Santos', month: 'February 2024', amount: 1800, status: 'paid',     dueDate: '15 Feb 2024' },
  { id: 'INV-2024-001', helper: 'Maria Santos', month: 'January 2024',  amount: 1800, status: 'paid',     dueDate: '15 Jan 2024' },
  { id: 'INV-2023-012', helper: 'Laleh Getaneh',month: 'December 2023', amount: 2500, status: 'paid',     dueDate: '01 Dec 2023' },
  { id: 'INV-2023-009', helper: 'Laleh Getaneh',month: 'September 2023',amount: 2500, status: 'paid',     dueDate: '01 Sep 2023' },
  { id: 'INV-2023-006', helper: 'Ahmad Khalil', month: 'June 2023',     amount: 1600, status: 'overdue',  dueDate: '01 Jun 2023' },
]

const STATUS_CONFIG = {
  paid:    { label: 'Paid',    cls: 'badge-green' },
  pending: { label: 'Pending', cls: 'badge-gold' },
  overdue: { label: 'Overdue', cls: 'badge-red' },
}

const TABS = ['all', 'paid', 'pending', 'overdue']

export default function FamilyPayments() {
  const [tab, setTab] = useState('all')
  const [paying, setPaying] = useState(null)
  const [paid, setPaid] = useState([])

  const filtered = PAYMENTS.filter((p) => tab === 'all' || p.status === tab)

  const handlePay = (id) => {
    setPaying(id)
    setTimeout(() => {
      setPaid((prev) => [...prev, id])
      setPaying(null)
    }, 1200)
  }

  const isEffectivelyPaid = (id) => paid.includes(id)

  const totalSpent = PAYMENTS.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const pendingAmt  = PAYMENTS.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const nextDue     = PAYMENTS.find((p) => p.status === 'pending')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Payments & Invoices</h2>
        <p className="text-neutral-500 mt-1">Track all payments to your helpers.</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Spent',     value: `AED ${totalSpent.toLocaleString()}`, sub: 'All time', cls: 'text-navy-500' },
          { label: 'Pending Payment', value: `AED ${pendingAmt.toLocaleString()}`,  sub: 'Requires action', cls: pendingAmt > 0 ? 'text-warning-600' : 'text-navy-500' },
          { label: 'Next Due Date',   value: nextDue?.dueDate ?? 'None', sub: nextDue ? nextDue.helper : 'No pending payments', cls: 'text-navy-500' },
        ].map(({ label, value, sub, cls }) => (
          <div key={label} className="card card-body">
            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">{label}</p>
            <p className={`font-condensed font-bold text-2xl ${cls}`}>{value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 w-fit overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-condensed font-bold tracking-wide capitalize transition-all ${tab === t ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                {['Invoice #', 'Helper', 'Month', 'Amount', 'Status', 'Due Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-neutral-400 text-xs uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filtered.map((p) => {
                const effectivePaid = isEffectivelyPaid(p.id)
                const { label, cls } = STATUS_CONFIG[effectivePaid ? 'paid' : p.status] ?? STATUS_CONFIG.paid
                return (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-neutral-500">{p.id}</td>
                    <td className="px-5 py-3.5 font-medium text-navy-500">{p.helper}</td>
                    <td className="px-5 py-3.5 text-neutral-600">{p.month}</td>
                    <td className="px-5 py-3.5 font-condensed font-bold text-navy-500">AED {p.amount.toLocaleString()}</td>
                    <td className="px-5 py-3.5"><span className={`${cls} text-xs`}>{label}</span></td>
                    <td className="px-5 py-3.5 text-neutral-500">{p.dueDate}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="btn-ghost btn-sm flex items-center gap-1 text-xs">
                          <MdDownload size={13} /> Invoice
                        </button>
                        {(p.status === 'pending' || p.status === 'overdue') && !effectivePaid && (
                          <button onClick={() => handlePay(p.id)} disabled={paying === p.id}
                            className="btn-primary btn-sm text-xs flex items-center gap-1">
                            {paying === p.id ? (
                              <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                              </svg>
                            ) : (
                              <MdPayment size={13} />
                            )}
                            Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-400 text-sm">No payments found for this filter.</div>
          )}
        </div>
      </div>

      {/* Saved payment method */}
      <div className="card card-body flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-500">
            <MdCreditCard size={24} />
          </div>
          <div>
            <p className="font-semibold text-navy-500 text-sm">Visa •••• 4242</p>
            <p className="text-xs text-neutral-400">Expires 08/2026 · Default card</p>
          </div>
        </div>
        <button className="btn-outline btn-sm">Change Payment Method</button>
      </div>
    </div>
  )
}
