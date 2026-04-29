import { Link, useParams } from 'react-router-dom'
import { MdArrowBack, MdVerified, MdStar, MdChat, MdAssignment, MdFlightTakeoff, MdCheckCircle, MdSchedule } from 'react-icons/md'

const BOOKING = {
  id: 'B-2024-001',
  helper: { name: 'Maria Santos', img: 'https://i.pravatar.cc/150?img=47', category: 'Housemaid', nationality: 'Filipino', rating: 4.9 },
  startDate: '15 Jan 2024', endDate: 'Ongoing', price: 1800, status: 'active',
  location: 'Dubai Marina, Villa 4B',
  serviceType: 'Full-time Live-In',
  notes: 'Maria will handle all household cleaning, laundry, and childcare for 2 children (ages 4 and 7).',
  contractStatus: 'signed', visaStatus: 'in_progress', visaStep: 3,
  payments: [
    { month: 'January 2024',  amount: 1800, status: 'paid',    date: '15 Jan' },
    { month: 'February 2024', amount: 1800, status: 'paid',    date: '15 Feb' },
    { month: 'March 2024',    amount: 1800, status: 'pending', date: '15 Mar' },
  ],
}

const TIMELINE = [
  { label: 'Booking Requested',  date: '10 Jan 2024', done: true  },
  { label: 'Booking Confirmed',  date: '12 Jan 2024', done: true  },
  { label: 'Contract Signed',    date: '14 Jan 2024', done: true  },
  { label: 'Visa Processing',    date: '16 Jan 2024', done: true  },
  { label: 'Helper Started Work',date: '15 Jan 2024', done: true  },
  { label: 'Placement Complete', date: 'Ongoing',     done: false },
]

const VISA_STEPS = ['Documents Filed', 'Application Submitted', 'Medical Check', 'Biometrics', 'Approval', 'Visa Issued']

export default function BookingDetail() {
  const { id } = useParams()
  void id

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-400">
        <Link to="/family" className="hover:text-navy-500 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/family/bookings" className="hover:text-navy-500 transition-colors">Bookings</Link>
        <span>/</span>
        <span className="text-navy-500 font-medium">#{BOOKING.id}</span>
      </nav>

      <div className="flex items-center gap-3 flex-wrap">
        <Link to="/family/bookings" className="btn-ghost flex items-center gap-1.5 text-sm">
          <MdArrowBack size={16} /> Back
        </Link>
        <h2 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide">Booking #{BOOKING.id}</h2>
        <span className="badge-green">Active</span>
      </div>

      {/* Helper card */}
      <div className="card card-body flex items-center gap-5 flex-wrap">
        <img src={BOOKING.helper.img} alt={BOOKING.helper.name}
          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border-2 border-primary-200" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-navy-500 text-lg">{BOOKING.helper.name}</h3>
            <MdVerified className="text-accent-500" size={18} />
          </div>
          <p className="text-neutral-500 text-sm capitalize">{BOOKING.helper.category} · {BOOKING.helper.nationality}</p>
          <div className="flex items-center gap-1 mt-1">
            <MdStar className="text-primary-500" size={14} />
            <span className="text-sm font-semibold text-navy-500">{BOOKING.helper.rating}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/family/messages" className="btn-outline btn-sm flex items-center gap-1.5">
            <MdChat size={15} /> Message
          </Link>
          <Link to={`/family/bookings/${BOOKING.id}/contract`} className="btn-primary btn-sm flex items-center gap-1.5">
            <MdAssignment size={15} /> Contract
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          {/* Timeline */}
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-xl mb-5 tracking-wide">Booking Timeline</h3>
            <div className="relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-px bg-primary-200" />
              <div className="space-y-4">
                {TIMELINE.map(({ label, date, done }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${done ? 'bg-primary-500 shadow-gold' : 'bg-neutral-200'}`}>
                      {done
                        ? <MdCheckCircle size={14} className="text-white" />
                        : <MdSchedule size={14} className="text-neutral-400" />}
                    </div>
                    <div className="flex-1 flex items-center justify-between flex-wrap gap-1 pb-2">
                      <span className={`text-sm font-medium ${done ? 'text-navy-500' : 'text-neutral-400'}`}>{label}</span>
                      <span className="text-xs text-neutral-400">{date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-xl mb-4 tracking-wide">Booking Details</h3>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                ['Service Type', BOOKING.serviceType],
                ['Location',     BOOKING.location],
                ['Start Date',   BOOKING.startDate],
                ['End Date',     BOOKING.endDate],
                ['Monthly Rate', `AED ${BOOKING.price.toLocaleString()}`],
                ['Contract',     <span key="c" className="badge-green">Signed ✓</span>],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <dt className="text-neutral-400 text-xs uppercase tracking-wider mb-0.5">{k}</dt>
                  <dd className="font-medium text-navy-500">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <dt className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Notes</dt>
              <dd className="text-neutral-600 text-sm leading-relaxed">{BOOKING.notes}</dd>
            </div>
          </div>

          {/* Visa */}
          <div className="card card-body">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide flex items-center gap-2">
                <MdFlightTakeoff size={20} className="text-primary-500" /> Visa Status
              </h3>
              <Link to={`/family/bookings/${BOOKING.id}/visa`} className="btn-outline btn-sm">Track Visa</Link>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1 min-w-[480px]">
                {VISA_STEPS.map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${i < BOOKING.visaStep ? 'bg-accent-500 text-white' : i === BOOKING.visaStep ? 'bg-primary-500 text-white shadow-gold' : 'bg-neutral-200 text-neutral-400'}`}>
                      {i < BOOKING.visaStep ? '✓' : i + 1}
                    </div>
                    <p className="text-[10px] text-neutral-400 text-center leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 bg-primary-50 rounded-xl px-4 py-2.5 text-sm text-primary-700">
              🟡 Step {BOOKING.visaStep + 1}: <strong>{VISA_STEPS[BOOKING.visaStep]}</strong> — Estimated completion in 2–3 weeks.
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Payment Summary</h3>
            <div className="space-y-3">
              {BOOKING.payments.map((p) => (
                <div key={p.month} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-navy-500">{p.month}</p>
                    <p className="text-xs text-neutral-400">Due {p.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy-500">AED {p.amount.toLocaleString()}</span>
                    {p.status === 'paid'
                      ? <span className="badge-green text-xs">Paid</span>
                      : <span className="badge-gold text-xs">Pending</span>}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/family/payments" className="btn-primary w-full justify-center mt-4">Pay Invoice</Link>
          </div>

          <div className="card card-body space-y-3">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Quick Actions</h3>
            <Link to={`/family/bookings/${BOOKING.id}/contract`} className="btn-outline w-full justify-center flex items-center gap-2">
              <MdAssignment size={16} /> View Contract
            </Link>
            <Link to={`/family/bookings/${BOOKING.id}/visa`} className="btn-outline w-full justify-center flex items-center gap-2">
              <MdFlightTakeoff size={16} /> Track Visa
            </Link>
            <Link to="/family/messages" className="btn-outline w-full justify-center flex items-center gap-2">
              <MdChat size={16} /> Message Helper
            </Link>
            <Link to="/family/reviews" className="btn-ghost w-full justify-center flex items-center gap-2 text-sm border border-neutral-200">
              <MdStar size={16} /> Leave a Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
