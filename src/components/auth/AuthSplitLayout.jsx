import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { MdHomeWork, MdShield, MdVerifiedUser } from 'react-icons/md'

const HIGHLIGHTS = [
  { icon: <MdVerifiedUser size={18} />, label: 'Verified households and providers' },
  { icon: <MdShield size={18} />, label: 'Role-based access for admin, user, and provider' },
  { icon: <MdHomeWork size={18} />, label: 'Frontend-ready onboarding for Trusted Home' },
]

export default function AuthSplitLayout({ mode = 'login', title, subtitle, children }) {
  const isLogin = mode === 'login'

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(66,153,225,0.18),_transparent_32%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(30,58,95,0.18)] lg:grid-cols-2">
          <div
            className={clsx(
              'relative hidden overflow-hidden px-10 py-14 text-white lg:flex lg:flex-col lg:justify-between',
              isLogin ? 'lg:order-2' : 'lg:order-1'
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#4da0ff_0%,#3d87db_45%,#2866bf_100%)]" />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
              }}
            />

            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-lg font-bold">TH</span>
                <span className="font-condensed text-2xl font-bold uppercase tracking-[0.18em]">
                  Trusted Home
                </span>
              </Link>
            </div>

            <div className="relative z-10 max-w-sm">
              <p className="mb-4 font-condensed text-[14px] uppercase tracking-[0.35em] text-white/70">
                {isLogin ? 'Hello Again' : 'Welcome Back'}
              </p>
              <h1 className="mb-5 font-condensed text-5xl font-bold uppercase leading-none">
                {isLogin ? 'Hello' : 'Welcome Back!'}
              </h1>
              <p className="max-w-xs text-lg leading-8 text-white/88">
                {isLogin
                  ? 'Create an account and start your journey with Trusted Home.'
                  : 'Log in with your credentials to manage your Trusted Home dashboard.'}
              </p>

              <div className="mt-10">
                <Link
                  to={isLogin ? '/register' : '/login'}
                  className="inline-flex min-w-44 items-center justify-center rounded-2xl bg-white px-8 py-4 font-condensed text-xl font-bold uppercase tracking-[0.18em] text-[#3d87db] transition-transform duration-200 hover:scale-[1.02]"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </Link>
              </div>
            </div>

            <div className="relative z-10 space-y-3 text-sm text-white/88">
              {HIGHLIGHTS.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    {icon}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={clsx('px-6 py-10 sm:px-10 lg:px-12 lg:py-14', isLogin ? 'lg:order-1' : 'lg:order-2')}>
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <Link to="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-gradient font-bold text-white shadow-gold">TH</span>
                  <span className="font-condensed text-2xl font-bold uppercase tracking-[0.14em] text-navy-500">
                    Trusted Home
                  </span>
                </Link>
                <h2 className="font-condensed text-5xl font-bold uppercase tracking-[0.04em] text-[#3d87db]">
                  {title}
                </h2>
                <p className="mt-3 text-base text-neutral-500">{subtitle}</p>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
