import { MdWarning, MdHelpOutline } from 'react-icons/md'
import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', description, danger = false }) {
  return (
    <Modal open={open} onClose={onClose} size="sm" title={title}>
      <div className="p-6 space-y-5">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${danger ? 'bg-danger-50 text-danger-500' : 'bg-warning-50 text-warning-500'}`}>
            {danger ? <MdWarning size={22} /> : <MdHelpOutline size={22} />}
          </div>
          <div>
            <h3 className="font-condensed font-bold text-navy-500 text-lg">{title}</h3>
            {description && <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{description}</p>}
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button
            onClick={() => { onConfirm?.(); onClose?.() }}
            className={danger ? 'btn-danger' : 'btn-primary'}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}
