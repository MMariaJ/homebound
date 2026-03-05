export type Role = 'landlord' | 'tenant'

export type TaskType = 'legal' | 'suggested'

export type Phase =
  | 'Pre-Move-In'
  | 'Move-In'
  | 'During Tenancy'
  | 'Move-Out'
  | 'Post-Tenancy'

export interface Task {
  id: string
  label: string
  type: TaskType
  detail: string
  blocked?: boolean
  isContractUpload?: boolean
  isContractSign?: boolean
  vaultDoc?: string
  hasChat?: boolean
  chatContext?: string
}

export interface VaultDocument {
  id: string
  name: string
  owner: 'landlord' | 'tenant' | 'both'
  status: 'pending' | 'uploaded'
  uploadedAt?: string
  iconName: string
}

export interface ChatMessage {
  from: Role
  text: string
  time: string
}

export interface ChatThread {
  id: string
  context: string
  subject: string
  lastMsg: string
  time: string
  unread: number
  msgs: ChatMessage[]
}

export type Screen = 'splash' | 'contract-gate' | 'invite-tenant' | 'dashboard'

export type TabId = 'tasks' | 'vault' | 'comms' | 'payments'
