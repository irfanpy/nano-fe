import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MdBusinessCenter,
  MdOutlineBadge,
  MdOutlineMail,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPerson,
} from 'react-icons/md'
import Input from '@components/common/Input'
import Button from '@components/common/Button'
import { useAuth } from '@context/AuthContext'
import { ROLES } from '@constants'
import useUIStore from '@store/uiStore'

const ROLE_OPTIONS = [
  { value: ROLES.FAMILY, label: 'User', desc: 'Book and manage trusted home services', icon: <MdPerson size={18} /> },
  { value: ROLES.HELPER, label: 'Service Provider', desc: 'Create a profile and offer your services', icon: <MdBusinessCenter size={18} /> },
]

const ROLE_HOME = {
  [ROLES.FAMILY]: '/family',
  [ROLES.HELPER]: '/helper-dashboard',
  [ROLES.ADMIN]: '/admin',
}

export default function RegisterForm({ role, onSuccess, onSwitchMode, mode = 'page' }) {
  const navigate = useNavigate()
  const { register } = useAuth()
  const addToast = useUIStore((state) => state.addToast)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: role ?? ROLES.FAMILY,
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (!form.password) nextErrors.password = 'Password is required.'
    if (form.password && form.password.length < 6) nextErrors.password = 'Use at least 6 characters.'
    if (form.role === ROLES.HELPER && !form.company.trim()) nextErrors.company = 'Service title is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const user = await register(form)
      addToast({ type: 'success', message: `Account created for ${user.name}.` })
      onSuccess?.(user)
      navigate(ROLE_HOME[user.role] ?? '/')
    } catch (error) {
      addToast({ type: 'error', message: error instanceof Error ? error.message : 'Unable to sign up.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <p className="text-center text-base text-neutral-600 lg:text-left">
        Already have an account?{' '}
        {onSwitchMode ? (
          <button
            type="button"
            onClick={onSwitchMode}
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            Log In
          </button>
        ) : (
          <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
            Log In
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(event) => handleChange('firstName', event.target.value)}
          error={errors.firstName}
          icon={<MdPerson size={20} />}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(event) => handleChange('lastName', event.target.value)}
          error={errors.lastName}
          icon={<MdOutlineBadge size={20} />}
        />
      </div>

      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => handleChange('email', event.target.value)}
        error={errors.email}
        icon={<MdOutlineMail size={20} />}
      />

      {form.role === ROLES.HELPER ? (
        <Input
          type="text"
          placeholder="Service Title"
          value={form.company}
          onChange={(event) => handleChange('company', event.target.value)}
          error={errors.company}
          icon={<MdBusinessCenter size={20} />}
        />
      ) : null}

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

      <div className="rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
        This is frontend-only for now. New accounts are saved locally in your browser so you can test the UI flow.
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full justify-center rounded-2xl border border-primary-500 bg-transparent py-3.5 font-condensed text-xl font-bold uppercase tracking-[0.18em] text-primary-500 hover:bg-primary-500 hover:text-white"
      >
        Sign Up
      </Button>

      {mode === 'page' ? (
        <p className="text-center text-sm text-neutral-500">
          Trusted Home frontend signup flow
        </p>
      ) : null}
    </form>
  )
}
