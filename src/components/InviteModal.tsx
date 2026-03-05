import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const INVITE_LINK = 'homebound.app/join/xK9m2pQ4rL'

interface Props {
  onClose: () => void
}

export default function InviteModal({ onClose }: Props) {
  const { role } = useAppStore()
  const accent = role === 'landlord' ? '#E67E22' : '#2980B9'
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INVITE_LINK).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      >
        <motion.div
          className="bg-surface rounded-2xl p-6 w-full max-w-[340px]"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-extrabold text-text-primary m-0">
              Invite Your Tenant
            </h3>
            <button
              onClick={onClose}
              className="text-text-muted bg-transparent border-none cursor-pointer p-1"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <p className="text-text-secondary text-[13px] mb-4 leading-relaxed">
            Share this link. Once they join, their obligation checklist activates and they're
            connected to this tenancy.
          </p>

          <div className="bg-[#F1F5F9] rounded-[10px] px-3 py-2.5 font-mono text-xs text-[#0F3460] mb-3.5 break-all">
            {INVITE_LINK}
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-white font-bold text-[13px] border-none"
              style={{ background: accent }}
              whileTap={{ scale: 0.97 }}
            >
              {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-[10px] bg-surface border border-border-default text-text-secondary font-semibold text-[13px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
