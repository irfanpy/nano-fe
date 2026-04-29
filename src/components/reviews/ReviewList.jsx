import { useState } from 'react'
import ReviewCard from './ReviewCard'
import Pagination from '@components/common/Pagination'

const MOCK_REVIEWS = [
  { id: 1, reviewerName: 'Sarah Al-Mansouri', reviewerImg: 'https://i.pravatar.cc/150?img=32', rating: 5, text: 'Absolutely wonderful helper. Always on time and our kids love her.', date: 'Feb 2024', response: null },
  { id: 2, reviewerName: 'James Thompson',    reviewerImg: null,                                rating: 5, text: 'Very reliable and thorough. Highly recommended to any family!',   date: 'Jan 2024', response: 'Thank you so much James, it was a pleasure working with your family!' },
  { id: 3, reviewerName: 'Meena Patel',       reviewerImg: 'https://i.pravatar.cc/150?img=49', rating: 4, text: 'Great work ethic. Very professional and kind to our elderly parents.', date: 'Dec 2023', response: null },
  { id: 4, reviewerName: 'Omar Khalid',       reviewerImg: null,                                rating: 5, text: 'Best helper we have ever had. Exceeded all our expectations.',      date: 'Nov 2023', response: null },
  { id: 5, reviewerName: 'Li Wei',            reviewerImg: 'https://i.pravatar.cc/150?img=53', rating: 4, text: 'Diligent and trustworthy. Our home has never been cleaner.',         date: 'Oct 2023', response: null },
]

const PER_PAGE = 3
const SORTS    = [{ value: 'newest', label: 'Newest' }, { value: 'highest', label: 'Highest Rated' }]

export default function ReviewList({ helperId: _helperId, showRespond = false }) {
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const sorted = [...MOCK_REVIEWS].sort((a, b) =>
    sort === 'highest' ? b.rating - a.rating : b.id - a.id
  )
  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const paged      = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const avgRating = (MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="font-condensed font-bold text-navy-500 text-3xl">{avgRating}</span>
          <div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.round(Number(avgRating)) ? 'text-primary-500' : 'text-neutral-200'}`}>★</span>
              ))}
            </div>
            <p className="text-xs text-neutral-400">{MOCK_REVIEWS.length} reviews</p>
          </div>
        </div>
        <div className="flex gap-1 bg-white rounded-xl shadow-card p-1">
          {SORTS.map(({ value, label }) => (
            <button key={value} onClick={() => { setSort(value); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${sort === value ? 'bg-primary-500 text-white' : 'text-neutral-500 hover:text-navy-500'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {paged.map((r) => (
          <ReviewCard key={r.id} review={r} onRespond={showRespond ? () => {} : undefined} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </div>
  )
}
