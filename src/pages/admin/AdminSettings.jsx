import { useState } from 'react'
import { MdSave, MdCheckCircle, MdAttachMoney, MdNotifications, MdSecurity, MdLanguage } from 'react-icons/md'

const SECTIONS = ['Commission & Fees', 'Subscriptions', 'Notifications', 'Security', 'Platform']

function Section({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">{title}</h3>
      </div>
      <div className="card-body space-y-5">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {hint && <p className="text-xs text-neutral-400 mt-1">{hint}</p>}
    </div>
  )
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-navy-500">{label}</p>
        {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0
          ${checked ? 'bg-primary-500' : 'bg-neutral-200'}`}
        role="switch"
        aria-checked={checked}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
          ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

export default function AdminSettings() {
  const [saved, setSaved]   = useState(false)
  const [active, setActive] = useState('Commission & Fees')

  // Commission & Fees
  const [commission,    setCommission]    = useState('10')
  const [placementFee,  setPlacementFee]  = useState('500')
  const [visaFee,       setVisaFee]       = useState('250')

  // Subscriptions
  const [basicPrice,   setBasicPrice]    = useState('99')
  const [premiumPrice, setPremiumPrice]  = useState('199')
  const [trialDays,    setTrialDays]     = useState('14')

  // Notifications
  const [emailSignup,    setEmailSignup]    = useState(true)
  const [emailBooking,   setEmailBooking]   = useState(true)
  const [emailDispute,   setEmailDispute]   = useState(true)
  const [smsVerif,       setSmsVerif]       = useState(false)

  // Security
  const [twoFactor,      setTwoFactor]      = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('60')
  const [ipWhitelist,    setIpWhitelist]    = useState(false)

  // Platform
  const [platformName, setPlatformName] = useState('Trusted Home Helper')
  const [supportEmail, setSupportEmail] = useState('support@trustedhomehelper.com')
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">Settings</h2>
          <p className="text-neutral-500 mt-1">Manage platform configuration and preferences.</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          {saved ? <MdCheckCircle size={18} /> : <MdSave size={18} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-card p-1 w-fit overflow-x-auto scrollbar-hide">
        {SECTIONS.map((s) => (
          <button key={s} onClick={() => setActive(s)}
            className={`px-4 py-2 rounded-lg text-sm font-condensed font-bold tracking-wide whitespace-nowrap transition-all
              ${active === s ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-500 hover:text-navy-500'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Commission & Fees */}
      {active === 'Commission & Fees' && (
        <Section title={<span className="flex items-center gap-2"><MdAttachMoney className="text-primary-500" /> Commission &amp; Fees</span>}>
          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Platform Commission (%)" hint="Percentage taken from each salary payment.">
              <div className="relative">
                <input className="input pr-8" type="number" min="0" max="30" value={commission} onChange={(e) => setCommission(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">%</span>
              </div>
            </Field>
            <Field label="Placement Fee (AED)" hint="One-time fee charged on new placements.">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">AED</span>
                <input className="input pl-12" type="number" min="0" value={placementFee} onChange={(e) => setPlacementFee(e.target.value)} />
              </div>
            </Field>
            <Field label="Visa Processing Fee (AED)" hint="Admin charge for visa assistance.">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">AED</span>
                <input className="input pl-12" type="number" min="0" value={visaFee} onChange={(e) => setVisaFee(e.target.value)} />
              </div>
            </Field>
          </div>
        </Section>
      )}

      {/* Subscriptions */}
      {active === 'Subscriptions' && (
        <Section title="Subscription Plans">
          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Basic Plan Price (AED/mo)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">AED</span>
                <input className="input pl-12" type="number" min="0" value={basicPrice} onChange={(e) => setBasicPrice(e.target.value)} />
              </div>
            </Field>
            <Field label="Premium Plan Price (AED/mo)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">AED</span>
                <input className="input pl-12" type="number" min="0" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} />
              </div>
            </Field>
            <Field label="Free Trial Duration (days)">
              <input className="input" type="number" min="0" max="90" value={trialDays} onChange={(e) => setTrialDays(e.target.value)} />
            </Field>
          </div>
          <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 text-sm text-primary-700">
            Changing plan prices affects new subscriptions only. Existing subscribers keep their current rate until renewal.
          </div>
        </Section>
      )}

      {/* Notifications */}
      {active === 'Notifications' && (
        <Section title={<span className="flex items-center gap-2"><MdNotifications className="text-primary-500" /> Notifications</span>}>
          <div className="divide-y divide-neutral-50">
            <Toggle label="Email on new signup"         description="Send welcome email to new users."                 checked={emailSignup}  onChange={setEmailSignup} />
            <Toggle label="Email on new booking"        description="Notify admin when a booking is created."          checked={emailBooking} onChange={setEmailBooking} />
            <Toggle label="Email on new dispute"        description="Alert admin when a dispute is opened."            checked={emailDispute} onChange={setEmailDispute} />
            <Toggle label="SMS for verification codes"  description="Use SMS OTP during helper document verification." checked={smsVerif}     onChange={setSmsVerif} />
          </div>
        </Section>
      )}

      {/* Security */}
      {active === 'Security' && (
        <Section title={<span className="flex items-center gap-2"><MdSecurity className="text-primary-500" /> Security</span>}>
          <div className="divide-y divide-neutral-50 mb-5">
            <Toggle label="Require 2FA for admins"    description="All admin accounts must use two-factor authentication." checked={twoFactor}   onChange={setTwoFactor} />
            <Toggle label="IP Whitelist for admin panel" description="Restrict admin access to whitelisted IPs only."       checked={ipWhitelist} onChange={setIpWhitelist} />
          </div>
          <Field label="Admin Session Timeout (minutes)" hint="Automatically log out inactive admin sessions.">
            <input className="input max-w-xs" type="number" min="5" max="480" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} />
          </Field>
        </Section>
      )}

      {/* Platform */}
      {active === 'Platform' && (
        <Section title={<span className="flex items-center gap-2"><MdLanguage className="text-primary-500" /> Platform</span>}>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Platform Name">
              <input className="input" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
            </Field>
            <Field label="Support Email">
              <input className="input" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
            </Field>
          </div>
          <div className="pt-2 border-t border-neutral-100">
            <Toggle
              label="Maintenance Mode"
              description="Temporarily take the platform offline for all non-admin users."
              checked={maintenanceMode}
              onChange={setMaintenanceMode}
            />
            {maintenanceMode && (
              <div className="mt-3 p-3 rounded-xl bg-warning-50 border border-warning-500/20 text-sm text-warning-600">
                Maintenance mode is ON. Regular users cannot access the platform.
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Save confirmation */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-accent-600 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-card-hover flex items-center gap-2 animate-slide-up z-50">
          <MdCheckCircle size={18} /> Settings saved successfully
        </div>
      )}
    </div>
  )
}
