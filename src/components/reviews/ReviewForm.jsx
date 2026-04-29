import { useState } from 'react'
import StarRating from '@components/common/StarRating'
import Spinner from '@components/common/Spinner'

export default function ReviewForm({ bookingId, onSuccess }) {
  const [rating,  setRating]  = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !comment.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      onSuccess?.({ bookingId, rating, comment })
    }, 900)
  }

  if (done) {
    return (
      <div className="card card-body text-center space-y-2 py-8">
        <div className="text-4xl">🌟</div>
        <p className="font-condensed font-bold text-navy-500 text-xl">Thank you for your review!</p>
        <p className="text-sm text-neutral-400">Your feedback helps families and helpers connect better.</p>
      </div>
    )
  }

  return (
    <div className="card card-body space-y-5">
      <div>
        <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Leave a Review</h3>
        <p className="text-neutral-400 text-sm mt-0.5">How was your experience with this helper?</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Your Rating</label>
          <StarRating value={rating} interactive onChange={setRating} size={28} />
          {!rating && <p className="text-xs text-neutral-400 mt-1">Click a star to rate</p>}
        </div>
        <div>
          <label className="label">Your Review</label>
          <textarea
            className="input resize-none h-28 text-sm"
            placeholder="Describe your experience — punctuality, reliability, attitude..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={!rating || !comment.trim() || loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading && <Spinner size="sm" />}
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}
