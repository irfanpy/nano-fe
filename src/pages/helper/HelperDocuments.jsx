import { MdCloudUpload, MdCheckCircle, MdSchedule, MdError, MdWarning, MdInfo } from 'react-icons/md'
import useUIStore from '@store/uiStore'

const DOCS = [
  { id: 'passport',    name: 'Passport Copy',            status: 'verified',     uploaded: '14 Jan 2024', expiry: '20 May 2028', required: true },
  { id: 'photos',      name: 'Passport Photos (4x)',     status: 'verified',     uploaded: '14 Jan 2024', expiry: null,          required: true },
  { id: 'medical',     name: 'Medical Certificate',      status: 'pending',      uploaded: '16 Jan 2024', expiry: '16 Jan 2025', required: true },
  { id: 'emirates',    name: 'Emirates ID Application',  status: 'not_uploaded', uploaded: null,          expiry: null,          required: true },
  { id: 'sponsor',     name: 'Sponsor Letter',           status: 'verified',     uploaded: '14 Jan 2024', expiry: null,          required: true },
  { id: 'training',    name: 'Training Certificate',     status: 'expired',      uploaded: '01 Jan 2022', expiry: '01 Jan 2024', required: false },
]

const STATUS_CONFIG = {
  verified:    { label: 'Verified',      cls: 'badge-green',   icon: MdCheckCircle, iconCls: 'text-accent-500' },
  pending:     { label: 'Under Review',  cls: 'badge-gold',    icon: MdSchedule,    iconCls: 'text-warning-500' },
  not_uploaded:{ label: 'Not Uploaded',  cls: 'badge-gray',    icon: MdError,       iconCls: 'text-neutral-400' },
  expired:     { label: 'Expired',       cls: 'badge-warning', icon: MdWarning,     iconCls: 'text-warning-600' },
}

export default function HelperDocuments() {
  const addToast = useUIStore((s) => s.addToast)

  const verified   = DOCS.filter((d) => d.status === 'verified').length
  const total      = DOCS.length
  const progressPct = Math.round((verified / total) * 100)

  const handleUpload = (docName) => {
    addToast({ type: 'info', message: `Upload dialog would open for: ${docName}` })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Documents</h2>
        <p className="text-neutral-500 mt-1">Upload and manage your compliance documents.</p>
      </div>

      {/* Overall verification */}
      <div className="card card-body">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Verification Status</h3>
          <span className="font-condensed font-bold text-primary-500 text-2xl">{verified}/{total} Verified</span>
        </div>
        <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 mt-2">
          <MdInfo size={16} className="text-info-500 flex-shrink-0" />
          Documents are reviewed within 2–3 business days of upload.
        </div>
      </div>

      {/* Documents grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOCS.map((doc) => {
          const config = STATUS_CONFIG[doc.status]
          const Icon = config.icon
          return (
            <div key={doc.id} className={`card card-body space-y-3 transition-shadow hover:shadow-card-hover ${doc.status === 'expired' ? 'border-warning-500/50' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <Icon size={22} className={`${config.iconCls} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="font-semibold text-navy-500 text-sm leading-tight">{doc.name}</h4>
                    {doc.required && <span className="text-[10px] text-neutral-400">Required</span>}
                  </div>
                </div>
                <span className={`${config.cls} text-[10px] flex-shrink-0`}>{config.label}</span>
              </div>

              <div className="text-xs text-neutral-400 space-y-1">
                {doc.uploaded && (
                  <p>Uploaded: <span className="text-neutral-600 font-medium">{doc.uploaded}</span></p>
                )}
                {doc.expiry && (
                  <p>Expiry: <span className={`font-medium ${doc.status === 'expired' ? 'text-warning-600' : 'text-neutral-600'}`}>{doc.expiry}</span></p>
                )}
              </div>

              <button onClick={() => handleUpload(doc.name)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  doc.status === 'not_uploaded'
                    ? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600 shadow-gold'
                    : doc.status === 'expired'
                      ? 'bg-warning-50 text-warning-600 border-warning-200 hover:bg-warning-500 hover:text-white'
                      : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                }`}>
                <MdCloudUpload size={14} />
                {doc.status === 'not_uploaded' ? 'Upload Document' : doc.status === 'expired' ? 'Re-upload Document' : 'Replace Document'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Info note */}
      <div className="bg-navy-50 border border-navy-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <MdInfo size={20} className="text-navy-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-navy-500 text-sm">Document Requirements</p>
          <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
            All documents must be clear, legible scans or photos in JPG/PNG/PDF format (max 5MB). Expired documents must be renewed before your listing remains active. Contact our compliance team if you need guidance.
          </p>
        </div>
      </div>
    </div>
  )
}
