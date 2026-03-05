# CLAUDE.md — Homebound Project Memory

---

## State of Build (Last updated: 2026-03-05)

**Complete:**
- Full project scaffolding (Vite + React 18 + TypeScript)
- Tailwind CSS config with all PRD colour tokens
- Zustand global state store
- Type definitions (types/index.ts)
- Task data (all landlord + tenant tasks, all 5 phases)
- Vault document data and comms thread data
- Splash screen (role selection)
- Contract Gate screen (AST upload)
- Invite Tenant screen (link sharing)
- App shell: Header, TabBar, Dashboard with AnimatePresence
- Tasks tab: PhaseNav, TaskCard (all states), TasksTab
- Vault tab: VaultTab with document list
- Comms tab: thread list + thread view + new thread modal
- Payments tab: rent ledger + deposit status
- CLAUDE.md (this file)

**In Progress:**
- Node.js installation required to run `npm install` and confirm dev server

**Blocked:**
- Nothing currently blocked

**Recommended Next Steps:**
1. Install Node.js (v20 LTS recommended) — see instructions below
2. Run `npm install` from /Users/mariajomy/Homebound
3. Run `npm run dev` and confirm dev server starts
4. Open localhost:5173 and test all screens
5. Begin polish pass (review at 375px, confirm no emoji, verify Framer Motion transitions)

---

## Project Overview

Homebound is a contract-driven rental lifecycle management platform for UK self-managing landlords and tenants. It transforms a static Assured Shorthold Tenancy (AST) agreement into a live, trackable operational workflow — removing ambiguity, automating compliance, and building a legally admissible evidence base throughout the entire tenancy.

**Two-sided user model:**
- **Landlord** — uploads AST, invites tenant, manages compliance obligations (orange accent, #E67E22)
- **Tenant** — joins via invite link, manages their own obligations (blue accent, #2980B9)

Both users share an evidence vault and contextual comms system. System actions (open banking, audit trail, timestamping) are invisible infrastructure — never shown as user tasks.

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | DOM rendering |
| typescript | ^5.4.2 | Type safety |
| vite | ^5.2.0 | Build tool + dev server |
| @vitejs/plugin-react | ^4.2.1 | React fast refresh |
| tailwindcss | ^3.4.3 | Utility-first CSS |
| autoprefixer | ^10.4.19 | CSS vendor prefixes |
| postcss | ^8.4.38 | CSS processing |
| lucide-react | ^0.263.1 | Icon library (no emoji) |
| react-router-dom | ^6.22.3 | Client-side routing |
| zustand | ^4.5.2 | Global state management |
| react-hook-form | ^7.51.0 | Form management |
| zod | ^3.22.4 | Schema validation |
| framer-motion | ^11.0.0 | Animations + transitions |

---

## Architecture Decisions

- **[2026-03-05]** Used Zustand over Context API — simpler async state handling, cleaner devtools, easier to extend for open banking integration in v1.1
- **[2026-03-05]** Single-page app with Zustand-managed "screen" state rather than React Router routes — simpler for the mobile-first, screen-to-screen navigation pattern of the MVP. React Router present as dependency for future deep-linking needs.
- **[2026-03-05]** All task data stored in static data files (src/data/tasks.ts) — matches MVP scope; API-driven in production
- **[2026-03-05]** Comms "openChatFromTask" opens the Comms tab — if an existing thread for that context exists, it opens directly; otherwise, the New Thread modal opens with the context pre-selected (deviation from MVP TSX: context is pre-set but user must still enter a subject, enforcing PRD UX Rule 3)
- **[2026-03-05]** VaultDocument timestamp set at upload time via `toLocaleDateString` — production would use server timestamp
- **[2026-03-05]** No React Router routes at MVP — screen managed by Zustand `screen` field. Noted for post-MVP when deep-linking is needed.

---

## File Structure

```
/Users/mariajomy/Homebound/
├── homebound-prd.md              # PRD specification (reference only)
├── homebound-mvp.tsx             # Functional prototype (reference only)
├── CLAUDE.md                     # This file
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx                  # Entry point
    ├── App.tsx                   # Root component + screen router
    ├── index.css                 # Tailwind base + global styles
    ├── types/
    │   └── index.ts              # All TypeScript interfaces
    ├── data/
    │   ├── tasks.ts              # PHASES + TASK_DATA (landlord + tenant, all 5 phases)
    │   ├── vault.ts              # INITIAL_VAULT_DOCS
    │   └── comms.ts              # CHAT_CONTEXTS + INITIAL_CHAT_THREADS
    ├── store/
    │   └── useAppStore.ts        # Zustand store (all global state + actions)
    └── components/
        ├── Splash.tsx            # Role selection screen
        ├── ContractGate.tsx      # Landlord AST upload screen
        ├── InviteTenant.tsx      # Post-upload invite link screen
        ├── Dashboard.tsx         # Main dashboard (tab container)
        ├── Header.tsx            # Sticky top bar + invite modal trigger
        ├── TabBar.tsx            # Four-tab navigation
        ├── InviteModal.tsx       # Invite tenant overlay
        ├── tasks/
        │   ├── TasksTab.tsx      # Tasks tab container + contract banner
        │   ├── PhaseNav.tsx      # Phase circles + progress bar
        │   └── TaskCard.tsx      # Individual task card (all states)
        ├── vault/
        │   └── VaultTab.tsx      # Document list + upload simulation
        ├── comms/
        │   └── CommsTab.tsx      # Thread list + thread view + new thread form
        └── payments/
            └── PaymentsTab.tsx   # Rent ledger + deposit status
```

---

## Component Registry

| Component | Path | Purpose | Key Props |
|---|---|---|---|
| Splash | components/Splash.tsx | Role selection screen | — |
| ContractGate | components/ContractGate.tsx | Landlord AST upload | — |
| InviteTenant | components/InviteTenant.tsx | Tenant invite link | — |
| Dashboard | components/Dashboard.tsx | Tab container + AnimatePresence | — |
| Header | components/Header.tsx | Sticky header + invite button | — |
| TabBar | components/TabBar.tsx | 4-tab nav with unread badge | — |
| InviteModal | components/InviteModal.tsx | Invite overlay | `{ onClose: () => void }` |
| TasksTab | components/tasks/TasksTab.tsx | Tasks tab container | — |
| PhaseNav | components/tasks/PhaseNav.tsx | Phase progress bar | `{ completedCount, totalCount }` |
| TaskCard | components/tasks/TaskCard.tsx | Individual task card | `{ task: Task, isLocked: boolean }` |
| VaultTab | components/vault/VaultTab.tsx | Document vault | — |
| CommsTab | components/comms/CommsTab.tsx | Thread list + view | — |
| PaymentsTab | components/payments/PaymentsTab.tsx | Payments ledger | — |

---

## Known Issues & Bugs

- **[2026-03-05] RESOLVED** — Node.js not found in system PATH. Installed nvm v0.40.2 then Node.js v20.20.1 (npm v10.8.2). Dev server confirmed running on localhost:5173 (HTTP 200).

---

## Change Log

- **[2026-03-05]** Initialised project — created all config files (package.json, vite.config.ts, tsconfig.json, tailwind.config.js, postcss.config.js, index.html)
- **[2026-03-05]** Created src/types/index.ts — all TypeScript interfaces (Role, Task, VaultDocument, ChatThread, Screen, TabId, etc.)
- **[2026-03-05]** Created src/data/tasks.ts — full TASK_DATA for landlord + tenant across all 5 phases
- **[2026-03-05]** Created src/data/vault.ts — INITIAL_VAULT_DOCS with 9 document types
- **[2026-03-05]** Created src/data/comms.ts — CHAT_CONTEXTS and INITIAL_CHAT_THREADS
- **[2026-03-05]** Created src/store/useAppStore.ts — Zustand store with all state + actions
- **[2026-03-05]** Created src/components/Splash.tsx — Framer Motion animated role selection
- **[2026-03-05]** Created src/components/ContractGate.tsx — AST upload screen, no emoji, Lucide icons
- **[2026-03-05]** Created src/components/InviteTenant.tsx — invite link screen with copy functionality
- **[2026-03-05]** Created src/components/Header.tsx — sticky header, role badge, exit button
- **[2026-03-05]** Created src/components/InviteModal.tsx — invite overlay modal
- **[2026-03-05]** Created src/components/TabBar.tsx — 4-tab nav with unread badge on Comms
- **[2026-03-05]** Created src/components/Dashboard.tsx — tab container with AnimatePresence transitions
- **[2026-03-05]** Created src/components/tasks/PhaseNav.tsx — phase circles, progress bar
- **[2026-03-05]** Created src/components/tasks/TaskCard.tsx — task card with all 4 states + expand/collapse
- **[2026-03-05]** Created src/components/tasks/TasksTab.tsx — tasks container with contract banner, legend
- **[2026-03-05]** Created src/components/vault/VaultTab.tsx — document vault with upload simulation
- **[2026-03-05]** Created src/components/comms/CommsTab.tsx — thread list, thread view, new thread form
- **[2026-03-05]** Created src/components/payments/PaymentsTab.tsx — rent ledger, deposit status panel

---

## UX Rules (Non-Negotiable)

1. **Contract must be uploaded before any task is actionable.** Locked tasks show a lock icon and reduced opacity — never hidden.
2. **System tasks are never shown to users.** Open banking monitoring, timestamping, and audit trail generation happen silently.
3. **Comms threads must have context.** The "New Thread" flow always requires selecting a context category and entering a subject before the thread is created.
4. **No emoji anywhere in the UI.** All icons use Lucide React exclusively.
5. **Role distinction is always visible.** Landlord: orange accent (#E67E22). Tenant: blue accent (#2980B9). Applied to CTAs, active states, and phase indicators.
6. **Evidence accumulates passively.** Neither party should need to think about building an audit trail — it happens as a byproduct of using the platform.
7. **Task detail is plain English.** Legal obligations are explained in accessible language, not legal jargon, with a brief note on consequences of non-compliance.
8. **Vault and Comms are deeply linked to Tasks.** Inline action buttons within task detail panels bridge directly to the relevant vault document or comms thread.
9. **Progress is always visible.** Phase circles, progress bar, and task counts give both parties an immediate sense of where they are in the tenancy lifecycle.
10. **Mobile-first, always.** Max content width 480px. All interactions designed for thumb reach. No hover-only states.

---

## PRD Compliance Checklist

- [x] Splash screen with role selection
- [x] Contract gate (landlord-only, blocks all tasks)
- [x] AST upload flow
- [x] Tenant invite link generation
- [x] Phase-based task checklist — landlord (all 5 phases)
- [x] Phase-based task checklist — tenant (all 5 phases)
- [x] Task types: Legal / Recommended (no system tasks visible)
- [x] Task states: default / locked / complete / expanded
- [x] Shared evidence vault
- [x] Contextual comms (threaded, context-required)
- [x] Payments ledger + deposit status
- [x] Role-based colour theming (orange landlord / blue tenant)
- [x] Lucide icons throughout (zero emoji)
- [x] Mobile-first layout (max 480px content width)
- [x] Dev server confirmed running (localhost:5173, HTTP 200)
- [ ] Tested at 375px and 430px viewport widths
- [ ] Framer Motion transitions confirmed on all tab switches

---

## Recursive Improvement Protocol

This project uses a recursive self-improvement loop. The rules are:

### On every code change:
1. Add an entry to the Change Log with today's date and a clear description of what changed and why.
2. Update the File Structure map if any files were added, moved, or renamed.
3. Update the Component Registry if any component was created, modified, or removed.
4. Tick the relevant item(s) in the PRD Compliance Checklist.

### On every bug or error:
1. Immediately log it in Known Issues with status OPEN.
2. Describe the root cause as specifically as possible.
3. Once resolved, update the entry to RESOLVED with a description of the fix.
4. Add the fix to the Change Log.

### On every architectural decision:
1. Log it in Architecture Decisions with reasoning.
2. If the decision deviates from the PRD, note the deviation explicitly and justify it.

### Weekly / milestone review (or when asked):
1. Review the full Known Issues list — are any OPEN issues stale or blocking?
2. Review the PRD Compliance Checklist — what is incomplete?
3. Review Architecture Decisions — are any past decisions causing friction?
4. Produce a short "State of Build" summary at the top of CLAUDE.md.

### The loop:
Every session with Claude Code should begin by reading CLAUDE.md in full before writing any code. Every session should end by updating CLAUDE.md to reflect everything that changed. This ensures the file is always a true, current reflection of the project state.
