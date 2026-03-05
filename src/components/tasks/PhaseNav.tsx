import { ClipboardList, LogIn, Calendar, PackageOpen, BadgeCheck, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { PHASES, TASK_DATA } from '../../data/tasks'
import type { Phase } from '../../types'

const PHASE_ICONS = [
  ClipboardList,
  LogIn,
  Calendar,
  PackageOpen,
  BadgeCheck,
]

interface Props {
  completedCount: number
  totalCount: number
}

export default function PhaseNav({ completedCount, totalCount }: Props) {
  const { role, phaseIndex, setPhaseIndex } = useAppStore()
  const completed = useAppStore((s) => s.completed)
  const accent = role === 'landlord' ? '#E67E22' : '#2980B9'
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const phaseProgress = role
    ? PHASES.map((p: Phase) => {
        const tasks = (TASK_DATA[role][p] || []).filter(
          (t) => !t.isContractUpload && !t.isContractSign
        )
        const done = tasks.filter((t) => completed[t.id]).length
        return { total: tasks.length, done }
      })
    : []

  return (
    <div className="bg-surface border-b border-border-default px-3.5 pt-2.5 pb-2 mt-1">
      <div className="flex justify-between mb-2">
        {PHASES.map((phase, i) => {
          const PhaseIcon = PHASE_ICONS[i]
          const pc = phaseProgress[i] || { total: 0, done: 0 }
          const isDone = pc.total > 0 && pc.done === pc.total
          const isActive = phaseIndex === i

          return (
            <button
              key={phase}
              onClick={() => setPhaseIndex(i)}
              className="flex-1 flex flex-col items-center gap-[3px] bg-transparent border-none cursor-pointer px-0.5 py-0.5"
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 30,
                  height: 30,
                  background: isActive ? accent : isDone ? '#22C55E' : '#E2E8F0',
                }}
              >
                {isDone ? (
                  <Check size={14} strokeWidth={2.5} color="#fff" />
                ) : (
                  <PhaseIcon
                    size={14}
                    strokeWidth={2}
                    color={isActive ? '#fff' : '#94A3B8'}
                  />
                )}
              </div>
              <span
                className="text-center leading-[1.2]"
                style={{
                  fontSize: 8.5,
                  color: isActive ? accent : '#64748B',
                  fontWeight: isActive ? 700 : 400,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {phase.replace('-', '\n')}
              </span>
            </button>
          )
        })}
      </div>

      <div className="bg-[#E2E8F0] rounded h-[3px]">
        <div
          className="h-[3px] rounded"
          style={{
            width: `${progress}%`,
            background: accent,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div className="flex justify-between mt-[3px]">
        <span className="text-[10px] text-text-secondary font-semibold">
          {PHASES[phaseIndex]}
        </span>
        <span className="text-[10px] text-text-secondary">
          {completedCount}/{totalCount} complete
        </span>
      </div>
    </div>
  )
}
