import { Link, useParams } from 'react-router-dom'
import { MdArrowBack, MdFlightTakeoff, MdCheckCircle, MdSchedule, MdRadioButtonUnchecked, MdPhone } from 'react-icons/md'

const VISA_STEPS = [
  { label: 'Documents Submitted',    desc: 'All required documents submitted to MoHRE.',     done: true,  date: '16 Jan 2024' },
  { label: 'Application Filed',      desc: 'Visa application officially filed with GDRFA.',   done: true,  date: '18 Jan 2024' },
  { label: 'Medical Check',          desc: 'Medical fitness test at approved HAAD clinic.',   done: false, date: 'In Progress' },
  { label: 'Biometrics',             desc: 'Fingerprinting and photo at ICA centre.',         done: false, date: 'Upcoming' },
  { label: 'Approval',               desc: 'Visa approved by GDRFA Dubai.',                  done: false, date: 'Upcoming' },
  { label: 'Visa Issued',            desc: 'Residence visa stamped and Emirates ID issued.',  done: false, date: 'Upcoming' },
]

const CURRENT_STEP = 2

const DOCS = [
  { name: 'Passport Copy',         status: 'verified',     date: '14 Jan 2024' },
  { name: 'Passport Photos (4x)',  status: 'verified',     date: '14 Jan 2024' },
  { name: 'Medical Certificate',   status: 'pending',      date: 'Pending upload' },
  { name: 'Emirates ID Application', status: 'pending',    date: 'Pending' },
  { name: 'Sponsor Letter',        status: 'verified',     date: '15 Jan 2024' },
  { name: 'Employment Contract',   status: 'verified',     date: '14 Jan 2024' },
]

const ACTIVITY = [
  { date: '18 Jan 2024', event: 'Visa application submitted to GDRFA Dubai portal.' },
  { date: '16 Jan 2024', event: 'Documents verified and approved by compliance team.' },
  { date: '14 Jan 2024', event: 'Contract signed and documents received by Platform.' },
  { date: '12 Jan 2024', event: 'Booking confirmed and visa process initiated.' },
]

const DOC_STATUS = {
  verified: { label: 'Verified ✓',   cls: 'badge-green' },
  pending:  { label: 'Pending ⏳',   cls: 'badge-gold' },
  missing:  { label: 'Missing ✗',    cls: 'badge-red' },
  expired:  { label: 'Expired ⚠',   cls: 'badge-warning' },
}

export default function VisaTracking() {
  const { id } = useParams()
  void id

  const completedSteps = VISA_STEPS.filter((s) => s.done).length
  const progressPct = Math.round((completedSteps / VISA_STEPS.length) * 100)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-400">
        <Link to="/family" className="hover:text-navy-500 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/family/bookings" className="hover:text-navy-500 transition-colors">Bookings</Link>
        <span>/</span>
        <Link to="/family/bookings/B-2024-001" className="hover:text-navy-500 transition-colors">#B-2024-001</Link>
        <span>/</span>
        <span className="text-navy-500 font-medium">Visa Tracking</span>
      </nav>

      <div className="flex items-center gap-3 flex-wrap">
        <Link to="/family/bookings/B-2024-001" className="btn-ghost flex items-center gap-1.5 text-sm">
          <MdArrowBack size={16} /> Back
        </Link>
        <h2 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide flex items-center gap-2">
          <MdFlightTakeoff size={24} className="text-primary-500" /> Visa Process Tracker
        </h2>
      </div>

      {/* Status cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Application Ref', value: 'GDRFA-2024-00812' },
          { label: 'Filed On',         value: '18 Jan 2024' },
          { label: 'Est. Completion',  value: 'Mar 2024' },
          { label: 'Authority Ref',    value: 'MoHRE/DW/9821' },
        ].map(({ label, value }) => (
          <div key={label} className="card card-body">
            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">{label}</p>
            <p className="font-condensed font-bold text-navy-500 text-lg">{value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="card card-body">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Overall Progress</h3>
          <span className="font-condensed font-bold text-primary-500 text-2xl">{progressPct}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-sm text-neutral-500 mt-2">{completedSteps} of {VISA_STEPS.length} steps completed</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          {/* Step tracker */}
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-xl mb-5 tracking-wide">Visa Steps</h3>
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-accent-400 via-primary-300 to-neutral-200 hidden sm:block" />
              <div className="space-y-5">
                {VISA_STEPS.map((step, i) => {
                  const isCurrent = i === CURRENT_STEP
                  const isDone = step.done
                  return (
                    <div key={step.label} className="flex gap-5 items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300
                        ${isDone ? 'bg-accent-500 shadow-sm' : isCurrent ? 'bg-primary-500 shadow-gold' : 'bg-neutral-200'}`}>
                        {isDone
                          ? <MdCheckCircle size={20} className="text-white" />
                          : isCurrent
                            ? <span className="text-white text-xs font-bold animate-pulse">{i + 1}</span>
                            : <MdRadioButtonUnchecked size={18} className="text-neutral-400" />
                        }
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className={`font-semibold text-sm ${isDone || isCurrent ? 'text-navy-500' : 'text-neutral-400'}`}>
                            {step.label}
                            {isCurrent && <span className="ml-2 text-xs text-primary-500 font-bold bg-primary-50 px-2 py-0.5 rounded-full">In Progress</span>}
                          </h4>
                          <span className={`text-xs ${isDone ? 'text-accent-600' : isCurrent ? 'text-primary-500' : 'text-neutral-400'}`}>{step.date}</span>
                        </div>
                        <p className={`text-xs mt-0.5 leading-relaxed ${isDone || isCurrent ? 'text-neutral-500' : 'text-neutral-300'}`}>{step.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Activity log */}
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-xl mb-4 tracking-wide">Recent Activity</h3>
            <div className="space-y-4">
              {ACTIVITY.map(({ date, event }) => (
                <div key={date} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 w-px bg-primary-200 ml-2 mr-1" />
                  <div>
                    <p className="font-medium text-navy-500">{event}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Document checklist */}
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-4">Document Checklist</h3>
            <div className="space-y-3">
              {DOCS.map(({ name, status, date }) => {
                const { label, cls } = DOC_STATUS[status] ?? DOC_STATUS.pending
                return (
                  <div key={name} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      {status === 'verified'
                        ? <MdCheckCircle size={16} className="text-accent-500 flex-shrink-0 mt-0.5" />
                        : <MdSchedule size={16} className="text-neutral-300 flex-shrink-0 mt-0.5" />
                      }
                      <div>
                        <p className="text-sm font-medium text-navy-500 leading-tight">{name}</p>
                        <p className="text-xs text-neutral-400">{date}</p>
                      </div>
                    </div>
                    <span className={`${cls} text-xs flex-shrink-0`}>{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Support */}
          <div className="card card-body bg-navy-500 text-white space-y-3">
            <h3 className="font-condensed font-bold text-lg tracking-wide">Need Help?</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">Our visa team is available Sun–Thu 9am–6pm for any questions.</p>
            <a href="tel:+97140000000" className="btn-primary w-full justify-center flex items-center gap-2 py-2.5">
              <MdPhone size={16} /> Call Visa Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
