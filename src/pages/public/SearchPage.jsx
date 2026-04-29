import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Listbox } from '@headlessui/react'
import {
  MdSearch, MdStar, MdVerified, MdClose,
  MdChevronLeft, MdChevronRight, MdGridView, MdViewList, MdMap, MdCheck, MdExpandMore,
} from 'react-icons/md'
import { HELPER_CATEGORIES, NATIONALITIES } from '@constants'

const MOCK_HELPERS = [
  { id: 1,  name: 'Maria Santos',    category: 'housemaid', nationality: 'Filipino',   rating: 4.9, reviews: 38, price: 1800, exp: '5 yrs', img: 'https://i.pravatar.cc/300?img=47', available: true  },
  { id: 2,  name: 'Priya Nair',      category: 'nanny',     nationality: 'Indian',     rating: 4.8, reviews: 25, price: 2200, exp: '4 yrs', img: 'https://i.pravatar.cc/300?img=44', available: true  },
  { id: 3,  name: 'Laleh Getaneh',   category: 'caregiver', nationality: 'Ethiopian',  rating: 5.0, reviews: 17, price: 2500, exp: '6 yrs', img: 'https://i.pravatar.cc/300?img=48', available: true  },
  { id: 4,  name: 'Ahmad Khalil',    category: 'driver',    nationality: 'Pakistani',  rating: 4.7, reviews: 52, price: 1600, exp: '8 yrs', img: 'https://i.pravatar.cc/300?img=51', available: false },
  { id: 5,  name: 'Sunita Tamang',   category: 'housemaid', nationality: 'Nepali',     rating: 4.6, reviews: 20, price: 1700, exp: '3 yrs', img: 'https://i.pravatar.cc/300?img=45', available: true  },
  { id: 6,  name: 'Rose Dela Cruz',  category: 'nanny',     nationality: 'Filipino',   rating: 4.9, reviews: 44, price: 2100, exp: '7 yrs', img: 'https://i.pravatar.cc/300?img=41', available: true  },
  { id: 7,  name: 'Biniyam Tadesse', category: 'chef',      nationality: 'Ethiopian',  rating: 4.8, reviews: 12, price: 3200, exp: '9 yrs', img: 'https://i.pravatar.cc/300?img=53', available: true  },
  { id: 8,  name: 'Anitha Kumari',   category: 'caregiver', nationality: 'Indian',     rating: 4.7, reviews: 31, price: 2400, exp: '5 yrs', img: 'https://i.pravatar.cc/300?img=43', available: true  },
  { id: 9,  name: 'Rizwan Malik',    category: 'driver',    nationality: 'Pakistani',  rating: 4.5, reviews: 67, price: 1500, exp: '10 yrs',img: 'https://i.pravatar.cc/300?img=57', available: false },
  { id: 10, name: 'Chamari Perera',  category: 'housemaid', nationality: 'Sri Lankan', rating: 4.8, reviews: 29, price: 1900, exp: '4 yrs', img: 'https://i.pravatar.cc/300?img=42', available: true  },
  { id: 11, name: 'Feven Haile',     category: 'nanny',     nationality: 'Ethiopian',  rating: 4.9, reviews: 18, price: 2300, exp: '3 yrs', img: 'https://i.pravatar.cc/300?img=49', available: true  },
  { id: 12, name: 'Jose Reyes',      category: 'chef',      nationality: 'Filipino',   rating: 4.6, reviews:  8, price: 3000, exp: '6 yrs', img: 'https://i.pravatar.cc/300?img=54', available: true  },
]

const SORT_OPTIONS = [
  { value: 'rating',     label: 'Highest Rating'       },
  { value: 'price_asc',  label: 'Price: Low to High'   },
  { value: 'price_desc', label: 'Price: High to Low'   },
  { value: 'reviews',    label: 'Most Reviews'          },
]

// Category accent colours — matches badge colours in HelperCard
const CATEGORY_COLORS = {
  housemaid: { bg: 'bg-emerald-500',    dot: '#10b981' },
  nanny:     { bg: 'bg-violet-500',     dot: '#8b5cf6' },
  caregiver: { bg: 'bg-amber-500',      dot: '#f59e0b' },
  driver:    { bg: 'bg-blue-500',       dot: '#3b82f6' },
  chef:      { bg: 'bg-red-500',        dot: '#ef4444' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <MdStar key={i} size={11}
          className={i < Math.round(rating) ? 'text-primary-500' : 'text-neutral-300'} />
      ))}
    </span>
  )
}

/** Card used in GRID view */
function HelperCard({ helper }) {
  const catColor = CATEGORY_COLORS[helper.category] ?? { bg: 'bg-neutral-500' }
  return (
    <div className="group overflow-hidden bg-white border border-neutral-100
                    shadow-sm hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-neutral-100">
        <img src={helper.img} alt={helper.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />

        {/* Category badge — top-left (mirrors reference "RESIDENTIAL / COMMERCIAL" etc.) */}
        <span className={`absolute top-2 left-2 ${catColor.bg} text-white
                          text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded`}>
          {helper.category}
        </span>

        {/* Experience tag — top-right (mirrors reference year tag) */}
        <span className="absolute top-2 right-2 bg-black/50 text-white
                         text-[9px] font-bold px-2 py-0.5 rounded">
          {helper.exp}
        </span>

        {/* Price tag — bottom-right */}
        <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur
                         text-navy-500 text-[10px] font-bold px-2 py-0.5">
          AED {helper.price.toLocaleString()}/mo
        </span>

        {!helper.available && (
          <span className="absolute bottom-2 left-2 bg-black/45 text-white/70
                           text-[9px] font-semibold px-2 py-0.5 rounded">
            Booked
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 pt-2.5 pb-3">
        <h3 className="font-bold text-navy-500 text-sm truncate">{helper.name}</h3>
        <p className="text-[10px] text-primary-500 font-semibold mb-2">{helper.nationality}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MdStar className="text-primary-500" size={11} />
            <span className="text-xs font-semibold text-navy-500">{helper.rating}</span>
            <span className="text-[10px] text-neutral-400">({helper.reviews})</span>
          </div>
          <Link to={`/helper/${helper.id}`}
            className="text-[10px] font-bold px-2.5 py-1 bg-primary-500 text-white
                       hover:bg-primary-600 transition-colors">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

/** Row used in LIST view */
function HelperRow({ helper }) {
  const catColor = CATEGORY_COLORS[helper.category] ?? { bg: 'bg-neutral-500' }
  return (
    <div className="flex items-center gap-4 bg-white border border-neutral-100
                    px-4 py-3 hover:shadow-sm transition-shadow">
      <img src={helper.img} alt={helper.name}
        className="w-12 h-12 object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-navy-500 text-sm">{helper.name}</h3>
          <span className={`${catColor.bg} text-white text-[9px] font-bold
                            tracking-wider uppercase px-1.5 py-0.5 rounded`}>
            {helper.category}
          </span>
          {!helper.available && (
            <span className="bg-neutral-200 text-neutral-500 text-[9px]
                             font-semibold px-1.5 py-0.5 rounded">Booked</span>
          )}
        </div>
        <p className="text-[11px] text-neutral-500">{helper.nationality} · {helper.exp}</p>
      </div>
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        <Stars rating={helper.rating} />
        <span className="text-xs font-semibold text-navy-500 ml-1">{helper.rating}</span>
        <span className="text-[10px] text-neutral-400">({helper.reviews})</span>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-xs font-bold text-navy-500">AED {helper.price.toLocaleString()}/mo</p>
        <Link to={`/helper/${helper.id}`}
          className="text-[10px] font-bold px-2.5 py-1 bg-primary-500 text-white
                     hover:bg-primary-600 transition-colors inline-block mt-1">
          View
        </Link>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden bg-white border border-neutral-100">
      <div className="h-36 bg-neutral-100 animate-pulse" />
      <div className="px-3 pt-2.5 pb-3 space-y-2">
        <div className="h-3.5 w-2/3 bg-neutral-100 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-neutral-100 rounded animate-pulse" />
        <div className="flex justify-between mt-2">
          <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
          <div className="h-6 w-14 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar filter section ────────────────────────────────────────────────────

function SortDropdown({ value, onChange, options }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-48">
        <Listbox.Button className="relative w-full text-xs py-2 px-3 pl-3 pr-9
                                  bg-white/10 text-white/70 border-0 outline-none cursor-pointer
                                  hover:bg-white/15 transition-colors flex items-center justify-between">
          <span className="truncate">{options.find(o => o.value === value)?.label}</span>
          <MdExpandMore size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </Listbox.Button>

        <Listbox.Options className="absolute top-full left-0 mt-1 w-full bg-white border 
                                   border-neutral-200 shadow-lg z-10 overflow-hidden">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active, selected }) =>
                `px-3 py-2 text-xs cursor-pointer flex items-center justify-between
                 ${active ? 'bg-primary-100' : ''}
                 ${selected ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-neutral-700'}
                 hover:bg-primary-50 transition-colors`
              }
            >
              {({ selected }) => (
                <>
                  <span>{option.label}</span>
                  {selected && <MdCheck size={14} className="text-primary-500" />}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

function FilterSection({ title, items, selected, onSelect }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2.5">
        {title}
      </p>
      <div className="space-y-1">
        {items.map(({ value, label, count, dot }) => (
          <button key={value}
            onClick={() => onSelect(value)}
            className={`w-full flex items-center justify-between px-0 py-1 text-left
                        rounded transition-colors group`}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0 transition-colors"
                style={{ background: selected === value ? (dot ?? '#f5a623') : '#d1d5db' }} />
              <span className={`text-xs transition-colors
                ${selected === value
                  ? 'font-semibold text-navy-500'
                  : 'text-neutral-500 group-hover:text-navy-400'}`}>
                {label}
              </span>
            </span>
            {count != null && (
              <span className="text-[10px] text-neutral-400">{count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const PER_PAGE = 6

export default function SearchPage() {
  const [params]         = useSearchParams()
  const [loading, setLoading]     = useState(true)
  const [view, setView]           = useState('grid')         // 'grid' | 'list'
  const [searchQuery, setSearch]  = useState(params.get('q') ?? '')
  const [selCategory, setSelCat]  = useState(params.get('category') ?? '')
  const [selNat, setSelNat]       = useState(params.get('nationality') ?? '')
  const [selRating, setSelRat]    = useState(Number(params.get('rating') ?? 0))
  const [selAvail, setSelAvail]   = useState(params.get('available') === 'true')
  const [sort, setSort]           = useState('rating')
  const [page, setPage]           = useState(1)

  // Simulate async loading when filters change
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [selCategory, selNat, selRating, selAvail, searchQuery, sort])

  // ── Derived data ──────────────────────────────────────────────────────────

  const filtered = MOCK_HELPERS.filter((h) => {
    if (selCategory && h.category !== selCategory) return false
    if (selNat       && h.nationality !== selNat)   return false
    if (selRating    && h.rating < selRating)        return false
    if (selAvail     && !h.available)                return false
    if (searchQuery  && !h.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    if (sort === 'rating')     return b.rating - a.rating
    if (sort === 'price_asc')  return a.price  - b.price
    if (sort === 'price_desc') return b.price  - a.price
    if (sort === 'reviews')    return b.reviews - a.reviews
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Category counts for sidebar
  const catCounts = MOCK_HELPERS.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] ?? 0) + 1
    return acc
  }, {})

  const categoryItems = [
    { value: '', label: 'All Categories', count: MOCK_HELPERS.length },
    ...Object.entries(CATEGORY_COLORS).map(([id, col]) => ({
      value: id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count: catCounts[id] ?? 0,
      dot:   col.dot,
    })),
  ]

  const natItems = [
    { value: '', label: 'All Nationalities' },
    ...['Filipino','Indian','Ethiopian','Pakistani','Nepali','Sri Lankan'].map(n => ({
      value: n, label: n,
    })),
  ]

  const ratingItems = [
    { value: 0,   label: 'All ratings'     },
    { value: 4,   label: '4★ and above'   },
    { value: 4.5, label: '4.5★ and above' },
    { value: 5,   label: '5★ only'        },
  ]

  // Active filter chips
  const activeChips = [
    selCategory && { key: 'cat',   label: selCategory,      clear: () => { setSelCat('');  setPage(1) } },
    selNat       && { key: 'nat',   label: selNat,           clear: () => { setSelNat('');  setPage(1) } },
    selRating    && { key: 'rat',   label: `${selRating}★+`, clear: () => { setSelRat(0);  setPage(1) } },
    selAvail     && { key: 'avail', label: 'Available only', clear: () => { setSelAvail(false); setPage(1) } },
  ].filter(Boolean)

  const resetAll = () => {
    setSelCat(''); setSelNat(''); setSelRat(0); setSelAvail(false)
    setSearch(''); setPage(1)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-navy-500 pt-6 pb-0">
        <div className="container-app">

          {/* Breadcrumb */}
          <p className="text-[10px] tracking-widest uppercase text-white/40 mb-2">
            Helpers &nbsp;·&nbsp; <span className="text-primary-400">Find Helpers</span>
          </p>

          {/* Title + stats row */}
          <div className="flex items-end justify-between mb-1.5">
            <h1 className="font-condensed font-bold text-white text-3xl tracking-wide">
              FIND <span className="text-primary-400">HELPERS</span>
            </h1>
            <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/40 mb-1">
              <span><strong className="text-white/80">{filtered.length}</strong> Helpers</span>
              <span><strong className="text-white/80">6</strong> Nationalities</span>
            </div>
          </div>

          <p className="text-[11px] text-white/40 mb-4 max-w-md leading-relaxed">
            A curated directory of verified domestic helpers — housemaids, nannies,
            caregivers, chefs and drivers.
          </p>

          {/* Search bar + view toggle */}
          <div className="flex items-center gap-3 pb-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-4 py-2 bg-white/10 border-0
                           text-white text-sm placeholder-white/30 outline-none
                           focus:bg-white/15 transition-colors"
              />
            </div>

            {/* Sort (visible on desktop next to search) */}
            <div className="hidden sm:block">
              <SortDropdown 
                value={sort}
                onChange={(newSort) => { setSort(newSort); setPage(1) }}
                options={SORT_OPTIONS}
              />
            </div>

            {/* Grid / List / Map toggle — mirrors reference image */}
            <div className="flex ml-auto bg-white/10 overflow-hidden">
              {[
                { id: 'grid', Icon: MdGridView,  label: 'GRID' },
                { id: 'list', Icon: MdViewList,  label: 'LIST' },
                { id: 'map',  Icon: MdMap,       label: 'MAP'  },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => id !== 'map' && setView(id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold
                              tracking-widest transition-colors
                              ${view === id
                                ? 'bg-primary-500 text-navy-500'
                                : 'text-white/45 hover:text-white/70'}`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-3">
              {activeChips.map(({ key, label, clear }) => (
                <span key={key}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                             bg-white/10 text-white text-[11px] font-medium">
                  {label}
                  <button onClick={clear} className="hover:text-primary-300">
                    <MdClose size={11} />
                  </button>
                </span>
              ))}
              <button onClick={resetAll} className="text-[11px] text-white/50 hover:text-white underline">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-6 py-7 flex-1">

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="bg-white border border-neutral-100 p-5 sticky top-24">

            <FilterSection
              title="Category"
              items={categoryItems}
              selected={selCategory}
              onSelect={(v) => { setSelCat(v); setPage(1) }}
            />

            <FilterSection
              title="Nationality"
              items={natItems}
              selected={selNat}
              onSelect={(v) => { setSelNat(v); setPage(1) }}
            />

            <FilterSection
              title="Rating"
              items={ratingItems}
              selected={selRating}
              onSelect={(v) => { setSelRat(v); setPage(1) }}
            />

            {/* Available toggle */}
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2.5">
                Availability
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selAvail}
                  onChange={(e) => { setSelAvail(e.target.checked); setPage(1) }}
                  className="w-4 h-4 accent-orange-400 rounded"
                />
                <span className="text-xs text-neutral-600">Available now only</span>
              </label>
            </div>

            <button
              onClick={resetAll}
              className="w-full py-2 text-[11px] font-bold tracking-widest uppercase
                         text-neutral-500 border border-neutral-200
                         hover:border-neutral-300 hover:text-navy-500 transition-colors"
            >
              Reset All
            </button>
          </div>
        </aside>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 pr-5">

          {/* Results count */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-neutral-500 text-sm">
              <span className="font-semibold text-navy-500">{filtered.length}</span> helpers found
            </p>
            {/* Mobile sort */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1) }}
              className="sm:hidden select text-xs py-1.5 w-44"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Cards */}
          {loading ? (
            <div className={view === 'grid'
              ? 'grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4'
              : 'flex flex-col gap-3'}>
              {Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 bg-neutral-100 flex items-center
                              justify-center mb-4">
                <MdSearch size={26} className="text-neutral-300" />
              </div>
              <h3 className="font-semibold text-navy-500 mb-1">No helpers found</h3>
              <p className="text-neutral-500 text-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : view === 'grid' ? (
            // ✅ Fix
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginated.map((h) => <HelperCard key={h.id} helper={h} />)}
          </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginated.map((h) => <HelperRow key={h.id} helper={h} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-ghost w-9 h-9 p-0 disabled:opacity-40"
              >
                <MdChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 text-sm font-medium transition-colors
                    ${page === i + 1
                      ? 'bg-primary-500 text-white shadow-gold'
                      : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-ghost w-9 h-9 p-0 disabled:opacity-40"
              >
                <MdChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}