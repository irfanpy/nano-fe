import { Link } from 'react-router-dom'
import { MdChevronRight } from 'react-icons/md'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-neutral-400 flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <MdChevronRight size={15} className="text-neutral-300 flex-shrink-0" />}
            {isLast || !item.to ? (
              <span className={isLast ? 'text-navy-500 font-medium' : ''}>{item.label}</span>
            ) : (
              <Link to={item.to} className="hover:text-primary-500 transition-colors">{item.label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
