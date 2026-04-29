import ReviewList from '@components/reviews/ReviewList'

export default function HelperReviews() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Reviews</h2>
        <p className="text-neutral-500 mt-1">Reviews left by families you have worked with.</p>
      </div>
      <ReviewList showRespond />
    </div>
  )
}
