import { MdVerified } from 'react-icons/md'

const SIZES = {
  xs:  'w-6 h-6 text-[10px]',
  sm:  'w-8 h-8 text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-14 h-14 text-base',
  xl:  'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl',
}
const BADGE_SIZES = {
  xs: 'w-3 h-3', sm: 'w-3.5 h-3.5', md: 'w-4 h-4',
  lg: 'w-5 h-5', xl: 'w-6 h-6', '2xl': 'w-7 h-7',
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/)
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export default function Avatar({ src, name = '', size = 'md', verified = false, className = '' }) {
  const sizeClass = SIZES[size]  ?? SIZES.md
  const badgeSize = BADGE_SIZES[size] ?? BADGE_SIZES.md
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={name} className={`${sizeClass} rounded-full object-cover bg-neutral-100`} />
      ) : (
        <div className={`${sizeClass} rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center select-none`}>
          {getInitials(name) || '?'}
        </div>
      )}
      {verified && (
        <span className={`absolute -bottom-0.5 -right-0.5 ${badgeSize} bg-white rounded-full flex items-center justify-center`}>
          <MdVerified className="text-accent-500 w-full h-full" />
        </span>
      )}
    </div>
  )
}
