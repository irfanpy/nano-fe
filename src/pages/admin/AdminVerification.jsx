import { useState } from 'react'
import { MdSearch, MdVerified, MdHourglassEmpty } from 'react-icons/md'
import VerificationPanel from '@components/admin/VerificationPanel'

const QUEUE = [
  {
    id: 1, name: 'Maria Santos',   category: 'Housemaid', nationality: 'Filipino',  status: 'pending',
    email: 'maria@example.com', phone: '+971 50 123 4567', location: 'Dubai Marina',
    img: 'https://i.pravatar.cc/150?img=47',
    passportUrl: '#', medicalUrl: '#', policeUrl: '#', photoUrl: '#',
  },
  {
    id: 2, name: 'Priya Nair',     category: 'Nanny',     nationality: 'Indian',    status: 'pending',
    email: 'priya@example.com',  phone: '+971 55 234 5678', location: 'Jumeirah',
    img: 'https://i.pravatar.cc/150?img=44',
    passportUrl: '#', medicalUrl: null, policeUrl: '#', photoUrl: '#',
  },
  {
    id: 3, name: 'Laleh Getaneh',  category: 'Caregiver', nationality: 'Ethiopian', status: 'pending',
    email: 'laleh@example.com',  phone: '+971 52 345 6789', location: 'Sharjah',
    img: 'https://i.pravatar.cc/150?img=48',
    passportUrl: '#', medicalUrl: '#', policeUrl: '#', photoUrl: '#',
  },
  {
    id: 4, name: 'Ahmad Khalil',   category: 'Driver',    nationality: 'Pakistani', status: 'pending',
    email: 'ahmad@example.com',  phone: '+971 56 456 7890', location: 'Abu Dhabi',
    img: 'https://i.pravatar.cc/150?img=51',
    passportUrl: '#', medicalUrl: '#', policeUrl: null, photoUrl: '#',
  },
  {
    id: 5, name: 'Amara Diallo',   category: 'Housemaid', nationality: 'Senegalese',status: 'pending',
    email: 'amara@example.com',  phone: '+971 54 567 8901', location: 'Dubai',
    img: 'https://i.pravatar.cc/150?img=56',
    passportUrl: '#', medicalUrl: '#', policeUrl: '#', photoUrl: null,
  },
]

export default function AdminVerification() {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [approved, setApproved] = useState([])
  const [rejected, setRejected] = useState([])

  const getStatus = (id) => {
    if (approved.includes(id)) return 'approved'
    if (rejected.includes(id)) return 'rejected'
    return 'pending'
  }

  const filtered = QUEUE.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleApprove = (id) => {
    setApproved((a) => [...a, id])
    setSelected(null)
  }
  const handleReject = (id) => {
    setRejected((r) => [...r, id])
    setSelected(null)
  }

  const pendingCount = QUEUE.filter((h) => getStatus(h.id) === 'pending').length

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Verification Queue</h2>
          <p className="text-neutral-500 mt-1">{pendingCount} helper{pendingCount !== 1 ? 's' : ''} awaiting document review.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <MdHourglassEmpty size={16} className="text-warning-500" />
            <span className="font-medium text-warning-600">{pendingCount}</span> pending
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500">
            <MdVerified size={16} className="text-accent-500" />
            <span className="font-medium text-accent-600">{approved.length}</span> approved
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          className="input pl-9 text-sm"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={`grid gap-6 ${selected ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Queue list */}
        <div className="card overflow-hidden">
          <div className="card-header">
            <h3 className="font-condensed font-bold text-navy-500 text-base tracking-wide">Pending Helpers</h3>
          </div>
          <div className="divide-y divide-neutral-50">
            {filtered.length === 0 && (
              <p className="text-center py-12 text-neutral-400 text-sm">No helpers found.</p>
            )}
            {filtered.map((h) => {
              const status = getStatus(h.id)
              return (
                <div
                  key={h.id}
                  onClick={() => status === 'pending' && setSelected(h)}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors
                    ${status === 'pending' ? 'hover:bg-neutral-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                    ${selected?.id === h.id ? 'bg-primary-50 border-l-2 border-primary-500' : ''}`}
                >
                  <img src={h.img} alt={h.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-500 text-sm">{h.name}</p>
                    <p className="text-xs text-neutral-400 capitalize">{h.category} · {h.nationality}</p>
                  </div>
                  <span className={`text-xs flex-shrink-0 ${
                    status === 'approved' ? 'badge-green' :
                    status === 'rejected' ? 'badge-red' :
                    'badge-gold'
                  }`}>
                    {status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Pending'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Verification panel */}
        {selected && (
          <div className="card card-body animate-slide-up">
            <VerificationPanel
              helper={selected}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        )}
      </div>
    </div>
  )
}
