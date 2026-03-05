import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, MessageSquare, Plus, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { CHAT_CONTEXTS } from '../../data/comms'

export default function CommsTab() {
  const {
    role,
    chatThreads,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    createThread,
  } = useAppStore()

  const [newMsg, setNewMsg] = useState('')
  const [showNewThread, setShowNewThread] = useState(false)
  const [newContext, setNewContext] = useState('')
  const [newSubject, setNewSubject] = useState('')

  const accent = role === 'landlord' ? '#E67E22' : '#2980B9'
  const activeThread = activeThreadId
    ? chatThreads.find((t) => t.id === activeThreadId)
    : null

  const handleSend = () => {
    if (!newMsg.trim() || !activeThreadId || !role) return
    sendMessage(activeThreadId, newMsg.trim(), role)
    setNewMsg('')
  }

  const handleCreateThread = () => {
    if (!newSubject.trim() || !newContext) return
    createThread(newContext, newSubject.trim())
    setShowNewThread(false)
    setNewContext('')
    setNewSubject('')
  }

  // Thread view
  if (activeThread) {
    return (
      <div className="flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Thread header */}
        <div className="px-3.5 pt-3 pb-3 flex items-center gap-2.5 border-b border-border-default bg-surface">
          <button
            onClick={() => setActiveThreadId(null)}
            className="flex items-center gap-1 text-[13px] bg-[#F1F5F9] border-none rounded-lg px-2.5 py-1.5 cursor-pointer text-text-secondary"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back
          </button>
          <div>
            <p className="m-0 text-[14px] font-bold text-text-primary">{activeThread.subject}</p>
            <span
              className="text-[10px] rounded-[4px] px-[6px] py-[1px] bg-[#F1F5F9] text-[#475569]"
            >
              {activeThread.context}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-2.5">
          {activeThread.msgs.length === 0 && (
            <div className="text-center text-text-muted text-sm py-8">
              No messages yet. Start the conversation.
            </div>
          )}
          {activeThread.msgs.map((msg, i) => {
            const mine = msg.from === role
            return (
              <motion.div
                key={i}
                className="flex"
                style={{ justifyContent: mine ? 'flex-end' : 'flex-start' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="max-w-[78%] rounded-[14px] px-3 py-2.5"
                  style={{
                    background: mine ? accent : '#FFFFFF',
                    color: mine ? '#fff' : '#1E293B',
                    border: mine ? 'none' : '1px solid #E2E8F0',
                    borderRadius: mine ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  }}
                >
                  <p className="m-0 mb-1 text-[13px] leading-[1.4]">{msg.text}</p>
                  <div className="flex justify-between items-center gap-2.5">
                    <span
                      className="text-[10px] capitalize"
                      style={{ opacity: 0.7 }}
                    >
                      {msg.from}
                    </span>
                    <span className="text-[10px]" style={{ opacity: 0.7 }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Input */}
        <div className="flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-border-default bg-[#F8FAFC]">
          <input
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message…"
            className="flex-1 px-3 py-2.5 rounded-[10px] border border-border-default text-[13px] outline-none bg-white"
          />
          <button
            onClick={handleSend}
            className="flex items-center justify-center rounded-[10px] border-none cursor-pointer"
            style={{
              background: accent,
              width: 44,
              height: 44,
            }}
          >
            <Send size={15} strokeWidth={2} color="#fff" />
          </button>
        </div>
      </div>
    )
  }

  // Thread list
  return (
    <div className="px-3.5 py-3.5">
      {/* Header card */}
      <div className="bg-surface rounded-[14px] border border-border-default p-3.5 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare size={16} strokeWidth={2} color="#15803D" />
          <h3 className="m-0 text-text-primary font-extrabold" style={{ fontSize: 15 }}>
            Communications
          </h3>
        </div>
        <p className="m-0 text-[12px] text-text-secondary leading-relaxed">
          All messages are linked to a specific tenancy matter — repairs, deposit, notices. Every
          thread is timestamped and stored as evidence.
        </p>
      </div>

      {/* New thread creation */}
      <AnimatePresence>
        {showNewThread ? (
          <motion.div
            className="bg-surface border border-border-default rounded-[14px] p-4 mb-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="m-0 text-[13px] font-bold text-text-primary">New Thread</p>
              <button
                onClick={() => { setShowNewThread(false); setNewContext(''); setNewSubject('') }}
                className="bg-transparent border-none cursor-pointer text-text-muted"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <label className="block text-[11px] font-semibold text-text-secondary uppercase mb-1" style={{ letterSpacing: 0.5 }}>
              Category
            </label>
            <select
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              className="w-full mb-3 px-3 py-2.5 rounded-[8px] border border-border-default text-[13px] bg-white text-text-primary outline-none"
            >
              <option value="">Select a category…</option>
              {CHAT_CONTEXTS.map((ctx) => (
                <option key={ctx} value={ctx}>{ctx}</option>
              ))}
            </select>

            <label className="block text-[11px] font-semibold text-text-secondary uppercase mb-1" style={{ letterSpacing: 0.5 }}>
              Subject
            </label>
            <input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="e.g. Bathroom leak"
              className="w-full mb-3 px-3 py-2.5 rounded-[8px] border border-border-default text-[13px] outline-none bg-white"
            />

            <div className="flex gap-2">
              <button
                onClick={handleCreateThread}
                disabled={!newContext || !newSubject.trim()}
                className="flex-1 py-2.5 rounded-lg border-none text-white font-bold text-[13px] cursor-pointer disabled:opacity-40"
                style={{ background: accent }}
              >
                Start Thread
              </button>
              <button
                onClick={() => { setShowNewThread(false); setNewContext(''); setNewSubject('') }}
                className="flex-1 py-2.5 rounded-lg border border-border-default bg-[#F1F5F9] text-text-secondary font-semibold text-[13px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowNewThread(true)}
            className="w-full py-3 rounded-[12px] text-[13px] font-bold cursor-pointer mb-3 flex items-center justify-center gap-2"
            style={{
              background: '#fff',
              border: `1px dashed ${accent}`,
              color: accent,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Start New Thread
          </motion.button>
        )}
      </AnimatePresence>

      {/* Thread list */}
      {chatThreads.map((thread) => (
        <motion.div
          key={thread.id}
          onClick={() => setActiveThreadId(thread.id)}
          className="bg-surface border border-border-default rounded-[12px] px-3.5 py-3 mb-2 cursor-pointer flex gap-3 items-center"
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${accent}20` }}
          >
            <MessageSquare size={18} strokeWidth={1.8} color={accent} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between mb-[3px]">
              <span className="text-[13px] font-bold text-text-primary truncate">{thread.subject}</span>
              <span className="text-[11px] text-text-muted shrink-0 ml-2">{thread.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-text-secondary truncate">
                {thread.lastMsg
                  ? thread.lastMsg.slice(0, 45) + (thread.lastMsg.length > 45 ? '…' : '')
                  : 'No messages yet'}
              </span>
              {thread.unread > 0 && (
                <span
                  className="flex items-center justify-center text-white font-bold rounded-full shrink-0 ml-2"
                  style={{
                    background: accent,
                    width: 18,
                    height: 18,
                    fontSize: 10,
                  }}
                >
                  {thread.unread}
                </span>
              )}
            </div>
            <span
              className="mt-1 inline-block text-[10px] rounded-[4px] px-[6px] py-[1px] bg-[#F1F5F9] text-[#475569]"
            >
              {thread.context}
            </span>
          </div>
        </motion.div>
      ))}

      {chatThreads.length === 0 && !showNewThread && (
        <div className="text-center py-10 text-text-muted text-sm">
          No threads yet. Start a conversation about a specific matter.
        </div>
      )}
    </div>
  )
}
