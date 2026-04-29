const VARIANTS = {
  gold:    'badge-gold',
  green:   'badge-green',
  red:     'badge-red',
  gray:    'badge-gray',
  navy:    'badge-navy',
  warning: 'badge-warning',
}

export default function Badge({ label, variant = 'gray', dot = false }) {
  const cls = VARIANTS[variant] ?? VARIANTS.gray
  return (
    <span className={`${cls} text-xs`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1 align-middle" />}
      {label}
    </span>
  )
}
