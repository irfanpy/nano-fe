import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdVerified, MdFavorite, MdFavoriteBorder, MdStar } from 'react-icons/md'

export default function HelperCard({ helper, onShortlist }) {
  const [shortlisted, setShortlisted] = useState(helper.isShortlisted ?? false)

  const toggle = (e) => {
    e.preventDefault()
    setShortlisted((v) => !v)
    onShortlist?.(helper.id, !shortlisted)
  }

  return (
    <Link to={`/helper/${helper.id}`} className="card card-hover group block overflow-hidden">
      {/* Photo */}
      <div className="relative h-48 bg-neutral-100 overflow-hidden">
        <img
          src={helper.img}
          alt={helper.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Shortlist heart */}
        <button
          onClick={toggle}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors
            ${shortlisted ? 'bg-danger-500 text-white' : 'bg-white/90 text-neutral-400 hover:text-danger-500'}`}
          aria-label={shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          {shortlisted ? <MdFavorite size={17} /> : <MdFavoriteBorder size={17} />}
        </button>
        {/* Category tag */}
        <span className="absolute bottom-3 left-3 badge-gold text-xs capitalize">{helper.category}</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-navy-500 text-sm leading-tight">{helper.name}</h3>
              {helper.verified && <MdVerified size={15} className="text-accent-500 flex-shrink-0" />}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 capitalize">{helper.nationality} · {helper.experience}+ yrs</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <MdStar key={i} size={13} className={i < Math.round(helper.rating ?? 0) ? 'text-primary-500' : 'text-neutral-200'} />
          ))}
          <span className="text-xs font-medium text-neutral-600 ml-1">{helper.rating}</span>
          <span className="text-xs text-neutral-400">({helper.reviewCount ?? 0})</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="font-condensed font-bold text-navy-500 text-lg">AED {helper.salary?.toLocaleString()}</span>
            <span className="text-xs text-neutral-400">/mo</span>
          </div>
          <span className="btn-primary btn-sm text-xs">View Profile</span>
        </div>
      </div>
    </Link>
  )
}
