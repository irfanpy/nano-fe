import { useEffect, useRef } from 'react'

function isSameDay(a, b) {
  const da = new Date(a), db = new Date(b)
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate()
}

function dayLabel(dateStr) {
  const d   = new Date(dateStr)
  const now = new Date()
  if (isSameDay(d, now)) return 'Today'
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
  if (isSameDay(d, yesterday)) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function MessageThread({ messages = [], currentUserId }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  let lastDay = null

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {messages.map((msg, i) => {
        const isMine  = msg.senderId === currentUserId
        const msgDay  = msg.timestamp ? new Date(msg.timestamp).toDateString() : null
        const showDay = msgDay && msgDay !== lastDay
        if (showDay) lastDay = msgDay

        return (
          <div key={msg.id ?? i}>
            {showDay && (
              <div className="flex items-center gap-3 my-3">
                <span className="flex-1 border-t border-neutral-100" />
                <span className="text-xs text-neutral-400">{dayLabel(msg.timestamp)}</span>
                <span className="flex-1 border-t border-neutral-100" />
              </div>
            )}
            <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[72%] group`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${isMine
                    ? 'bg-primary-500 text-white rounded-br-sm'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-sm'
                  }`}>
                  {msg.text}
                </div>
                {msg.timestamp && (
                  <p className={`text-[10px] text-neutral-400 mt-0.5 ${isMine ? 'text-right' : 'text-left'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
