import { useState } from 'react'
import Spinner from '@components/common/Spinner'

const DURATIONS = ['3 months', '6 months', '1 year', '2 years']
const TYPES     = ['Live-In', 'Live-Out', 'Part-Time']

export default function BookingForm({ helperId: _helperId, onSuccess }) {
  const [form, setForm]     = useState({ startDate: '', duration: '', type: '', requirements: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.startDate) e.startDate = 'Start date is required'
    if (!form.duration)  e.duration  = 'Duration is required'
    if (!form.type)      e.type      = 'Contract type is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess?.(form)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            className={`input ${errors.startDate ? 'input-error' : ''}`}
            value={form.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.startDate && <p className="error-msg">{errors.startDate}</p>}
        </div>
        <div>
          <label className="label">Duration</label>
          <select
            className={`select ${errors.duration ? 'input-error' : ''}`}
            value={form.duration}
            onChange={(e) => set('duration', e.target.value)}
          >
            <option value="">Select duration…</option>
            {DURATIONS.map((d) => <option key={d}>{d}</option>)}
          </select>
          {errors.duration && <p className="error-msg">{errors.duration}</p>}
        </div>
      </div>

      <div>
        <label className="label">Contract Type</label>
        <div className="flex gap-2 flex-wrap">
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => set('type', t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                ${form.type === t ? 'bg-primary-500 text-white border-primary-500 shadow-gold' : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
              {t}
            </button>
          ))}
        </div>
        {errors.type && <p className="error-msg">{errors.type}</p>}
      </div>

      <div>
        <label className="label">Special Requirements <span className="text-neutral-400 font-normal">(optional)</span></label>
        <textarea
          className="input resize-none h-24 text-sm"
          placeholder="Any specific duties, allergies, working hours preferences..."
          value={form.requirements}
          onChange={(e) => set('requirements', e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading && <Spinner size="sm" />}
        {loading ? 'Sending Request…' : 'Send Booking Request'}
      </button>
    </form>
  )
}
