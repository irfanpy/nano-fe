import { useState, useEffect } from 'react'
import { MdCamera, MdSave, MdExpandMore, MdExpandLess } from 'react-icons/md'
import { NATIONALITIES } from '@constants'
import { helperService } from '@services/helperService'
import { useAuth } from '@context/AuthContext'
import useUIStore from '@store/uiStore'

const SKILLS_LIST = ['Deep Cleaning', 'Laundry & Ironing', 'Cooking', 'Childcare', 'Eldercare', 'Grocery Shopping', 'Pet Care', 'Driving', 'Tutoring', 'Event Setup']
const LANGUAGES   = ['English', 'Arabic', 'Tagalog', 'Hindi', 'Urdu', 'Sinhala', 'Amharic', 'Nepali', 'Indonesian']
const DAYS        = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SECTIONS    = ['basic', 'professional', 'about', 'salary']
const SECTION_LABELS = { basic: 'Basic Info', professional: 'Professional Info', about: 'About Me', salary: 'Salary Expectation' }
const CATEGORIES  = ['housemaid', 'nanny', 'caregiver', 'driver', 'chef']

const DEFAULT_FORM = {
  category:         '',
  nationality:      '',
  bio:              '',
  experience_years: '',
  monthly_rate:     '',
  languages:        [],
  skills:           [],
}

export default function HelperProfile() {
  const { user } = useAuth()
  const addToast = useUIStore((s) => s.addToast)

  const [form, setForm]               = useState(DEFAULT_FORM)
  const [openSections, setOpenSections] = useState({ basic: true, professional: false, about: false, salary: false })
  const [loading, setLoading]         = useState(true)
  const [saving, setSaving]           = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)

  // Load profile from backend
  useEffect(() => {
    helperService.getMyProfile()
      .then(({ data }) => {
        setForm({
          category:         data.category         || '',
          nationality:      data.nationality       || '',
          bio:              data.bio               || '',
          experience_years: data.experience_years  ?? '',
          monthly_rate:     data.monthly_rate      ?? '',
          languages:        data.languages         || [],
          skills:           data.skills            || [],
        })
        if (data.user?.avatar) setAvatarPreview(data.user.avatar)
      })
      .catch(() => addToast({ type: 'error', message: 'Could not load profile.' }))
      .finally(() => setLoading(false))
  }, [])

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const toggle = (field, value) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }))

  const toggleSection = (key) => setOpenSections((s) => ({ ...s, [key]: !s[key] }))

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
    try {
      await helperService.uploadPhoto(file)
      addToast({ type: 'success', message: 'Photo updated.' })
    } catch {
      addToast({ type: 'error', message: 'Photo upload failed.' })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await helperService.updateProfile({
        category:         form.category,
        nationality:      form.nationality,
        bio:              form.bio,
        experience_years: Number(form.experience_years) || 0,
        monthly_rate:     form.monthly_rate || null,
        languages:        form.languages,
        skills:           form.skills,
      })
      addToast({ type: 'success', message: 'Profile saved successfully.' })
    } catch {
      addToast({ type: 'error', message: 'Failed to save profile.' })
    } finally {
      setSaving(false)
    }
  }

  const completionPct = Math.round(
    [form.category, form.nationality, form.languages.length, form.experience_years,
     form.skills.length, form.bio.length > 20, avatarPreview, form.monthly_rate]
      .filter(Boolean).length / 8 * 100
  )

  const initials = ((user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')).toUpperCase() || 'H'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-condensed font-bold text-navy-500 text-3xl tracking-wide">My Profile</h2>
          <p className="text-neutral-500 mt-1">Keep your profile updated to attract more families.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-4">

          {/* Photo */}
          <div className="card card-body flex items-center gap-5">
            <div className="relative flex-shrink-0">
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" className="w-20 h-20 rounded-2xl object-cover" />
                : <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-3xl">{initials}</div>
              }
              <label className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-gold hover:bg-primary-600 transition-colors cursor-pointer">
                <MdCamera size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            <div>
              <h3 className="font-semibold text-navy-500">{user?.firstName} {user?.lastName}</h3>
              <p className="text-sm text-neutral-400 capitalize">{form.category || 'Helper'} · {form.nationality || 'Not set'}</p>
              <p className="text-xs text-neutral-400 mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Accordion sections */}
          {SECTIONS.map((sec) => (
            <div key={sec} className="card overflow-hidden">
              <button
                className="card-header w-full flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                onClick={() => toggleSection(sec)}
              >
                <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">{SECTION_LABELS[sec]}</h3>
                {openSections[sec] ? <MdExpandLess size={20} className="text-neutral-400" /> : <MdExpandMore size={20} className="text-neutral-400" />}
              </button>

              {openSections[sec] && (
                <div className="card-body animate-slide-up space-y-4">

                  {sec === 'basic' && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Nationality</label>
                        <select className="select" value={form.nationality} onChange={(e) => set('nationality', e.target.value)}>
                          <option value="">Select nationality</option>
                          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label">Languages Spoken</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {LANGUAGES.map((l) => (
                            <button key={l} type="button" onClick={() => toggle('languages', l)}
                              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${form.languages.includes(l) ? 'bg-primary-500 text-white border-primary-500' : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {sec === 'professional' && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Job Category</label>
                          <select className="select" value={form.category} onChange={(e) => set('category', e.target.value)}>
                            <option value="">Select category</option>
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="label">Years of Experience</label>
                          <input type="number" min="0" className="input" value={form.experience_years}
                            onChange={(e) => set('experience_years', e.target.value)} placeholder="e.g. 3" />
                        </div>
                      </div>
                      <div>
                        <label className="label">Skills</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {SKILLS_LIST.map((skill) => (
                            <button key={skill} type="button" onClick={() => toggle('skills', skill)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.skills.includes(skill) ? 'bg-primary-500 text-white border-primary-500 shadow-gold' : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {sec === 'about' && (
                    <div>
                      <label className="label">Bio</label>
                      <textarea rows={5} className="input resize-none" maxLength={500}
                        value={form.bio} onChange={(e) => set('bio', e.target.value)}
                        placeholder="Tell families about yourself, your experience, and why you're the right fit..." />
                      <p className={`text-xs mt-1 text-right ${form.bio.length > 450 ? 'text-warning-600' : 'text-neutral-400'}`}>
                        {form.bio.length}/500
                      </p>
                    </div>
                  )}

                  {sec === 'salary' && (
                    <div>
                      <label className="label">Expected Monthly Rate (AED)</label>
                      <input type="number" min="0" className="input max-w-xs" value={form.monthly_rate}
                        onChange={(e) => set('monthly_rate', e.target.value)} placeholder="e.g. 2500" />
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}

          <button onClick={handleSave} disabled={saving}
            className="btn btn-primary flex items-center gap-2 disabled:opacity-60">
            <MdSave size={16} />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {/* Completion sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="card card-body">
            <h3 className="font-condensed font-bold text-navy-500 text-lg mb-3 tracking-wide">Profile Strength</h3>
            <div className="text-center mb-4">
              <div className="relative w-20 h-20 mx-auto">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.2" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59300" strokeWidth="3.2"
                    strokeDasharray={`${completionPct} ${100 - completionPct}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-condensed font-bold text-navy-500 text-lg">{completionPct}%</span>
              </div>
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Profile photo',      done: !!avatarPreview },
                { label: 'Nationality set',    done: !!form.nationality },
                { label: 'Category selected',  done: !!form.category },
                { label: 'Experience added',   done: !!form.experience_years },
                { label: 'Skills selected',    done: form.skills.length > 0 },
                { label: 'Bio written',        done: form.bio.length > 20 },
                { label: 'Languages added',    done: form.languages.length > 0 },
                { label: 'Rate set',           done: !!form.monthly_rate },
              ].map(({ label, done }) => (
                <li key={label} className={`flex items-center gap-2 ${done ? 'text-accent-600' : 'text-neutral-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${done ? 'bg-accent-500' : 'bg-neutral-300'}`} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
