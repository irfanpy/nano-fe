import { useState, useRef } from 'react'
import { MdSend, MdAttachFile } from 'react-icons/md'

export default function MessageInput({ onSend, disabled = false }) {
  const [text, setText]   = useState('')
  const fileRef           = useRef(null)

  const send = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend?.(trimmed)
    setText('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="flex items-end gap-2 p-3 border-t border-neutral-100 bg-white">
      <button
        onClick={() => fileRef.current?.click()}
        className="btn-ghost btn-sm p-2 text-neutral-400 flex-shrink-0 self-center"
        title="Attach file"
        disabled={disabled}
      >
        <MdAttachFile size={20} />
      </button>
      <input ref={fileRef} type="file" className="hidden" />
      <textarea
        rows={1}
        className="flex-1 resize-none input py-2.5 text-sm max-h-32"
        placeholder="Type a message… (Enter to send)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        style={{ height: 'auto', minHeight: '42px' }}
        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
      />
      <button
        onClick={send}
        disabled={!text.trim() || disabled}
        className="btn-primary btn-sm p-2.5 flex-shrink-0 self-end disabled:opacity-40"
        title="Send"
      >
        <MdSend size={18} />
      </button>
    </div>
  )
}
