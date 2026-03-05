import { motion } from 'framer-motion'
import { KeyRound, Home } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function Splash() {
  const { setRole, setScreen } = useAppStore()

  const handleLandlord = () => {
    setRole('landlord')
    setScreen('contract-gate')
  }

  const handleTenant = () => {
    setRole('tenant')
    setScreen('dashboard')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{
        background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F3460 100%)',
      }}
    >
      <motion.div
        className="text-center w-full max-w-[360px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1
          className="text-white font-black mb-2.5"
          style={{ fontSize: 42, letterSpacing: -1.5 }}
        >
          Homebound
        </h1>
        <p
          className="text-text-secondary font-medium uppercase mb-14"
          style={{ fontSize: 13, letterSpacing: 3 }}
        >
          Know. Remind. Track.
        </p>

        <div className="flex flex-col gap-3">
          <motion.button
            onClick={handleLandlord}
            className="flex items-center justify-center gap-2.5 w-full py-[18px] px-8 rounded-[14px] bg-landlord-accent text-white font-bold text-base"
            style={{ letterSpacing: -0.3 }}
            whileTap={{ scale: 0.97 }}
          >
            <KeyRound size={18} strokeWidth={2.5} />
            I'm a Landlord
          </motion.button>

          <motion.button
            onClick={handleTenant}
            className="flex items-center justify-center gap-2.5 w-full py-[18px] px-8 rounded-[14px] bg-tenant-accent text-white font-bold text-base"
            style={{ letterSpacing: -0.3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home size={18} strokeWidth={2.5} />
            I'm a Tenant
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
