import {
  FileText,
  Shield,
  Bell,
  AlertTriangle,
  ClipboardList,
  CheckSquare,
  Home,
  PackageOpen,
  Lock,
  Upload,
  Check,
  Plus,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { VaultDocument } from '../../types'

const ICON_MAP: Record<string, typeof FileText> = {
  FileText,
  Shield,
  Bell,
  AlertTriangle,
  ClipboardList,
  CheckSquare,
  Home,
  PackageOpen,
  Lock,
}

function VaultDocRow({ doc }: { doc: VaultDocument }) {
  const { markVaultUploaded } = useAppStore()
  const Icon = ICON_MAP[doc.iconName] || FileText
  const uploaded = doc.status === 'uploaded'

  return (
    <div
      className="bg-surface rounded-[12px] px-3.5 py-3.5 mb-2 flex items-center gap-3"
      style={{ border: `1px solid ${uploaded ? '#86EFAC' : '#E2E8F0'}` }}
    >
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
        style={{ background: uploaded ? '#DCFCE7' : '#F1F5F9' }}
      >
        <Icon size={22} strokeWidth={1.5} color="#475569" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="m-0 mb-[3px] text-[13px] font-bold text-text-primary truncate">
          {doc.name}
        </p>
        <div className="flex gap-1.5 items-center flex-wrap">
          <span className="text-[10px] text-text-secondary">
            {doc.owner === 'both' ? 'Either party' : doc.owner.charAt(0).toUpperCase() + doc.owner.slice(1)}
          </span>
          <span
            className="text-[10px] font-semibold rounded-[4px] px-[5px] py-[1px]"
            style={{
              background: uploaded ? '#F0FDF4' : '#F8FAFC',
              color: uploaded ? '#15803D' : '#94A3B8',
              border: `1px solid ${uploaded ? '#86EFAC' : '#E2E8F0'}`,
            }}
          >
            {uploaded ? 'Uploaded' : 'Pending'}
          </span>
          {uploaded && doc.uploadedAt && (
            <span className="text-[10px] text-text-muted">{doc.uploadedAt}</span>
          )}
        </div>
      </div>

      {!uploaded ? (
        <button
          onClick={() => markVaultUploaded(doc.name)}
          className="flex items-center gap-1 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 cursor-pointer"
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            color: '#475569',
          }}
        >
          <Upload size={11} strokeWidth={2} />
          Upload
        </button>
      ) : (
        <Check size={18} strokeWidth={2.5} color="#22C55E" />
      )}
    </div>
  )
}

export default function VaultTab() {
  const { vault } = useAppStore()
  const uploadedCount = vault.filter((d) => d.status === 'uploaded').length

  return (
    <div className="px-3.5 py-3.5">
      <div className="bg-surface rounded-[14px] border border-border-default p-3.5 mb-3.5">
        <div className="flex items-center gap-2 mb-1">
          <Lock size={16} strokeWidth={2} color="#7C3AED" />
          <h3 className="m-0 text-text-primary font-extrabold" style={{ fontSize: 15 }}>
            Shared Evidence Vault
          </h3>
        </div>
        <p className="m-0 text-[12px] text-text-secondary leading-relaxed">
          All documents are stored securely and accessible to both landlord and tenant. Every upload
          is timestamped and legally admissible.
        </p>
        <div className="mt-2 pt-2 border-t border-border-default flex items-center gap-1.5">
          <span
            className="text-[11px] font-bold"
            style={{ color: uploadedCount > 0 ? '#15803D' : '#94A3B8' }}
          >
            {uploadedCount}/{vault.length} documents uploaded
          </span>
        </div>
      </div>

      {vault.map((doc) => (
        <VaultDocRow key={doc.id} doc={doc} />
      ))}

      <div
        className="rounded-[12px] px-3.5 py-3.5 text-center mt-2 cursor-pointer"
        style={{
          background: '#F8FAFC',
          border: '1px dashed #CBD5E1',
        }}
      >
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <Plus size={14} strokeWidth={2} color="#475569" />
          <p className="m-0 text-[13px] text-[#475569] font-semibold">Add Document</p>
        </div>
        <p className="m-0 text-[11px] text-text-muted">
          Upload additional evidence — inspection reports, invoices, notices
        </p>
      </div>
    </div>
  )
}
