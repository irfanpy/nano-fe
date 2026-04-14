import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { APP_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '@constants'

const LINKS = {
  Platform: [
    { to: '/search',       label: 'Find Helpers' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/pricing',      label: 'Pricing Plans' },
    { to: '/about',        label: 'About Us' },
  ],
  'For Helpers': [
    { to: '/register',     label: 'Join as Helper' },
    { to: '/how-it-works', label: 'Helper Guide' },
  ],
  Legal: [
    { to: '/privacy',  label: 'Privacy Policy' },
    { to: '/terms',    label: 'Terms of Service' },
    { to: '/contact',  label: 'Contact Us' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-500 text-neutral-300">
      <div className="container-app pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-600">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">TH</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Trusted<span className="text-primary-400">Home</span> Helpers
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6 max-w-xs">
              Dubai's trusted domestic staffing marketplace. Verified helpers, full legal compliance, and end-to-end visa support.
            </p>

            {/* Contact */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MdPhone className="text-primary-400 flex-shrink-0" />
                <span>{CONTACT_PHONE}</span>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-primary-400 flex-shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </li>
              <li className="flex items-start gap-2">
                <MdLocationOn className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Dubai, United Arab Emirates</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: <FaWhatsapp size={18} />, href: '#', label: 'WhatsApp' },
                { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
                { icon: <FaFacebook size={18} />, href: '#', label: 'Facebook' },
                { icon: <FaLinkedin size={18} />, href: '#', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-navy-600 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center gap-3 py-6 border-b border-navy-600">
          {['MoHRE Compliant', 'Tadbeer Approved', 'UAE Licensed'].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-600 text-xs text-primary-400 font-medium border border-primary-500/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p>Registered in Dubai, UAE · TRN: 100XXXXXXXXX</p>
        </div>
      </div>
    </footer>
  )
}
