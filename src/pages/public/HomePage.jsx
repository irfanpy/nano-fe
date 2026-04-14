import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  MdCleaningServices, MdChildCare, MdDirectionsCar,
  MdFavorite, MdRestaurant, MdVerified, MdStar,
  MdArrowForward, MdSearch, MdShield, MdThumbUp,
} from 'react-icons/md'
import { HELPER_CATEGORIES } from '@constants'
import caregiverImg from '../../assets/images/caregiver.jpg';
import cheefImg from '../../assets/images/cheef.jpg';
import driverImg from '../../assets/images/driver.jpg';
import helperImg from '../../assets/images/helper.jpg';
import housewife from '../../assets/images/hosewife.jpg';
import nannyImg from '../../assets/images/nanny.png';

// ── Category icons map ───────────────────────────
const ICONS = {
  MdCleaningServices: <MdCleaningServices size={28} />,
  MdChildCare:        <MdChildCare size={28} />,
  MdDirectionsCar:    <MdDirectionsCar size={28} />,
  MdFavorite:         <MdFavorite size={28} />,
  MdRestaurant:       <MdRestaurant size={28} />,
}

// ── Words that cycle in the headline ────────────
const TYPING_WORDS = ['Helper', 'Housemaid', 'Nanny', 'Caregiver', 'Driver', 'Chef']

// ── Hero photo grid ──────────────────────────────
const HERO_GRID = [
  { role: 'Caregiver', img: caregiverImg },
  { role: 'Chef',      img: cheefImg     },
  { role: 'Driver',    img: driverImg    },
  { role: 'Helper',    img: helperImg    },
  { role: 'Housewife', img: housewife    },
  { role: 'Nanny',     img: nannyImg     },
];

// ── Mock featured helpers ────────────────────────
const FEATURED = [
  { id: 1, name: 'Maria Santos',  category: 'Housemaid', nationality: 'Filipino',  rating: 4.9, reviews: 38, price: 1800, exp: '5 yrs', img: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Priya Nair',    category: 'Nanny',     nationality: 'Indian',    rating: 4.8, reviews: 25, price: 2200, exp: '4 yrs', img: 'https://i.pravatar.cc/150?img=44' },
  { id: 3, name: 'Laleh Getaneh', category: 'Caregiver', nationality: 'Ethiopian', rating: 5.0, reviews: 17, price: 2500, exp: '6 yrs', img: 'https://i.pravatar.cc/150?img=48' },
  { id: 4, name: 'Ahmad Khalil',  category: 'Driver',    nationality: 'Pakistani', rating: 4.7, reviews: 52, price: 1600, exp: '8 yrs', img: 'https://i.pravatar.cc/150?img=51' },
]

const STEPS = [
  { icon: <MdSearch size={28} />,  title: 'Browse & Filter',  desc: 'Search verified helpers by category, nationality, price, and availability.' },
  { icon: <MdShield size={28} />,  title: 'Verified Profiles', desc: 'Every helper is background-checked, MoHRE-compliant, and Tadbeer-approved.' },
  { icon: <MdThumbUp size={28} />, title: 'Hire & Manage',     desc: 'Sign contracts, track visa status, chat, and review — all in one place.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Al-Mansouri', role: 'Mother of 3, Dubai Marina', text: "Found an amazing nanny within 48 hours. The whole visa process was guided step by step. Couldn't be easier!", rating: 5 },
  { name: 'James Thornton',    role: 'Family, Jumeirah',          text: 'Our housekeeper Maria is exceptional. The platform verified everything — we felt completely safe.', rating: 5 },
  { name: 'Fatima Al-Zahra',   role: 'Working Mum, Downtown',     text: 'Transparent pricing, no hidden agency fees. I hired a caregiver for my mother in just a few days.', rating: 5 },
]

// ── Typewriter hook ──────────────────────────────
function useTypewriter(words, typeSpeed = 95, deleteSpeed = 55, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timer

    if (!deleting && text === current) {
      // finished typing — wait then start deleting
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      // finished deleting — move to next word
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    } else {
      // type or delete one character
      timer = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timer)
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause])

  return text
}

// ── Stars ────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <MdStar key={i} className="text-primary-500" size={14} />
      ))}
    </span>
  )
}

// ── Helper Card ──────────────────────────────────
function HelperCard({ helper }) {
  return (
    <div className="card-hover group overflow-hidden">
      <div className="relative h-52 bg-neutral-100 overflow-hidden">
        <img
          src={helper.img}
          alt={helper.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-card-gradient" />
        <span className="absolute top-3 left-3 badge-green text-xs">
          <MdVerified size={12} /> Verified
        </span>
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1 text-xs font-bold text-navy-500">
          AED {helper.price.toLocaleString()}/mo
        </span>
      </div>
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-navy-500 text-base">{helper.name}</h3>
            <p className="text-sm text-neutral-500">{helper.category} · {helper.nationality}</p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1">
              <MdStar className="text-primary-500" size={15} />
              <span className="text-sm font-semibold text-navy-500">{helper.rating}</span>
            </div>
            <span className="text-xs text-neutral-400">{helper.reviews} reviews</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
            {helper.exp} experience
          </span>
          <Link to={`/helper/${helper.id}`} className="btn-primary btn-sm">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────
export default function HomePage() {
  const typedWord = useTypewriter(TYPING_WORDS)

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex overflow-hidden bg-navy-500">

        {/* inject keyframes once */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');
          @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
          .hero-photo { transition: filter 0.45s ease, transform 0.5s ease; filter: none; }
          .hero-photo:hover { filter: brightness(0.5) contrast(1.2) saturate(1.15); transform: scale(1.06); }
        `}</style>

        {/* subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fd7702 1px,transparent 1px),linear-gradient(90deg,#fd7702 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* ── LEFT PANEL ─────────────────────── */}
        <div
          className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] py-20 px-10 md:px-14 lg:px-20"
        >
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary-500 flex-shrink-0" />
            <span
              className="text-primary-500 font-semibold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px' }}
            >
              Dubai's Trusted Home Staffing Platform
            </span>
          </div>

          {/* ── HEADLINE ── */}
          <h1
            className="text-white leading-[1.0] mb-8 select-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '72px', fontWeight: 700, letterSpacing: '0.015em' }}
          >
            {/* static line 1 */}
            <span className="block">FIND THE PERFECT</span>

            {/* animated middle line */}
            <span className="block text-primary-500" style={{ minHeight: '1.05em' }}>
              {typedWord}
              {/* blinking cursor */}
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.75em',
                  background: '#fd7702',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'cursorBlink 1s step-end infinite',
                }}
              />
            </span>

            {/* static line 3 */}
            <span className="block">FOR YOUR HOME</span>
          </h1>

          {/* sub copy */}
          <p
            className="text-neutral-300 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '19px', fontWeight: 400, letterSpacing: '0.02em' }}
          >
            Connect with verified housemaids, nannies, drivers, caregivers
            and chefs — all MoHRE &amp; Tadbeer compliant, placed within 72 hours.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-primary-500 text-white hover:bg-primary-600 active:scale-95 transition-all duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px' }}
            >
              <MdSearch size={18} />
              Find a Helper
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 border border-white/35 text-white hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px' }}
            >
              How It Works
              <MdArrowForward size={18} />
            </Link>
          </div>

          {/* tagline */}
          <div className="border-t border-white/10 pt-5 mb-7">
            <p
              className="text-white/30 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px' }}
            >
              Verified Helpers &nbsp;·&nbsp; Visa Assistance &nbsp;·&nbsp; 72hr Placement &nbsp;·&nbsp; MoHRE Licensed
            </p>
          </div>

          {/* stats */}
          <div className="flex flex-wrap gap-20">
            {[
              { num: '2,400+', label: 'Verified Helpers' },
              { num: '850+',   label: 'Families Served' },
              { num: '4.9★',   label: 'Average Rating' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div
                  className="text-primary-500"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 700, letterSpacing: '0.04em' }}
                >
                  {num}
                </div>
                <div
                  className="text-white/35 uppercase mt-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.18em' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — photo grid ────────── */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]">

          {/* thin orange divider */}
          <div className="absolute left-0 top-[8%] bottom-[8%] w-px bg-primary-500/25 z-10" />

          <div className="grid grid-cols-3 grid-rows-2 h-full">
            {HERO_GRID.map(({ role, img }) => (
              <div key={role} className="relative overflow-hidden group cursor-pointer">

                {/* 
                  Natural image by default (no filter).
                  On hover: darken + contrast via CSS class.
                */}
                <img
                  src={img}
                  alt={role}
                  className="hero-photo w-full h-full object-cover object-top"
                />

                {/* 
                  Minimal bottom gradient — just enough to read role label.
                  Stays subtle at rest; doesn't wash out the natural photo.
                */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(0,15,35,0.6) 0%, transparent 38%)' }}
                />

                {/* orange left-bar on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-500 z-20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                {/* role label */}
                <div className="absolute bottom-0 left-0 p-3 z-20">
                  <span
                    className="text-white font-semibold uppercase tracking-[0.2em]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px' }}
                  >
                    {role}
                  </span>
                </div>

                {/* verified badge on hover */}
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex items-center gap-1 bg-primary-500 px-2 py-1">
                    <MdVerified size={10} color="white" />
                    <span
                      className="text-white font-bold tracking-wider"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '9px' }}
                    >
                      VERIFIED
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* corner accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-10"
            style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(253,119,2,0.18) 50%)' }}
          />
        </div>

      </section>
      {/* ══ END HERO ══ */}


      {/* ── CATEGORIES ── */}
      <section className="section-sm bg-warm-gradient">
        <style>{`
          .cat-card { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s; }
          .cat-card.visible { opacity: 1; transform: translateY(0); }
          .cat-icon-wrap { transition: background 0.25s, transform 0.3s; }
          .cat-card:hover .cat-icon-wrap { transform: scale(1.12) rotate(-4deg); }
          .cat-pill { opacity: 0; transform: scale(0.7); transition: opacity 0.2s, transform 0.2s; }
          .cat-card:hover .cat-pill { opacity: 1; transform: scale(1); }
        `}</style>

        <div className="container-app">

          {/* heading */}
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-500 mb-1">
              Browse by Category
            </h2>
            <p className="text-neutral-500 mt-3">
              Find the right help for every household need
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {HELPER_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/search?category=${cat.id}`}
                ref={(el) => {
                  if (el) {
                    setTimeout(() => el.classList.add('visible'), 80 + i * 60);
                  }
                }}
                className="cat-card group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-transparent
                          hover:border-primary-300 hover:shadow-gold text-center relative overflow-hidden"
              >
                {/* subtle gold wash on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* icon */}
                <div className="cat-icon-wrap w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-primary-500 relative z-10">
                  {ICONS[cat.icon]}
                </div>

                {/* label */}
                <span
                  className="text-xs font-semibold text-navy-500 group-hover:text-primary-600 transition-colors uppercase tracking-wider relative z-10"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {cat.label}
                </span>

                {/* hover badge */}
                <div className="cat-pill absolute top-2.5 right-2.5 bg-primary-500 text-white z-10"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  Hire
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-14">
            <span className="badge-gold mb-3">Simple Process</span>
            <h2 className="page-title mt-2">How It Works</h2>
            <p className="page-subtitle">Hire a verified helper in 3 easy steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-gold mb-5 relative z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-500 text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy-500 mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/how-it-works" className="btn-outline">
              Learn More <MdArrowForward />
            </Link>
          </div>
        </div>
      </section>


      {/* ── FEATURED HELPERS ── */}
      <section className="section bg-neutral-50">
        <div className="container-app">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="badge-gold mb-2">Hand-Picked</span>
              <h2 className="page-title mt-1">Featured Helpers</h2>
              <p className="page-subtitle">Top-rated, verified professionals available now</p>
            </div>
            <Link to="/search" className="btn-outline flex items-center gap-2">
              View All <MdArrowForward />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((helper) => (
              <HelperCard key={helper.id} helper={helper} />
            ))}
          </div>
        </div>
      </section>


      {/* ── TRUST BANNER ── */}
      <section className="section-sm bg-navy-500 text-white">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <MdVerified size={32} />, title: 'MoHRE Compliant',    desc: 'All helpers meet UAE Ministry of Human Resources & Emiratisation standards.' },
              { icon: <MdShield size={32} />,   title: 'Background Checked', desc: 'Criminal record checks, reference verification, and document authentication.' },
              { icon: <MdThumbUp size={32} />,  title: 'Tadbeer Approved',   desc: 'Licensed domestic worker center compliance across Dubai & UAE.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                  {icon}
                </div>
                <h3 className="font-semibold text-white text-lg">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── TESTIMONIALS ── */}
      <section className="section bg-warm-gradient">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">Real Families</span>
            <h2 className="page-title mt-2">What Our Families Say</h2>
            <p className="page-subtitle">Trusted by hundreds of households across Dubai</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, rating }) => (
              <div key={name} className="card card-body flex flex-col gap-4">
                <Stars count={rating} />
                <p className="text-neutral-600 text-sm leading-relaxed italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-neutral-100 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-500 text-sm">{name}</p>
                    <p className="text-xs text-neutral-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section className="section bg-gold-gradient text-white">
        <div className="container-app text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Find Your Perfect Helper?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join 850+ Dubai families who've hired trusted, verified domestic helpers through our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/search"   className="btn btn-xl bg-white text-primary-600 hover:bg-primary-50 shadow-lg">
              Browse Helpers
            </Link>
            <Link to="/register" className="btn btn-xl border-2 border-white text-white hover:bg-white/10">
              Register Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}