import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

function getPages(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (page >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', page - 1, page, page + 1, '…', total]
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = getPages(page, totalPages)

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="btn-ghost btn-sm p-2 disabled:opacity-30"
        aria-label="Previous"
      >
        <MdChevronLeft size={18} />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`el-${i}`} className="px-2 text-neutral-400 text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all
              ${p === page
                ? 'bg-primary-500 text-white shadow-gold'
                : 'text-neutral-600 hover:bg-neutral-100'
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="btn-ghost btn-sm p-2 disabled:opacity-30"
        aria-label="Next"
      >
        <MdChevronRight size={18} />
      </button>
    </div>
  )
}
