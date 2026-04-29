import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  MdCleaningServices, MdChildCare, MdDirectionsCar,
  MdFavorite, MdRestaurant, MdVerified, MdStar,
  MdArrowForward, MdSearch, MdShield, MdThumbUp,
  MdFormatQuote, MdCheckCircle,
} from 'react-icons/md'
import { HELPER_CATEGORIES } from '@constants'
import caregiverImg from '../../assets/images/caregiver.jpg'
import cheefImg     from '../../assets/images/cheef.jpg'
import driverImg    from '../../assets/images/driver.jpg'
import helperImg    from '../../assets/images/helper.jpg'
import housewife    from '../../assets/images/hosewife.jpg'
import nannyImg     from '../../assets/images/nanny.png'

/* ── icon map ───────────────────────────────────── */
const ICONS = {
  MdCleaningServices: <MdCleaningServices size={28} />,
  MdChildCare:        <MdChildCare size={28} />,
  MdDirectionsCar:    <MdDirectionsCar size={28} />,
  MdFavorite:         <MdFavorite size={28} />,
  MdRestaurant:       <MdRestaurant size={28} />,
}

/* ── data ───────────────────────────────────────── */
const TYPING_WORDS = ['Helper', 'Housemaid', 'Nanny', 'Caregiver', 'Driver', 'Chef']

const HERO_GRID = [
  { role: 'Caregiver', img: caregiverImg },
  { role: 'Chef',      img: cheefImg     },
  { role: 'Driver',    img: driverImg    },
  { role: 'Helper',    img: helperImg    },
  { role: 'Housewife', img: housewife    },
  { role: 'Nanny',     img: nannyImg     },
]

const FEATURED = [
  { id: 1, name: 'Maria Santos',  category: 'Housemaid', nationality: 'Filipino',  rating: 4.9, reviews: 38, price: 1800, exp: '5 yrs', img: housewife    },
  { id: 2, name: 'Priya Nair',    category: 'Nanny',     nationality: 'Indian',    rating: 4.8, reviews: 25, price: 2200, exp: '4 yrs', img: nannyImg     },
  { id: 3, name: 'Laleh Getaneh', category: 'Caregiver', nationality: 'Ethiopian', rating: 5.0, reviews: 17, price: 2500, exp: '6 yrs', img: caregiverImg },
  { id: 4, name: 'Ahmad Khalil',  category: 'Driver',    nationality: 'Pakistani', rating: 4.7, reviews: 52, price: 1600, exp: '8 yrs', img: driverImg    },
]

const STEPS = [
  {
    num: '01', icon: <MdSearch size={26} />,
    title: 'Browse & Filter',
    desc: 'Search verified helpers by category, nationality, price, and real-time availability.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    num: '02', icon: <MdShield size={26} />,
    title: 'Review Verified Profiles',
    desc: 'Every helper is background-checked, MoHRE-compliant, and Tadbeer-approved before listing.',
    color: 'from-navy-600 to-navy-800',
  },
  {
    num: '03', icon: <MdThumbUp size={26} />,
    title: 'Hire & Manage',
    desc: 'Sign contracts online, track visa status, chat in real-time, and leave reviews — all in one dashboard.',
    color: 'from-primary-500 to-primary-600',
  },
]

const TESTIMONIALS = [
  { name: 'Sarah Al-Mansouri', role: 'Mother of 3, Dubai Marina', text: "Found an amazing nanny within 48 hours. The whole visa process was guided step by step. Couldn't be easier!", rating: 5, img: 'https://i.pravatar.cc/150?img=32' },
  { name: 'James Thornton',    role: 'Family, Jumeirah',          text: 'Our housekeeper Maria is exceptional. The platform verified everything — we felt completely safe and confident.', rating: 5, img: null },
  { name: 'Fatima Al-Zahra',   role: 'Working Mum, Downtown',     text: 'Transparent pricing, zero hidden agency fees. I hired a caregiver for my mother in just a few days!', rating: 5, img: 'https://i.pravatar.cc/150?img=45' },
]

const TRUST_ITEMS = [
  {
    icon: <MdVerified size={30} />, title: 'MoHRE Compliant',
    desc: 'All helpers meet UAE Ministry of Human Resources & Emiratisation standards.',
    stat: '100%', statLabel: 'Compliance Rate',
  },
  {
    icon: <MdShield size={30} />, title: 'Background Checked',
    desc: 'Criminal record checks, reference verification, and document authentication.',
    stat: '2,400+', statLabel: 'Verified Profiles',
  },
  {
    icon: <MdThumbUp size={30} />, title: 'Tadbeer Approved',
    desc: 'Licensed domestic worker centre compliance across Dubai & UAE.',
    stat: '72h', statLabel: 'Average Placement',
  },
]

/* ── hooks ──────────────────────────────────────── */
function useTypewriter(words, typeSpeed = 95, deleteSpeed = 55, pause = 1800) {
  const [text,     setText]     = useState('')
  const [wordIdx,  setWordIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, deleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause])

  return text
}

/* Intersection-observer based scroll reveal */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io  = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Animated counter */
function useCounter(target, duration = 1800, trigger = true) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, trigger])
  return count
}

/* ── sub-components ─────────────────────────────── */
function Stars({ count = 5, size = 14 }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <MdStar key={i} className="text-primary-500" size={size} />
      ))}
    </span>
  )
}

function HelperCard({ helper, delay = 0 }) {
  return (
    <div
      className="reveal reveal-up card-hover group overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-56 bg-neutral-100 overflow-hidden">
        <img
          src={helper.img} alt={helper.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-card-gradient" />
        <span className="absolute top-3 left-3 badge-green text-xs flex items-center gap-1">
          <MdVerified size={11} /> Verified
        </span>
        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur rounded-lg px-2.5 py-1 text-xs font-bold text-navy-500 shadow">
          AED {helper.price.toLocaleString()}/mo
        </span>
      </div>
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-navy-500 text-base">{helper.name}</h3>
            <p className="text-sm text-neutral-400 mt-0.5">{helper.category} · {helper.nationality}</p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1">
              <MdStar className="text-primary-500" size={14} />
              <span className="text-sm font-semibold text-navy-500">{helper.rating}</span>
            </div>
            <span className="text-xs text-neutral-400">{helper.reviews} reviews</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">{helper.exp} exp</span>
          <Link to={`/helper/${helper.id}`} className="btn-primary btn-sm">View Profile</Link>
        </div>
      </div>
    </div>
  )
}

/* ── Hero stats with counter ── */
function StatCounter({ num, label, trigger }) {
  const isNum = /^\d+/.test(num)
  const raw   = isNum ? parseInt(num.replace(/\D/g, ''), 10) : 0
  const count = useCounter(raw, 1600, trigger)
  const suffix = num.replace(/[\d,]+/, '')

  return (
    <div>
      <div
        className="text-primary-500"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '30px', fontWeight: 700, letterSpacing: '0.04em' }}
      >
        {isNum ? count.toLocaleString() + suffix : num}
      </div>
      <div
        className="text-white/40 uppercase mt-0.5"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '10px', letterSpacing: '0.18em' }}
      >
        {label}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function HomePage() {
  const typedWord  = useTypewriter(TYPING_WORDS)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef   = useRef(null)

  /* hero text entrance state */
  const [heroIn, setHeroIn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 60); return () => clearTimeout(t) }, [])

  /* scroll reveal for all .reveal elements */
  useReveal()

  /* watch hero stats row for counter trigger */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="overflow-x-hidden">

      {/* ── global animation styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');

        /* cursor blink */
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* hero photo */
        .hero-photo { display:block; transition:filter .45s ease,transform .5s ease; filter:none; transform:translateZ(0) scale(1.001); transform-origin:center center; will-change:transform,filter; backface-visibility:hidden; }
        .group:hover .hero-photo { filter:brightness(.48) contrast(1.2) saturate(1.1); transform:translateZ(0) scale(1.06); }

        /* scroll reveal */
        .reveal          { opacity:0; }
        .reveal.is-visible{ animation-fill-mode:both; animation-duration:.72s; animation-timing-function:cubic-bezier(.16,1,.3,1); }
        .reveal-up.is-visible    { animation-name:_revealUp;    }
        .reveal-left.is-visible  { animation-name:_revealLeft;  }
        .reveal-right.is-visible { animation-name:_revealRight; }
        .reveal-scale.is-visible { animation-name:_revealScale; }
        @keyframes _revealUp    { from{opacity:0;transform:translateY(44px)}  to{opacity:1;transform:none} }
        @keyframes _revealLeft  { from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:none} }
        @keyframes _revealRight { from{opacity:0;transform:translateX(50px)}  to{opacity:1;transform:none} }
        @keyframes _revealScale { from{opacity:0;transform:scale(.84)}        to{opacity:1;transform:none} }

        /* hero text entrance */
        .hero-line { opacity:0; transform:translateX(-48px); }
        .hero-line.in { animation:_heroSlide .75s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes _heroSlide { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:none} }

        /* step card hover bar */
        .step-card { transition:transform .3s,box-shadow .3s; }
        .step-card:hover { transform:translateY(-6px); }

        /* category card */
        .cat-card { transition:border-color .25s,box-shadow .25s,transform .3s; }
        .cat-card:hover { transform:translateY(-4px); }
        .cat-icon-wrap { transition:background .25s,transform .3s; }
        .cat-card:hover .cat-icon-wrap { transform:scale(1.14) rotate(-4deg); }

        /* animated bubbles */
        @keyframes _bubbleFloat {
          0%   { transform:translateY(0px) scale(1);   opacity:.18; }
          33%  { transform:translateY(-28px) scale(1.06); opacity:.28; }
          66%  { transform:translateY(-14px) scale(.96); opacity:.22; }
          100% { transform:translateY(0px) scale(1);   opacity:.18; }
        }
        @keyframes _bubbleFloat2 {
          0%   { transform:translateY(0px) translateX(0px) scale(1);    opacity:.12; }
          40%  { transform:translateY(-36px) translateX(10px) scale(1.1); opacity:.24; }
          70%  { transform:translateY(-18px) translateX(-6px) scale(.94); opacity:.16; }
          100% { transform:translateY(0px) translateX(0px) scale(1);    opacity:.12; }
        }
        @keyframes _bubblePulse {
          0%,100% { transform:scale(1);   opacity:.10; }
          50%      { transform:scale(1.15); opacity:.20; }
        }
        .bubble { position:absolute; border-radius:50%; pointer-events:none; }
      `}</style>


      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex overflow-hidden" style={{ background: 'linear-gradient(135deg,#0e1b2c 0%,#14253d 60%,#1e3a5f 100%)' }}>

        {/* gold grid texture */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(#fd7702 1px,transparent 1px),linear-gradient(90deg,#fd7702 1px,transparent 1px)', backgroundSize:'44px 44px' }} />

        {/* radial glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(circle at 20% 60%,rgba(245,147,0,.08) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(245,147,0,.06) 0%,transparent 40%)' }} />

        {/* ── LEFT PANEL ── */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] py-20 px-10 md:px-14 lg:px-20">

          {/* eyebrow */}
          <div className={`hero-line ${heroIn ? 'in' : ''} flex items-center gap-3 mb-8`} style={{ animationDelay:'0ms' }}>
            <div className="h-px w-8 bg-primary-500 flex-shrink-0" />
            <span className="text-primary-500 font-semibold uppercase tracking-[0.22em]"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'11px' }}>
              Dubai's Trusted Home Staffing Platform
            </span>
          </div>

          {/* headline */}
          <h1 className="text-white leading-[1.0] mb-8 select-none"
            style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(52px,6vw,80px)', fontWeight:700, letterSpacing:'0.015em' }}>
            <span className={`block hero-line ${heroIn?'in':''}`} style={{ animationDelay:'80ms' }}>FIND THE PERFECT</span>
            <span className={`block text-primary-500 hero-line ${heroIn?'in':''}`} style={{ animationDelay:'180ms', minHeight:'1.05em' }}>
              {typedWord}
              <span style={{ display:'inline-block', width:'3px', height:'0.75em', background:'#fd7702', marginLeft:'4px', verticalAlign:'middle', animation:'cursorBlink 1s step-end infinite' }} />
            </span>
            <span className={`block hero-line ${heroIn?'in':''}`} style={{ animationDelay:'280ms' }}>FOR YOUR HOME</span>
          </h1>

          {/* sub copy */}
          <p className={`hero-line ${heroIn?'in':''} text-neutral-300 leading-relaxed mb-10 max-w-md`}
            style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'19px', fontWeight:400, letterSpacing:'0.02em', animationDelay:'360ms' }}>
            Connect with verified housemaids, nannies, drivers, caregivers and chefs —
            all MoHRE &amp; Tadbeer compliant, placed within 72 hours.
          </p>

          {/* CTAs */}
          <div className={`hero-line ${heroIn?'in':''} flex flex-wrap items-center gap-4 mb-10`} style={{ animationDelay:'440ms' }}>
            <Link to="/search"
              className="inline-flex items-center gap-2 bg-primary-500 text-white hover:bg-primary-600 active:scale-95 transition-all duration-200"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'15px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', padding:'14px 32px', borderRadius:'4px' }}>
              <MdSearch size={18} /> Find a Helper
            </Link>
            <Link to="/how-it-works"
              className="inline-flex items-center gap-2 border border-white/35 text-white hover:border-white hover:bg-white/5 active:scale-95 transition-all duration-200"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'15px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', padding:'14px 32px', borderRadius:'4px' }}>
              How It Works <MdArrowForward size={18} />
            </Link>
          </div>

          {/* tagline */}
          <div className={`hero-line ${heroIn?'in':''} border-t border-white/10 pt-5 mb-8`} style={{ animationDelay:'500ms' }}>
            <p className="text-white/30 uppercase tracking-[0.2em]"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'11px' }}>
              Verified Helpers &nbsp;·&nbsp; Visa Assistance &nbsp;·&nbsp; 72hr Placement &nbsp;·&nbsp; MoHRE Licensed
            </p>
          </div>

          {/* animated stats */}
          <div ref={statsRef} className={`hero-line ${heroIn?'in':''} flex flex-wrap gap-14`} style={{ animationDelay:'580ms' }}>
            {[{ num:'2400+', label:'Verified Helpers' },{ num:'850+', label:'Families Served' },{ num:'4.9★', label:'Average Rating' }].map(({ num, label }) => (
              <StatCounter key={label} num={num} label={label} trigger={statsVisible} />
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — photo grid ── */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]">
          <div className="absolute left-0 top-[8%] bottom-[8%] w-px bg-primary-500/25 z-10" />
          <div className="grid grid-cols-3 grid-rows-2 h-full">
            {HERO_GRID.map(({ role, img }) => (
              <div key={role} className="relative overflow-hidden group cursor-pointer [contain:paint]">
                <img src={img} alt={role} className="hero-photo w-full h-full object-cover object-top" />
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{ background:'linear-gradient(to top,rgba(0,15,35,.65) 0%,transparent 40%)' }} />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-500 z-20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 p-3 z-20">
                  <span className="text-white font-semibold uppercase tracking-[0.2em]"
                    style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'10px' }}>{role}</span>
                </div>
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex items-center gap-1 bg-primary-500 px-2 py-1">
                    <MdVerified size={10} color="white" />
                    <span className="text-white font-bold tracking-wider"
                      style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'9px' }}>VERIFIED</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-10"
            style={{ background:'linear-gradient(135deg,transparent 50%,rgba(253,119,2,.18) 50%)' }} />
        </div>
      </section>


      {/* ══════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="section-sm" style={{ background:'linear-gradient(135deg,#fdfaf5 0%,#faf3e7 100%)' }}>
        <div className="container-app">

          <div className="text-center mb-12">
            <div className="reveal reveal-up inline-flex items-center gap-2 badge-gold mb-4">Browse by Category</div>
            <h2 className="reveal reveal-up font-condensed text-3xl md:text-4xl font-bold text-navy-500 mb-3" style={{ animationDelay:'60ms' }}>
              Every Home, Every Need
            </h2>
            <p className="reveal reveal-up text-neutral-500 max-w-md mx-auto" style={{ animationDelay:'120ms' }}>
              Find the right professional for every household task
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {HELPER_CATEGORIES.map((cat, i) => (
              <Link key={cat.id} to={`/search?category=${cat.id}`}
                className="reveal reveal-up cat-card group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-transparent hover:border-primary-300 hover:shadow-gold text-center relative overflow-hidden"
                style={{ animationDelay:`${i * 70}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
                <div className="cat-icon-wrap w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-primary-500 relative z-10">
                  {ICONS[cat.icon]}
                </div>
                <span className="text-xs font-semibold text-navy-500 group-hover:text-primary-600 transition-colors uppercase tracking-wider relative z-10"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
                  {cat.label}
                </span>
                <div className="absolute top-2.5 right-2.5 bg-primary-500 text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200 z-10"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'8px', fontWeight:700, letterSpacing:'0.1em', padding:'2px 7px', borderRadius:'20px', textTransform:'uppercase' }}>
                  Hire
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          HOW IT WORKS  (redesigned)
      ══════════════════════════════════════════ */}
      <section className="section bg-white overflow-hidden">
        <div className="container-app">

          <div className="text-center mb-16">
            <span className="reveal reveal-scale inline-flex badge-gold mb-4">Simple Process</span>
            <h2 className="reveal reveal-up font-condensed text-3xl md:text-4xl font-bold text-navy-500 mb-3" style={{ animationDelay:'60ms' }}>
              How It Works
            </h2>
            <p className="reveal reveal-up text-neutral-500 max-w-sm mx-auto" style={{ animationDelay:'120ms' }}>
              Hire a verified, MoHRE-compliant helper in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.6%+40px)] right-[calc(16.6%+40px)] h-px bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300 z-0" />

            {STEPS.map((step, i) => (
              <div key={i}
                className="reveal reveal-up step-card relative flex flex-col items-center text-center bg-white rounded-3xl border border-neutral-100 shadow-card p-8 hover:shadow-card-hover group"
                style={{ animationDelay:`${i * 120}ms` }}>

                {/* top glow line */}
                <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-full bg-gradient-to-r ${step.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                {/* step number */}
                <div className="absolute -top-3.5 right-6">
                  <span className="font-condensed font-bold text-xs tracking-widest text-neutral-300"
                    style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'11px', letterSpacing:'0.2em' }}>
                    STEP {step.num}
                  </span>
                </div>

                {/* icon circle */}
                <div className={`relative w-[88px] h-[88px] rounded-2xl flex items-center justify-center text-white mb-6 shadow-gold bg-gradient-to-br ${step.color} z-10`}>
                  {step.icon}
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-white border-2 border-primary-500 text-primary-600 text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-condensed font-bold text-navy-500 text-xl mb-3 tracking-wide">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>

                {/* checkmarks */}
                <div className="mt-5 space-y-1.5 text-left w-full">
                  {[
                    i === 0 ? ['Smart search filters', 'Live availability'] :
                    i === 1 ? ['Document verified', 'Police clearance checked'] :
                              ['E-sign contracts', 'Real-time chat + visa tracker']
                  ][0].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-500">
                      <MdCheckCircle size={14} className="text-accent-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works" className="reveal reveal-up btn-outline inline-flex items-center gap-2" style={{ animationDelay:'360ms' }}>
              Learn More <MdArrowForward size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FEATURED HELPERS
      ══════════════════════════════════════════ */}
      <section className="section bg-neutral-50">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="reveal reveal-left inline-flex badge-gold mb-2">Hand-Picked</span>
              <h2 className="reveal reveal-left font-condensed text-3xl md:text-4xl font-bold text-navy-500 mb-2" style={{ animationDelay:'60ms' }}>
                Featured Helpers
              </h2>
              <p className="reveal reveal-left text-neutral-500" style={{ animationDelay:'120ms' }}>
                Top-rated, verified professionals available now
              </p>
            </div>
            <Link to="/search" className="reveal reveal-right btn-outline inline-flex items-center gap-2">
              View All <MdArrowForward size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((h, i) => (
              <HelperCard key={h.id} helper={h} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          TRUST / COMPLIANCE  (redesigned)
      ══════════════════════════════════════════ */}
      <section className="section relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0e1b2c 0%,#14253d 60%,#1e3a5f 100%)' }}>

        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(#fd7702 1px,transparent 1px),linear-gradient(90deg,#fd7702 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(circle at 50% 50%,rgba(245,147,0,.06) 0%,transparent 65%)' }} />

        {/* animated gold bubbles */}
        <div className="bubble" style={{ width:340,height:340,top:'-80px',left:'-90px',background:'radial-gradient(circle,rgba(245,147,0,.22) 0%,transparent 70%)',animation:'_bubbleFloat 7s ease-in-out infinite' }} />
        <div className="bubble" style={{ width:220,height:220,bottom:'-60px',right:'8%',background:'radial-gradient(circle,rgba(245,147,0,.18) 0%,transparent 70%)',animation:'_bubbleFloat2 9s ease-in-out infinite 1.5s' }} />
        <div className="bubble" style={{ width:160,height:160,top:'30%',right:'-40px',background:'radial-gradient(circle,rgba(253,119,2,.20) 0%,transparent 70%)',animation:'_bubblePulse 6s ease-in-out infinite 0.8s' }} />
        <div className="bubble" style={{ width:90,height:90,bottom:'20%',left:'12%',background:'radial-gradient(circle,rgba(245,147,0,.25) 0%,transparent 70%)',animation:'_bubbleFloat 5s ease-in-out infinite 2s' }} />
        <div className="bubble" style={{ width:60,height:60,top:'18%',left:'38%',background:'radial-gradient(circle,rgba(253,119,2,.30) 0%,transparent 70%)',animation:'_bubblePulse 4.5s ease-in-out infinite 1s' }} />

        <div className="container-app relative z-10">

          <div className="text-center mb-14">
            <span className="reveal reveal-scale inline-flex badge-gold mb-4">Platform Guarantee</span>
            <h2 className="reveal reveal-up font-condensed text-3xl md:text-4xl font-bold text-white mb-3" style={{ animationDelay:'60ms' }}>
              Built on Trust &amp; Compliance
            </h2>
            <p className="reveal reveal-up text-neutral-400 max-w-md mx-auto" style={{ animationDelay:'120ms' }}>
              Every helper on our platform is rigorously vetted to UAE government standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.title}
                className="reveal reveal-up group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:border-primary-500/40 hover:bg-white/8 transition-all duration-300"
                style={{ animationDelay:`${i * 120}ms` }}>

                {/* top accent bar */}
                <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="w-14 h-14 rounded-2xl bg-primary-500/15 flex items-center justify-center text-primary-400 mb-5 group-hover:bg-primary-500/25 transition-colors duration-300">
                  {item.icon}
                </div>

                {/* big stat */}
                <div className="font-condensed font-bold text-primary-500 mb-1"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'36px', letterSpacing:'0.02em' }}>
                  {item.stat}
                </div>
                <div className="text-white/40 uppercase text-[10px] tracking-widest mb-4"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
                  {item.statLabel}
                </div>

                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          TESTIMONIALS  (redesigned)
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background:'linear-gradient(135deg,#fdfaf5 0%,#faf3e7 100%)' }}>
        <div className="container-app">

          <div className="text-center mb-14">
            <span className="reveal reveal-scale inline-flex badge-gold mb-4">Real Families</span>
            <h2 className="reveal reveal-up font-condensed text-3xl md:text-4xl font-bold text-navy-500 mb-3" style={{ animationDelay:'60ms' }}>
              What Our Families Say
            </h2>
            <p className="reveal reveal-up text-neutral-500" style={{ animationDelay:'120ms' }}>
              Trusted by hundreds of households across Dubai
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, rating, img }, i) => (
              <div key={name}
                className="reveal reveal-up group card flex flex-col gap-4 p-7 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay:`${i * 100}ms` }}>

                {/* subtle gold wash on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl" />

                {/* quote icon */}
                <MdFormatQuote size={36} className="text-primary-200 -mb-2 flex-shrink-0" />

                <Stars count={rating} size={15} />

                <p className="text-neutral-600 text-sm leading-relaxed flex-1 relative z-10">
                  "{text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 mt-auto relative z-10">
                  {img ? (
                    <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm flex-shrink-0">
                      {name[0]}
                    </div>
                  )}
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


      {/* ══════════════════════════════════════════
          CTA  (redesigned)
      ══════════════════════════════════════════ */}
      <section className="section relative overflow-hidden bg-primary-500">

        {/* subtle dark overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,.18)_0%,transparent_60%)] pointer-events-none" />
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

        {/* animated white bubbles */}
        <div className="bubble" style={{ width:420,height:420,top:'-120px',right:'-100px',background:'radial-gradient(circle,rgba(255,255,255,.16) 0%,transparent 65%)',animation:'_bubbleFloat 8s ease-in-out infinite' }} />
        <div className="bubble" style={{ width:260,height:260,bottom:'-70px',left:'-60px',background:'radial-gradient(circle,rgba(255,255,255,.14) 0%,transparent 65%)',animation:'_bubbleFloat2 10s ease-in-out infinite 2s' }} />
        <div className="bubble" style={{ width:180,height:180,top:'15%',left:'20%',background:'radial-gradient(circle,rgba(255,255,255,.10) 0%,transparent 65%)',animation:'_bubblePulse 7s ease-in-out infinite 0.5s' }} />
        <div className="bubble" style={{ width:100,height:100,bottom:'22%',right:'18%',background:'radial-gradient(circle,rgba(255,255,255,.18) 0%,transparent 65%)',animation:'_bubbleFloat 5.5s ease-in-out infinite 1.2s' }} />
        <div className="bubble" style={{ width:60,height:60,top:'42%',right:'6%',background:'radial-gradient(circle,rgba(255,255,255,.22) 0%,transparent 65%)',animation:'_bubblePulse 4s ease-in-out infinite 0.3s' }} />
        <div className="bubble" style={{ width:50,height:50,top:'28%',left:'6%',background:'radial-gradient(circle,rgba(255,255,255,.20) 0%,transparent 65%)',animation:'_bubbleFloat2 6s ease-in-out infinite 3s' }} />

        <div className="container-app relative z-10 text-center">

          <span className="reveal reveal-scale inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            ✦ Join 850+ Dubai Families
          </span>

          <h2 className="reveal reveal-up font-condensed text-4xl md:text-5xl font-bold text-white leading-tight mb-5" style={{ animationDelay:'80ms' }}>
            Ready to Find Your<br />Perfect Helper?
          </h2>

          <p className="reveal reveal-up text-white/85 text-lg mb-10 max-w-xl mx-auto" style={{ animationDelay:'160ms' }}>
            Verified profiles, guided visa assistance, and secure contracts —
            get started in minutes, hire within 72 hours.
          </p>

          <div className="reveal reveal-up flex flex-wrap justify-center gap-4" style={{ animationDelay:'240ms' }}>
            <Link to="/search"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold hover:bg-primary-50 active:scale-95 transition-all duration-200 shadow-lg"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'16px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', padding:'16px 40px', borderRadius:'4px' }}>
              <MdSearch size={18} /> Browse Helpers
            </Link>
            <Link to="/register"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold hover:bg-white/15 active:scale-95 transition-all duration-200"
              style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'16px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', padding:'16px 40px', borderRadius:'4px' }}>
              Register Free <MdArrowForward size={18} />
            </Link>
          </div>

          {/* trust micro-copy */}
          <p className="reveal reveal-up text-white/50 text-xs mt-8 tracking-widest uppercase" style={{ animationDelay:'320ms' }}>
            No agency fees &nbsp;·&nbsp; Free to browse &nbsp;·&nbsp; Cancel anytime
          </p>
        </div>
      </section>

    </div>
  )
}
