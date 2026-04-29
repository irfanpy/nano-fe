import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '@services/authService'

const SESSION_KEY = 'thh-session'

const ROLE_HOME = {
  family: '/family',
  helper: '/helper-dashboard',
  admin:  '/admin',
}

export default function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on app load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        setUser(session.user ?? null)
        setToken(session.token ?? null)
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  // Normalise backend snake_case to camelCase for the rest of the frontend
  const normaliseUser = (u) => ({
    id:        u.id,
    role:      u.role,
    firstName: u.first_name ?? u.firstName ?? '',
    lastName:  u.last_name  ?? u.lastName  ?? '',
    name:      u.full_name  ?? `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim(),
    email:     u.email,
    avatar:    u.avatar ?? null,
  })

  const saveSession = (accessToken, refreshToken, userData) => {
    const user    = normaliseUser(userData)
    const session = { token: accessToken, refresh: refreshToken, user }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(user)
    setToken(accessToken)
  }

  const login = async ({ email, password }) => {
    const { data } = await authService.login({ email, password })
    saveSession(data.access, data.refresh, data.user)
    return normaliseUser(data.user)
  }

  const register = async (form) => {
    const payload = {
      first_name: form.firstName,
      last_name:  form.lastName,
      email:      form.email,
      phone:      form.phone ?? '',
      role:       form.role,
      password:   form.password,
      password2:  form.password,
    }
    const { data } = await authService.register(payload)
    saveSession(data.access, data.refresh, data.user)
    return normaliseUser(data.user)
  }

  const logout = async () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        // blacklist the refresh token on the backend
        await authService.logout({ refresh: session.refresh }).catch(() => {})
      }
    } catch { /* ignore */ }
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setToken(null)
  }

  const value = { user, token, loading, login, logout, register, ROLE_HOME }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
