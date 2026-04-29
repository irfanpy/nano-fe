import { MdCheckCircle, MdHourglassEmpty, MdRadioButtonUnchecked, MdUpload, MdOpenInNew } from 'react-icons/md'

const STAGES = [
  { key: 'application_submitted', label: 'Application Submitted',    desc: 'MoHRE application filed',             docs: [] },
  { key: 'documents_review',      label: 'Documents Under Review',   desc: 'MoHRE reviewing submitted documents',  docs: ['Passport Copy', 'Medical Certificate'] },
  { key: 'medical_fitness',       label: 'Medical Fitness Test',     desc: 'Helper must complete medical fitness', docs: ['Medical Fitness Certificate'] },
  { key: 'visa_approved',         label: 'Visa Approved',            desc: 'Entry permit issued by MoHRE',         docs: [] },
  { key: 'entry_permit',          label: 'Entry & Stamping',         desc: 'Helper travels and visa stamped',      docs: ['Entry Permit Copy'] },
  { key: 'residence_issued',      label: 'Residence Visa Issued',    desc: 'UAE residence visa activated',         docs: [] },
]

const ORDER = STAGES.map((s) => s.key)

export default function VisaStatusTracker({ visa = {} }) {
  const currentIdx = ORDER.indexOf(visa.stage ?? 'application_submitted')

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Visa Processing Status</h3>
        {visa.referenceNo && (
          <span className="font-mono text-xs text-neutral-400">Ref: {visa.referenceNo}</span>
        )}
      </div>
      <div className="card-body">
        <div className="space-y-0">
          {STAGES.map((stage, i) => {
            const done    = i < currentIdx
            const current = i === currentIdx
            const last    = i === STAGES.length - 1

            return (
              <div key={stage.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10
                    ${done    ? 'bg-accent-500 text-white'
                    : current ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                    :           'bg-neutral-100 text-neutral-300'}`}>
                    {done    ? <MdCheckCircle size={16} />
                    : current ? <MdHourglassEmpty size={15} />
                    :           <MdRadioButtonUnchecked size={16} />}
                  </div>
                  {!last && <div className={`w-0.5 my-1 ${done ? 'bg-accent-200' : current ? 'bg-primary-100' : 'bg-neutral-100'}`} style={{ minHeight: 28 }} />}
                </div>

                <div className="pb-5 flex-1 min-w-0">
                  <p className={`text-sm font-medium ${done || current ? 'text-navy-500' : 'text-neutral-400'}`}>
                    {stage.label}
                    {current && <span className="ml-2 badge-gold text-[10px]">In Progress</span>}
                    {done    && <span className="ml-2 badge-green text-[10px]">Done</span>}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">{stage.desc}</p>

                  {/* Required documents */}
                  {stage.docs.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stage.docs.map((doc) => (
                        <span key={doc} className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border
                          ${done ? 'border-accent-200 bg-accent-50 text-accent-700' : 'border-neutral-200 bg-neutral-50 text-neutral-500'}`}>
                          {done ? <MdOpenInNew size={11} /> : <MdUpload size={11} />}
                          {doc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
