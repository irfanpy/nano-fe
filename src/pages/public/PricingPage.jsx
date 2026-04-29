import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdCheckCircle, MdClose, MdArrowForward, MdVerified, MdShield, MdStar } from 'react-icons/md'

const FEATURES = {
  basic: {
    label: 'Basic',
    monthly: 99,
    color: 'border-neutral-200',
    btnClass: 'btn-outline',
    items: [
      { text: 'Up to 5 helper profile views/mo', included: true },
      { text: 'Basic search filters', included: true },
      { text: 'Email support', included: true },
      { text: 'Standard listing position', included: true },
      { text: 'Advanced filters & sorting', included: false },
      { text: 'Priority customer support', included: false },
      { text: 'Contract templates', included: false },
      { text: 'Visa assistance guide', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'WhatsApp support 24/7', included: false },
    ],
  },
  standard: {
    label: 'Standard',
    monthly: 199,
    popular: true,
    color: 'border-primary-500',
    btnClass: 'btn-primary',
    items: [
      { text: 'Unlimited helper profile views', included: true },
      { text: 'Advanced filters & sorting', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'Featured listing position', included: true },
      { text: 'Contract templates', included: true },
      { text: 'Visa assistance guide', included: true },
      { text: 'Shortlist up to 20 helpers', included: true },
      { text: 'Dedicated account manager', included: false },
      { text: 'Legal compliance review', included: false },
      { text: 'WhatsApp support 24/7', included: false },
    ],
  },
  premium: {
    label: 'Premium',
    monthly: 349,
    color: 'border-navy-500',
    btnClass: 'btn-navy',
    items: [
      { text: 'Unlimited helper profile views', included: true },
      { text: 'Advanced filters & sorting', included: true },
      { text: 'Priority customer support', included: true },
      { text: 'Featured listing position', included: true },
      { text: 'Contract templates', included: true },
      { text: 'Visa assistance guide', included: true },
      { text: 'Unlimited shortlist', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Legal compliance review', included: true },
      { text: 'WhatsApp support 24/7', included: true },
    ],
  },
}

const TRUST = [
  { icon: MdShield,   title: 'No Hidden Fees',   desc: 'Transparent pricing. No agency commissions. No surprise charges.' },
  { icon: MdClose,    title: 'Cancel Anytime',    desc: 'No lock-in contracts. Cancel your subscription at any time.' },
  { icon: MdVerified, title: 'MoHRE Compliant',   desc: 'All platform processes follow UAE Ministry of Human Resources regulations.' },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const [tableOpen, setTableOpen] = useState(false)

  const price = (base) => yearly ? Math.round(base * 0.8) : base

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="section bg-warm-gradient text-center">
        <div className="container-app">
          <span className="badge-gold mb-4 inline-block">Pricing</span>
          <h1 className="page-title text-4xl md:text-5xl mb-4">Simple, Transparent Pricing</h1>
          <p className="page-subtitle max-w-lg mx-auto">No hidden fees. No agency commissions. Pay only for the plan that fits your household needs.</p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 mt-8 bg-white rounded-xl shadow-card px-4 py-2.5">
            <span className={`text-sm font-medium ${!yearly ? 'text-navy-500' : 'text-neutral-400'}`}>Monthly</span>
            <button
              onClick={() => setYearly((y) => !y)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${yearly ? 'bg-primary-500' : 'bg-neutral-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${yearly ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${yearly ? 'text-navy-500' : 'text-neutral-400'}`}>
              Yearly <span className="text-accent-600 font-bold text-xs">-20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="section-sm bg-warm-gradient pt-0">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {Object.entries(FEATURES).map(([key, plan]) => (
              <div key={key}
                className={`card border-2 ${plan.color} overflow-hidden transition-all duration-300 ${plan.popular ? 'md:-mt-4 md:shadow-gold ring-2 ring-primary-500/30' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-xs font-condensed font-bold tracking-[0.18em] uppercase">
                    Most Popular
                  </div>
                )}
                <div className="card-body">
                  <h3 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide mb-1">{plan.label}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-bold text-navy-500">AED {price(plan.monthly)}</span>
                    <span className="text-neutral-400 text-sm mb-1">/month</span>
                  </div>
                  {yearly && (
                    <p className="text-xs text-accent-600 font-semibold mb-4">
                      Billed as AED {price(plan.monthly) * 12}/year · Save AED {(plan.monthly - price(plan.monthly)) * 12}
                    </p>
                  )}
                  <Link to="/register" className={`${plan.btnClass} w-full justify-center mt-4 mb-6`}>
                    Get Started <MdArrowForward size={16} />
                  </Link>
                  <ul className="space-y-3">
                    {plan.items.map((item) => (
                      <li key={item.text} className={`flex items-start gap-2.5 text-sm ${item.included ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        {item.included
                          ? <MdCheckCircle size={17} className="text-accent-500 flex-shrink-0 mt-0.5" />
                          : <MdClose size={17} className="text-neutral-300 flex-shrink-0 mt-0.5" />
                        }
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Feature table toggle */}
          <div className="text-center mt-10">
            <button onClick={() => setTableOpen((o) => !o)}
              className="btn-ghost border border-neutral-200 text-sm gap-1">
              {tableOpen ? 'Hide' : 'Show'} Full Feature Comparison
            </button>
          </div>

          {tableOpen && (
            <div className="mt-6 card overflow-hidden animate-slide-up">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="text-left px-5 py-3 text-neutral-500 font-medium">Feature</th>
                      {Object.values(FEATURES).map((p) => (
                        <th key={p.label} className="text-center px-4 py-3 font-condensed font-bold text-navy-500 tracking-wide">
                          {p.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {FEATURES.basic.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50">
                        <td className="px-5 py-3 text-neutral-700">{item.text}</td>
                        {Object.values(FEATURES).map((p) => (
                          <td key={p.label} className="text-center px-4 py-3">
                            {p.items[idx].included
                              ? <MdCheckCircle size={18} className="text-accent-500 mx-auto" />
                              : <MdClose size={18} className="text-neutral-300 mx-auto" />
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-sm bg-navy-500">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="font-condensed font-bold text-white text-xl tracking-wide">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section bg-white">
        <div className="container-app max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => <MdStar key={i} className="text-primary-500" size={22} />)}
          </div>
          <p className="text-lg text-neutral-600 italic leading-relaxed mb-6">
            "The Standard plan gave us everything we needed. Found a wonderful nanny within 48 hours, contract signed digitally, visa process guided perfectly. No hidden costs at all."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">S</div>
            <div className="text-left">
              <p className="font-semibold text-navy-500 text-sm">Sarah Al-Mansouri</p>
              <p className="text-xs text-neutral-400">Family · Dubai Marina</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gold-gradient text-white">
        <div className="container-app text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Start Your Free Trial Today</h2>
          <p className="text-white/80 mb-8">No credit card required. Cancel anytime.</p>
          <Link to="/register" className="btn btn-xl bg-white text-primary-600 hover:bg-primary-50">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}
