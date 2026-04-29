import { useState } from 'react'
import { MdStar, MdEdit, MdSend } from 'react-icons/md'

const WRITTEN = [
  { id: 1, helper: 'Maria Santos',  helperImg: 'https://i.pravatar.cc/150?img=47', category: 'Housemaid', rating: 5, text: 'Maria is absolutely wonderful. Our home has never been cleaner and she is so kind with our children. I cannot recommend her highly enough!', date: '15 Feb 2024' },
  { id: 2, helper: 'Laleh Getaneh', helperImg: 'https://i.pravatar.cc/150?img=48', category: 'Caregiver', rating: 5, text: 'Laleh cared for my mother with exceptional compassion and professionalism. Her medical background was evident, and my mother adored her.', date: '02 Jan 2024' },
  { id: 3, helper: 'Ahmad Khalil',  helperImg: 'https://i.pravatar.cc/150?img=51', category: 'Driver',    rating: 4, text: 'Ahmad was reliable and punctual every day. Great driver, knew Dubai roads well. Would hire again.', date: '05 Oct 2023' },
]

const PENDING = [
  { id: 4, helper: 'Priya Nair', helperImg: 'https://i.pravatar.cc/150?img=44', category: 'Nanny', bookingDate: '10 Feb 2024' },
]

function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button"
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i + 1)}
          className="text-2xl transition-transform hover:scale-110 focus:outline-none">
          <MdStar className={(hovered || value) > i ? 'text-primary-500' : 'text-neutral-200'} size={28} />
        </button>
      ))}
    </div>
  )
}

export default function FamilyReviews() {
  const [tab, setTab] = useState('written')
  const [pendingReviews, setPendingReviews] = useState(
    PENDING.map((p) => ({ ...p, rating: 0, text: '', submitted: false }))
  )

  const updatePending = (id, field, value) => {
    setPendingReviews((rs) => rs.map((r) => r.id === id ? { ...r, [field]: value } : r))
  }

  const submitReview = (id) => {
    setPendingReviews((rs) => rs.map((r) => r.id === id ? { ...r, submitted: true } : r))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Reviews</h2>
          <p className="text-neutral-500 mt-1">Share your experiences with helpers.</p>
        </div>
        {pendingReviews.filter((r) => !r.submitted).length > 0 && (
          <span className="badge-gold">{pendingReviews.filter((r) => !r.submitted).length} Pending Review{pendingReviews.filter((r) => !r.submitted).length > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 w-fit">
        {[['written', `Written (${WRITTEN.length})`], ['pending', `Pending (${pendingReviews.filter((r) => !r.submitted).length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-condensed font-bold tracking-wide transition-all ${tab === key ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'written' && (
        <div className="space-y-4">
          {WRITTEN.map((r) => (
            <div key={r.id} className="card card-body flex gap-4 flex-wrap hover:shadow-card-hover transition-shadow duration-300">
              <img src={r.helperImg} alt={r.helper} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <h4 className="font-semibold text-navy-500">{r.helper}</h4>
                    <p className="text-sm text-neutral-400 capitalize">{r.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <MdStar key={i} size={16} className={i < r.rating ? 'text-primary-500' : 'text-neutral-200'} />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-400">{r.date}</span>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed italic">"{r.text}"</p>
              </div>
              <button className="btn-ghost btn-sm flex items-center gap-1.5 self-start">
                <MdEdit size={14} /> Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'pending' && (
        <div className="space-y-5">
          {pendingReviews.map((r) => (
            <div key={r.id} className="card card-body">
              {r.submitted ? (
                <div className="flex items-center gap-3 py-4 text-center flex-col animate-scale-in">
                  <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                    <MdStar size={24} className="text-accent-500" />
                  </div>
                  <p className="font-semibold text-navy-500">Review submitted! Thank you.</p>
                </div>
              ) : (
                <div className="flex gap-4 flex-wrap">
                  <img src={r.helperImg} alt={r.helper} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-[240px] space-y-4">
                    <div>
                      <h4 className="font-semibold text-navy-500">{r.helper}</h4>
                      <p className="text-sm text-neutral-400 capitalize">{r.category} · Booking completed {r.bookingDate}</p>
                    </div>
                    <div>
                      <label className="label text-xs mb-2">Your Rating</label>
                      <StarInput value={r.rating} onChange={(val) => updatePending(r.id, 'rating', val)} />
                    </div>
                    <div>
                      <label className="label text-xs">Your Review</label>
                      <textarea rows={4} placeholder={`How was your experience with ${r.helper}?`}
                        value={r.text} onChange={(e) => updatePending(r.id, 'text', e.target.value)}
                        className="input resize-none text-sm" />
                    </div>
                    <button
                      onClick={() => submitReview(r.id)}
                      disabled={!r.rating || !r.text.trim()}
                      className={`btn flex items-center gap-2 ${r.rating && r.text.trim() ? 'btn-primary' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}>
                      <MdSend size={16} /> Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {pendingReviews.every((r) => r.submitted) && (
            <div className="card card-body text-center py-12 text-neutral-400">
              <MdStar size={32} className="mx-auto mb-3 text-neutral-200" />
              <p>No pending reviews. All caught up!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
