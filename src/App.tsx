import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import Splash from './components/Splash'
import ContractGate from './components/ContractGate'
import InviteTenant from './components/InviteTenant'
import Dashboard from './components/Dashboard'

const SCREEN_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function App() {
  const { screen } = useAppStore()

  return (
    <div className="min-h-screen bg-bg-light" style={{ maxWidth: 480, margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={SCREEN_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ minHeight: '100vh' }}
        >
          {screen === 'splash' && <Splash />}
          {screen === 'contract-gate' && <ContractGate />}
          {screen === 'invite-tenant' && <InviteTenant />}
          {screen === 'dashboard' && <Dashboard />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
