import { useState } from 'react'
import { MdArrowUpward, MdArrowDownward, MdUnfoldMore } from 'react-icons/md'

export default function DataTable({ columns = [], data = [], loading = false, onSort }) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (!key) return
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc'
    setSortKey(key)
    setSortDir(newDir)
    onSort?.(key, newDir)
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left px-5 py-3 text-neutral-400 text-xs uppercase tracking-wider font-medium whitespace-nowrap
                    ${col.sortable ? 'cursor-pointer select-none hover:text-navy-500 transition-colors' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      sortKey === col.key
                        ? sortDir === 'asc' ? <MdArrowUpward size={13} /> : <MdArrowDownward size={13} />
                        : <MdUnfoldMore size={13} className="opacity-40" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4">
                        <div className="skeleton h-4 rounded w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.length === 0
              ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-14 text-neutral-400 text-sm">
                    No records found.
                  </td>
                </tr>
              )
              : data.map((row, i) => (
                  <tr key={row.id ?? i} className="hover:bg-neutral-50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3.5">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
