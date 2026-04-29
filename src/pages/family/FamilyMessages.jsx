import { useState, useRef, useEffect } from 'react'
import { MdSend, MdSearch, MdMenu } from 'react-icons/md'

const CONVOS = [
  {
    id: 1, name: 'Maria Santos', role: 'Housemaid', img: 'https://i.pravatar.cc/150?img=47', online: true, unread: 2,
    messages: [
      { id: 1, from: 'helper', text: 'Good morning! I will arrive at 8am tomorrow as agreed.', time: '9:00 AM' },
      { id: 2, from: 'family', text: 'Great, thank you Maria! Please remember to bring your Emirates ID for the records.', time: '9:05 AM' },
      { id: 3, from: 'helper', text: 'Of course, I have it ready. See you tomorrow!', time: '9:07 AM' },
      { id: 4, from: 'helper', text: 'Also, should I prepare breakfast for the children?', time: '9:08 AM' },
    ],
  },
  {
    id: 2, name: 'Priya Nair', role: 'Nanny', img: 'https://i.pravatar.cc/150?img=44', online: false, unread: 1,
    messages: [
      { id: 1, from: 'family', text: 'Hi Priya, we reviewed your profile and would love to schedule a call.', time: 'Yesterday' },
      { id: 2, from: 'helper', text: 'Thank you for the booking request! I would love to speak with you. What time works best?', time: 'Yesterday' },
    ],
  },
  {
    id: 3, name: 'Platform Team', role: 'Support', img: null, online: true, unread: 0,
    messages: [
      { id: 1, from: 'helper', text: 'Your contract with Maria Santos has been approved and countersigned.', time: '2 days ago' },
      { id: 2, from: 'helper', text: 'Visa application for Maria has been submitted. Reference: GDRFA-2024-00812', time: '2 days ago' },
    ],
  },
]

export default function FamilyMessages() {
  const [selectedId, setSelectedId] = useState(1)
  const [input, setInput] = useState('')
  const [conversations, setConversations] = useState(CONVOS)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef(null)

  const selected = conversations.find((c) => c.id === selectedId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedId, selected?.messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setConversations((cs) => cs.map((c) =>
      c.id === selectedId
        ? { ...c, messages: [...c.messages, { id: Date.now(), from: 'family', text: input.trim(), time: 'Just now' }], unread: 0 }
        : c
    ))
    setInput('')
  }

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const selectConvo = (id) => {
    setSelectedId(id)
    setSidebarOpen(false)
    setConversations((cs) => cs.map((c) => c.id === id ? { ...c, unread: 0 } : c))
  }

  return (
    <div className="flex h-[calc(100vh-128px)] overflow-hidden rounded-2xl shadow-card bg-white border border-neutral-100">

      {/* Conversation List */}
      <aside className={`${sidebarOpen ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-72 border-r border-neutral-100 flex-shrink-0 absolute lg:static inset-y-0 left-0 z-30 bg-white rounded-l-2xl`}>
        <div className="p-4 border-b border-neutral-100">
          <h3 className="font-condensed font-bold text-navy-500 text-lg tracking-wide mb-3">Messages</h3>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input type="text" placeholder="Search…" className="input pl-8 py-2 text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button key={c.id} onClick={() => selectConvo(c.id)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-neutral-50 border-b border-neutral-50 ${selectedId === c.id ? 'bg-primary-50 border-l-2 border-l-primary-500' : ''}`}>
              <div className="relative flex-shrink-0">
                {c.img
                  ? <img src={c.img} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                  : <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">{c.name[0]}</div>
                }
                {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent-500 border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-500 text-sm truncate">{c.name}</p>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 truncate">{c.messages.at(-1)?.text}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-20 bg-black/40" onClick={() => setSidebarOpen(false)} />}

      {/* Message Thread */}
      {selected && (
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-100 flex-shrink-0">
            <button className="lg:hidden text-neutral-400 hover:text-navy-500" onClick={() => setSidebarOpen(true)}>
              <MdMenu size={22} />
            </button>
            {selected.img
              ? <img src={selected.img} alt={selected.name} className="w-9 h-9 rounded-full object-cover" />
              : <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">{selected.name[0]}</div>
            }
            <div>
              <p className="font-semibold text-navy-500 text-sm">{selected.name}</p>
              <p className="text-xs text-neutral-400 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${selected.online ? 'bg-accent-500' : 'bg-neutral-300'}`} />
                {selected.online ? 'Online' : 'Offline'} · {selected.role}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-50/50">
            {selected.messages.map((msg) => {
              const isFamily = msg.from === 'family'
              return (
                <div key={msg.id} className={`flex ${isFamily ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${isFamily
                      ? 'bg-primary-500 text-white rounded-br-sm'
                      : 'bg-white text-neutral-700 border border-neutral-100 rounded-bl-sm'
                    }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${isFamily ? 'text-white/70 text-right' : 'text-neutral-400'}`}>{msg.time}</p>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-end gap-3 p-4 border-t border-neutral-100 bg-white flex-shrink-0">
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder="Type a message…" rows={1}
              className="flex-1 input resize-none text-sm py-2.5 max-h-32 overflow-y-auto"
            />
            <button onClick={sendMessage} disabled={!input.trim()}
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${input.trim() ? 'bg-primary-500 text-white shadow-gold hover:bg-primary-600 active:scale-95' : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}`}>
              <MdSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
