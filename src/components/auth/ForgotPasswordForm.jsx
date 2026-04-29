import { useState } from 'react'
import { MdEmail, MdCheckCircle } from 'react-icons/md'
import Spinner from '@components/common/Spinner'

export default function ForgotPasswordForm() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1000)
  }

  if (sent) {
    return (
      <div className="text-center space-y-3 py-4">
        <div className="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto">
          <MdCheckCircle size={28} className="text-accent-600" />
        </div>
        <h3 className="font-condensed font-bold text-navy-500 text-xl">Check your inbox</h3>
        <p className="text-sm text-neutral-500">
          We sent a password reset link to <strong>{email}</strong>. It expires in 30 minutes.
        </p>
        <button onClick={() => { setSent(false); setEmail('') }} className="btn-ghost btn-sm text-xs">
          Try a different email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Email Address</label>
        <div className="relative">
          <MdEmail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="email"
            className={`input pl-9 ${error ? 'input-error' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            autoFocus
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading && <Spinner size="sm" />}
        {loading ? 'Sending…' : 'Send Reset Link'}
      </button>
    </form>
  )
}
