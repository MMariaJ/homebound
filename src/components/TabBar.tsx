import { CheckSquare, Lock, MessageSquare, CreditCard } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { TabId } from '../types'

const TABS: { id: TabId; icon: typeof CheckSquare; label: string }[] = [
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'vault', icon: Lock, label: 'Vault' },
  { id: 'comms', icon: MessageSquare, label: 'Comms' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
]

export default function TabBar() {
  const { activeTab, setActiveTab, role, chatThreads } = useAppStore()
  const accent = role === 'landlord' ? '#E67E22' : '#2980B9'
  const totalUnread = chatThreads.reduce((sum, t) => sum + t.unread, 0)

  return (
    <nav
      className="bg-surface border-b border-border-default flex sticky z-19"
      style={{ top: 52, zIndex: 19 }}
    >
      {TABS.map(({ id, icon: Icon, label }) => {
        const active = activeTab === id
        const showBadge = id === 'comms' && totalUnread > 0
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex-1 flex flex-col items-center gap-[3px] py-2.5 pb-[9px] border-none bg-transparent cursor-pointer relative"
            style={{
              borderBottom: `2px solid ${active ? accent : 'transparent'}`,
              color: active ? accent : '#94A3B8',
              fontSize: 11,
              fontWeight: active ? 700 : 500,
              letterSpacing: 0.2,
            }}
          >
            <div className="relative">
              <Icon size={16} strokeWidth={2} />
              {showBadge && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center text-white font-bold rounded-full"
                  style={{
                    background: accent,
                    width: 14,
                    height: 14,
                    fontSize: 8,
                  }}
                >
                  {totalUnread}
                </span>
              )}
            </div>
            {label}
          </button>
        )
      })}
    </nav>
  )
}
