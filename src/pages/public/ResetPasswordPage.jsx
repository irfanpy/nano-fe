import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { MdLock, MdVisibility, MdVisibilityOff, MdCheckCircle } from 'react-icons/md'
import Spinner from '@components/common/Spinner'

export default function ResetPasswordPage() {
  const [params]  = useSearchParams()
  const navigate  = useNavigate()
  const token     = params.get('token')

  const [form,    setForm]    = useState({ password: '', confirm: '' })
  const [show,    setShow]    = useState({ password: false, confirm: false })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (form.password.length < 8)           e.password = 'Password must be at least 8 characters'
    if (form.confirm !== form.password)      e.confirm  = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => navigate('/login'), 2500)
    }, 1000)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-warm-gradient flex items-center justify-center px-4">
        <div className="card card-body text-center space-y-3 max-w-sm w-full">
          <p className="text-danger-500 font-semibold">Invalid or expired reset link.</p>
          <Link to="/forgot-password" className="btn-primary w-full justify-center">Request New Link</Link>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen bg-warm-gradient flex items-center justify-center px-4">
        <div className="card card-body text-center space-y-3 max-w-sm w-full py-10">
          <div className="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto">
            <MdCheckCircle size={28} className="text-accent-600" />
          </div>
          <h2 className="font-condensed font-bold text-navy-500 text-xl">Password Updated!</h2>
          <p className="text-sm text-neutral-500">Redirecting you to login…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gradient flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f59300 0%, #d97706 100%)' }}>
            <span className="text-white font-bold font-condensed">TH</span>
          </div>
          <span className="font-condensed font-bold text-navy-500 text-xl">
            Trusted<span className="text-primary-500">Home</span>
          </span>
        </div>

        <div className="card card-body space-y-5">
          <div className="text-center">
            <h1 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide">Set New Password</h1>
            <p className="text-neutral-500 text-sm mt-1">Choose a strong password for your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'password', label: 'New Password',      placeholder: 'Min. 8 characters' },
              { key: 'confirm',  label: 'Confirm Password',  placeholder: 'Repeat new password' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <div className="relative">
                  <MdLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={show[key] ? 'text' : 'password'}
                    className={`input pl-9 pr-10 ${errors[key] ? 'input-error' : ''}`}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => { set(key, e.target.value); setErrors((er) => ({ ...er, [key]: '' })) }}
                  />
                  <button type="button" onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    {show[key] ? <MdVisibilityOff size={17} /> : <MdVisibility size={17} />}
                  </button>
                </div>
                {errors[key] && <p className="error-msg">{errors[key]}</p>}
              </div>
            ))}

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500">
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
