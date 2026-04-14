// Central route definitions for the application
import { createBrowserRouter } from 'react-router-dom'

// Layouts
import PublicLayout  from '@components/layout/PublicLayout'
import FamilyLayout  from '@components/layout/FamilyLayout'
import HelperLayout  from '@components/layout/HelperLayout'
import AdminLayout   from '@components/layout/AdminLayout'

// Guards
import ProtectedRoute from './ProtectedRoute'
import GuestRoute     from './GuestRoute'

// Public Pages
import HomePage            from '@pages/public/HomePage'
import SearchPage          from '@pages/public/SearchPage'
import HelperProfilePage   from '@pages/public/HelperProfilePage'
import HowItWorksPage      from '@pages/public/HowItWorksPage'
import PricingPage         from '@pages/public/PricingPage'
import AboutPage           from '@pages/public/AboutPage'
import ContactPage         from '@pages/public/ContactPage'
import NotFoundPage        from '@pages/public/NotFoundPage'

// Auth Pages
import LoginPage           from '@pages/public/LoginPage'
import RegisterPage        from '@pages/public/RegisterPage'
import ForgotPasswordPage  from '@pages/public/ForgotPasswordPage'
import ResetPasswordPage   from '@pages/public/ResetPasswordPage'

// Family Dashboard Pages
import FamilyDashboard     from '@pages/family/FamilyDashboard'
import FamilyBookings      from '@pages/family/FamilyBookings'
import FamilyShortlist     from '@pages/family/FamilyShortlist'
import FamilyMessages      from '@pages/family/FamilyMessages'
import FamilyPayments      from '@pages/family/FamilyPayments'
import FamilyProfile       from '@pages/family/FamilyProfile'
import FamilyReviews       from '@pages/family/FamilyReviews'
import BookingDetail       from '@pages/family/BookingDetail'
import ContractSign        from '@pages/family/ContractSign'
import VisaTracking        from '@pages/family/VisaTracking'

// Helper Dashboard Pages
import HelperDashboard     from '@pages/helper/HelperDashboard'
import HelperProfile       from '@pages/helper/HelperProfile'
import HelperBookings      from '@pages/helper/HelperBookings'
import HelperMessages      from '@pages/helper/HelperMessages'
import HelperDocuments     from '@pages/helper/HelperDocuments'
import HelperReviews       from '@pages/helper/HelperReviews'
import HelperEarnings      from '@pages/helper/HelperEarnings'

// Admin Pages
import AdminDashboard      from '@pages/admin/AdminDashboard'
import AdminHelpers        from '@pages/admin/AdminHelpers'
import AdminFamilies       from '@pages/admin/AdminFamilies'
import AdminBookings       from '@pages/admin/AdminBookings'
import AdminVerification   from '@pages/admin/AdminVerification'
import AdminPayments       from '@pages/admin/AdminPayments'
import AdminDisputes       from '@pages/admin/AdminDisputes'
import AdminReviews        from '@pages/admin/AdminReviews'
import AdminSettings       from '@pages/admin/AdminSettings'

const router = createBrowserRouter([
  // ── Public Routes ────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: '/',              element: <HomePage /> },
      { path: '/search',        element: <SearchPage /> },
      { path: '/helper/:id',    element: <HelperProfilePage /> },
      { path: '/how-it-works',  element: <HowItWorksPage /> },
      { path: '/pricing',       element: <PricingPage /> },
      { path: '/about',         element: <AboutPage /> },
      { path: '/contact',       element: <ContactPage /> },

      // Auth (guest only)
      { element: <GuestRoute />, children: [
        { path: '/login',            element: <LoginPage /> },
        { path: '/register',         element: <RegisterPage /> },
        { path: '/forgot-password',  element: <ForgotPasswordPage /> },
        { path: '/reset-password',   element: <ResetPasswordPage /> },
      ]},
    ],
  },

  // ── Family Dashboard ─────────────────────
  {
    path: '/family',
    element: <ProtectedRoute role="family"><FamilyLayout /></ProtectedRoute>,
    children: [
      { index: true,               element: <FamilyDashboard /> },
      { path: 'bookings',          element: <FamilyBookings /> },
      { path: 'bookings/:id',      element: <BookingDetail /> },
      { path: 'bookings/:id/contract', element: <ContractSign /> },
      { path: 'bookings/:id/visa', element: <VisaTracking /> },
      { path: 'shortlist',         element: <FamilyShortlist /> },
      { path: 'messages',          element: <FamilyMessages /> },
      { path: 'payments',          element: <FamilyPayments /> },
      { path: 'reviews',           element: <FamilyReviews /> },
      { path: 'profile',           element: <FamilyProfile /> },
    ],
  },

  // ── Helper Dashboard ─────────────────────
  {
    path: '/helper-dashboard',
    element: <ProtectedRoute role="helper"><HelperLayout /></ProtectedRoute>,
    children: [
      { index: true,          element: <HelperDashboard /> },
      { path: 'profile',      element: <HelperProfile /> },
      { path: 'bookings',     element: <HelperBookings /> },
      { path: 'messages',     element: <HelperMessages /> },
      { path: 'documents',    element: <HelperDocuments /> },
      { path: 'reviews',      element: <HelperReviews /> },
      { path: 'earnings',     element: <HelperEarnings /> },
    ],
  },

  // ── Admin Dashboard ──────────────────────
  {
    path: '/admin',
    element: <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true,             element: <AdminDashboard /> },
      { path: 'helpers',         element: <AdminHelpers /> },
      { path: 'families',        element: <AdminFamilies /> },
      { path: 'bookings',        element: <AdminBookings /> },
      { path: 'verification',    element: <AdminVerification /> },
      { path: 'payments',        element: <AdminPayments /> },
      { path: 'disputes',        element: <AdminDisputes /> },
      { path: 'reviews',         element: <AdminReviews /> },
      { path: 'settings',        element: <AdminSettings /> },
    ],
  },

  // ── 404 ──────────────────────────────────
  { path: '*', element: <NotFoundPage /> },
])

export default router
