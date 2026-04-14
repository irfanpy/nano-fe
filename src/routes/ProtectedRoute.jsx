// Redirects unauthenticated users or wrong-role users to login
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth()

  if (loading) return null  // or <Spinner />

  if (!user) return <Navigate to="/login" replace />

  if (role && user.role !== role) return <Navigate to="/" replace />

  return children ?? <Outlet />
}
