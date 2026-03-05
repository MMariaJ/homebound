import type { ChatThread } from '../types'

export const CHAT_CONTEXTS = [
  'Repair Request',
  'Deposit Deduction',
  'Rent Review',
  'Pre-existing Damage',
  'Unresolved Repair',
  'General',
]

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'c1',
    context: 'Repair Request',
    subject: 'Boiler not working',
    lastMsg: "Thanks for reporting. I'll arrange an engineer.",
    time: '2h ago',
    unread: 1,
    msgs: [
      { from: 'tenant', text: 'The boiler stopped working this morning — no hot water.', time: '10:02' },
      { from: 'landlord', text: "Thanks for reporting. I'll arrange an engineer.", time: '12:14' },
    ],
  },
  {
    id: 'c2',
    context: 'Deposit Deduction',
    subject: 'End of tenancy deposit',
    lastMsg: 'Can you clarify the cleaning charge?',
    time: 'Yesterday',
    unread: 0,
    msgs: [
      { from: 'landlord', text: "I'm proposing a £120 deduction for professional cleaning.", time: '09:00' },
      { from: 'tenant', text: 'Can you clarify the cleaning charge? The property was clean when I left.', time: '09:45' },
    ],
  },
]
