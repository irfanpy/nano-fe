import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { ROLES } from '@constants'

const SESSION_KEY = 'thh-session'
const USERS_KEY = 'thh-users'

const DEFAULT_USERS = [
  {
    id: 'seed-admin',
    role: ROLES.ADMIN,
    firstName: 'Platform',
    lastName: 'Admin',
    email: 'admin@trustedhome.com',
    password: 'admin123',
  },
]

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
    return DEFAULT_USERS
  }

  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // ignore parse failures and reseed
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
  return DEFAULT_USERS
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function buildSession(user) {
  const token = `mock-token-${user.id}`

  return {
    token,
    user: {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
    },
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      getUsers()
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

  const login = async ({ email, password, role }) => {
    const match = getUsers().find(
      (entry) =>
        entry.email.toLowerCase() === email.trim().toLowerCase() &&
        entry.password === password &&
        entry.role === role
    )

    if (!match) {
      throw new Error('Invalid email, password, or role.')
    }

    const session = buildSession(match)
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session.user)
    setToken(session.token)
    return session.user
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setToken(null)
  }

  const register = async (data) => {
    const users = getUsers()
    const exists = users.some((entry) => entry.email.toLowerCase() === data.email.trim().toLowerCase())

    if (exists) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = {
      id: `user-${Date.now()}`,
      role: data.role,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      password: data.password,
      company: data.company?.trim() ?? '',
    }

    const nextUsers = [...users, newUser]
    saveUsers(nextUsers)

    const session = buildSession(newUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session.user)
    setToken(session.token)
    return session.user
  }

  const value = { user, token, loading, login, logout, register }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
