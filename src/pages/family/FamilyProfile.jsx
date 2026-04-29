import { useState } from 'react'
import { MdPerson, MdHome, MdTune, MdLock, MdCamera, MdSave } from 'react-icons/md'
import { NATIONALITIES, HELPER_CATEGORIES } from '@constants'

const TABS = [
  { key: 'personal',    label: 'Personal Info',  icon: MdPerson },
  { key: 'home',        label: 'Home Details',   icon: MdHome },
  { key: 'preferences', label: 'Preferences',    icon: MdTune },
  { key: 'security',    label: 'Security',       icon: MdLock },
]

export default function FamilyProfile() {
  const [tab, setTab] = useState('personal')
  const [saved, setSaved] = useState(false)

  const [personal, setPersonal] = useState({ firstName: 'Sarah', lastName: 'Al-Mansouri', email: 'sarah@example.com', phone: '+971 50 123 4567', nationality: 'Emirati', language: 'English' })
  const [home, setHome] = useState({ area: 'Dubai Marina', address: 'Villa 4B, Marina Heights', residents: '4', children: '2', elderly: '0' })
  const [prefs, setPrefs] = useState({ category: 'housemaid', budget: '2000', preferredNationality: 'Filipino', commLanguage: 'English' })
  const [security, setSecurity] = useState({ currentPwd: '', newPwd: '', confirmPwd: '' })
  const [twoFA, setTwoFA] = useState(false)
  const [pwdError, setPwdError] = useState('')

  const DUBAI_AREAS = ['Downtown Dubai', 'Dubai Marina', 'Jumeirah', 'JBR', 'Palm Jumeirah', 'Business Bay', 'DIFC', 'Mirdif', 'Arabian Ranches', 'Other']

  const handleSave = () => {
    if (tab === 'security') {
      if (security.newPwd && security.newPwd !== security.confirmPwd) {
        setPwdError('Passwords do not match')
        return
      }
      setPwdError('')
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Profile</h2>
        <p className="text-neutral-500 mt-1">Manage your account information and preferences.</p>
      </div>

      {/* Profile photo */}
      <div className="card card-body flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-3xl">S</div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-gold hover:bg-primary-600 transition-colors">
            <MdCamera size={14} />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-navy-500">{personal.firstName} {personal.lastName}</h3>
          <p className="text-sm text-neutral-400">{personal.email}</p>
          <span className="badge-gold text-xs mt-1 inline-block">Standard Plan</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tab nav */}
        <aside className="lg:col-span-1">
          <nav className="space-y-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === key ? 'bg-primary-500 text-white shadow-gold' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Tab content */}
        <div className="lg:col-span-3">
          <div className="card card-body space-y-5 animate-fade-in">

            {tab === 'personal' && (
              <>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name</label>
                    <input className="input" value={personal.firstName} onChange={(e) => setPersonal((p) => ({ ...p, firstName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input className="input" value={personal.lastName} onChange={(e) => setPersonal((p) => ({ ...p, lastName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input className="input opacity-60 cursor-not-allowed" value={personal.email} disabled />
                    <p className="text-xs text-neutral-400 mt-1">Email cannot be changed here. Contact support.</p>
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input className="input" value={personal.phone} onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Nationality</label>
                    <select className="select" value={personal.nationality} onChange={(e) => setPersonal((p) => ({ ...p, nationality: e.target.value }))}>
                      {['Emirati', ...NATIONALITIES].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Preferred Language</label>
                    <select className="select" value={personal.language} onChange={(e) => setPersonal((p) => ({ ...p, language: e.target.value }))}>
                      {['English', 'Arabic', 'Hindi', 'Tagalog', 'Urdu'].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {tab === 'home' && (
              <>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Home Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Dubai Area</label>
                    <select className="select" value={home.area} onChange={(e) => setHome((h) => ({ ...h, area: e.target.value }))}>
                      {DUBAI_AREAS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Full Address</label>
                    <input className="input" placeholder="Villa/Apt number, building" value={home.address} onChange={(e) => setHome((h) => ({ ...h, address: e.target.value }))} />
                  </div>
                  {[
                    ['residents', 'Total Residents', '1'],
                    ['children', 'Number of Children', '0'],
                    ['elderly', 'Number of Elderly', '0'],
                  ].map(([k, label, min]) => (
                    <div key={k}>
                      <label className="label">{label}</label>
                      <input type="number" min={min} className="input" value={home[k]} onChange={(e) => setHome((h) => ({ ...h, [k]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'preferences' && (
              <>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Hiring Preferences</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Helper Category Needed</label>
                    <select className="select" value={prefs.category} onChange={(e) => setPrefs((p) => ({ ...p, category: e.target.value }))}>
                      {HELPER_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Max Monthly Budget (AED)</label>
                    <input type="number" className="input" value={prefs.budget} onChange={(e) => setPrefs((p) => ({ ...p, budget: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Preferred Nationality</label>
                    <select className="select" value={prefs.preferredNationality} onChange={(e) => setPrefs((p) => ({ ...p, preferredNationality: e.target.value }))}>
                      <option value="">No preference</option>
                      {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Communication Language</label>
                    <select className="select" value={prefs.commLanguage} onChange={(e) => setPrefs((p) => ({ ...p, commLanguage: e.target.value }))}>
                      {['English', 'Arabic', 'Hindi', 'Tagalog', 'Urdu'].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {tab === 'security' && (
              <>
                <h3 className="font-condensed font-bold text-navy-500 text-xl tracking-wide">Security Settings</h3>
                <div className="space-y-4 max-w-md">
                  {[
                    ['currentPwd', 'Current Password'],
                    ['newPwd',     'New Password'],
                    ['confirmPwd', 'Confirm New Password'],
                  ].map(([k, label]) => (
                    <div key={k}>
                      <label className="label">{label}</label>
                      <input type="password" className={`input ${pwdError && k !== 'currentPwd' ? 'input-error' : ''}`}
                        value={security[k]} onChange={(e) => setSecurity((s) => ({ ...s, [k]: e.target.value }))} />
                    </div>
                  ))}
                  {pwdError && <p className="error-msg">{pwdError}</p>}
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-navy-500 text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-neutral-400">Add an extra layer of security to your account.</p>
                    </div>
                    <button onClick={() => setTwoFA((t) => !t)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${twoFA ? 'bg-primary-500' : 'bg-neutral-200'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${twoFA ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <p className="font-medium text-danger-500 text-sm mb-1">Danger Zone</p>
                  <p className="text-xs text-neutral-400 mb-3">Permanently delete your account and all associated data.</p>
                  <button className="btn-danger btn-sm">Delete Account</button>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
              <button onClick={handleSave}
                className={`btn flex items-center gap-2 transition-all ${saved ? 'bg-accent-500 text-white' : 'btn-primary'}`}>
                <MdSave size={16} />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
              <button className="btn-ghost text-sm border border-neutral-200">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
