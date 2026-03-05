import { FileText, Upload } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { PHASES, TASK_DATA } from '../../data/tasks'
import PhaseNav from './PhaseNav'
import TaskCard from './TaskCard'
import { TYPE_CONFIG } from './TaskCard'

export default function TasksTab() {
  const { role, phaseIndex, completed, contractUploaded, uploadContract, setScreen } =
    useAppStore()

  if (!role) return null

  const currentPhase = PHASES[phaseIndex]
  const allTasks = TASK_DATA[role][currentPhase] || []
  const contractTask = allTasks.find((t) => t.isContractUpload || t.isContractSign)
  const visibleTasks = allTasks.filter((t) => !t.isContractUpload && !t.isContractSign)
  const completedCount = visibleTasks.filter((t) => completed[t.id]).length
  const isLandlord = role === 'landlord'

  const handleUploadFromBanner = () => {
    uploadContract()
    // Contract gate was already passed for landlords; this handles if somehow reset
  }

  return (
    <div>
      {/* Contract banner */}
      {contractTask && (
        <div
          className="mx-3.5 mt-3 mb-1 rounded-[12px] px-3.5 py-3 flex items-center gap-2.5"
          style={{
            background: contractUploaded ? '#F0FDF4' : '#FFFBEB',
            border: `1px solid ${contractUploaded ? '#86EFAC' : '#FCD34D'}`,
          }}
        >
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: contractUploaded ? '#DCFCE7' : '#FEF3C7' }}
          >
            <FileText
              size={18}
              strokeWidth={1.5}
              color={contractUploaded ? '#15803D' : '#92400E'}
            />
          </div>
          <div className="flex-1">
            <p
              className="m-0 text-[13px] font-bold"
              style={{ color: contractUploaded ? '#15803D' : '#92400E' }}
            >
              {contractUploaded
                ? 'AST uploaded — obligations active'
                : 'Upload AST to unlock checklist'}
            </p>
            <p
              className="mt-0.5 mb-0 text-[11px]"
              style={{ color: contractUploaded ? '#16A34A' : '#B45309' }}
            >
              {contractUploaded
                ? 'Contract is the engine. All tasks are now live.'
                : isLandlord
                ? 'The contract must be uploaded before any tasks can begin.'
                : 'Waiting for landlord to upload the AST.'}
            </p>
          </div>
          {!contractUploaded && isLandlord && (
            <button
              onClick={handleUploadFromBanner}
              className="text-white text-[12px] font-bold rounded-lg px-3 py-1.5 border-none cursor-pointer"
              style={{ background: '#E67E22' }}
            >
              Upload
            </button>
          )}
        </div>
      )}

      {/* Phase navigation */}
      <PhaseNav completedCount={completedCount} totalCount={visibleTasks.length} />

      {/* Legend */}
      <div
        className="flex gap-3.5 px-3.5 py-1.5 bg-surface border-b border-border-default"
      >
        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1">
            <div
              className="rounded-full"
              style={{ width: 7, height: 7, background: cfg.color }}
            />
            <span className="text-[10px] text-text-secondary">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Task list */}
      <div className="px-3.5 pt-2.5 pb-6">
        {visibleTasks.map((task) => {
          const isLocked = !!task.blocked && !contractUploaded
          return <TaskCard key={task.id} task={task} isLocked={isLocked} />
        })}

        {visibleTasks.length === 0 && (
          <div className="text-center py-10 text-text-muted text-sm">
            No tasks for this phase.
          </div>
        )}
      </div>
    </div>
  )
}
