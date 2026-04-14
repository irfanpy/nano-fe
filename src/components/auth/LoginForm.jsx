import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MdOutlineMail,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPerson,
  MdSupportAgent,
} from 'react-icons/md'
import Input from '@components/common/Input'
import Button from '@components/common/Button'
import { useAuth } from '@context/AuthContext'
import { ROLES } from '@constants'
import useUIStore from '@store/uiStore'

const ROLE_OPTIONS = [
  { value: ROLES.FAMILY, label: 'User', desc: 'Book and manage trusted home services', icon: <MdPerson size={18} /> },
  { value: ROLES.HELPER, label: 'Service Provider', desc: 'Create a profile and offer your services', icon: <MdSupportAgent size={18} /> },
]

const ROLE_HOME = {
  [ROLES.FAMILY]: '/family',
  [ROLES.HELPER]: '/helper-dashboard',
  [ROLES.ADMIN]: '/admin',
}

export default function LoginForm({ onSuccess, onSwitchMode, mode = 'page' }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const addToast = useUIStore((state) => state.addToast)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', role: ROLES.FAMILY })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!form.password) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const user = await login(form)
      addToast({ type: 'success', message: `Welcome back, ${user.firstName || user.name}!` })
      onSuccess?.(user)
      navigate(ROLE_HOME[user.role] ?? '/')
    } catch (error) {
      addToast({ type: 'error', message: error instanceof Error ? error.message : 'Unable to sign in.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <p className="text-center text-base text-neutral-600 lg:text-left">
        Don&apos;t have an account yet?{' '}
        {onSwitchMode ? (
          <button
            type="button"
            onClick={onSwitchMode}
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            Sign Up
          </button>
        ) : (
          <Link to="/register" className="font-medium text-primary-500 hover:text-primary-600">
            Sign Up
          </Link>
        )}
      </p>

      <div className="grid gap-3">
        {ROLE_OPTIONS.map((option) => {
          const active = form.role === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange('role', option.value)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? 'border-primary-500 bg-primary-50 shadow-[0_8px_24px_rgba(245,147,0,0.16)]'
                  : 'border-neutral-200 bg-white hover:border-primary-300'
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {option.icon}
              </span>
              <span className="min-w-0 text-sm text-neutral-500">
                <span className="font-semibold text-navy-500">{option.label}</span>
                <span className="mx-2 text-neutral-300">|</span>
                <span>{option.desc}</span>
              </span>
            </button>
          )
        })}
      </div>

      <Input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(event) => handleChange('email', event.target.value)}
        error={errors.email}
        icon={<MdOutlineMail size={20} />}
      />

      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={form.password}
        onChange={(event) => handleChange('password', event.target.value)}
        error={errors.password}
        icon={
          <button
            type="button"
            className="pointer-events-auto text-neutral-400 hover:text-neutral-600"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineVisibility size={20} />}
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3 text-sm">
        <Link to="/forgot-password" className="text-primary-500 hover:text-primary-600">
          Forgot password?
        </Link>
        {mode === 'page' ? (
          <p className="text-neutral-500">Use your role to enter Trusted Home.</p>
        ) : (
          <span className="text-neutral-500">Role-based frontend access</span>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full justify-center rounded-2xl border border-primary-500 bg-transparent py-3.5 font-condensed text-xl font-bold uppercase tracking-[0.18em] text-primary-500 hover:bg-primary-500 hover:text-white"
      >
        Log In
      </Button>

      <div className="rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
        Frontend-only access for Trusted Home users and service providers.
      </div>
    </form>
  )
}
