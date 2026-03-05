import { create } from 'zustand'
import type { Role, Screen, TabId, Phase, VaultDocument, ChatThread } from '../types'
import { INITIAL_VAULT_DOCS } from '../data/vault'
import { INITIAL_CHAT_THREADS } from '../data/comms'
import { PHASES } from '../data/tasks'

interface AppState {
  // Navigation
  screen: Screen
  activeTab: TabId
  role: Role | null
  phaseIndex: number

  // Task state
  completed: Record<string, boolean>
  expandedTask: string | null
  contractUploaded: boolean

  // Vault state
  vault: VaultDocument[]

  // Comms state
  chatThreads: ChatThread[]
  activeThreadId: string | null

  // Actions
  setScreen: (screen: Screen) => void
  setActiveTab: (tab: TabId) => void
  setRole: (role: Role) => void
  setPhaseIndex: (index: number) => void
  toggleTask: (id: string) => void
  setExpandedTask: (id: string | null) => void
  uploadContract: () => void
  markVaultUploaded: (docName: string) => void
  setActiveThreadId: (id: string | null) => void
  sendMessage: (threadId: string, text: string, from: Role) => void
  createThread: (context: string, subject: string) => string
  openChatFromTask: (context: string) => void
  reset: () => void
}

const currentPhase = (): Phase => PHASES[0]
void currentPhase

export const useAppStore = create<AppState>((set, get) => ({
  screen: 'splash',
  activeTab: 'tasks',
  role: null,
  phaseIndex: 0,
  completed: {},
  expandedTask: null,
  contractUploaded: false,
  vault: INITIAL_VAULT_DOCS,
  chatThreads: INITIAL_CHAT_THREADS,
  activeThreadId: null,

  setScreen: (screen) => set({ screen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setRole: (role) => set({ role }),
  setPhaseIndex: (index) => set({ phaseIndex: index }),

  toggleTask: (id) =>
    set((state) => ({
      completed: { ...state.completed, [id]: !state.completed[id] },
    })),

  setExpandedTask: (id) => set({ expandedTask: id }),

  uploadContract: () => {
    set({ contractUploaded: true })
    get().markVaultUploaded('Tenancy Agreement (AST)')
  },

  markVaultUploaded: (docName) => {
    const now = new Date()
    const timestamp = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    set((state) => ({
      vault: state.vault.map((d) =>
        d.name === docName ? { ...d, status: 'uploaded', uploadedAt: timestamp } : d
      ),
    }))
  },

  setActiveThreadId: (id) => set({ activeThreadId: id }),

  sendMessage: (threadId, text, from) => {
    const time = new Date().toTimeString().slice(0, 5)
    set((state) => ({
      chatThreads: state.chatThreads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMsg: text,
              time: 'Just now',
              msgs: [...t.msgs, { from, text, time }],
            }
          : t
      ),
    }))
  },

  createThread: (context, subject) => {
    const id = 'c' + Date.now()
    const newThread: ChatThread = {
      id,
      context,
      subject,
      lastMsg: '',
      time: 'Just now',
      unread: 0,
      msgs: [],
    }
    set((state) => ({
      chatThreads: [...state.chatThreads, newThread],
      activeThreadId: id,
    }))
    return id
  },

  openChatFromTask: (context) => {
    const { chatThreads } = get()
    const existing = chatThreads.find((t) => t.context === context)
    if (existing) {
      set({ activeThreadId: existing.id, activeTab: 'comms' })
    } else {
      set({ activeTab: 'comms' })
    }
  },

  reset: () =>
    set({
      screen: 'splash',
      activeTab: 'tasks',
      role: null,
      phaseIndex: 0,
      completed: {},
      expandedTask: null,
      contractUploaded: false,
      vault: INITIAL_VAULT_DOCS,
      chatThreads: INITIAL_CHAT_THREADS,
      activeThreadId: null,
    }),
}))
