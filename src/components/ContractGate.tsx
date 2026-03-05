import { motion } from 'framer-motion'
import { Upload, FileText, AlertTriangle } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function ContractGate() {
  const { uploadContract, setScreen } = useAppStore()

  const handleUpload = () => {
    uploadContract()
    setScreen('invite-tenant')
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

        <motion.div
          className="bg-surface border-2 border-dashed border-[#CBD5E1] rounded-2xl p-8 mb-5 cursor-pointer flex flex-col items-center gap-2.5"
          onClick={handleUpload}
          whileTap={{ scale: 0.98 }}
          whileHover={{ borderColor: '#E67E22' }}
          transition={{ duration: 0.15 }}
        >
          <Upload size={28} strokeWidth={1.5} color="#94A3B8" />
          <p className="text-text-secondary text-sm font-semibold m-0">Tap to upload AST</p>
          <p className="text-text-muted text-xs m-0">PDF, Word, or image accepted</p>
        </motion.div>

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
