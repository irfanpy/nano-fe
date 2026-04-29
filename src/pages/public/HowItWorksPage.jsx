import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MdPersonAdd, MdSearch, MdFavorite, MdSend, MdAssignment,
  MdWork, MdCloudUpload, MdVerified, MdBookOnline, MdAttachMoney,
  MdArrowForward, MdExpandMore, MdExpandLess, MdCheckCircle,
} from 'react-icons/md'

const FAMILY_STEPS = [
  { icon: MdPersonAdd, title: 'Register & Create Profile',     desc: 'Create your family account in minutes. Tell us about your household, preferences, and what kind of help you need.' },
  { icon: MdSearch,    title: 'Browse & Filter Helpers',       desc: 'Search our verified database by category, nationality, experience, price, and availability. Use smart filters to narrow down.' },
  { icon: MdFavorite,  title: 'Shortlist Your Favourites',     desc: 'Save helpers you like to your shortlist. Compare profiles side by side, read reviews, and check availability.' },
  { icon: MdSend,      title: 'Send a Booking Request',        desc: 'Chat with helpers directly, ask questions, and send a formal booking request with your desired start date and terms.' },
  { icon: MdAssignment,title: 'Sign Contract & Pay Securely',  desc: 'Review the digital employment contract, e-sign it, and make a secure escrow payment. Funds only release when you confirm satisfaction.' },
  { icon: MdWork,      title: 'Helper Arrives & Visa Process', desc: 'Your helper arrives and begins work. We guide you through the entire UAE visa and MoHRE registration process — step by step.' },
]

const HELPER_STEPS = [
  { icon: MdPersonAdd,   title: 'Register & Upload Documents',  desc: 'Create your helper profile and upload your passport, certifications, and work references securely through our platform.' },
  { icon: MdWork,        title: 'Complete Your Profile',        desc: 'Add your skills, experience, availability, language abilities, and expected salary to attract the right families.' },
  { icon: MdVerified,    title: 'Get Verified by Our Team',     desc: 'Our compliance team reviews your documents for MoHRE and Tadbeer approval. This usually takes 2–3 business days.' },
  { icon: MdBookOnline,  title: 'Receive Booking Requests',     desc: 'Families browse your profile and send booking requests. Review details, accept or negotiate terms, and communicate freely.' },
  { icon: MdCloudUpload, title: 'Sign Contract',                desc: 'Review the employment contract, confirm terms, and e-sign digitally. Your rights and payment terms are fully protected.' },
  { icon: MdAttachMoney, title: 'Start Work & Get Paid',        desc: 'Begin your placement with the family. Receive monthly payments to your bank account on time, every time — tracked on our platform.' },
]

const FAQS = [
  { q: 'How long does it take to find a helper?', a: 'Most families find and confirm a helper within 72 hours. The visa process typically takes 3–6 weeks depending on the helper\'s nationality and document readiness.' },
  { q: 'Are all helpers verified and background checked?', a: 'Yes. Every helper on our platform goes through a thorough verification process including document authentication, background checks, and reference validation before being listed.' },
  { q: 'What is the cost to use the platform?', a: 'Families pay a small platform subscription fee (starting AED 99/month). There are no hidden agency commissions. Helper salaries are set transparently and paid directly through our escrow system.' },
  { q: 'What happens if I\'m not satisfied with my helper?', a: 'We have a 14-day replacement guarantee. If you\'re not satisfied within the first 2 weeks, we\'ll help you find a replacement at no additional charge, subject to our fair terms.' },
  { q: 'Does the platform assist with UAE visa processing?', a: 'Yes. We guide you through the complete MoHRE domestic worker visa process, including application, medical checks, biometrics, and Emirates ID — all from within the platform.' },
]

function Step({ step, index, total }) {
  const Icon = step.icon
  return (
    <div className="flex gap-4 md:flex-col md:items-center md:text-center group animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex flex-col items-center md:hidden">
        <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-gold">
          {index + 1}
        </div>
        {index < total - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-400 to-primary-100 mt-2 min-h-[32px]" />}
      </div>
      <div className="flex-1 md:flex-none pb-8 md:pb-0">
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-primary-500/10 border-2 border-primary-200 group-hover:bg-primary-500 group-hover:border-primary-500 items-center justify-center mx-auto mb-4 transition-all duration-300 relative">
          <Icon size={26} className="text-primary-500 group-hover:text-white transition-colors duration-300" />
          <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold shadow-gold">
            {index + 1}
          </span>
        </div>
        <h3 className="font-condensed font-bold text-navy-500 text-lg md:text-xl mb-2 tracking-wide">{step.title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="card overflow-hidden transition-all duration-300">
      <button className="w-full flex items-center justify-between text-left p-5 gap-4" onClick={onToggle}>
        <span className="font-semibold text-navy-500 text-sm md:text-base">{faq.q}</span>
        {open ? <MdExpandLess size={22} className="text-primary-500 flex-shrink-0" /> : <MdExpandMore size={22} className="text-neutral-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 animate-slide-up">
          <p className="text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function HowItWorksPage() {
  const [tab, setTab] = useState('family')
  const [openFaq, setOpenFaq] = useState(null)

  const steps = tab === 'family' ? FAMILY_STEPS : HELPER_STEPS

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-navy-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#f59300 1px,transparent 1px),linear-gradient(90deg,#f59300 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-app relative z-10 text-center">
          <span className="badge-gold mb-4 inline-block">Platform Guide</span>
          <h1 className="font-condensed font-bold text-white text-5xl md:text-6xl mb-5 tracking-wide">
            HOW IT <span className="text-primary-500">WORKS</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-xl mx-auto leading-relaxed">
            From search to placement — a simple, transparent process built for Dubai families and trusted home helpers.
          </p>
        </div>
      </section>

      {/* Tab Toggle */}
      <section className="section bg-warm-gradient">
        <div className="container-app">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-2xl shadow-card p-1.5 gap-1">
              {[{ key: 'family', label: 'For Families' }, { key: 'helper', label: 'For Helpers' }].map(({ key, label }) => (
                <button key={key} onClick={() => setTab(key)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-condensed font-bold uppercase tracking-wider transition-all duration-250 ${tab === key ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-6 flex flex-col gap-0">
            {/* Desktop connector lines */}
            <style>{`
              @media (min-width: 768px) {
                .step-grid { position: relative; }
                .step-grid::before { content: ''; position: absolute; top: 32px; left: 12.5%; right: 12.5%; height: 2px; background: linear-gradient(90deg, #ffc44f, #f59300, #ffc44f); opacity: 0.4; pointer-events: none; z-index: 0; }
              }
            `}</style>
            <div className={`step-grid md:contents flex flex-col gap-8`} key={tab}>
              {steps.map((step, i) => (
                <Step key={i} step={step} index={i} total={steps.length} />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to={tab === 'family' ? '/search' : '/register'} className="btn-primary btn-lg gap-2 inline-flex">
              {tab === 'family' ? 'Find a Helper Now' : 'Register as Helper'}
              <MdArrowForward size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-sm bg-navy-500">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: MdVerified,    title: 'MoHRE Compliant',    desc: 'Full UAE labour law compliance for all domestic workers.' },
              { icon: MdCheckCircle, title: '72-Hour Placement',   desc: 'Most families confirm a helper within 72 hours of searching.' },
              { icon: MdAssignment,  title: 'Legal Contracts',     desc: 'Digital employment contracts compliant with UAE regulations.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <Icon size={24} />
                </div>
                <h3 className="font-condensed font-bold text-white text-lg tracking-wide">{title}</h3>
                <p className="text-neutral-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3">FAQ</span>
            <h2 className="page-title mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gold-gradient text-white">
        <div className="container-app text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Join thousands of families and helpers in Dubai's most trusted domestic staffing platform.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/search"   className="btn btn-xl bg-white text-primary-600 hover:bg-primary-50">Find a Helper</Link>
            <Link to="/register" className="btn btn-xl border-2 border-white text-white hover:bg-white/10">Join as Helper</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
