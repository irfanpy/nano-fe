import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'
import clsx from 'clsx'

const SIZE_CLASSES = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
}

export default function Modal({ open, onClose, title, children, size = 'md', showClose = true }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/55 p-4 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        className={clsx(
          'relative z-10 w-full overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(8,17,27,0.28)]',
          SIZE_CLASSES[size] ?? SIZE_CLASSES.md
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {showClose ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-md transition hover:text-navy-500"
            aria-label="Close modal"
          >
            <MdClose size={22} />
          </button>
        ) : null}
        {children}
      </div>
    </div>,
    document.body
  )
}
