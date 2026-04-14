// Redirects already-logged-in users away from auth pages
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { ROLES } from '@constants'

const ROLE_HOME = {
  [ROLES.FAMILY]: '/family',
  [ROLES.HELPER]: '/helper-dashboard',
  [ROLES.ADMIN]:  '/admin',
}

export default function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return null

  if (user) return <Navigate to={ROLE_HOME[user.role] ?? '/'} replace />

  return <Outlet />
}
