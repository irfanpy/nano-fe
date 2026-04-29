import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MdStar, MdVerified, MdFavorite, MdFavoriteBorder, MdShare,
  MdLocationOn, MdWork, MdLanguage, MdArrowForward, MdCalendarToday,
  MdCheckCircle,
} from 'react-icons/md'

const HELPER = {
  id: 1, name: 'Maria Santos', category: 'Housemaid', nationality: 'Filipino',
  rating: 4.9, reviews: 38, price: 1800, exp: '5 years', age: 32,
  img: 'https://i.pravatar.cc/400?img=47',
  verified: true, available: true,
  languages: ['English', 'Tagalog', 'Basic Arabic'],
  skills: ['Deep Cleaning', 'Laundry & Ironing', 'Cooking', 'Childcare', 'Grocery Shopping', 'Pet Care'],
  bio: `Maria is a highly experienced and dedicated housemaid with over 5 years of professional service in Dubai households. She specialises in deep cleaning, laundry, and maintaining a well-organised, comfortable home environment. Maria is warm, trustworthy, and great with children. She has worked with three families in Dubai Marina and JBR, consistently receiving 5-star reviews.`,
  workHistory: [
    { family: 'Al-Rashidi Family', area: 'Dubai Marina',   from: 'Jan 2022', to: 'Jan 2024', role: 'Full-time Housemaid' },
    { family: 'Thornton Family',   area: 'Jumeirah',       from: 'Mar 2020', to: 'Dec 2021', role: 'Housemaid & Cook' },
    { family: 'Agency Placement',  area: 'Downtown Dubai', from: 'Jan 2019', to: 'Feb 2020', role: 'Part-time Helper' },
  ],
  availability: {
    Mon: { am: true,  pm: true  }, Tue: { am: true,  pm: true  },
    Wed: { am: true,  pm: false }, Thu: { am: true,  pm: true  },
    Fri: { am: false, pm: false }, Sat: { am: true,  pm: true  },
    Sun: { am: true,  pm: true  },
  },
}

const REVIEWS = [
  { id: 1, name: 'Sarah A.', rating: 5, text: 'Maria is exceptional. Our home has never been cleaner, and she is brilliant with our kids. Highly recommend!', date: 'March 2024' },
  { id: 2, name: 'James T.', rating: 5, text: 'Very punctual, thorough, and professional. She noticed things to clean that we never would have thought of.', date: 'January 2024' },
  { id: 3, name: 'Fatima Z.', rating: 5, text: 'Trusted her with our home and children from day one. 5 stars without hesitation.', date: 'November 2023' },
  { id: 4, name: 'Michael K.', rating: 4, text: 'Great worker, very reliable. Cooking skills are a bonus — she prepared lovely Filipino dishes for the family.', date: 'August 2023' },
]

const SIMILAR = [
  { id: 5, name: 'Chamari Perera', category: 'Housemaid', nationality: 'Sri Lankan', rating: 4.8, price: 1900, img: 'https://i.pravatar.cc/150?img=42' },
  { id: 6, name: 'Rose Dela Cruz', category: 'Housemaid', nationality: 'Filipino',   rating: 4.9, price: 2100, img: 'https://i.pravatar.cc/150?img=41' },
  { id: 7, name: 'Sunita Tamang',  category: 'Housemaid', nationality: 'Nepali',     rating: 4.6, price: 1700, img: 'https://i.pravatar.cc/150?img=45' },
]

const TABS = ['About', 'Experience', 'Availability', 'Reviews']

function Stars({ count, size = 15 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <MdStar key={i} size={size} className={i < count ? 'text-primary-500' : 'text-neutral-300'} />
      ))}
    </span>
  )
}

function BookingForm({ helper, form, setForm, submitted, setSubmitted }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  return (
    <div className="card card-body">
      {submitted ? (
        <div className="text-center py-4 animate-scale-in">
          <MdCheckCircle size={40} className="text-accent-500 mx-auto mb-3" />
          <h4 className="font-condensed font-bold text-navy-500 text-xl">Request Sent!</h4>
          <p className="text-neutral-500 text-sm mt-1">We'll confirm within 24 hours.</p>
        </div>
      ) : (
        <>
          <h3 className="font-condensed font-bold text-navy-500 text-xl mb-4 tracking-wide">Book {helper.name}</h3>
          <div className="space-y-3">
            <div>
              <label className="label text-xs">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)}
                className="input text-sm" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="label text-xs">Service Type</label>
              <select value={form.serviceType} onChange={(e) => set('serviceType', e.target.value)} className="select text-sm">
                <option value="">Select…</option>
                <option>Full-time Live-In</option>
                <option>Full-time Live-Out</option>
                <option>Part-time</option>
              </select>
            </div>
            <div>
              <label className="label text-xs">Message (optional)</label>
              <textarea rows={3} placeholder={`Tell ${helper.name} about your household…`} value={form.message}
                onChange={(e) => set('message', e.target.value)} className="input resize-none text-sm" />
            </div>
            <button onClick={() => setSubmitted(true)} className="btn-primary w-full justify-center gap-2 py-3">
              <MdCalendarToday size={16} /> Send Booking Request
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function HelperProfilePage() {
  const { id } = useParams()
  const [shortlisted, setShortlisted] = useState(false)
  const [tab, setTab] = useState('About')
  const [form, setForm] = useState({ startDate: '', endDate: '', serviceType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  void id

  return (
    <div className="bg-neutral-50 min-h-screen">

      {/* Header */}
      <div className="bg-navy-500 py-6">
        <div className="container-app">
          <nav className="text-sm text-neutral-400 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-white transition-colors">Find Helpers</Link>
            <span>/</span>
            <span className="text-white">{HELPER.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex gap-6 items-start">
              <div className="relative flex-shrink-0">
                <img src={HELPER.img} alt={HELPER.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-primary-500/40" />
                {HELPER.available && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-500 border-2 border-white" title="Available" />
                )}
              </div>
              <div className="text-white flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-condensed font-bold text-3xl md:text-4xl tracking-wide">{HELPER.name}</h1>
                  {HELPER.verified && <MdVerified className="text-primary-400" size={24} />}
                </div>
                <p className="text-neutral-300 mt-1 capitalize">{HELPER.category} · {HELPER.nationality} · {HELPER.age} yrs</p>
                <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-neutral-300">
                  <span className="flex items-center gap-1.5"><Stars count={Math.round(HELPER.rating)} size={14} /> {HELPER.rating} ({HELPER.reviews} reviews)</span>
                  <span className="flex items-center gap-1.5"><MdWork size={14} />{HELPER.exp} experience</span>
                  <span className="flex items-center gap-1.5"><MdLocationOn size={14} />Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <button onClick={() => setShortlisted((s) => !s)}
                    className={`rounded-xl px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-all ${shortlisted ? 'bg-red-500 text-white' : 'bg-white/10 border border-white/30 text-white hover:bg-white/20'}`}>
                    {shortlisted ? <MdFavorite size={16} /> : <MdFavoriteBorder size={16} />}
                    {shortlisted ? 'Shortlisted' : 'Shortlist'}
                  </button>
                  <button className="bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-xl px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <MdShare size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <BookingForm helper={HELPER} form={form} setForm={setForm} submitted={submitted} setSubmitted={setSubmitted} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 mb-6 overflow-x-auto scrollbar-hide">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-condensed font-bold tracking-wide whitespace-nowrap transition-all duration-200 ${tab === t ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'About' && (
              <div className="space-y-5 animate-fade-in">
                <div className="card card-body">
                  <h3 className="font-condensed font-bold text-navy-500 text-xl mb-3 tracking-wide">About Maria</h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">{HELPER.bio}</p>
                </div>
                <div className="card card-body">
                  <h3 className="font-condensed font-bold text-navy-500 text-xl mb-4 tracking-wide">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {HELPER.skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
                        <MdCheckCircle size={13} className="text-primary-500" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card card-body">
                  <h3 className="font-condensed font-bold text-navy-500 text-xl mb-4 tracking-wide">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {HELPER.languages.map((l) => (
                      <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-50 text-navy-600 text-sm border border-navy-100">
                        <MdLanguage size={13} /> {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'Experience' && (
              <div className="card card-body animate-fade-in">
                <h3 className="font-condensed font-bold text-navy-500 text-xl mb-5 tracking-wide">Work History</h3>
                <div className="relative">
                  <div className="absolute left-3.5 top-2 bottom-2 w-px bg-primary-200" />
                  <div className="space-y-6">
                    {HELPER.workHistory.map((w, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0 z-10 shadow-gold">
                          <MdWork size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <h4 className="font-semibold text-navy-500 text-sm">{w.role}</h4>
                            <span className="text-xs text-neutral-400 whitespace-nowrap">{w.from} – {w.to}</span>
                          </div>
                          <p className="text-sm text-neutral-500 mt-0.5">{w.family}</p>
                          <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5"><MdLocationOn size={12} />{w.area}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'Availability' && (
              <div className="card card-body animate-fade-in">
                <h3 className="font-condensed font-bold text-navy-500 text-xl mb-5 tracking-wide">Weekly Availability</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center min-w-[400px]">
                    <thead>
                      <tr>
                        <th className="text-left pb-3 text-neutral-400 font-medium text-xs w-20">Time</th>
                        {Object.keys(HELPER.availability).map((d) => (
                          <th key={d} className="pb-3 text-navy-500 font-condensed font-bold tracking-wide text-xs">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['am', 'pm'].map((slot) => (
                        <tr key={slot}>
                          <td className="py-2 text-neutral-400 text-xs uppercase font-medium text-left">{slot === 'am' ? 'Morning' : 'Afternoon'}</td>
                          {Object.values(HELPER.availability).map((day, i) => (
                            <td key={i} className="py-2">
                              <span className={`inline-block w-7 h-7 rounded-lg text-xs font-bold leading-7 ${day[slot] ? 'bg-accent-100 text-accent-700' : 'bg-neutral-100 text-neutral-300'}`}>
                                {day[slot] ? '✓' : '✗'}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'Reviews' && (
              <div className="space-y-5 animate-fade-in">
                <div className="card card-body flex items-center gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="font-condensed font-bold text-navy-500 text-5xl">{HELPER.rating}</div>
                    <Stars count={5} size={18} />
                    <p className="text-xs text-neutral-400 mt-1">{HELPER.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2 min-w-[140px]">
                    {[[5,90],[4,8],[3,2]].map(([star, pct]) => (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="text-neutral-400 w-3">{star}★</span>
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-neutral-400 w-6">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {REVIEWS.map((r) => (
                  <div key={r.id} className="card card-body space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">{r.name[0]}</div>
                        <div>
                          <p className="font-semibold text-navy-500 text-sm">{r.name}</p>
                          <p className="text-xs text-neutral-400">{r.date}</p>
                        </div>
                      </div>
                      <Stars count={r.rating} size={14} />
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed italic">"{r.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="lg:hidden">
                <BookingForm helper={HELPER} form={form} setForm={setForm} submitted={submitted} setSubmitted={setSubmitted} />
              </div>
              <div className="card card-body bg-navy-500 text-white">
                <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1">Monthly Salary</p>
                <div className="font-condensed font-bold text-primary-400 text-3xl">AED {HELPER.price.toLocaleString()}</div>
                <p className="text-neutral-400 text-xs mt-1">+ Platform subscription fee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar helpers */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide">Similar Helpers</h2>
            <Link to="/search?category=housemaid" className="btn-outline btn-sm flex items-center gap-1">
              View All <MdArrowForward size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {SIMILAR.map((h) => (
              <Link key={h.id} to={`/helper/${h.id}`}
                className="card-hover flex items-center gap-4 card-body group">
                <img src={h.img} alt={h.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-navy-500 text-sm truncate">{h.name}</h4>
                  <p className="text-xs text-neutral-400">{h.category} · {h.nationality}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Stars count={Math.round(h.rating)} size={12} />
                    <span className="text-xs font-bold text-navy-500">AED {h.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
