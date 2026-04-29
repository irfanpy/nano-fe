import { Link } from 'react-router-dom'
import ForgotPasswordForm from '@components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-warm-gradient flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
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
            <h1 className="font-condensed font-bold text-navy-500 text-2xl tracking-wide">Forgot Password?</h1>
            <p className="text-neutral-500 text-sm mt-1">Enter your email and we'll send you a reset link.</p>
          </div>

          <ForgotPasswordForm />

          <p className="text-center text-sm text-neutral-500">
            Remember your password?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
