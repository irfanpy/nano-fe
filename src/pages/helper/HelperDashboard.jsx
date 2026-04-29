import { Link } from 'react-router-dom'
import { MdVerified, MdStar, MdAttachMoney, MdBookOnline, MdVisibility, MdCheckCircle, MdRadioButtonUnchecked, MdArrowForward } from 'react-icons/md'

const COMPLETION = [
  { label: 'Profile Photo',        done: true },
  { label: 'Bio & Skills',         done: true },
  { label: 'Work Experience',      done: true },
  { label: 'Availability Set',     done: true },
  { label: 'Documents Uploaded',   done: false },
  { label: 'Medical Certificate',  done: false },
]

const REVIEWS = [
  { id: 1, family: 'Sarah A.', rating: 5, text: 'Maria keeps our home spotless and is wonderful with our children.', date: 'Feb 2024' },
  { id: 2, family: 'James T.', rating: 5, text: 'Very reliable and thorough. Highly recommended!', date: 'Jan 2024' },
]

const completedCount = COMPLETION.filter((c) => c.done).length
const completionPct  = Math.round((completedCount / COMPLETION.length) * 100)

export default function HelperDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* Welcome */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Welcome back, Maria!</h2>
            <span className="badge-green flex items-center gap-1"><MdVerified size={12} /> Verified</span>
          </div>
          <p className="text-neutral-500 mt-1">Your profile is live and families can find you.</p>
        </div>
        <Link to="/helper-dashboard/profile" className="btn-primary flex items-center gap-2">
          Edit Profile <MdArrowForward size={16} />
        </Link>
      </div>

      {/* Profile completion */}
      <div className="card card-body">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Profile Completion</h3>
          <span className="font-condensed font-bold text-primary-500 text-2xl">{completionPct}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000"
            style={{ width: `${completionPct}%` }} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {COMPLETION.map(({ label, done }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              {done
                ? <MdCheckCircle size={16} className="text-accent-500 flex-shrink-0" />
                : <MdRadioButtonUnchecked size={16} className="text-neutral-300 flex-shrink-0" />
              }
              <span className={done ? 'text-neutral-600' : 'text-neutral-400'}>{label}</span>
              {!done && (
                <Link to="/helper-dashboard/documents" className="text-xs text-primary-500 hover:underline ml-auto">Add</Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings', value: 'AED 8,400', icon: MdAttachMoney, bg: 'bg-accent-50 text-accent-600' },
          { label: 'Active Bookings', value: '1',        icon: MdBookOnline,   bg: 'bg-primary-50 text-primary-600' },
          { label: 'Rating',          value: '4.9 ★',   icon: MdStar,         bg: 'bg-warning-50 text-warning-600' },
          { label: 'Profile Views',   value: '284',      icon: MdVisibility,   bg: 'bg-info-50 text-info-500' },
        ].map(({ label, value, icon: Icon, bg }) => (
          <div key={label} className="card card-body flex items-center gap-3 hover:shadow-card-hover transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
              <Icon size={20} />
            </div>
            <div>
              <div className="font-condensed font-bold text-navy-500 text-xl">{value}</div>
              <p className="text-neutral-400 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Current booking */}
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Current Placement</h3>
            <Link to="/helper-dashboard/bookings" className="text-sm text-primary-500 font-medium flex items-center gap-1">
              All Bookings <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="card-body flex items-center gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl flex-shrink-0">SA</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-navy-500">Al-Mansouri Family</h4>
              <p className="text-sm text-neutral-500">Dubai Marina · Full-time Live-In</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-400">
                <span>📅 Started: 15 Jan 2024</span>
                <span>💰 AED 1,800/mo</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="badge-green">Active</span>
              <Link to="/helper-dashboard/bookings" className="btn-primary btn-sm">View</Link>
            </div>
          </div>
        </div>

        {/* Payout */}
        <div className="card card-body space-y-4">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Payout Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">This Month</span>
              <span className="font-semibold text-navy-500">AED 1,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Next Payout</span>
              <span className="font-semibold text-primary-500">15 Apr 2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Bank Account</span>
              <span className="font-semibold text-navy-500">••••9821</span>
            </div>
          </div>
          <Link to="/helper-dashboard/earnings" className="btn-outline w-full justify-center text-sm">View Earnings</Link>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Recent Reviews</h3>
          <Link to="/helper-dashboard/reviews" className="text-sm text-primary-500 font-medium flex items-center gap-1">
            All Reviews <MdArrowForward size={14} />
          </Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {REVIEWS.map((r) => (
            <div key={r.id} className="card-body flex gap-4">
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">{r.family[0]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-navy-500 text-sm">{r.family}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <MdStar key={i} size={13} className={i < r.rating ? 'text-primary-500' : 'text-neutral-200'} />
                    ))}
                    <span className="text-xs text-neutral-400 ml-1">{r.date}</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 italic mt-1">"{r.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
