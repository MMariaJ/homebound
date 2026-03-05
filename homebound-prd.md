# Homebound — Product Requirements Document
**Version:** 1.0  
**Date:** March 2026  
**Status:** MVP Specification  

---

## 1. Product Overview

### 1.1 Vision
Homebound is a contract-driven rental lifecycle management platform for UK self-managing landlords and tenants. It transforms a static tenancy agreement into a live, trackable operational workflow — removing ambiguity, automating compliance, and building a legally admissible evidence base throughout the entire tenancy.

### 1.2 Tagline
**Know. Remind. Track.**

### 1.3 Core Philosophy
- The **Assured Shorthold Tenancy (AST) agreement is the engine** of the entire platform. Every obligation, deadline, and action flows from it.
- The platform serves **two distinct users simultaneously** — landlord and tenant — with separate interfaces, separate obligation sets, and shared access to a common evidence vault.
- **System actions happen automatically** and are never presented as user tasks. Open banking monitoring, audit trail generation, and timestamping are invisible infrastructure.
- All communications are **contextual and evidence-linked** — not a general chat, but threaded conversations tied to specific tenancy matters.

---

## 2. Target Users

### 2.1 Primary: Self-Managing Landlords
- Owns 1–10 properties
- Does not use a letting agent
- Currently managing compliance via spreadsheets, calendar reminders, and disconnected tools
- Price-sensitive; needs an affordable, all-in-one solution
- Pain points: missed legal deadlines, deposit disputes, disorganised documentation, rent arrears

### 2.2 Secondary: Tenants
- Renting privately in the UK
- Unaware of their legal rights and obligations
- Concerned about deposit protection and fair treatment
- Pain points: unfair deposit deductions, unclear repair responsibilities, lack of evidence if disputes arise

### 2.3 Future: Letting Agents (Post-MVP)
- Manage portfolios on behalf of landlords
- Require multi-property dashboard, team access, and white-labelling

---

## 3. User Journeys

### 3.1 Landlord Onboarding Flow
1. Lands on splash screen → selects **"I'm a Landlord"**
2. Directed to **Contract Gate** — must upload AST before anything else
3. On upload, system parses contract and activates obligation checklist
4. Directed to **Invite Tenant screen** — unique join link generated
5. Copies/shares link with tenant
6. Lands on **Landlord Dashboard**

### 3.2 Tenant Onboarding Flow
1. Receives invite link from landlord
2. Taps link → lands on splash → selects **"I'm a Tenant"**
3. Account created and automatically connected to the landlord's tenancy
4. AST is pre-loaded into their vault (shared from landlord upload)
5. Tenant obligation checklist activates
6. Lands on **Tenant Dashboard**

### 3.3 Ongoing Usage
- Both parties work through phase-based checklists
- Tasks with vault requirements prompt document upload inline
- Tasks with comms requirements open or create a contextual thread
- Payments are monitored automatically; rent history builds passively
- Evidence accumulates throughout — full audit trail always available

---

## 4. Information Architecture

### 4.1 Screens
```
Splash
├── Contract Gate (Landlord only)
├── Invite Tenant (Landlord only)
└── Dashboard
    ├── Tasks Tab
    │   ├── Phase Navigation (Pre-Move-In → Post-Tenancy)
    │   └── Task List (Legal / Recommended / locked)
    ├── Vault Tab
    │   └── Document List (upload / view / status)
    ├── Comms Tab
    │   ├── Thread List
    │   └── Thread View (contextual messaging)
    └── Payments Tab
        ├── Rent Ledger
        └── Deposit Status
```

### 4.2 Roles & Access
| Feature | Landlord | Tenant |
|---|---|---|
| Upload AST | ✓ | View only |
| Invite tenant | ✓ | — |
| Landlord task checklist | ✓ | View progress only |
| Tenant task checklist | View progress only | ✓ |
| Shared vault | Upload + View | Upload + View |
| Comms | ✓ | ✓ |
| Payments ledger | ✓ | ✓ |
| Deposit status | ✓ | ✓ |
| Export audit pack | ✓ | ✓ |

---

## 5. Feature Specifications

### 5.1 Contract Gate & AST Upload

**Purpose:** Enforce contract-first flow. Nothing unlocks until the AST is present.

**Behaviour:**
- Landlord-only screen, shown immediately after role selection
- Accepts PDF, Word (.docx), or image formats
- On upload: contract stored in shared vault, tenant notified, all tasks unlocked
- If tenant arrives before landlord uploads AST: tasks visible but locked with explanatory state
- A persistent banner on the Tasks tab reflects contract status at all times

**Future (post-MVP):** AI parsing of AST to auto-extract: tenant name, landlord name, rent amount, deposit amount, tenancy start/end date, notice period, break clauses, specific obligations, and compliance deadlines. These populate fields across the platform automatically.

---

### 5.2 Task Checklists

**Purpose:** Guide both parties through legally compliant, operationally sound tenancy management across all lifecycle phases.

**Phases:**
1. Pre-Move-In
2. Move-In
3. During Tenancy
4. Move-Out
5. Post-Tenancy

**Task Types:**
- **Legal Requirement** — binding obligation; failure may result in penalties, invalidated notices, or legal exposure. Shown with a distinct visual treatment (e.g. red/coral accent).
- **Recommended** — best practice for legal protection and smooth tenancy management. Shown with a secondary accent (e.g. blue).
- ~~System Action~~ — not shown as tasks. Handled invisibly by the platform.

**Task Anatomy:**
- Checkbox (tap to complete)
- Task title
- Type badge (Legal / Recommended)
- Optional badges: VAULT (document required), COMMS (thread available)
- Expand/collapse for detail view
- Detail view contains: plain-English explanation, inline action buttons (Open Comms Thread / Upload to Vault), legal warning if applicable

**Task States:**
- Default (incomplete, unlocked)
- Locked (contract not yet uploaded — shown with lock icon, reduced opacity)
- Complete (checkbox filled, green border)
- Expanded (detail panel open)

**Phase Progress:**
- Phase navigation bar at top of Tasks tab
- Each phase shown as a circle with a contextual icon
- Active phase highlighted in role accent colour
- Completed phases shown with a check icon in green
- Progress bar beneath showing % complete for current phase

**Landlord Task List by Phase:**

*Pre-Move-In:*
- Upload Tenancy Agreement (AST) [contract trigger — special treatment]
- Register deposit with TDP scheme [Legal]
- Upload EPC (min. rating E) [Legal] [Vault]
- Upload Gas Safety Certificate [Legal] [Vault]
- Upload EICR Electrical Report [Legal] [Vault]
- Provide How to Rent guide [Legal]
- Upload property inventory and photos [Recommended] [Vault]
- Set initial meter readings [Recommended]

*Move-In:*
- Hand over keys — log in app [Recommended]
- Confirm smoke and CO alarm check [Legal]
- Provide signed inventory to tenant [Recommended]
- Confirm deposit scheme reference sent [Legal]

*During Tenancy:*
- Respond to repair requests within 28 days [Legal] [Comms]
- Annual gas safety certificate renewal [Legal] [Vault]
- Log contractor visits [Recommended]
- Review and agree rent increase if applicable [Legal] [Comms]

*Move-Out:*
- Complete check-out inspection [Recommended]
- Upload damage evidence if applicable [Recommended] [Vault]
- Submit itemised deposit deduction request [Legal] [Comms]
- Return deposit within 10 days [Legal]
- Record final meter readings [Recommended]

*Post-Tenancy:*
- Issue tenant reference [Recommended]

**Tenant Task List by Phase:**

*Pre-Move-In:*
- Review and sign AST in-app [Legal]
- Pay and log holding deposit [Legal]
- Pay security deposit [Legal]
- Confirm TDP scheme receipt [Legal]
- Confirm receipt of How to Rent guide [Legal]
- Confirm move-in date [Recommended]

*Move-In:*
- Report any pre-existing damage [Recommended] [Comms]
- Take and upload move-in photos [Recommended] [Vault]
- Confirm and sign move-in inventory [Recommended]
- Confirm meter readings [Recommended]
- Confirm smoke and CO alarm tested [Legal]

*During Tenancy:*
- Pay rent on time [Legal]
- Report repairs and issues [Recommended] [Comms]
- Allow access for inspections with 24hr notice [Legal]
- Maintain property condition [Legal]
- Log any unresolved landlord repair failures [Recommended] [Comms]

*Move-Out:*
- Serve correct notice period [Legal]
- Take move-out photos [Recommended] [Vault]
- Return all keys — logged [Recommended]
- Record final meter readings [Recommended]
- Dispute deposit deductions in-app if needed [Recommended] [Comms]

*Post-Tenancy:*
- Confirm deposit return [Legal]
- Request tenancy reference [Recommended]

---

### 5.3 Shared Evidence Vault

**Purpose:** Centralised, timestamped document store accessible to both parties. Every upload is legally admissible evidence.

**Documents:**
| Document | Responsible Party |
|---|---|
| Tenancy Agreement (AST) | Either |
| Gas Safety Certificate | Landlord |
| EPC Certificate | Landlord |
| EICR Report | Landlord |
| How to Rent Guide | Landlord |
| Move-In Inventory | Either |
| Move-In Photos | Tenant |
| Move-Out Photos | Either |
| Deposit Protection Certificate | Landlord |
| Additional evidence (invoices, notices, etc.) | Either |

**Document States:** Pending / Uploaded  
**Each document shows:** name, responsible party, upload status, timestamp on upload  
**Actions:** Upload (inline), View, Download  
**Future:** eSign functionality for inventory and AST directly in-app

---

### 5.4 Contextual Communications

**Purpose:** Structured, evidence-linked messaging between landlord and tenant. Every thread is tied to a specific tenancy matter and stored as part of the audit trail.

**Thread Contexts (predefined):**
- Repair Request
- Deposit Deduction
- Rent Review
- Pre-existing Damage
- Unresolved Repair
- General (fallback only)

**Behaviour:**
- Threads cannot be opened without a context — this is not a general chat
- From a relevant task, a button opens the matching thread or creates a new one if none exists
- Thread creation requires: context (pre-selected from task) + subject line
- All messages are timestamped
- Unread message count shown on thread list and tab badge
- Thread list shows: subject, context tag, last message preview, time, unread count
- Thread view shows: full message history, role attribution per message, contextual header

**Future:**
- Photo and document attachments within threads
- Automatic linking of vault documents to relevant threads
- Read receipts

---

### 5.5 Payments

**Purpose:** Provide a verified, timestamped rent ledger for both parties. Passive evidence generation via open banking.

**Features:**
- Monthly rent amount displayed prominently
- Payment history list: date, amount, verification status
- All payments marked as verified via open banking
- Missed or late payments flagged automatically by the system (not a user task)
- Deposit status panel: amount, protection scheme name, reference number

**Open Banking Integration (MVP scope):**
- Link bank account via open banking API on setup
- System monitors incoming payments matching rent amount
- Payments auto-logged with timestamp
- No manual rent logging required by either party

**Future:**
- Rent arrears escalation workflow
- Automated payment reminders to tenant
- Export rent statement as PDF for mortgage/credit applications

---

### 5.6 Audit Trail & Evidence Export

**Purpose:** Build a complete, legally admissible record of the tenancy that can be exported for deposit disputes, court, or tribunal.

**Automatically captured:**
- Open banking rent receipts (verified)
- Timestamped photo uploads
- Signed documents
- Repair request logs with timestamps
- Legal notice delivery confirmation
- Meter reading records
- Message thread history
- Task completion timestamps

**Export pack includes** all of the above, formatted as a structured PDF report. Available to both parties at any time, particularly at post-tenancy stage.

---

### 5.7 Invite & Onboarding

**Landlord invites tenant via:**
- Unique shareable link (e.g. `homebound.app/join/[token]`)
- Link can be copied or shared via any channel (WhatsApp, email, SMS)
- Link expires after 7 days (configurable)
- On join: tenant account created, connected to tenancy, AST shared, checklist activated

---

## 6. Design System

### 6.1 Design Principles
- **Clean and minimal** — no clutter, no unnecessary decoration
- **Role-distinct** — landlord and tenant interfaces feel different enough to orient the user immediately
- **Evidence-first** — the UI should convey reliability, legality, and trustworthiness
- **Mobile-first** — designed for 375–430px viewport; web dashboard for landlord portfolio view in future

### 6.2 Colour Palette

| Token | Value | Usage |
|---|---|---|
| `landlord-accent` | `#E67E22` | Landlord CTAs, active states, highlights |
| `tenant-accent` | `#2980B9` | Tenant CTAs, active states, highlights |
| `bg-dark` | `#0F172A` | Splash background, header |
| `bg-mid` | `#1E293B` | Secondary dark surfaces |
| `bg-light` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, panels |
| `border` | `#E2E8F0` | Default borders |
| `text-primary` | `#1E293B` | Body text |
| `text-secondary` | `#64748B` | Supporting text |
| `text-muted` | `#94A3B8` | Placeholder, inactive |
| `legal-red` | `#C0392B` | Legal obligation indicators |
| `legal-red-bg` | `#FDF2F2` | Legal badge background |
| `suggested-blue` | `#2471A3` | Recommended indicators |
| `suggested-blue-bg`| `#F0F6FC` | Recommended badge background |
| `success` | `#22C55E` | Completed tasks, verified states |
| `success-bg` | `#F0FDF4` | Completed task backgrounds |
| `warning` | `#F59E0B` | Warnings, pending states |
| `warning-bg` | `#FFFBEB` | Warning backgrounds |
| `vault-purple` | `#7C3AED` | Vault-related actions |
| `vault-purple-bg` | `#F5F3FF` | Vault badge background |
| `comms-green` | `#15803D` | Comms-related actions |
| `comms-green-bg` | `#F0FDF4` | Comms badge background |

### 6.3 Typography
- **Font family:** Inter (primary) — clean, modern, highly legible on mobile
- **Fallback:** system-ui, -apple-system, sans-serif
- **Scale:**

| Role | Size | Weight | Usage |
|---|---|---|---|
| Display | 42px | 900 | App name on splash |
| Heading 1 | 22px | 800 | Screen titles |
| Heading 2 | 17px | 800 | Section headers |
| Body | 14px | 400 | Default body text |
| Body strong | 13px | 600–700 | Task titles, labels |
| Caption | 11–12px | 400–600 | Badges, timestamps, metadata |
| Overline | 13px | 500 | Tagline, uppercase labels (letter-spacing: 3px) |

### 6.4 Iconography
- **Library:** Lucide React (`lucide-react@0.263.1`)
- **Stroke width:** 1.8–2.5 (heavier for interactive elements, lighter for decorative)
- **Size scale:** 12px (inline badges), 14px (navigation), 16–18px (tab icons, task actions), 22–28px (vault document icons, upload areas)
- **No emoji anywhere in the UI**

**Icon mapping:**

| Element | Icon |
|---|---|
| Landlord role | `KeyRound` |
| Tenant role | `Home` |
| Tasks tab | `CheckSquare` |
| Vault tab | `Lock` |
| Comms tab | `MessageSquare` |
| Payments tab | `CreditCard` |
| Pre-Move-In phase | `ClipboardList` |
| Move-In phase | `LogIn` |
| During Tenancy phase | `Calendar` |
| Move-Out phase | `PackageOpen` |
| Post-Tenancy phase | `BadgeCheck` |
| Phase complete | `Check` |
| Task complete (checkbox) | `Check` |
| Task locked | `Lock` |
| Expand | `ChevronDown` |
| Collapse | `ChevronUp` |
| Upload | `Upload` |
| Send message | `Send` |
| Back navigation | `ArrowLeft` |
| Legal warning | `AlertTriangle` |
| Contract / AST | `FileText` |
| Gas Safety | `Shield` |
| EPC | `Bell` |
| EICR | `AlertTriangle` |
| Inventory | `ClipboardList` |
| Photos (move-in) | `Home` |
| Photos (move-out) | `PackageOpen` |
| Deposit protection | `Lock` |
| Comms badge | `MessageSquare` |
| Vault badge | `Lock` |

### 6.5 Spacing & Layout
- Base unit: 4px
- Card border radius: 12–14px
- Button border radius: 12–14px
- Badge border radius: 4–6px
- Standard card padding: 14–16px
- Page horizontal padding: 14–16px
- Gap between cards: 8px
- Max content width: 480px (centred on larger screens)
- Sticky header height: ~52px
- Sticky tab bar height: ~48px

### 6.6 Component Patterns

**Cards:** White background, 1px border (`#E2E8F0`), 12–14px border radius, 14px padding. On completion: green border (`#86EFAC`), green-tinted background (`#F0FDF4`).

**Badges:** Small inline labels. 9–10px text, uppercase, letter-spacing 0.3px, coloured border and background per type (legal red, recommended blue, vault purple, comms green).

**Buttons — Primary:** Full accent colour background, white text, 14px border radius, 14–18px padding. Bold weight.

**Buttons — Secondary:** White background, light border, muted text. Same radius as primary.

**Buttons — Ghost/Outline:** Transparent background, accent-coloured border and text.

**Phase circles:** 30px diameter, circular. Active: accent colour background, white icon. Complete: green background, white check. Default: light grey background, grey icon.

**Progress bar:** 3–4px height, rounded, accent colour fill, grey track.

**Input fields:** 10–12px padding, 8–10px border radius, light border, 13–14px font size.

**Modals/overlays:** Semi-transparent dark overlay (`#00000080`), white card centred, 16px border radius, 24px padding.

---

## 7. Technical Specifications

### 7.1 Recommended Tech Stack

**Frontend:**
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS (utility-first, mobile-first)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **State management:** Zustand (lightweight global state) or React Context + useReducer
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion (subtle transitions only)
- **File handling:** react-dropzone

**Backend:**
- **Runtime:** Node.js with Express or Fastify — or alternatively Next.js API routes for full-stack simplicity
- **Database:** PostgreSQL (relational — tenancies, users, tasks, documents, messages)
- **ORM:** Prisma
- **Auth:** Supabase Auth or Clerk (email + magic link; no password friction for tenants)
- **File storage:** Supabase Storage or AWS S3 (documents, photos)
- **Real-time messaging:** Supabase Realtime or Pusher (for comms threads)

**Integrations:**
- **Open banking:** TrueLayer or Plaid UK (rent monitoring, payment verification)
- **AI parsing (post-MVP):** Anthropic Claude API (AST clause extraction)
- **eSign (post-MVP):** DocuSign API or YouSign

**Infrastructure:**
- **Hosting:** Vercel (frontend + serverless) or Railway (full-stack)
- **CDN:** Cloudflare
- **Monitoring:** Sentry (errors), PostHog (analytics)

### 7.2 Data Models (simplified)

```
User
  id, email, role (landlord | tenant), name, created_at

Tenancy
  id, landlord_id, tenant_id, ast_url, status, start_date, end_date,
  rent_amount, deposit_amount, deposit_scheme, deposit_ref, invite_token,
  invite_expires_at, created_at

Task
  id, tenancy_id, role (landlord | tenant), phase, label, type
  (legal | suggested), completed, completed_at, vault_doc_ref, chat_context

Document
  id, tenancy_id, name, uploaded_by, url, timestamp, type

ChatThread
  id, tenancy_id, context, subject, created_by, created_at

Message
  id, thread_id, sender_id, content, sent_at, read_at

Payment
  id, tenancy_id, amount, due_date, paid_date, verified (bool), source

AuditEvent
  id, tenancy_id, user_id, event_type, description, timestamp, metadata
```

### 7.3 API Endpoints (core MVP)

```
POST   /auth/signup
POST   /auth/login
GET    /auth/me

POST   /tenancies                        — landlord creates tenancy
GET    /tenancies/:id                    — get tenancy details
POST   /tenancies/:id/invite             — generate tenant invite link
POST   /tenancies/join/:token            — tenant joins via link

GET    /tenancies/:id/tasks/:role        — get task list for role
PATCH  /tasks/:id                        — mark task complete/incomplete

GET    /tenancies/:id/documents          — list vault documents
POST   /tenancies/:id/documents          — upload document
GET    /documents/:id                    — fetch document

GET    /tenancies/:id/threads            — list comms threads
POST   /tenancies/:id/threads            — create thread
GET    /threads/:id/messages             — get messages in thread
POST   /threads/:id/messages             — send message

GET    /tenancies/:id/payments           — list payment history
POST   /tenancies/:id/payments/link      — initiate open banking link

GET    /tenancies/:id/audit              — full audit trail
POST   /tenancies/:id/audit/export       — generate export PDF
```

### 7.4 Security Requirements
- All routes authenticated (JWT or session token)
- Tenancy data scoped strictly to landlord and connected tenant — no cross-tenancy data access
- Documents served via signed URLs (time-limited, not publicly accessible)
- Input validation on all endpoints
- HTTPS enforced everywhere
- GDPR compliance: data export and deletion endpoints required

---

## 8. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Mobile performance | Lighthouse score ≥ 85 on mobile |
| Page load (initial) | < 2 seconds on 4G |
| Uptime | 99.5% |
| File upload size limit | 20MB per document |
| Supported file types | PDF, DOCX, JPG, PNG, HEIC |
| Browser support | iOS Safari 15+, Chrome Android 100+, Chrome/Safari desktop |
| Accessibility | WCAG 2.1 AA minimum |
| Data residency | UK/EU only |

---

## 9. MVP Scope vs. Post-MVP

### 9.1 In MVP Scope
- Dual-role authentication (landlord + tenant)
- Contract gate and AST upload flow
- Tenant invite via link
- Phase-based task checklists (landlord + tenant, all 5 phases)
- Shared evidence vault (upload, view, status)
- Contextual comms (threaded messaging by topic)
- Payments ledger (manual entry in MVP; open banking in v1.1)
- Deposit status display
- Basic audit trail (task completions, document uploads, messages)
- Mobile-first responsive UI

### 9.2 Post-MVP Roadmap

**v1.1 — Open Banking**
- Live rent monitoring via TrueLayer
- Automatic payment verification and logging
- Missed payment alerts

**v1.2 — AI Contract Parsing**
- Upload AST → auto-extract key terms, dates, and obligations
- Auto-populate rent amount, deposit, tenancy dates across platform
- Flag non-standard clauses

**v1.3 — eSign & Digital Contracts**
- Sign AST in-app
- Sign move-in/move-out inventory in-app
- Legally admissible digital signatures

**v1.4 — Compliance Alerts Engine**
- Proactive alerts: gas cert expiry (60 days), deposit registration deadline, etc.
- Push notifications (mobile) and email
- Regulatory update monitoring (Renters' Reform Bill, EPC changes)

**v1.5 — Audit Export**
- Full tenancy audit pack as formatted PDF
- Section 21 validity checker
- Tribunal-ready evidence report

**v2.0 — Agent / Portfolio Dashboard**
- Multi-property management
- Team access and permissions
- Letting agent white-label option
- HMO (Houses in Multiple Occupation) support

---

## 10. Success Metrics

### 10.1 Activation
- % of landlords who complete AST upload within 24hrs of signup
- % of tenants who join via invite link within 48hrs
- % of tenancies with both sides active

### 10.2 Engagement
- % of tasks completed per phase (by role)
- % of tenancies with at least one vault document uploaded per required category
- Average number of comms threads opened per tenancy
- DAU / MAU ratio

### 10.3 Retention
- 30-day retention rate (landlord)
- Tenancy duration vs. platform usage duration (should correlate)
- % of landlords who start a second tenancy on the platform

### 10.4 Quality
- Deposit dispute rate for Homebound tenancies vs. national average
- NPS score (target ≥ 50)
- Support ticket volume per active tenancy

---

## 11. Key UX Rules (for implementation)

1. **Contract must be uploaded before any task is actionable.** Locked tasks show a lock icon and reduced opacity — never hidden.
2. **System tasks are never shown to users.** Open banking monitoring, timestamping, and audit trail generation happen silently.
3. **Comms threads must have context.** The "New Thread" flow always requires selecting a context category and entering a subject before the thread is created.
4. **No emoji anywhere in the UI.** All icons use Lucide React exclusively.
5. **Role distinction is always visible.** Landlord: orange accent (`#E67E22`). Tenant: blue accent (`#2980B9`). Applied to CTAs, active states, and phase indicators.
6. **Evidence accumulates passively.** Neither party should need to think about building an audit trail — it happens as a byproduct of using the platform.
7. **Task detail is plain English.** Legal obligations are explained in accessible language, not legal jargon, with a brief note on consequences of non-compliance.
8. **Vault and Comms are deeply linked to Tasks.** Inline action buttons within task detail panels bridge directly to the relevant vault document or comms thread.
9. **Progress is always visible.** Phase circles, progress bar, and task counts give both parties an immediate sense of where they are in the tenancy lifecycle.
10. **Mobile-first, always.** Max content width 480px. All interactions designed for thumb reach. No hover-only states.

---

## 12. Reference Implementation

A working React prototype (`homebound-mvp.tsx`) has been produced demonstrating the following:
- Splash screen with role selection
- Landlord contract gate and invite flow
- Phase-based task checklists for both roles with legal/recommended classification
- Contract-locked task states
- Shared evidence vault with upload simulation
- Contextual comms with thread creation and messaging
- Payments ledger with deposit status
- Full Lucide icon system throughout
- Role-specific colour theming (orange / blue)

This file should be used as functional and structural reference when rebuilding in the target environment.

---

*End of Document*
