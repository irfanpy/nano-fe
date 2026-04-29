import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { APP_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '@constants'

const LINKS = {
  Platform: [
    { to: '/search',       label: 'Find Helpers' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/pricing',      label: 'Pricing' },
    { to: '/about',        label: 'About' },
  ],
  'For Helpers': [
    { to: '/register',     label: 'Join as Helper' },
    { to: '/how-it-works', label: 'Helper Guide' },
  ],
  Legal: [
    { to: '/privacy',  label: 'Privacy Policy' },
    { to: '/terms',    label: 'Terms' },
    { to: '/contact',  label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">

      <div className="container-app pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-neutral-800">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs font-condensed">TH</span>
              </div>
              <span className="font-semibold text-white text-sm">
                Trusted<span className="text-primary-400">Home</span> Helpers
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500 mb-5 max-w-xs">
              Dubai's trusted domestic staffing marketplace. Verified helpers, full UAE legal compliance, and visa support.
            </p>
            <div className="text-sm space-y-1.5 mb-5">
              <p>{CONTACT_PHONE}</p>
              <p>{CONTACT_EMAIL}</p>
              <p>Dubai, United Arab Emirates</p>
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: <FaWhatsapp size={15} />, href: '#', label: 'WhatsApp' },
                { icon: <FaInstagram size={15} />, href: '#', label: 'Instagram' },
                { icon: <FaLinkedin size={15} />, href: '#', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-3">{heading}</h4>
              <ul className="space-y-2">
                {items.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-neutral-500 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="flex flex-wrap gap-2 py-5 border-b border-neutral-800">
          {['MoHRE Compliant', 'Tadbeer Approved', 'UAE Licensed'].map((badge) => (
            <span key={badge}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-xs text-neutral-400 border border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              {badge}
            </span>
          ))}
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p>Registered in Dubai, UAE</p>
        </div>
      </div>
    </footer>
  )
}
