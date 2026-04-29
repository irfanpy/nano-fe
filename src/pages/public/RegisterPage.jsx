import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '@components/auth/RegisterForm'
import LoginForm from '@components/auth/LoginForm'

function SidePanel({ mode, onSwitch }) {
  const isLogin = mode === 'login'

  return (
    <div className="relative hidden h-full overflow-hidden bg-navy-500 px-10 py-14 text-white lg:flex lg:flex-col lg:justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#1e3a5f_0%,#14253d_60%,#0e1b2c_100%)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#fd7702 1px,transparent 1px),linear-gradient(90deg,#fd7702 1px,transparent 1px)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,147,0,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,147,0,0.12),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-sm text-center">
        <h2 className="font-condensed text-5xl font-bold leading-none text-primary-500">
          {isLogin ? 'Hello' : 'Welcome Back!'}
        </h2>
        <p className="mt-8 text-2xl leading-8 text-white/92">
          {isLogin
            ? 'Create an account and start your journey with us'
            : 'Log in with your credentials to manage your Trusted Home account'}
        </p>
        <button
          type="button"
          onClick={onSwitch}
          className="mt-12 inline-flex min-w-44 items-center justify-center rounded-2xl bg-white px-8 py-4 font-condensed text-xl font-bold uppercase tracking-[0.16em] text-[#3d87db] transition hover:scale-[1.02]"
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const [mode, setMode] = useState('register')
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl rounded-[32px] bg-white shadow-[0_24px_80px_rgba(30,58,95,0.18)] overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-2">
            {mode === 'register' ? (
              <>
                <div className="hidden h-full lg:block">
                  <SidePanel mode="register" onSwitch={() => setMode('login')} />
                </div>
                <div className="animate-fade-in px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
                  <div className="mx-auto max-w-md">
                    <h2 className="text-center font-condensed text-5xl font-bold text-primary-500 lg:text-left">
                      Create Your Account
                    </h2>
                    <RegisterForm
                      mode="modal"
                      onSuccess={handleSuccess}
                      onSwitchMode={() => setMode('login')}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="animate-fade-in px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
                  <div className="mx-auto max-w-md">
                    <h2 className="text-center font-condensed text-5xl font-bold text-primary-500 lg:text-left">
                      Login
                    </h2>
                    <LoginForm
                      mode="modal"
                      onSuccess={handleSuccess}
                      onSwitchMode={() => setMode('register')}
                    />
                  </div>
                </div>
                <div className="hidden h-full lg:block">
                  <SidePanel mode="login" onSwitch={() => setMode('register')} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
