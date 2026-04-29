import { useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

export default function ShortlistButton({ helperId: _helperId, isShortlisted: initial = false, onToggle, className = '' }) {
  const [saved,   setSaved]   = useState(initial)
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    if (loading) return
    const next = !saved
    setSaved(next)   // optimistic
    setLoading(true)
    try {
      await onToggle?.(next)
    } catch {
      setSaved(!next) // revert on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={saved ? 'Remove from shortlist' : 'Add to shortlist'}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90
        ${saved
          ? 'bg-danger-50 text-danger-500 hover:bg-danger-100'
          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-danger-400'
        } ${className}`}
    >
      {saved ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
    </button>
  )
}
