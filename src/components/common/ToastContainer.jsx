import { useEffect } from 'react'
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md'
import useUIStore from '@store/uiStore'
import clsx from 'clsx'

const CONFIG = {
  success: { icon: <MdCheckCircle size={20} />, cls: 'bg-accent-500 text-white' },
  error:   { icon: <MdError       size={20} />, cls: 'bg-danger-500 text-white' },
  info:    { icon: <MdInfo        size={20} />, cls: 'bg-info-500 text-white' },
  warning: { icon: <MdWarning     size={20} />, cls: 'bg-warning-500 text-white' },
}

function Toast({ toast }) {
  const removeToast = useUIStore((s) => s.removeToast)
  const cfg = CONFIG[toast.type] ?? CONFIG.info

  useEffect(() => {
    const t = setTimeout(() => removeToast(toast.id), 4000)
    return () => clearTimeout(t)
  }, [toast.id, removeToast])

  return (
    <div className={clsx('flex items-center gap-3 px-4 py-3 rounded-xl shadow-card-hover min-w-[260px] max-w-sm animate-slide-up', cfg.cls)}>
      <span className="flex-shrink-0">{cfg.icon}</span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 opacity-80 hover:opacity-100">
        <MdClose size={18} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)
  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => <Toast key={t.id} toast={t} />)}
    </div>
  )
}
