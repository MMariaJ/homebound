import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, AlertTriangle, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const ACCEPTED = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.heic'

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ContractGate() {
  const { uploadContract, setScreen } = useAppStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (file: File | null) => {
    if (!file) return
    setSelectedFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] ?? null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileChange(e.dataTransfer.files?.[0] ?? null)
  }

  const handleConfirm = () => {
    uploadContract()
    setScreen('invite-tenant')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-[400px] text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] flex items-center justify-center">
            <FileText size={28} strokeWidth={1.5} color="#E67E22" />
          </div>
        </div>

        <h2 className="text-text-primary font-extrabold mb-2" style={{ fontSize: 22 }}>
          Upload Your Tenancy Agreement
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          The AST is the engine behind everything in Homebound. Your obligations, your tenant's
          obligations, compliance deadlines, and evidence requirements all flow from this document.
          Upload it first to get started.
        </p>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={handleInputChange}
        />

        {/* Drop zone / file selected state */}
        {selectedFile ? (
          <motion.div
            className="bg-surface border-2 rounded-2xl p-6 mb-5 flex items-center gap-3 text-left"
            style={{ borderColor: '#22C55E' }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-success-bg flex items-center justify-center shrink-0">
              <FileText size={20} strokeWidth={1.5} color="#15803D" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="m-0 text-[13px] font-semibold text-text-primary truncate">
                {selectedFile.name}
              </p>
              <p className="m-0 text-[11px] text-text-secondary mt-0.5">
                {formatBytes(selectedFile.size)}
              </p>
            </div>
            <button
              onClick={handleClear}
              className="shrink-0 bg-transparent border-none cursor-pointer text-text-muted p-1"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="bg-surface rounded-2xl p-8 mb-5 cursor-pointer flex flex-col items-center gap-2.5"
            style={{
              border: `2px dashed ${dragOver ? '#E67E22' : '#CBD5E1'}`,
              background: dragOver ? '#FFF7ED' : '#FFFFFF',
            }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Upload size={28} strokeWidth={1.5} color={dragOver ? '#E67E22' : '#94A3B8'} />
            <p className="text-text-secondary text-sm font-semibold m-0">
              Tap to select or drag & drop
            </p>
            <p className="text-text-muted text-xs m-0">PDF, Word, or image accepted</p>
          </motion.div>
        )}

        {/* Confirm button — only active once file is chosen */}
        <motion.button
          onClick={handleConfirm}
          disabled={!selectedFile}
          className="w-full py-3.5 rounded-[12px] text-white font-bold text-[15px] border-none mb-4 transition-opacity"
          style={{
            background: '#E67E22',
            opacity: selectedFile ? 1 : 0.35,
            cursor: selectedFile ? 'pointer' : 'not-allowed',
          }}
          whileTap={selectedFile ? { scale: 0.97 } : {}}
        >
          Upload & Continue
        </motion.button>

        <div className="bg-warning-bg border border-[#FCD34D] rounded-[10px] px-3.5 py-2.5 text-left flex items-start gap-2">
          <AlertTriangle size={14} strokeWidth={2} color="#92400E" className="mt-0.5 shrink-0" />
          <p className="m-0 text-xs text-[#92400E]">
            Homebound will parse this contract to extract key dates, obligations and clauses. This
            cannot be skipped.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
