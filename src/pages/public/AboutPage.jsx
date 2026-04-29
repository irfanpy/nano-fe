import { Link } from 'react-router-dom'
import { MdShield, MdVerified, MdThumbUp, MdPeople, MdArrowForward, MdLocationOn } from 'react-icons/md'

const STATS = [
  { num: '2,400+', label: 'Verified Helpers' },
  { num: '850+',   label: 'Families Served' },
  { num: '4.9★',   label: 'Average Rating' },
  { num: '72hrs',  label: 'Avg. Placement Time' },
]

const VALUES = [
  { icon: MdShield,   title: 'Trust & Safety',         desc: 'Every helper is background-checked, reference-verified, and document-authenticated before being listed on our platform. Families hire with complete peace of mind.' },
  { icon: MdVerified, title: 'Legal Compliance',       desc: 'We operate in full compliance with UAE Ministry of Human Resources & Emiratisation (MoHRE) regulations and Tadbeer domestic worker center standards.' },
  { icon: MdThumbUp,  title: 'Transparent Pricing',    desc: 'No hidden agency fees. No commissions taken from helpers. Families pay a transparent subscription, and helpers receive 100% of their agreed salary.' },
]

const TEAM = [
  { name: 'Khalid Al-Rashidi',  role: 'Founder & CEO',            bio: '15 years in UAE HR & labour compliance. Former MoHRE advisor.',         initials: 'KR' },
  { name: 'Amira Siddiqui',     role: 'Chief Operations Officer',  bio: 'Expert in domestic worker welfare and UAE family staffing logistics.',   initials: 'AS' },
  { name: 'Thomas Whitfield',   role: 'Head of Compliance',        desc: 'Certified UAE legal advisor specialising in domestic labour law.',       initials: 'TW', bio: 'Certified UAE legal advisor specialising in domestic labour law.' },
  { name: 'Fatima Al-Nuaimi',   role: 'Head of Client Relations',  bio: 'Dedicated to ensuring every family finds the perfect match efficiently.',initials: 'FN' },
]

const TIMELINE = [
  { year: '2020', title: 'Platform Founded',     desc: 'Trusted Home Helpers launched in Dubai with a mission to modernise domestic staffing.' },
  { year: '2021', title: '500 Helpers Onboarded', desc: 'Reached 500 verified helpers and served our first 100 families across Dubai.' },
  { year: '2022', title: 'MoHRE Partnership',    desc: 'Officially recognised by MoHRE as a compliant digital domestic staffing platform.' },
  { year: '2023', title: 'Tadbeer Approval',     desc: 'Became a Tadbeer-approved partner, simplifying visa processing for helpers and families.' },
  { year: '2024', title: '2,400+ Helpers',       desc: 'Scaled to over 2,400 verified helpers and 850+ families across the UAE.' },
]

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative bg-navy-500 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#f59300 1px,transparent 1px),linear-gradient(90deg,#f59300 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="container-app relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="badge-gold mb-5 inline-block">Our Story</span>
              <h1 className="font-condensed font-bold text-white text-5xl md:text-6xl leading-tight mb-6 tracking-wide">
                ABOUT <span className="text-primary-500">TRUSTED HOME</span> HELPERS
              </h1>
              <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-lg">
                We are Dubai's most trusted domestic staffing marketplace — connecting families with verified, MoHRE-compliant housemaids, nannies, caregivers, drivers and chefs since 2020.
              </p>
              <p className="text-neutral-400 leading-relaxed max-w-lg">
                Our platform was built by expat families and UAE compliance experts who experienced firsthand how broken and expensive traditional domestic staffing agencies were. We built the transparent, digital alternative.
              </p>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up">
              {STATS.map(({ num, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="font-condensed font-bold text-primary-400 text-4xl mb-1">{num}</div>
                  <div className="text-neutral-400 text-sm uppercase tracking-wider font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="section bg-warm-gradient">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">Our Mission</span>
            <h2 className="page-title mt-2">What We Stand For</h2>
            <p className="page-subtitle max-w-2xl mx-auto">We believe every Dubai family deserves safe, affordable, and dignified domestic help — and every helper deserves fair treatment and legal protection.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-body flex flex-col gap-4 group hover:-translate-y-1 hover:shadow-gold transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center text-primary-500 group-hover:text-white transition-all duration-300">
                  <Icon size={26} />
                </div>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">Leadership</span>
            <h2 className="page-title mt-2">Meet Our Team</h2>
            <p className="page-subtitle">UAE compliance experts and domestic staffing specialists working for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, bio, initials }) => (
              <div key={name} className="card card-body flex flex-col items-center text-center gap-3 group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-2xl font-condensed">
                  {initials}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-500">{name}</h3>
                  <p className="text-xs text-primary-500 font-medium mt-0.5">{role}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section bg-navy-500">
        <div className="container-app">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">Compliance</span>
            <h2 className="font-condensed font-bold text-white text-4xl tracking-wide mt-2">Fully Licensed & Compliant</h2>
            <p className="text-neutral-400 mt-3">Every placement is legally protected under UAE domestic labour regulations.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: 'MoHRE Compliant', desc: 'All domestic worker placements follow Ministry of Human Resources & Emiratisation standards, ensuring full legal compliance for families and helpers.' },
              { badge: 'Tadbeer Approved', desc: 'Licensed domestic worker centre partnership for seamless visa processing, medical checks, and MoHRE registration — all within the platform.' },
              { badge: 'UAE Licensed',     desc: 'Registered business operating under a UAE commercial licence with full transparency on all fees, contracts and worker rights.' },
            ].map(({ badge, desc }) => (
              <div key={badge} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-bold mb-4 border border-primary-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  {badge}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-warm-gradient">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">Our Journey</span>
            <h2 className="page-title mt-2">How We Grew</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-200 hidden sm:block" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-condensed font-bold text-xs shadow-gold z-10">
                    {year.slice(2)}
                  </div>
                  <div className="card card-body flex-1 group-hover:shadow-gold transition-shadow duration-300">
                    <span className="text-xs text-primary-500 font-bold uppercase tracking-wider">{year}</span>
                    <h3 className="font-condensed font-bold text-navy-500 text-lg mt-1">{title}</h3>
                    <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gold-gradient text-white">
        <div className="container-app flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-2">Join Our Growing Community</h2>
            <p className="text-white/80">850+ families and 2,400+ helpers trust Trusted Home Helpers.</p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <Link to="/search"   className="btn btn-xl bg-white text-primary-600 hover:bg-primary-50">Find a Helper</Link>
            <Link to="/register" className="btn btn-xl border-2 border-white text-white hover:bg-white/10">Join Now <MdArrowForward size={20} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
