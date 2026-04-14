// Dashboard layout for helper users
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar  from './DashboardTopbar'
import ToastContainer   from '@components/common/ToastContainer'
import { ROLES }        from '@constants'

export default function HelperLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <DashboardSidebar role={ROLES.HELPER} />
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
