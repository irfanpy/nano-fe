import { Link } from 'react-router-dom'
import { MdVerified, MdStar, MdBookOnline, MdFavorite, MdFavoriteBorder, MdLocationOn } from 'react-icons/md'
import { useState } from 'react'

export default function HelperProfileHeader({ helper }) {
  const [shortlisted, setShortlisted] = useState(helper.isShortlisted ?? false)

  return (
    <div className="card overflow-hidden">
      {/* Cover */}
      <div className="h-40 bg-hero-gradient relative">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="card-body pt-0">
        {/* Avatar row */}
        <div className="flex items-end justify-between -mt-12 mb-4 flex-wrap gap-3">
          <div className="relative">
            <img
              src={helper.img}
              alt={helper.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-card"
            />
            {helper.verified && (
              <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                <MdVerified size={20} className="text-accent-500" />
              </span>
            )}
          </div>
          <div className="flex gap-2 pb-1">
            <button
              onClick={() => setShortlisted((v) => !v)}
              className={`btn-sm flex items-center gap-1.5 ${shortlisted ? 'btn-danger' : 'btn-outline'}`}
            >
              {shortlisted ? <MdFavorite size={16} /> : <MdFavoriteBorder size={16} />}
              {shortlisted ? 'Saved' : 'Save'}
            </button>
            <Link to={`/family/bookings/new?helper=${helper.id}`} className="btn-primary btn-sm flex items-center gap-1.5">
              <MdBookOnline size={16} /> Book Now
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">{helper.name}</h1>
            {helper.verified && <span className="badge-green text-xs flex items-center gap-1"><MdVerified size={11} /> Verified</span>}
          </div>
          <p className="text-neutral-500 text-sm capitalize">{helper.category} · {helper.nationality}</p>

          <div className="flex items-center flex-wrap gap-4 pt-2 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <MdStar key={i} size={15} className={i < Math.round(helper.rating ?? 0) ? 'text-primary-500' : 'text-neutral-200'} />
              ))}
              <span className="font-medium text-navy-500 ml-1">{helper.rating}</span>
              <span className="text-neutral-400">({helper.reviewCount} reviews)</span>
            </div>
            {helper.location && (
              <span className="flex items-center gap-1 text-neutral-400">
                <MdLocationOn size={15} className="text-primary-400" />{helper.location}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            <span className="badge-gold text-xs">AED {helper.salary?.toLocaleString()}/mo</span>
            <span className="badge-gray text-xs">{helper.experience}+ yrs exp</span>
            {helper.languages?.slice(0, 3).map((l) => (
              <span key={l} className="badge-gray text-xs">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
