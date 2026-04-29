export default function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="label">{label}</span>}
      <select className={`select ${error ? 'input-error' : ''} ${className}`} {...props}>
        {options.map((opt) => {
          const value = typeof opt === 'object' ? opt.value : opt
          const text  = typeof opt === 'object' ? opt.label : opt
          return <option key={value} value={value}>{text}</option>
        })}
      </select>
      {error && <span className="error-msg">{error}</span>}
    </label>
  )
}
