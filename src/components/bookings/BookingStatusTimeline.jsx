import { MdCheckCircle, MdRadioButtonUnchecked, MdHourglassEmpty } from 'react-icons/md'

const STEPS = [
  { key: 'pending',   label: 'Request Sent',    desc: 'Waiting for helper to accept' },
  { key: 'confirmed', label: 'Confirmed',        desc: 'Helper accepted the booking' },
  { key: 'contract',  label: 'Contract Signed',  desc: 'Both parties signed the contract' },
  { key: 'active',    label: 'Active',           desc: 'Helper is working with you' },
  { key: 'completed', label: 'Completed',        desc: 'Placement successfully finished' },
]

const ORDER = STEPS.map((s) => s.key)

export default function BookingStatusTimeline({ status = 'pending' }) {
  const currentIdx = ORDER.indexOf(status)

  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => {
        const done    = i < currentIdx
        const current = i === currentIdx
        const last    = i === STEPS.length - 1

        return (
          <div key={step.key} className="flex gap-4">
            {/* Connector column */}
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10
                ${done    ? 'bg-accent-500 text-white'
                : current ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                :           'bg-neutral-100 text-neutral-300'}`}>
                {done    ? <MdCheckCircle size={16} />
                : current ? <MdHourglassEmpty size={15} />
                :           <MdRadioButtonUnchecked size={16} />}
              </div>
              {!last && <div className={`w-0.5 flex-1 my-1 ${done || current ? 'bg-primary-200' : 'bg-neutral-100'}`} style={{ minHeight: 24 }} />}
            </div>

            {/* Content */}
            <div className={`pb-5 ${last ? '' : ''}`}>
              <p className={`text-sm font-medium ${done || current ? 'text-navy-500' : 'text-neutral-400'}`}>{step.label}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{step.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
