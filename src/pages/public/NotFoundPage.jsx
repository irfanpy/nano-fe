import { Link } from 'react-router-dom'
import { MdHome, MdSearch } from 'react-icons/md'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-warm-gradient">
      <div className="text-center px-4 animate-fade-in">
        <div className="text-9xl font-heading font-bold text-primary-200 select-none mb-2">404</div>
        <h1 className="font-heading text-3xl font-bold text-navy-500 mb-3">Page Not Found</h1>
        <p className="text-neutral-500 mb-2">الصفحة غير موجودة</p>
        <p className="text-neutral-500 max-w-sm mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/"       className="btn-primary flex items-center gap-2"><MdHome size={18} /> Go Home</Link>
          <Link to="/search" className="btn-outline flex items-center gap-2"><MdSearch size={18} /> Find Helpers</Link>
        </div>
      </div>
    </div>
  )
}
