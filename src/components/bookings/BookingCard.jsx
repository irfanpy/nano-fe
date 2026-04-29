import { Link } from 'react-router-dom'
import { MdVerified, MdArrowForward } from 'react-icons/md'

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'badge-green' },
  pending:   { label: 'Pending',   cls: 'badge-gold' },
  completed: { label: 'Completed', cls: 'badge-gray' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
}

export default function BookingCard({ booking }) {
  const { label, cls } = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending

  return (
    <div className="card card-body flex items-center gap-5 flex-wrap hover:shadow-card-hover transition-shadow duration-200">
      <img
        src={booking.helperImg ?? `https://i.pravatar.cc/150?u=${booking.helperId}`}
        alt={booking.helperName}
        className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border-2 border-primary-100"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-navy-500">{booking.helperName}</h4>
          {booking.verified && <MdVerified className="text-accent-500" size={15} />}
          <span className={`${cls} text-xs`}>{label}</span>
        </div>
        <p className="text-sm text-neutral-500 capitalize mt-0.5">{booking.category} · {booking.nationality}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-400">
          {booking.startDate && <span>📅 Started: {booking.startDate}</span>}
          {booking.location   && <span>📍 {booking.location}</span>}
          {booking.salary     && <span>💰 AED {booking.salary?.toLocaleString()}/mo</span>}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="flex flex-wrap gap-1.5 justify-end">
          {booking.visaStatus  && <span className="badge-gold text-xs">Visa: {booking.visaStatus}</span>}
          {booking.contractSigned && <span className="badge-green text-xs">Contract: Signed</span>}
        </div>
        <Link to={`/family/bookings/${booking.id}`} className="btn-primary btn-sm flex items-center gap-1">
          Details <MdArrowForward size={13} />
        </Link>
      </div>
    </div>
  )
}
