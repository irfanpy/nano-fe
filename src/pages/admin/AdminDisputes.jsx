import { useState } from 'react'
import { MdGavel, MdSearch, MdFilterList, MdClose, MdCheckCircle, MdWarning, MdChat } from 'react-icons/md'

const DISPUTES = [
  {
    id: 'DSP-001', family: 'Al-Rashed Family', helper: 'Maria Santos',  issue: 'Non-payment of salary',
    priority: 'high',   status: 'open',     opened: '14 Jan 2024',
    description: 'The family has not paid the helper salary for January 2024 despite the contract requiring payment by the 1st of each month.',
    evidence: ['Contract copy', 'Bank statement screenshot'],
    messages: [
      { from: 'Family',  text: 'We had an issue with our bank account and payment was delayed.', time: '14 Jan 10:00' },
      { from: 'Helper',  text: 'I have been waiting for 2 weeks. This is not acceptable.',       time: '14 Jan 11:30' },
      { from: 'Admin',   text: 'We have reviewed the contract. Family must pay within 48 hours.', time: '15 Jan 09:00' },
    ],
  },
  {
    id: 'DSP-002', family: 'Chen Family',      helper: 'Ahmad Khalil',   issue: 'Contract breach — early termination',
    priority: 'medium', status: 'open',     opened: '10 Jan 2024',
    description: 'Family terminated the contract 3 months early without the agreed notice period or compensation.',
    evidence: ['Signed contract', 'Termination email'],
    messages: [
      { from: 'Helper',  text: 'I was given no notice and no end-of-service payment.',            time: '10 Jan 14:00' },
      { from: 'Family',  text: 'We had to relocate unexpectedly and could not keep the helper.',  time: '11 Jan 09:00' },
    ],
  },
  {
    id: 'DSP-003', family: 'Santos Family',    helper: 'Chen Wei',       issue: 'Misconduct allegation',
    priority: 'high',   status: 'under_review', opened: '05 Jan 2024',
    description: 'Family alleges helper left work premises without permission on multiple occasions.',
    evidence: ['CCTV report', 'Written warning'],
    messages: [
      { from: 'Family',  text: 'The helper left 3 times without informing us.',                   time: '05 Jan 16:00' },
      { from: 'Helper',  text: 'I had a medical emergency each time and informed the family.',    time: '06 Jan 10:00' },
    ],
  },
  {
    id: 'DSP-004', family: 'Khalifa Family',   helper: 'Amara Diallo',   issue: 'Refund request after cancellation',
    priority: 'low',    status: 'resolved',   opened: '20 Dec 2023',
    description: 'Family cancelled the placement within the first week and requested a full refund of placement fees.',
    evidence: ['Cancellation form'],
    messages: [
      { from: 'Family',  text: 'The helper was not a good fit. We want our placement fee back.',  time: '20 Dec 10:00' },
      { from: 'Admin',   text: 'Partial refund (50%) approved as per platform policy.',           time: '22 Dec 14:00' },
    ],
  },
]

const PRIORITY_CONFIG = {
  high:   { label: 'High',   cls: 'badge-red' },
  medium: { label: 'Medium', cls: 'badge-gold' },
  low:    { label: 'Low',    cls: 'badge-gray' },
}

const STATUS_CONFIG = {
  open:         { label: 'Open',         cls: 'badge-warning' },
  under_review: { label: 'Under Review', cls: 'badge-gold' },
  resolved:     { label: 'Resolved',     cls: 'badge-green' },
}

const STATUSES   = ['All', 'open', 'under_review', 'resolved']
const PRIORITIES = ['All', 'high', 'medium', 'low']

export default function AdminDisputes() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('All')
  const [priority, setPriority] = useState('All')
  const [selected, setSelected] = useState(null)
  const [resolution, setResolution] = useState('')
  const [resolved, setResolved] = useState([])

  const filtered = DISPUTES.filter((d) => {
    const matchSearch   = d.issue.toLowerCase().includes(search.toLowerCase()) || d.family.toLowerCase().includes(search.toLowerCase()) || d.helper.toLowerCase().includes(search.toLowerCase())
    const matchStatus   = status === 'All'   || d.status === status
    const matchPriority = priority === 'All' || d.priority === priority
    return matchSearch && matchStatus && matchPriority
  })

  const handleResolve = (id) => {
    setResolved((r) => [...r, id])
    setSelected(null)
    setResolution('')
  }

  const isResolved = (id) => resolved.includes(id)

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Disputes</h2>
          <p className="text-neutral-500 mt-1">{DISPUTES.filter((d) => d.status !== 'resolved').length} open disputes require attention.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <MdGavel size={18} className="text-danger-500" />
          <span className="font-medium text-danger-500">{DISPUTES.filter((d) => d.priority === 'high' && d.status !== 'resolved').length}</span> high priority
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="input pl-9 text-sm"
            placeholder="Search disputes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList size={17} className="text-neutral-400" />
          <select className="select text-sm py-2 w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
          </select>
          <select className="select text-sm py-2 w-32" value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => <option key={p} className="capitalize">{p}</option>)}
          </select>
        </div>
      </div>

      <div className={`grid gap-6 ${selected ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Dispute list */}
        <div className="space-y-3">
          {filtered.map((d) => {
            const { label: pLabel, cls: pCls } = PRIORITY_CONFIG[d.priority]
            const effectiveStatus = isResolved(d.id) ? 'resolved' : d.status
            const { label: sLabel, cls: sCls } = STATUS_CONFIG[effectiveStatus] ?? STATUS_CONFIG.open
            return (
              <div
                key={d.id}
                onClick={() => setSelected(d)}
                className={`card card-body cursor-pointer hover:shadow-card-hover transition-all duration-200
                  ${selected?.id === d.id ? 'border-primary-300 ring-2 ring-primary-100' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs text-neutral-400">{d.id}</span>
                      <span className={`${pCls} text-xs`}>{pLabel}</span>
                      <span className={`${sCls} text-xs`}>{sLabel}</span>
                    </div>
                    <h4 className="font-semibold text-navy-500 text-sm leading-snug">{d.issue}</h4>
                    <p className="text-xs text-neutral-400 mt-1">{d.family} vs {d.helper} · Opened {d.opened}</p>
                  </div>
                  {d.priority === 'high' && !isResolved(d.id) && (
                    <MdWarning size={18} className="text-danger-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-14 text-neutral-400 text-sm">No disputes match your filters.</div>
          )}
        </div>

        {/* Detail drawer */}
        {selected && (
          <div className="card animate-slide-up">
            <div className="card-header flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-neutral-400">{selected.id}</span>
                <h3 className="font-condensed font-bold text-navy-500 text-lg">{selected.issue}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost btn-sm p-1.5"><MdClose size={18} /></button>
            </div>

            <div className="card-body space-y-5">
              {/* Parties */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-neutral-50 p-3">
                  <p className="text-xs text-neutral-400 mb-0.5">Family</p>
                  <p className="font-semibold text-navy-500 text-sm">{selected.family}</p>
                </div>
                <div className="rounded-xl bg-neutral-50 p-3">
                  <p className="text-xs text-neutral-400 mb-0.5">Helper</p>
                  <p className="font-semibold text-navy-500 text-sm">{selected.helper}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1.5">Description</h4>
                <p className="text-sm text-neutral-700 leading-relaxed">{selected.description}</p>
              </div>

              {/* Evidence */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Evidence</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.evidence.map((e) => (
                    <span key={e} className="badge-gray text-xs flex items-center gap-1">
                      📎 {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conversation */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MdChat size={13} /> Conversation
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selected.messages.map((m, i) => (
                    <div key={i} className={`flex gap-2 text-xs ${m.from === 'Admin' ? 'justify-end' : ''}`}>
                      <div className={`max-w-[80%] rounded-xl px-3 py-2 ${m.from === 'Admin' ? 'bg-primary-50 text-primary-800' : 'bg-neutral-100 text-neutral-700'}`}>
                        <span className="font-semibold block mb-0.5">{m.from}</span>
                        {m.text}
                        <span className="text-neutral-400 text-[10px] block mt-0.5 text-right">{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution form */}
              {!isResolved(selected.id) && (
                <div>
                  <label className="label">Resolution Notes</label>
                  <textarea
                    className="input resize-none h-20 text-sm"
                    placeholder="Describe the resolution outcome..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleResolve(selected.id)}
                      disabled={!resolution.trim()}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <MdCheckCircle size={16} /> Mark Resolved
                    </button>
                  </div>
                </div>
              )}
              {isResolved(selected.id) && (
                <div className="flex items-center gap-2 text-accent-600 bg-accent-50 rounded-xl px-4 py-3 text-sm">
                  <MdCheckCircle size={18} /> Dispute resolved
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
