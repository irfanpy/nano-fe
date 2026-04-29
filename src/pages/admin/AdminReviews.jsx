import { useState } from 'react'
import { MdSearch, MdFilterList, MdCheckCircle, MdDelete, MdFlag, MdStar } from 'react-icons/md'

const REVIEWS = [
  { id: 1, reviewer: 'Sara Al-Rashed', helper: 'Maria Santos',   rating: 5, text: 'Maria is fantastic — always punctual and thorough. Highly recommended!', date: '10 Jan 2024', status: 'reported', reason: 'Suspicious activity' },
  { id: 2, reviewer: 'Wei Chen',        helper: 'Ahmad Khalil',  rating: 1, text: 'Terrible experience. Left our family stranded with no notice.', date: '08 Jan 2024', status: 'reported', reason: 'Harassment' },
  { id: 3, reviewer: 'Omar Al-Mansouri',helper: 'Laleh Getaneh', rating: 5, text: 'Laleh has been an exceptional caregiver. Our elderly parents love her.', date: '05 Jan 2024', status: 'reported', reason: 'Spam / fake review' },
  { id: 4, reviewer: 'Lisa Johnson',    helper: 'Priya Nair',    rating: 4, text: 'Very good nanny, kids enjoy spending time with her.', date: '02 Jan 2024', status: 'approved', reason: null },
  { id: 5, reviewer: 'Ahmed Khalifa',   helper: 'Amara Diallo',  rating: 2, text: 'Did not meet our expectations. Frequently late to work.', date: '28 Dec 2023', status: 'reported', reason: 'Inaccurate content' },
]

const RATING_FILTER = ['All', '5', '4', '3', '2', '1']
const STATUSES      = ['All', 'reported', 'approved']

export default function AdminReviews() {
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('reported')
  const [rating, setRating]   = useState('All')
  const [approved, setApproved] = useState([])
  const [removed, setRemoved]   = useState([])

  const filtered = REVIEWS.filter((r) => {
    if (removed.includes(r.id)) return false
    const matchSearch = r.reviewer.toLowerCase().includes(search.toLowerCase()) || r.helper.toLowerCase().includes(search.toLowerCase()) || r.text.toLowerCase().includes(search.toLowerCase())
    const effectiveStatus = approved.includes(r.id) ? 'approved' : r.status
    const matchStatus = status === 'All' || effectiveStatus === status
    const matchRating = rating === 'All' || r.rating === Number(rating)
    return matchSearch && matchStatus && matchRating
  })

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Reviews</h2>
          <p className="text-neutral-500 mt-1">{REVIEWS.filter((r) => r.status === 'reported' && !approved.includes(r.id)).length} reviews pending moderation.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <MdFlag size={18} className="text-danger-500" />
          <span className="font-medium text-danger-500">{REVIEWS.filter((r) => r.status === 'reported').length}</span> reported
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="input pl-9 text-sm"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <MdFilterList size={17} className="text-neutral-400" />
          <select className="select text-sm py-2 w-36" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
          </select>
          <select className="select text-sm py-2 w-24" value={rating} onChange={(e) => setRating(e.target.value)}>
            {RATING_FILTER.map((r) => <option key={r}>{r === 'All' ? 'All Stars' : `${r} ★`}</option>)}
          </select>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {filtered.map((r) => {
          const effectiveStatus = approved.includes(r.id) ? 'approved' : r.status
          return (
            <div key={r.id} className="card card-body space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                    {r.reviewer[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-navy-500 text-sm">{r.reviewer}</p>
                      <span className="text-xs text-neutral-400">→</span>
                      <p className="text-sm text-neutral-600">{r.helper}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <MdStar key={i} size={13} className={i < r.rating ? 'text-primary-500' : 'text-neutral-200'} />
                      ))}
                      <span className="text-xs text-neutral-400 ml-1">{r.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {effectiveStatus === 'reported' && (
                    <span className="badge-warning text-xs flex items-center gap-1">
                      <MdFlag size={11} /> {r.reason ?? 'Reported'}
                    </span>
                  )}
                  {effectiveStatus === 'approved' && (
                    <span className="badge-green text-xs">Approved</span>
                  )}
                </div>
              </div>

              <p className="text-sm text-neutral-700 italic leading-relaxed">"{r.text}"</p>

              <div className="flex items-center gap-2 pt-1">
                {effectiveStatus !== 'approved' && (
                  <button
                    onClick={() => setApproved((a) => [...a, r.id])}
                    className="btn-outline btn-sm flex items-center gap-1.5 text-xs"
                  >
                    <MdCheckCircle size={14} className="text-accent-600" /> Approve
                  </button>
                )}
                <button
                  onClick={() => setRemoved((rem) => [...rem, r.id])}
                  className="btn-ghost btn-sm flex items-center gap-1.5 text-xs text-danger-500 hover:bg-danger-50"
                >
                  <MdDelete size={14} /> Remove
                </button>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-400 text-sm">No reviews to moderate.</div>
        )}
      </div>
    </div>
  )
}
