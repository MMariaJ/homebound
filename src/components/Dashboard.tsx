import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import Header from './Header'
import TabBar from './TabBar'
import TasksTab from './tasks/TasksTab'
import VaultTab from './vault/VaultTab'
import CommsTab from './comms/CommsTab'
import PaymentsTab from './payments/PaymentsTab'

const TAB_VARIANTS = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
}

export default function Dashboard() {
  const { activeTab } = useAppStore()

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <Header />
      <TabBar />

      <div className="flex-1 overflow-y-auto pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={TAB_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {activeTab === 'tasks' && <TasksTab />}
            {activeTab === 'vault' && <VaultTab />}
            {activeTab === 'comms' && <CommsTab />}
            {activeTab === 'payments' && <PaymentsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
