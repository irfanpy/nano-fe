// Dashboard layout for family users: sidebar + top bar + content area
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar  from './DashboardTopbar'
import ToastContainer   from '@components/common/ToastContainer'
import { ROLES }        from '@constants'

export default function FamilyLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <DashboardSidebar role={ROLES.FAMILY} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}
