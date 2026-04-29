export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-12 rounded" />
        </div>
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
