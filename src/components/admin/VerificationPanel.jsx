import { useState } from 'react'
import { MdCheckCircle, MdCancel, MdOpenInNew, MdDescription, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'

const DOCS = ['passportUrl', 'medicalUrl', 'policeUrl', 'photoUrl']
const DOC_LABELS = {
  passportUrl: 'Passport / ID',
  medicalUrl:  'Medical Certificate',
  policeUrl:   'Police Clearance',
  photoUrl:    'Profile Photo',
}

export default function VerificationPanel({ helper, onApprove, onReject }) {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(null)

  if (!helper) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-neutral-400">
        <MdDescription size={40} className="mb-3 opacity-40" />
        <p className="text-sm">Select a helper to review their documents.</p>
      </div>
    )
  }

  const handleApprove = () => {
    setLoading('approve')
    setTimeout(() => { setLoading(null); onApprove?.(helper.id, notes) }, 800)
  }
  const handleReject = () => {
    setLoading('reject')
    setTimeout(() => { setLoading(null); onReject?.(helper.id, notes) }, 800)
  }

  return (
    <div className="space-y-5">
      {/* Helper info */}
      <div className="flex items-center gap-4">
        <img src={helper.img} alt={helper.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-100 flex-shrink-0" />
        <div>
          <h3 className="font-condensed font-bold text-navy-500 text-xl">{helper.name}</h3>
          <p className="text-sm text-neutral-500 capitalize">{helper.category} · {helper.nationality}</p>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-neutral-400">
            <span className="flex items-center gap-1"><MdEmail size={12} />{helper.email}</span>
            <span className="flex items-center gap-1"><MdPhone size={12} />{helper.phone}</span>
            <span className="flex items-center gap-1"><MdLocationOn size={12} />{helper.location}</span>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Uploaded Documents</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {DOCS.map((key) => (
            <div key={key} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors
              ${helper[key] ? 'border-accent-200 bg-accent-50' : 'border-neutral-200 bg-neutral-50'}`}>
              <MdDescription size={18} className={helper[key] ? 'text-accent-600' : 'text-neutral-300'} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-500">{DOC_LABELS[key]}</p>
                <p className="text-xs text-neutral-400">{helper[key] ? 'Uploaded' : 'Missing'}</p>
              </div>
              {helper[key] && (
                <a href={helper[key]} target="_blank" rel="noreferrer"
                  className="text-primary-500 hover:text-primary-600 flex-shrink-0">
                  <MdOpenInNew size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Admin Notes (optional)</label>
        <textarea
          className="input resize-none h-24 text-sm"
          placeholder="Add notes for this decision..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={!!loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {loading === 'approve'
            ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            : <MdCheckCircle size={18} />
          }
          Approve
        </button>
        <button
          onClick={handleReject}
          disabled={!!loading}
          className="btn-danger flex-1 flex items-center justify-center gap-2"
        >
          {loading === 'reject'
            ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            : <MdCancel size={18} />
          }
          Reject
        </button>
      </div>
    </div>
  )
}
