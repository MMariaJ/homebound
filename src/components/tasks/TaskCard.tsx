import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Lock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Upload,
  AlertTriangle,
} from 'lucide-react'
import type { Task } from '../../types'
import { useAppStore } from '../../store/useAppStore'

const TYPE_CONFIG = {
  legal: {
    label: 'Legal',
    color: '#C0392B',
    bg: '#FDF2F2',
    border: '#F5C6C6',
  },
  suggested: {
    label: 'Recommended',
    color: '#2471A3',
    bg: '#F0F6FC',
    border: '#BDD6ED',
  },
}

interface Props {
  task: Task
  isLocked: boolean
}

export default function TaskCard({ task, isLocked }: Props) {
  const {
    completed,
    expandedTask,
    toggleTask,
    setExpandedTask,
    markVaultUploaded,
    setActiveTab,
    openChatFromTask,
  } = useAppStore()

  const isDone = !!completed[task.id]
  const isExpanded = expandedTask === task.id
  const cfg = TYPE_CONFIG[task.type]
  const handleCardClick = () => {
    if (isLocked) return
    setExpandedTask(isExpanded ? null : task.id)
  }

  const handleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLocked) toggleTask(task.id)
  }

  const handleOpenComms = () => {
    if (task.chatContext) openChatFromTask(task.chatContext)
  }

  const handleOpenVault = () => {
    if (task.vaultDoc) {
      markVaultUploaded(task.vaultDoc)
      setActiveTab('vault')
    }
  }

  return (
    <motion.div
      layout
      className="rounded-[12px] overflow-hidden mb-2"
      style={{
        background: isLocked ? '#F8FAFC' : isDone ? '#F0FDF4' : '#FFFFFF',
        border: `1px solid ${isLocked ? '#E2E8F0' : isDone ? '#86EFAC' : cfg.border}`,
        opacity: isLocked ? 0.55 : 1,
        transition: 'opacity 0.2s, background 0.2s',
      }}
    >
      {/* Main row */}
      <div
        className="flex items-center px-3 py-3.5 gap-2.5"
        style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
        onClick={handleCardClick}
      >
        {/* Checkbox */}
        <div
          className="flex items-center justify-center shrink-0 rounded-[6px]"
          style={{
            width: 22,
            height: 22,
            border: `2px solid ${isDone ? '#22C55E' : '#CBD5E1'}`,
            background: isDone ? '#22C55E' : '#fff',
            cursor: isLocked ? 'not-allowed' : 'pointer',
          }}
          onClick={handleCheckbox}
        >
          {isDone && <Check size={12} strokeWidth={3} color="#fff" />}
          {isLocked && !isDone && <Lock size={10} strokeWidth={2} color="#CBD5E1" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-[3px] flex-wrap">
            <span
              className="uppercase font-bold rounded-[4px] px-[5px] py-[1px]"
              style={{
                fontSize: 9,
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.color}40`,
                letterSpacing: 0.3,
              }}
            >
              {cfg.label}
            </span>

            {task.hasChat && !isLocked && (
              <span
                className="uppercase font-bold rounded-[4px] px-[5px] py-[1px]"
                style={{
                  fontSize: 9,
                  background: '#F0FDF4',
                  color: '#15803D',
                  border: '1px solid #86EFAC',
                  letterSpacing: 0.3,
                }}
              >
                COMMS
              </span>
            )}

            {task.vaultDoc && !isLocked && (
              <span
                className="uppercase font-bold rounded-[4px] px-[5px] py-[1px]"
                style={{
                  fontSize: 9,
                  background: '#F5F3FF',
                  color: '#7C3AED',
                  border: '1px solid #C4B5FD',
                  letterSpacing: 0.3,
                }}
              >
                VAULT
              </span>
            )}
          </div>

          <p
            className="m-0 leading-[1.3]"
            style={{
              fontSize: 13,
              fontWeight: isDone ? 400 : 600,
              color: isDone ? '#86EFAC' : isLocked ? '#94A3B8' : '#1E293B',
              textDecoration: isDone ? 'line-through' : 'none',
            }}
          >
            {task.label}
          </p>
        </div>

        {!isLocked && (
          isExpanded
            ? <ChevronUp size={14} strokeWidth={2} color="#94A3B8" />
            : <ChevronDown size={14} strokeWidth={2} color="#94A3B8" />
        )}
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && !isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-3 pb-3 pt-2.5"
              style={{
                paddingLeft: 43,
                background: cfg.bg,
                borderTop: `1px solid ${cfg.color}20`,
              }}
            >
              <p className="text-[#475569] text-[13px] leading-[1.5] mb-2 mt-0">{task.detail}</p>

              <div className="flex gap-2 flex-wrap items-center">
                {task.hasChat && (
                  <button
                    onClick={handleOpenComms}
                    className="flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-2.5 py-[5px] cursor-pointer"
                    style={{
                      background: '#fff',
                      border: '1px solid #86EFAC',
                      color: '#15803D',
                    }}
                  >
                    <MessageSquare size={12} strokeWidth={2} />
                    Open {task.chatContext} Thread
                  </button>
                )}

                {task.vaultDoc && (
                  <button
                    onClick={handleOpenVault}
                    className="flex items-center gap-1.5 text-[12px] font-semibold rounded-lg px-2.5 py-[5px] cursor-pointer"
                    style={{
                      background: '#fff',
                      border: '1px solid #C4B5FD',
                      color: '#7C3AED',
                    }}
                  >
                    <Upload size={12} strokeWidth={2} />
                    Upload to Vault
                  </button>
                )}

                {task.type === 'legal' && (
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle size={12} strokeWidth={2} color="#C0392B" />
                    <span
                      className="font-semibold"
                      style={{ fontSize: 11, color: '#C0392B' }}
                    >
                      Legal obligation — penalties may apply if missed
                    </span>
                  </div>
                )}
              </div>

              {/* Inline "Open Comms" link for context-less tasks */}
              {task.hasChat && task.chatContext && (
                <div />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export { TYPE_CONFIG }
