// Layout wrapper for all public-facing pages (navbar + footer)
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastContainer from '@components/common/ToastContainer'
import AuthModal from '@components/auth/AuthModal'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
      <ToastContainer />
    </div>
  )
}
