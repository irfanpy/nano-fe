import clsx from 'clsx'

const VARIANTS = {
  primary: 'btn-primary',
  navy: 'btn-navy',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const SIZES = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={clsx('btn', VARIANTS[variant] ?? VARIANTS.primary, SIZES[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Please wait...' : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}
