import clsx from 'clsx'

export default function Input({ label, error, icon, className, ...props }) {
  return (
    <label className="block">
      {label ? <span className="label">{label}</span> : null}
      <div className="relative">
        <input className={clsx('input', icon && 'pr-11', error && 'input-error', className)} {...props} />
        {icon ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400">
            {icon}
          </span>
        ) : null}
      </div>
      {error ? <span className="error-msg">{error}</span> : null}
    </label>
  )
}
