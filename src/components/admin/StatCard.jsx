import { MdTrendingUp, MdTrendingDown } from 'react-icons/md'

export default function StatCard({ label, value, trend, icon: Icon, color = 'bg-primary-50 text-primary-600' }) {
  const isPositive = trend && !trend.startsWith('-')
  return (
    <div className="card card-body flex items-center gap-4 hover:shadow-card-hover transition-shadow duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {Icon && <Icon size={22} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-condensed font-bold text-navy-500 text-2xl flex items-center gap-1.5 flex-wrap">
          {value}
          {trend && (
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5
              ${isPositive ? 'bg-accent-50 text-accent-700' : 'bg-danger-50 text-danger-600'}`}>
              {isPositive ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
              {trend}
            </span>
          )}
        </div>
        <p className="text-neutral-500 text-xs truncate">{label}</p>
      </div>
    </div>
  )
}
