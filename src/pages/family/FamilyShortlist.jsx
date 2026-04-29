import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdStar, MdVerified, MdFavoriteBorder, MdSearch, MdArrowForward } from 'react-icons/md'

const INITIAL_SHORTLIST = [
  { id: 1, name: 'Maria Santos',   category: 'Housemaid', nationality: 'Filipino',   rating: 4.9, reviews: 38, price: 1800, exp: '5 yrs', available: true,  img: 'https://i.pravatar.cc/300?img=47', addedDate: '10 Jan 2024' },
  { id: 2, name: 'Priya Nair',     category: 'Nanny',     nationality: 'Indian',     rating: 4.8, reviews: 25, price: 2200, exp: '4 yrs', available: true,  img: 'https://i.pravatar.cc/300?img=44', addedDate: '12 Jan 2024' },
  { id: 3, name: 'Laleh Getaneh',  category: 'Caregiver', nationality: 'Ethiopian',  rating: 5.0, reviews: 17, price: 2500, exp: '6 yrs', available: true,  img: 'https://i.pravatar.cc/300?img=48', addedDate: '14 Jan 2024' },
  { id: 4, name: 'Ahmad Khalil',   category: 'Driver',    nationality: 'Pakistani',  rating: 4.7, reviews: 52, price: 1600, exp: '8 yrs', available: false, img: 'https://i.pravatar.cc/300?img=51', addedDate: '15 Jan 2024' },
]

const SORT_OPTIONS = [
  { value: 'date',       label: 'Recently Added' },
  { value: 'rating',     label: 'Highest Rating' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export default function FamilyShortlist() {
  const [helpers, setHelpers] = useState(INITIAL_SHORTLIST)
  const [sort, setSort] = useState('date')
  const [removing, setRemoving] = useState(null)

  const handleRemove = (id) => {
    setRemoving(id)
    setTimeout(() => {
      setHelpers((h) => h.filter((x) => x.id !== id))
      setRemoving(null)
    }, 350)
  }

  const sorted = [...helpers].sort((a, b) => {
    if (sort === 'rating')     return b.rating - a.rating
    if (sort === 'price_asc')  return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return 0
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Shortlist</h2>
          <p className="text-neutral-500 mt-1">{helpers.length} helpers saved</p>
        </div>
        <Link to="/search" className="btn-primary flex items-center gap-2">
          <MdSearch size={18} /> Browse More
        </Link>
      </div>

      {helpers.length === 0 ? (
        <div className="card card-body flex flex-col items-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-neutral-100 flex items-center justify-center mb-5">
            <MdFavoriteBorder size={36} className="text-neutral-300" />
          </div>
          <h3 className="font-condensed font-bold text-navy-500 text-2xl mb-2">Your shortlist is empty</h3>
          <p className="text-neutral-500 text-sm mb-6 max-w-sm">Browse helpers and click the ♥ icon to save them here for easy comparison.</p>
          <Link to="/search" className="btn-primary flex items-center gap-2">
            <MdSearch size={18} /> Browse Helpers <MdArrowForward size={16} />
          </Link>
        </div>
      ) : (
        <>
          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="select text-sm py-1.5 w-44">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((h) => (
              <div key={h.id}
                className={`card group overflow-hidden transition-all duration-350 ${removing === h.id ? 'opacity-0 scale-95 pointer-events-none' : 'hover:-translate-y-1 hover:shadow-card-hover'}`}>
                <div className="relative h-52 overflow-hidden bg-neutral-100">
                  <img src={h.img} alt={h.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                    <span className="badge-green text-[10px] flex items-center gap-1"><MdVerified size={10} /> Verified</span>
                    {!h.available && <span className="badge-gray text-[10px]">Booked</span>}
                  </div>
                  <button onClick={() => handleRemove(h.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 hover:bg-red-500 hover:text-white flex items-center justify-center text-neutral-500 transition-all duration-200 text-xs font-bold"
                    title="Remove from shortlist">
                    ♥
                  </button>
                  <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur rounded-lg px-2 py-0.5 text-xs font-bold text-navy-500">
                    AED {h.price.toLocaleString()}/mo
                  </span>
                </div>
                <div className="card-body">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-navy-500 text-sm">{h.name}</h3>
                      <p className="text-xs text-neutral-500 capitalize">{h.category} · {h.nationality}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdStar className="text-primary-500" size={13} />
                      <span className="text-xs font-semibold text-navy-500">{h.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{h.exp}</span>
                    <Link to={`/helper/${h.id}`} className="btn-primary btn-sm text-xs px-3 py-1.5">View Profile</Link>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-2">Added {h.addedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
