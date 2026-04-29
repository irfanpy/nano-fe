import { useState } from 'react'
import { MdStar, MdReply } from 'react-icons/md'

export default function ReviewCard({ review, onRespond }) {
  const [showReply, setShowReply] = useState(false)
  const [reply, setReply]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!reply.trim()) return
    onRespond?.(review.id, reply)
    setSubmitted(true)
    setShowReply(false)
  }

  return (
    <div className="card card-body space-y-3">
      <div className="flex items-start gap-3">
        {review.reviewerImg ? (
          <img src={review.reviewerImg} alt={review.reviewerName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
            {review.reviewerName?.[0] ?? '?'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-semibold text-navy-500 text-sm">{review.reviewerName}</p>
            <span className="text-xs text-neutral-400">{review.date}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MdStar key={i} size={13} className={i < review.rating ? 'text-primary-500' : 'text-neutral-200'} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-700 leading-relaxed italic">"{review.text}"</p>

      {/* Owner response */}
      {(review.response || submitted) && (
        <div className="ml-4 pl-4 border-l-2 border-primary-100">
          <p className="text-xs font-semibold text-primary-600 mb-0.5">Helper Response</p>
          <p className="text-xs text-neutral-600 leading-relaxed">{submitted ? reply : review.response}</p>
        </div>
      )}

      {onRespond && !review.response && !submitted && (
        <div>
          {!showReply ? (
            <button onClick={() => setShowReply(true)} className="btn-ghost btn-sm flex items-center gap-1 text-xs text-primary-500">
              <MdReply size={14} /> Reply
            </button>
          ) : (
            <div className="space-y-2">
              <textarea
                className="input resize-none h-16 text-sm"
                placeholder="Write your response..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={handleSubmit} disabled={!reply.trim()} className="btn-primary btn-sm">Submit</button>
                <button onClick={() => setShowReply(false)} className="btn-ghost btn-sm">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
