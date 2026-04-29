import { useState } from 'react'
import { MdPhone, MdEmail, MdLocationOn, MdSend, MdCheckCircle } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@constants'

const CONTACT_CARDS = [
  {
    icon: MdPhone,    iconBg: 'bg-info-50',    iconColor: 'text-info-500',
    title: 'Call Us', value: CONTACT_PHONE, sub: 'Sun–Thu, 9am–6pm GST',
    action: { label: 'Call Now', href: `tel:${CONTACT_PHONE}` },
  },
  {
    icon: FaWhatsapp, iconBg: 'bg-accent-50',  iconColor: 'text-accent-600',
    title: 'WhatsApp', value: CONTACT_PHONE, sub: 'Quick replies within 30 min',
    action: { label: 'Chat on WhatsApp', href: '#' },
  },
  {
    icon: MdEmail,    iconBg: 'bg-primary-50', iconColor: 'text-primary-500',
    title: 'Email Us', value: CONTACT_EMAIL, sub: 'Response within 24 hours',
    action: { label: 'Send Email', href: `mailto:${CONTACT_EMAIL}` },
  },
]

const SUBJECTS = [
  'General Enquiry', 'I Want to Hire a Helper', 'Join as a Helper', 'Partnership / B2B', 'Technical Support', 'Billing & Payments', 'Complaint / Feedback',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })) }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required'
    if (!form.email.trim())   errs.email   = 'Email is required'
    if (!form.subject)        errs.subject = 'Please choose a subject'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="bg-navy-500 py-16">
        <div className="container-app text-center">
          <span className="badge-gold mb-4 inline-block">Get In Touch</span>
          <h1 className="font-condensed font-bold text-white text-5xl mb-4 tracking-wide">
            CONTACT <span className="text-primary-500">US</span>
          </h1>
          <p className="text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Have a question about hiring a helper, joining our platform, or our compliance process? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-sm bg-warm-gradient">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {CONTACT_CARDS.map(({ icon: Icon, iconBg, iconColor, title, value, sub, action }) => (
              <div key={title} className="card card-body flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-gold transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor}`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">{title}</h3>
                <p className="text-neutral-700 text-sm font-medium">{value}</p>
                <p className="text-neutral-400 text-xs">{sub}</p>
                <a href={action.href} className="btn-primary btn-sm mt-1">{action.label}</a>
              </div>
            ))}
          </div>

          {/* Main content: form + info */}
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: Office info + map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card card-body">
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide mb-4">Office Information</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <MdLocationOn size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy-500 text-sm">Address</p>
                      <p className="text-neutral-500 text-sm leading-relaxed">Office 412, Business Bay,<br />Dubai, UAE 00000</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MdPhone size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy-500 text-sm">Phone</p>
                      <p className="text-neutral-500 text-sm">{CONTACT_PHONE}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MdEmail size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy-500 text-sm">Email</p>
                      <p className="text-neutral-500 text-sm break-all">{CONTACT_EMAIL}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-5 pt-5 border-t border-neutral-100">
                  <p className="text-sm font-medium text-navy-500 mb-2">Business Hours</p>
                  <div className="space-y-1 text-sm text-neutral-500">
                    <div className="flex justify-between">
                      <span>Sunday – Thursday</span>
                      <span className="text-navy-500 font-medium">9:00am – 6:00pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday – Saturday</span>
                      <span className="text-danger-500 font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-navy-500 h-48 relative flex items-center justify-center group cursor-pointer hover:bg-navy-600 transition-colors duration-300">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'linear-gradient(#f59300 1px,transparent 1px),linear-gradient(90deg,#f59300 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="relative z-10 text-center">
                  <MdLocationOn size={32} className="text-primary-400 mx-auto mb-2" />
                  <p className="text-white font-condensed font-bold text-sm tracking-wide">Business Bay, Dubai</p>
                  <a href="#" className="inline-flex items-center gap-1 mt-3 text-xs text-primary-400 hover:text-primary-300 font-medium border border-primary-400/40 px-3 py-1.5 rounded-full">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div className="lg:col-span-3">
              <div className="card card-body">
                {sent ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4 animate-scale-in">
                    <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center">
                      <MdCheckCircle size={40} className="text-accent-500" />
                    </div>
                    <h3 className="font-condensed font-bold text-navy-500 text-2xl">Message Sent!</h3>
                    <p className="text-neutral-500 max-w-sm leading-relaxed">
                      Thanks for reaching out, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                      className="btn-outline mt-2">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide mb-1">Send Us a Message</h3>
                    <p className="text-neutral-500 text-sm mb-4">Fill in the form below and our team will respond within 24 hours.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input type="text" placeholder="Your full name" value={form.name} onChange={(e) => set('name', e.target.value)}
                          className={`input ${errors.name ? 'input-error' : ''}`} />
                        {errors.name && <p className="error-msg">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="label">Email Address *</label>
                        <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => set('email', e.target.value)}
                          className={`input ${errors.email ? 'input-error' : ''}`} />
                        {errors.email && <p className="error-msg">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Phone (optional)</label>
                        <input type="tel" placeholder="+971 50 000 0000" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                          className="input" />
                      </div>
                      <div>
                        <label className="label">Subject *</label>
                        <select value={form.subject} onChange={(e) => set('subject', e.target.value)}
                          className={`select ${errors.subject ? 'input-error' : ''}`}>
                          <option value="">Choose subject…</option>
                          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.subject && <p className="error-msg">{errors.subject}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="label">Message *</label>
                      <textarea rows={5} placeholder="How can we help you?" value={form.message} onChange={(e) => set('message', e.target.value)}
                        className={`input resize-none ${errors.message ? 'input-error' : ''}`} />
                      {errors.message && <p className="error-msg">{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={loading}
                      className="btn-primary w-full justify-center gap-2 py-3.5">
                      {loading ? (
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <><MdSend size={18} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
