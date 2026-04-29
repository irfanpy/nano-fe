import { MdFilterList, MdRefresh } from 'react-icons/md'

const CATEGORIES    = ['All', 'Housemaid', 'Nanny', 'Driver', 'Caregiver', 'Cook', 'Gardener']
const NATIONALITIES = ['All', 'Filipino', 'Indian', 'Ethiopian', 'Pakistani', 'Sri Lankan', 'Indonesian', 'Lebanese']
const RATINGS       = [{ label: 'Any', value: 0 }, { label: '4+ Stars', value: 4 }, { label: '4.5+ Stars', value: 4.5 }]

export default function HelperFilters({ filters = {}, onChange }) {
  const update = (key, value) => onChange?.({ ...filters, [key]: value })
  const reset  = () => onChange?.({ category: 'All', nationality: 'All', minRating: 0, minSalary: '', maxSalary: '' })

  return (
    <div className="card card-body space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide flex items-center gap-2">
          <MdFilterList size={18} className="text-primary-500" /> Filters
        </h3>
        <button onClick={reset} className="btn-ghost btn-sm flex items-center gap-1 text-xs text-neutral-400">
          <MdRefresh size={14} /> Reset
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="label">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => update('category', c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all
                ${(filters.category ?? 'All') === c
                  ? 'bg-primary-500 text-white border-primary-500 shadow-gold'
                  : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Nationality */}
      <div>
        <label className="label">Nationality</label>
        <select
          className="select text-sm"
          value={filters.nationality ?? 'All'}
          onChange={(e) => update('nationality', e.target.value)}
        >
          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>

      {/* Salary range */}
      <div>
        <label className="label">Monthly Salary (AED)</label>
        <div className="flex items-center gap-2">
          <input
            className="input text-sm"
            type="number"
            placeholder="Min"
            value={filters.minSalary ?? ''}
            onChange={(e) => update('minSalary', e.target.value)}
            min="0"
          />
          <span className="text-neutral-400 text-sm flex-shrink-0">–</span>
          <input
            className="input text-sm"
            type="number"
            placeholder="Max"
            value={filters.maxSalary ?? ''}
            onChange={(e) => update('maxSalary', e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Min rating */}
      <div>
        <label className="label">Minimum Rating</label>
        <div className="flex gap-2">
          {RATINGS.map(({ label, value }) => (
            <button key={value} onClick={() => update('minRating', value)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all
                ${(filters.minRating ?? 0) === value
                  ? 'bg-primary-500 text-white border-primary-500 shadow-gold'
                  : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
