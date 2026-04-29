import { useState } from 'react'
import { MdAttachMoney, MdPending, MdAccountBalance, MdEdit, MdTrendingUp } from 'react-icons/md'
import StatCard from '@components/admin/StatCard'

const TRANSACTIONS = [
  { id: 'PAY-024', month: 'March 2024',    amount: 1800, status: 'pending',  family: 'Al-Mansouri Family', date: 'Due 01 Apr 2024' },
  { id: 'PAY-023', month: 'February 2024', amount: 1800, status: 'paid',     family: 'Al-Mansouri Family', date: 'Paid 01 Mar 2024' },
  { id: 'PAY-022', month: 'January 2024',  amount: 1800, status: 'paid',     family: 'Al-Mansouri Family', date: 'Paid 01 Feb 2024' },
  { id: 'PAY-021', month: 'December 2023', amount: 2500, status: 'paid',     family: 'Chen Family',        date: 'Paid 01 Jan 2024' },
  { id: 'PAY-020', month: 'November 2023', amount: 2500, status: 'paid',     family: 'Chen Family',        date: 'Paid 01 Dec 2023' },
  { id: 'PAY-019', month: 'October 2023',  amount: 2500, status: 'paid',     family: 'Chen Family',        date: 'Paid 01 Nov 2023' },
]

const STATUS_CONFIG = {
  paid:    { label: 'Paid',    cls: 'badge-green' },
  pending: { label: 'Pending', cls: 'badge-gold' },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CHART_DATA = [1800, 1800, 2500, 2500, 2500, 0, 0, 0, 2500, 2500, 2500, 1800]
const maxVal = Math.max(...CHART_DATA, 1)

export default function HelperEarnings() {
  const [editBank, setEditBank] = useState(false)
  const [bank, setBank]         = useState({ name: 'Emirates NBD', account: '••••9821', iban: 'AE07 0331 2345 6789 0123 456' })

  const totalEarned  = TRANSACTIONS.filter((t) => t.status === 'paid').reduce((s, t) => s + t.amount, 0)
  const pendingAmt   = TRANSACTIONS.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0)
  const thisMonth    = TRANSACTIONS[0]?.amount ?? 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Earnings</h2>
        <p className="text-neutral-500 mt-1">Track your salary payments and payout history.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Earned"     value={`AED ${totalEarned.toLocaleString()}`}  icon={MdAttachMoney}   color="bg-accent-50 text-accent-600" />
        <StatCard label="Pending Payout"   value={`AED ${pendingAmt.toLocaleString()}`}   icon={MdPending}       color="bg-warning-50 text-warning-600" />
        <StatCard label="This Month"       value={`AED ${thisMonth.toLocaleString()}`}     icon={MdTrendingUp}    color="bg-primary-50 text-primary-600" />
        <StatCard label="Next Payout Date" value="01 Apr 2024"                            icon={MdAccountBalance} color="bg-info-50 text-info-500" />
      </div>

      {/* Earnings chart */}
      <div className="card card-body">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Monthly Earnings (2024)</h3>
        <div className="flex items-end gap-2 h-32">
          {CHART_DATA.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${Math.round((val / maxVal) * 100)}%`,
                  minHeight: val > 0 ? '6px' : '2px',
                  background: val > 0 ? 'linear-gradient(180deg, #f59300 0%, #d97706 100%)' : '#f3f4f6',
                }}
              />
              <span className="text-[10px] text-neutral-400">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                {['Payment ID', 'Month', 'Family', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-neutral-400 text-xs uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {TRANSACTIONS.map((t) => {
                const { label, cls } = STATUS_CONFIG[t.status] ?? STATUS_CONFIG.paid
                return (
                  <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-neutral-400">{t.id}</td>
                    <td className="px-5 py-3.5 font-medium text-navy-500">{t.month}</td>
                    <td className="px-5 py-3.5 text-neutral-600">{t.family}</td>
                    <td className="px-5 py-3.5 font-condensed font-bold text-navy-500">AED {t.amount.toLocaleString()}</td>
                    <td className="px-5 py-3.5"><span className={`${cls} text-xs`}>{label}</span></td>
                    <td className="px-5 py-3.5 text-xs text-neutral-400">{t.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank account */}
      <div className="card card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Payout Account</h3>
          <button onClick={() => setEditBank((v) => !v)} className="btn-ghost btn-sm flex items-center gap-1.5 text-xs">
            <MdEdit size={14} /> {editBank ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {editBank ? (
          <div className="space-y-3">
            <div>
              <label className="label">Bank Name</label>
              <input className="input text-sm" value={bank.name} onChange={(e) => setBank((b) => ({ ...b, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">IBAN</label>
              <input className="input text-sm" value={bank.iban} onChange={(e) => setBank((b) => ({ ...b, iban: e.target.value }))} />
            </div>
            <button onClick={() => setEditBank(false)} className="btn-primary btn-sm">Save Changes</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-500 flex-shrink-0">
              <MdAccountBalance size={24} />
            </div>
            <div>
              <p className="font-semibold text-navy-500 text-sm">{bank.name}</p>
              <p className="text-xs text-neutral-400">Account: {bank.account}</p>
              <p className="text-xs text-neutral-400">IBAN: {bank.iban}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
