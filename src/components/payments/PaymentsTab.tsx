import { CreditCard, Lock, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

const PAYMENT_HISTORY = [
  { date: '01 Mar 2026', amount: '£1,450', status: 'paid' as const },
  { date: '01 Feb 2026', amount: '£1,450', status: 'paid' as const },
  { date: '01 Jan 2026', amount: '£1,450', status: 'paid' as const },
  { date: '01 Dec 2025', amount: '£1,450', status: 'paid' as const },
]

export default function PaymentsTab() {
  const { role } = useAppStore()
  const isLandlord = role === 'landlord'
  const headerBg = isLandlord ? '#1A1A2E' : '#0F3460'

  return (
    <div className="px-3.5 py-3.5">
      {/* Header card */}
      <div className="bg-surface rounded-[14px] border border-border-default p-3.5 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <CreditCard size={16} strokeWidth={2} color="#2980B9" />
          <h3 className="m-0 text-text-primary font-extrabold" style={{ fontSize: 15 }}>
            Payments
          </h3>
        </div>
        <p className="m-0 text-[12px] text-text-secondary leading-relaxed">
          Rent is monitored automatically via open banking. All payments are timestamped and stored
          as evidence.
        </p>
      </div>

      {/* Rent ledger */}
      <div
        className="bg-surface border border-border-default rounded-[12px] overflow-hidden mb-3"
      >
        <div className="px-4 py-3.5" style={{ background: headerBg }}>
          <p className="m-0 mb-[2px] text-[11px]" style={{ color: '#94A3B8' }}>
            Monthly rent
          </p>
          <p className="m-0 text-white font-extrabold" style={{ fontSize: 26 }}>
            £1,450{' '}
            <span className="text-[14px]" style={{ color: '#94A3B8', fontWeight: 400 }}>
              / month
            </span>
          </p>
        </div>

        <div className="px-4 py-3.5">
          {PAYMENT_HISTORY.map((payment, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2.5"
              style={{
                borderBottom:
                  i < PAYMENT_HISTORY.length - 1 ? '1px solid #F1F5F9' : 'none',
              }}
            >
              <div>
                <p className="m-0 text-[13px] font-semibold text-text-primary">{payment.date}</p>
                <span className="text-[10px] text-text-muted">Via open banking · verified</span>
              </div>
              <div className="text-right">
                <p className="m-0 mb-[2px] text-[13px] font-bold text-text-primary">
                  {payment.amount}
                </p>
                <span
                  className="text-[10px] font-semibold rounded-[4px] px-[5px] py-[1px]"
                  style={{
                    background: '#F0FDF4',
                    color: '#15803D',
                    border: '1px solid #86EFAC',
                  }}
                >
                  <Check
                    size={9}
                    strokeWidth={2.5}
                    color="#15803D"
                    style={{ display: 'inline', marginRight: 2, verticalAlign: 'middle' }}
                  />
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit status */}
      <div
        className="rounded-[12px] px-3.5 py-3 flex items-center gap-2.5"
        style={{
          background: '#FFFBEB',
          border: '1px solid #FCD34D',
        }}
      >
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: '#FEF3C7' }}
        >
          <Lock size={18} strokeWidth={1.8} color="#92400E" />
        </div>
        <div>
          <p className="m-0 mb-[2px] text-[13px] font-bold" style={{ color: '#92400E' }}>
            Deposit held
          </p>
          <p className="m-0 text-[12px]" style={{ color: '#92400E' }}>
            £1,450 · Protected with MyDeposits · Ref: MD2024-88421
          </p>
        </div>
      </div>
    </div>
  )
}
