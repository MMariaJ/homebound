import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Copy, Check } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const INVITE_LINK = 'homebound.app/join/xK9m2pQ4rL'

export default function InviteTenant() {
  const { setScreen } = useAppStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INVITE_LINK).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <div className="w-14 h-14 rounded-2xl bg-success-bg flex items-center justify-center">
            <CheckCircle size={28} strokeWidth={1.5} color="#22C55E" />
          </div>
        </div>

        <h2 className="text-text-primary font-extrabold mb-2" style={{ fontSize: 22 }}>
          Contract Uploaded
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Homebound has parsed your AST and activated your obligation checklist. Now invite your
          tenant — they'll receive their own checklist once they join.
        </p>

        <div className="bg-surface border border-border-default rounded-[14px] p-5 mb-5 text-left">
          <p className="mb-2.5 text-sm font-bold text-text-primary flex items-center gap-1.5">
            Share tenant invite link:
          </p>
          <div
            className="bg-[#F1F5F9] rounded-lg px-3 py-2.5 font-mono text-xs text-[#0F3460] mb-3 break-all"
          >
            {INVITE_LINK}
          </div>
          <p className="m-0 text-xs text-text-secondary">
            Your tenant uses this link to create their account and connect to this tenancy. The
            contract is already shared with them.
          </p>
        </div>

        <div className="flex gap-2 mb-3">
          <motion.button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] border border-border-default bg-surface text-text-secondary font-semibold text-sm"
            whileTap={{ scale: 0.97 }}
          >
            {copied ? <Check size={14} strokeWidth={2.5} color="#22C55E" /> : <Copy size={14} strokeWidth={2} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>

        <motion.button
          onClick={() => setScreen('dashboard')}
          className="w-full py-3.5 rounded-[12px] bg-landlord-accent text-white font-bold text-[15px]"
          whileTap={{ scale: 0.97 }}
        >
          Go to My Dashboard
        </motion.button>
      </motion.div>
    </div>
  )
}
