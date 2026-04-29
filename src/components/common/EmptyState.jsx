export default function EmptyState({ icon: Icon, title = 'Nothing here yet', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-300 mb-4">
          <Icon size={32} />
        </div>
      )}
      <h3 className="font-condensed font-bold text-navy-500 text-xl mb-1">{title}</h3>
      {description && <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">{description}</p>}
      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  )
}
