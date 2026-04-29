import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginForm from '@components/auth/LoginForm'

function SidePanel() {
  return (
    <div className="relative hidden h-full overflow-hidden bg-navy-500 px-10 py-14 text-white lg:flex lg:flex-col lg:justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1e3a5f_0%,#14253d_60%,#0e1b2c_100%)]" />
      {/* Gold grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#fd7702 1px,transparent 1px),linear-gradient(90deg,#fd7702 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,147,0,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,147,0,0.12),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-sm text-center space-y-8">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-3 justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl font-bold text-navy-800"
            style={{ background: 'linear-gradient(135deg,#f59300 0%,#d97706 100%)' }}>
            TH
          </span>
          <span className="font-condensed text-2xl font-bold tracking-widest text-white uppercase">
            Trusted Home
          </span>
        </Link>

        <div>
          <h2 className="font-condensed text-5xl font-bold leading-none text-primary-500">
            Hello!
          </h2>
          <p className="mt-6 text-xl leading-8 text-white/90">
            New here? Create an account and start your journey with us.
          </p>
        </div>

        <Link
          to="/register"
          className="inline-flex min-w-44 items-center justify-center rounded-2xl bg-white px-8 py-4 font-condensed text-xl font-bold uppercase tracking-[0.16em] text-primary-500 transition hover:scale-[1.02] hover:shadow-gold"
        >
          Sign Up
        </Link>

        {/* Feature bullets */}
        <div className="space-y-3 text-sm text-white/80 text-left mt-4">
          {[
            '✓  Verified helpers & trusted families',
            '✓  Secure contracts & visa tracking',
            '✓  Seamless payments & chat',
          ].map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl rounded-[32px] bg-white shadow-[0_24px_80px_rgba(30,58,95,0.18)] overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-2">

            {/* Form — left side */}
            <div className="animate-fade-in px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <div className="mx-auto max-w-md">
                {/* Mobile logo */}
                <Link to="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#f59300 0%,#d97706 100%)' }}>
                    TH
                  </span>
                  <span className="font-condensed text-xl font-bold uppercase tracking-widest text-navy-500">
                    Trusted Home
                  </span>
                </Link>

                <h2 className="font-condensed text-5xl font-bold text-primary-500 mb-1">
                  Welcome Back
                </h2>
                <p className="text-neutral-500 text-base mb-8">
                  Sign in to your account to continue.
                </p>

                <LoginForm onSuccess={() => navigate('/')} />
              </div>
            </div>

            {/* Side panel — right side */}
            <SidePanel />
          </div>
        </div>
      </main>
    </div>
  )
}
