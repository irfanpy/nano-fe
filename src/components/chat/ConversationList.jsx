export default function ConversationList({ conversations = [], activeId, onSelect }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-neutral-100">
        <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide">Messages</h3>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
        {conversations.length === 0 && (
          <p className="text-center text-neutral-400 text-sm py-10">No conversations yet.</p>
        )}
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect?.(c.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors
              ${c.id === activeId ? 'bg-primary-50 border-l-2 border-primary-500' : 'border-l-2 border-transparent'}`}
          >
            {c.img ? (
              <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                {c.name?.[0] ?? '?'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${c.unread > 0 ? 'font-semibold text-navy-500' : 'font-medium text-neutral-700'}`}>{c.name}</p>
                <span className="text-[10px] text-neutral-400 whitespace-nowrap flex-shrink-0">{c.time}</span>
              </div>
              <p className={`text-xs truncate mt-0.5 ${c.unread > 0 ? 'text-neutral-600' : 'text-neutral-400'}`}>{c.lastMessage}</p>
            </div>
            {c.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {c.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
