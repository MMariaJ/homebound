import { useState } from 'react'
import { KeyRound, Home, LogOut } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import InviteModal from './InviteModal'

export default function Header() {
  const { role, reset } = useAppStore()
  const [showInvite, setShowInvite] = useState(false)
  const isLandlord = role === 'landlord'
  const accent = isLandlord ? '#E67E22' : '#2980B9'
  const headerBg = isLandlord ? '#1A1A2E' : '#0F3460'

  return (
    <>
      <header
        className="sticky top-0 z-20 px-[18px] pt-3.5 pb-2.5"
        style={{ background: headerBg, minHeight: 52 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLandlord
              ? <KeyRound size={18} strokeWidth={2} color="#E67E22" />
              : <Home size={18} strokeWidth={2} color="#2980B9" />
            }
            <span className="text-white font-extrabold text-[17px]" style={{ letterSpacing: -0.5 }}>
              Homebound
            </span>
            <span
              className="text-[#CBD5E1] text-[10px] font-semibold rounded-[6px] px-1.5 py-0.5"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              {isLandlord ? 'LANDLORD' : 'TENANT'}
            </span>
          </div>

          <div className="flex gap-2">
            {isLandlord && (
              <button
                onClick={() => setShowInvite(true)}
                className="text-white font-bold text-[11px] rounded-lg px-2.5 py-1.5 border-none"
                style={{ background: accent }}
              >
                + Invite Tenant
              </button>
            )}
            <button
              onClick={reset}
              className="flex items-center gap-1 text-[#94A3B8] text-[11px] rounded-lg px-2.5 py-1.5 border border-[#334155] bg-transparent cursor-pointer"
            >
              <LogOut size={11} strokeWidth={2} />
              Exit
            </button>
          </div>
        </div>
      </header>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </>
  )
}
