import { useState } from "react";
import { KeyRound, Home, CheckSquare, Lock, MessageSquare, CreditCard, Upload, ChevronDown, ChevronUp, ArrowLeft, Send, ClipboardList, LogIn, Calendar, PackageOpen, BadgeCheck, Check, AlertTriangle, Shield, Wrench, FileText, Bell } from "lucide-react";

const PHASES = ["Pre-Move-In", "Move-In", "During Tenancy", "Move-Out", "Post-Tenancy"];
const PHASE_ICONS = [<ClipboardList size={14} strokeWidth={2}/>, <LogIn size={14} strokeWidth={2}/>, <Calendar size={14} strokeWidth={2}/>, <PackageOpen size={14} strokeWidth={2}/>, <BadgeCheck size={14} strokeWidth={2}/>];

// Tasks — no "system" type. System actions are handled invisibly.
// blocked: task cannot be started until contract is uploaded
const TASK_DATA = {
  landlord: {
    "Pre-Move-In": [
      { id: "l0", label: "Upload Tenancy Agreement (AST)", type: "legal", detail: "This is the contract engine. All obligations for both parties are derived from this document. Upload first to unlock the full checklist.", isContractUpload: true },
      { id: "l1", label: "Register deposit with TDP scheme", type: "legal", detail: "Register within 30 days of receipt. Homebound logs the scheme reference and notifies the tenant automatically.", blocked: true },
      { id: "l2", label: "Upload EPC (min. rating E)", type: "legal", detail: "Valid Energy Performance Certificate required before tenancy begins.", blocked: true, vaultDoc: "EPC Certificate" },
      { id: "l3", label: "Upload Gas Safety Certificate", type: "legal", detail: "Annual check by Gas Safe registered engineer. Stored in shared vault.", blocked: true, vaultDoc: "Gas Safety Certificate" },
      { id: "l4", label: "Upload EICR (Electrical Report)", type: "legal", detail: "Required every 5 years. Stored in shared vault and tenant is notified.", blocked: true, vaultDoc: "EICR Report" },
      { id: "l5", label: "Provide 'How to Rent' guide", type: "legal", detail: "Must be provided before tenancy begins. Homebound sends this to the tenant and logs receipt.", blocked: true },
      { id: "l6", label: "Upload property inventory + photos", type: "suggested", detail: "Timestamped photographic record stored in the shared vault. Critical for deposit protection.", blocked: true, vaultDoc: "Move-In Inventory" },
      { id: "l7", label: "Set initial meter readings", type: "suggested", detail: "Log gas, electricity and water readings. Both parties confirm and these are stored as evidence.", blocked: true },
    ],
    "Move-In": [
      { id: "l8", label: "Hand over keys (log in app)", type: "suggested", detail: "Log key handover — date, time, and number of sets. Creates a timestamped record." },
      { id: "l9", label: "Confirm smoke & CO alarm check", type: "legal", detail: "Legally required on the first day of every tenancy. Both parties confirm in-app." },
      { id: "l10", label: "Provide signed inventory to tenant", type: "suggested", detail: "Both parties sign the move-in inventory in-app. Stored immediately in shared vault." },
      { id: "l11", label: "Confirm deposit scheme reference sent", type: "legal", detail: "Provide tenant with TDP certificate and prescribed information within 30 days." },
    ],
    "During Tenancy": [
      { id: "l12", label: "Respond to repair requests (28 days)", type: "legal", detail: "Legally required. Open a repair thread in Comms to respond — creates a timestamped audit trail.", hasChat: true, chatContext: "Repair Request" },
      { id: "l13", label: "Annual gas safety certificate renewal", type: "legal", detail: "Renew every 12 months. Homebound alerts you 60 days before expiry.", vaultDoc: "Gas Safety Certificate" },
      { id: "l14", label: "Log contractor visits", type: "suggested", detail: "Record contractor access, reason and outcome. Attach any invoices to the vault." },
      { id: "l15", label: "Review & agree rent increase (if applicable)", type: "legal", detail: "Serve correct notice via the app. Tenant confirms or disputes — full record kept.", hasChat: true, chatContext: "Rent Review" },
    ],
    "Move-Out": [
      { id: "l16", label: "Complete check-out inspection", type: "suggested", detail: "Compare to move-in inventory. Upload timestamped photos — stored in vault." },
      { id: "l17", label: "Upload damage evidence (if applicable)", type: "suggested", detail: "Timestamped photos of any damage beyond fair wear and tear.", vaultDoc: "Move-Out Photos" },
      { id: "l18", label: "Submit itemised deposit deduction request", type: "legal", detail: "Itemised list required. Open a deposit thread to discuss with tenant if needed.", hasChat: true, chatContext: "Deposit Deduction" },
      { id: "l19", label: "Return deposit within 10 days", type: "legal", detail: "Legal obligation once deductions are agreed. Homebound tracks the 10-day window." },
      { id: "l20", label: "Record final meter readings", type: "suggested", detail: "Both parties confirm final readings — stored as evidence." },
    ],
    "Post-Tenancy": [
      { id: "l21", label: "Issue tenant reference", type: "suggested", detail: "Provide a reference via the app — sent directly to tenant's profile." },
    ],
  },
  tenant: {
    "Pre-Move-In": [
      { id: "t1", label: "Review & sign AST in-app", type: "legal", detail: "Sign tenancy agreement electronically. This triggers all your obligations and the landlord's. Contract stored in shared vault.", isContractSign: true },
      { id: "t2", label: "Pay & log holding deposit", type: "legal", detail: "Payment is verified and timestamped. Homebound stores the receipt automatically." },
      { id: "t3", label: "Pay security deposit", type: "legal", detail: "Full deposit verified via open banking and logged with timestamp." },
      { id: "t4", label: "Confirm TDP scheme receipt", type: "legal", detail: "Acknowledge receipt of deposit protection certificate from landlord." },
      { id: "t5", label: "Confirm receipt of 'How to Rent' guide", type: "legal", detail: "Confirm you have received and read the guide. Logged as evidence." },
      { id: "t6", label: "Confirm move-in date", type: "suggested", detail: "Agree move-in date with your landlord. Logged in the tenancy timeline." },
    ],
    "Move-In": [
      { id: "t7", label: "Report pre-existing damage", type: "suggested", detail: "Log and photograph any damage before moving in. Critical for protecting your deposit.", hasChat: true, chatContext: "Pre-existing Damage" },
      { id: "t8", label: "Take & upload move-in photos", type: "suggested", detail: "Timestamped photos stored in shared vault. Your strongest deposit protection tool.", vaultDoc: "Move-In Photos" },
      { id: "t9", label: "Confirm & sign move-in inventory", type: "suggested", detail: "Agree property condition at move-in. Disputes can be raised here before signing." },
      { id: "t10", label: "Confirm meter readings", type: "suggested", detail: "Agree readings with landlord in-app. Both parties sign off." },
      { id: "t11", label: "Confirm smoke & CO alarm tested", type: "legal", detail: "Confirm alarms are working on move-in day. Legally required check." },
    ],
    "During Tenancy": [
      { id: "t12", label: "Pay rent on time", type: "legal", detail: "Rent is tracked via open banking. Homebound flags any missed payments automatically." },
      { id: "t13", label: "Report repairs & issues", type: "suggested", detail: "Log issues in-app — opens a repair thread with landlord. Creates timestamped evidence.", hasChat: true, chatContext: "Repair Request" },
      { id: "t14", label: "Allow access for inspections (24hr notice)", type: "legal", detail: "Landlord must give 24hrs notice. Confirm access via the app — date and time logged." },
      { id: "t15", label: "Log any unresolved landlord repair failures", type: "suggested", detail: "If landlord fails to respond within 28 days, log this — important legal protection.", hasChat: true, chatContext: "Unresolved Repair" },
    ],
    "Move-Out": [
      { id: "t16", label: "Serve correct notice period", type: "legal", detail: "Notice served and timestamped in-app per your AST terms." },
      { id: "t17", label: "Take move-out photos", type: "suggested", detail: "Timestamped photos stored in vault. Compare against move-in record.", vaultDoc: "Move-Out Photos" },
      { id: "t18", label: "Return all keys (logged)", type: "suggested", detail: "Key return logged with date and time stamp." },
      { id: "t19", label: "Record final meter readings", type: "suggested", detail: "Agree final readings with landlord — both parties confirm." },
      { id: "t20", label: "Dispute deposit deductions (if needed)", type: "suggested", detail: "Raise disputes in-app. Full evidence pack generated automatically.", hasChat: true, chatContext: "Deposit Deduction" },
    ],
    "Post-Tenancy": [
      { id: "t21", label: "Confirm deposit return", type: "legal", detail: "Confirm receipt within the 10-day window. Raises alert if not received." },
      { id: "t22", label: "Request tenancy reference", type: "suggested", detail: "Request reference from landlord via the app." },
    ],
  },
};

const VAULT_DOCS = [
  { id: "v1", name: "Tenancy Agreement (AST)", owner: "both", status: "pending", icon: <FileText size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v2", name: "Gas Safety Certificate", owner: "landlord", status: "pending", icon: <Shield size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v3", name: "EPC Certificate", owner: "landlord", status: "pending", icon: <Bell size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v4", name: "EICR Report", owner: "landlord", status: "pending", icon: <AlertTriangle size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v5", name: "How to Rent Guide", owner: "landlord", status: "pending", icon: <ClipboardList size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v6", name: "Move-In Inventory", owner: "both", status: "pending", icon: <CheckSquare size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v7", name: "Move-In Photos", owner: "tenant", status: "pending", icon: <Home size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v8", name: "Move-Out Photos", owner: "both", status: "pending", icon: <PackageOpen size={22} strokeWidth={1.5} color="#475569"/> },
  { id: "v9", name: "Deposit Protection Certificate", owner: "landlord", status: "pending", icon: <Lock size={22} strokeWidth={1.5} color="#475569"/> },
];

const CHAT_THREADS_INIT = [
  { id: "c1", context: "Repair Request", subject: "Boiler not working", lastMsg: "Thanks for reporting. I'll arrange an engineer.", time: "2h ago", unread: 1, msgs: [
    { from: "tenant", text: "The boiler stopped working this morning — no hot water.", time: "10:02" },
    { from: "landlord", text: "Thanks for reporting. I'll arrange an engineer.", time: "12:14" },
  ]},
  { id: "c2", context: "Deposit Deduction", subject: "End of tenancy deposit", lastMsg: "Can you clarify the cleaning charge?", time: "Yesterday", unread: 0, msgs: [
    { from: "landlord", text: "I'm proposing a £120 deduction for professional cleaning.", time: "09:00" },
    { from: "tenant", text: "Can you clarify the cleaning charge? The property was clean when I left.", time: "09:45" },
  ]},
];

const TYPE_CONFIG = {
  legal: { label: "Legal", color: "#c0392b", bg: "#fdf2f2", border: "#f5c6c6" },
  suggested: { label: "Recommended", color: "#2471a3", bg: "#f0f6fc", border: "#bdd6ed" },
};

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [phase, setPhase] = useState(0);
  const [completed, setCompleted] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  const [contractUploaded, setContractUploaded] = useState(false);
  const [showContractPrompt, setShowContractPrompt] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [vault, setVault] = useState(VAULT_DOCS);
  const [chatThreads, setChatThreads] = useState(CHAT_THREADS_INIT);
  const [activeThread, setActiveThread] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThreadContext, setNewThreadContext] = useState("");
  const [newThreadSubject, setNewThreadSubject] = useState("");

  const isLandlord = role === "landlord";
  const accent = isLandlord ? "#e67e22" : "#2980b9";
  const tasks = role ? (TASK_DATA[role][PHASES[phase]] || []) : [];
  const visibleTasks = tasks.filter(t => !t.isContractUpload && !t.isContractSign);
  const contractTask = tasks.find(t => t.isContractUpload || t.isContractSign);
  const completedCount = visibleTasks.filter(t => completed[t.id]).length;
  const progress = visibleTasks.length ? Math.round((completedCount / visibleTasks.length) * 100) : 0;
  const allPhaseProgress = role ? PHASES.map(p => {
    const pts = (TASK_DATA[role][p] || []).filter(t => !t.isContractUpload && !t.isContractSign);
    const done = pts.filter(t => completed[t.id]).length;
    return { total: pts.length, done };
  }) : [];

  const toggleTask = (id) => setCompleted(prev => ({ ...prev, [id]: !prev[id] }));

  const sendMsg = () => {
    if (!newMsg.trim() || !activeThread) return;
    setChatThreads(prev => prev.map(t => t.id === activeThread ? {
      ...t, lastMsg: newMsg, time: "Just now",
      msgs: [...t.msgs, { from: role, text: newMsg, time: new Date().toTimeString().slice(0,5) }]
    } : t));
    setNewMsg("");
  };

  const openChatFromTask = (ctx) => {
    const existing = chatThreads.find(t => t.context === ctx);
    if (existing) { setActiveThread(existing.id); setActiveTab("comms"); }
    else { setNewThreadContext(ctx); setShowNewThread(true); setActiveTab("comms"); }
  };

  const createThread = () => {
    if (!newThreadSubject.trim()) return;
    const id = "c" + Date.now();
    setChatThreads(prev => [...prev, { id, context: newThreadContext, subject: newThreadSubject, lastMsg: "", time: "Just now", unread: 0, msgs: [] }]);
    setActiveThread(id);
    setShowNewThread(false);
    setNewThreadSubject("");
  };

  const markVaultUploaded = (docName) => {
    setVault(prev => prev.map(d => d.name === docName ? { ...d, status: "uploaded" } : d));
  };

  // ── SPLASH ──
  if (screen === "splash") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0f172a 0%,#1e293b 60%,#0f3460 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',sans-serif", padding: 32 }}>
      <div style={{ textAlign: "center", maxWidth: 360, width: "100%" }}>
        <h1 style={{ color: "#ffffff", fontSize: 42, fontWeight: 900, margin: "0 0 10px", letterSpacing: -1.5 }}>Homebound</h1>
        <p style={{ color: "#64748b", fontSize: 13, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 56px" }}>Know. Remind. Track.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => { setRole("landlord"); setScreen("contract-gate"); }} style={{ padding: "18px 32px", borderRadius: 14, border: "none", background: "#e67e22", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: -0.3, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <KeyRound size={18} strokeWidth={2.5} />I'm a Landlord
          </button>
          <button onClick={() => { setRole("tenant"); setScreen("dashboard"); }} style={{ padding: "18px 32px", borderRadius: 14, border: "none", background: "#2980b9", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: -0.3, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Home size={18} strokeWidth={2.5} />I'm a Tenant
          </button>
        </div>
      </div>
    </div>
  );

  // ── CONTRACT GATE (landlord uploads AST first) ──
  if (screen === "contract-gate") return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📄</div>
        <h2 style={{ color: "#1e293b", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Upload Your Tenancy Agreement</h2>
        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>The AST is the engine behind everything in Homebound. Your obligations, your tenant's obligations, compliance deadlines, and evidence requirements all flow from this document. Upload it first to get started.</p>
                        <div style={{ background: "#fff", border: "2px dashed #cbd5e1", borderRadius: 16, padding: 32, marginBottom: 20, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }} onClick={() => { setContractUploaded(true); markVaultUploaded("Tenancy Agreement (AST)"); setScreen("invite-tenant"); }}>
          <Upload size={28} strokeWidth={1.5} color="#94a3b8" />
          <p style={{ color: "#475569", fontSize: 14, margin: 0, fontWeight: 600 }}>Tap to upload AST</p>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>PDF, Word, or image accepted</p>
        </div>
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 14px", textAlign: "left" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#92400e" }}>⚠️ Homebound will parse this contract to extract key dates, obligations and clauses. This cannot be skipped.</p>
        </div>
      </div>
    </div>
  );

  // ── INVITE TENANT ──
  if (screen === "invite-tenant") return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
        <h2 style={{ color: "#1e293b", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Contract Uploaded</h2>
        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Homebound has parsed your AST and activated your obligation checklist. Now invite your tenant — they'll receive their own checklist once they join.</p>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "left" }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>📎 Share tenant invite link:</p>
          <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "10px 12px", fontFamily: "monospace", fontSize: 12, color: "#0f3460", marginBottom: 12, wordBreak: "break-all" }}>homebound.app/join/xK9m2pQ4rL</div>
          <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Your tenant uses this link to create their account and connect to this tenancy. The contract is already shared with them.</p>
        </div>
        <button onClick={() => setScreen("dashboard")} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#e67e22", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Go to My Dashboard →</button>
      </div>
    </div>
  );

  // ── MAIN DASHBOARD ──
  const thread = activeThread ? chatThreads.find(t => t.id === activeThread) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI',sans-serif", maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: isLandlord ? "#1a1a2e" : "#0f3460", padding: "14px 18px 10px", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>🏡</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: -0.5 }}>Homebound</span>
            <span style={{ background: "#ffffff20", color: "#cbd5e1", fontSize: 10, borderRadius: 6, padding: "2px 6px", fontWeight: 600 }}>{isLandlord ? "LANDLORD" : "TENANT"}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {isLandlord && <button onClick={() => setShowInvite(true)} style={{ background: accent, border: "none", color: "#fff", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>+ Invite Tenant</button>}
            <button onClick={() => { setScreen("splash"); setRole(null); setCompleted({}); setPhase(0); setContractUploaded(false); }} style={{ background: "transparent", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "5px 9px", fontSize: 11, cursor: "pointer" }}>Exit</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", position: "sticky", top: 52, zIndex: 19 }}>
        {[["tasks", <CheckSquare size={16} strokeWidth={2}/>, "Tasks"], ["vault", <Lock size={16} strokeWidth={2}/>, "Vault"], ["comms", <MessageSquare size={16} strokeWidth={2}/>, "Comms"], ["payments", <CreditCard size={16} strokeWidth={2}/>, "Payments"]].map(([id, icon, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: "10px 4px 9px", border: "none", borderBottom: `2px solid ${activeTab===id ? accent : "transparent"}`, background: "none", color: activeTab===id ? accent : "#94a3b8", fontSize: 11, fontWeight: activeTab===id ? 700 : 500, cursor: "pointer", letterSpacing: 0.2, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            {icon}{label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>

        {/* ── TASKS TAB ── */}
        {activeTab === "tasks" && (
          <div>
            {/* Contract status banner */}
            {contractTask && (
              <div style={{ margin: "12px 14px 4px", background: contractUploaded ? "#f0fdf4" : "#fffbeb", border: `1px solid ${contractUploaded ? "#86efac" : "#fcd34d"}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>📄</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: contractUploaded ? "#15803d" : "#92400e" }}>{contractUploaded ? "AST uploaded — obligations active" : "Upload AST to unlock checklist"}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: contractUploaded ? "#16a34a" : "#b45309" }}>{contractUploaded ? "Contract is the engine. All tasks are now live." : isLandlord ? "The contract must be uploaded before any tasks can begin." : "Waiting for landlord to upload the AST."}</p>
                </div>
                {!contractUploaded && isLandlord && <button onClick={() => { setContractUploaded(true); markVaultUploaded("Tenancy Agreement (AST)"); }} style={{ background: "#e67e22", border: "none", color: "#fff", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Upload</button>}
              </div>
            )}

            {/* Phase nav */}
            <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "10px 14px 8px", marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                {PHASES.map((p, i) => {
                  const pc = allPhaseProgress[i] || { total: 0, done: 0 };
                  const done = pc.total > 0 && pc.done === pc.total;
                  return (
                    <button key={p} onClick={() => setPhase(i)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "2px 1px" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: phase===i ? accent : done ? "#22c55e" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                        {done ? <span style={{ color:"#fff", fontWeight:800 }}>✓</span> : PHASE_ICONS[i]}
                      </div>
                      <span style={{ fontSize: 8.5, color: phase===i ? accent : "#64748b", fontWeight: phase===i ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{p.replace("-", "\n")}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ background: "#e2e8f0", borderRadius: 4, height: 3 }}>
                <div style={{ width: `${progress}%`, background: accent, height: 3, borderRadius: 4, transition: "width 0.3s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>{PHASES[phase]}</span>
                <span style={{ fontSize: 10, color: "#64748b" }}>{completedCount}/{visibleTasks.length} complete</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ padding: "6px 14px", display: "flex", gap: 14, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
              {Object.entries(TYPE_CONFIG).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: v.color }} />
                  <span style={{ fontSize: 10, color: "#64748b" }}>{v.label}</span>
                </div>
              ))}
            </div>

            {/* Task list */}
            <div style={{ padding: "10px 14px 24px" }}>
              {visibleTasks.map(task => {
                const cfg = TYPE_CONFIG[task.type];
                const done = !!completed[task.id];
                const locked = task.blocked && !contractUploaded;
                const expanded = expandedTask === task.id;
                return (
                  <div key={task.id} style={{ background: locked ? "#f8fafc" : done ? "#f0fdf4" : "#fff", border: `1px solid ${locked ? "#e2e8f0" : done ? "#86efac" : cfg.border}`, borderRadius: 12, marginBottom: 8, overflow: "hidden", opacity: locked ? 0.55 : 1, transition: "all 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "13px 12px", gap: 10, cursor: locked ? "not-allowed" : "pointer" }} onClick={() => !locked && setExpandedTask(expanded ? null : task.id)}>
                      <div onClick={e => { e.stopPropagation(); if (!locked) toggleTask(task.id); }} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? "#22c55e" : locked ? "#cbd5e1" : "#cbd5e1"}`, background: done ? "#22c55e" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: locked ? "not-allowed" : "pointer" }}>
                        {done && <Check size={12} strokeWidth={3} color="#fff"/>}
                        {locked && !done && <Lock size={10} strokeWidth={2} color="#cbd5e1"/>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                          <span style={{ fontSize: 9, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40`, borderRadius: 4, padding: "1px 5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{cfg.label}</span>
                          {task.hasChat && !locked && <span style={{ fontSize: 9, background: "#f0fdf4", color: "#15803d", border: "1px solid #86efac", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>💬 COMMS</span>}
                          {task.vaultDoc && !locked && <span style={{ fontSize: 9, background: "#f5f3ff", color: "#7c3aed", border: "1px solid #c4b5fd", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>🔒 VAULT</span>}
                        </div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: done ? 400 : 600, color: done ? "#86efac" : locked ? "#94a3b8" : "#1e293b", textDecoration: done ? "line-through" : "none", lineHeight: 1.3 }}>{task.label}</p>
                      </div>
                      {!locked && (expanded ? <ChevronUp size={14} strokeWidth={2} color="#94a3b8"/> : <ChevronDown size={14} strokeWidth={2} color="#94a3b8"/>)}
                    </div>
                    {expanded && !locked && (
                      <div style={{ padding: "0 12px 12px 43px", background: cfg.bg, borderTop: `1px solid ${cfg.color}20` }}>
                        <p style={{ margin: "10px 0 8px", fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{task.detail}</p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {task.hasChat && (
                            <button onClick={() => openChatFromTask(task.chatContext)} style={{ fontSize: 12, background: "#fff", border: "1px solid #86efac", color: "#15803d", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontWeight: 600, display:"flex", alignItems:"center", gap:5 }}>
                              <MessageSquare size={12} strokeWidth={2}/>Open {task.chatContext} Thread
                            </button>
                          )}
                          {task.vaultDoc && (
                            <button onClick={() => { markVaultUploaded(task.vaultDoc); setActiveTab("vault"); }} style={{ fontSize: 12, background: "#fff", border: "1px solid #c4b5fd", color: "#7c3aed", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontWeight: 600, display:"flex", alignItems:"center", gap:5 }}>
                              <Upload size={12} strokeWidth={2}/>Upload to Vault
                            </button>
                          )}
                          {task.type === "legal" && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><AlertTriangle size={12} strokeWidth={2} color="#c0392b"/><span style={{ fontSize: 11, color: "#c0392b", fontWeight: 600 }}>Legal obligation — penalties may apply if missed</span></div>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── VAULT TAB ── */}
        {activeTab === "vault" && (
          <div style={{ padding: "14px" }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "14px", marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: 15, fontWeight: 800 }}>🔒 Shared Evidence Vault</h3>
              <p style={{ margin: 0, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>All documents are stored securely and accessible to both landlord and tenant. Every upload is timestamped and legally admissible.</p>
            </div>
            {vault.map(doc => (
              <div key={doc.id} style={{ background: "#fff", border: `1px solid ${doc.status === "uploaded" ? "#86efac" : "#e2e8f0"}`, borderRadius: 12, padding: "13px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: doc.status === "uploaded" ? "#dcfce7" : "#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {doc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{doc.name}</p>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "#64748b" }}>Uploaded by: {doc.owner === "both" ? "Either party" : doc.owner}</span>
                    <span style={{ fontSize: 10, background: doc.status === "uploaded" ? "#f0fdf4" : "#f8fafc", color: doc.status === "uploaded" ? "#15803d" : "#94a3b8", border: `1px solid ${doc.status === "uploaded" ? "#86efac" : "#e2e8f0"}`, borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>
                      {doc.status === "uploaded" ? "✓ Uploaded" : "Pending"}
                    </span>
                  </div>
                </div>
                {doc.status !== "uploaded" && (
                  <button onClick={() => markVaultUploaded(doc.name)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", borderRadius: 8, padding: "6px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, display:"flex", alignItems:"center", gap:4 }}><Upload size={11} strokeWidth={2}/>Upload</button>
                )}
                {doc.status === "uploaded" && <Check size={18} strokeWidth={2.5} color="#22c55e"/>}
              </div>
            ))}
            <div style={{ background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 12, padding: "14px", textAlign: "center", marginTop: 8 }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#475569", fontWeight: 600 }}>+ Add Document</p>
              <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>Upload any additional evidence — inspection reports, invoices, notices</p>
            </div>
          </div>
        )}

        {/* ── COMMS TAB ── */}
        {activeTab === "comms" && (
          <div style={{ padding: "14px" }}>
            {!activeThread ? (
              <>
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "14px", marginBottom: 12 }}>
                  <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: 15, fontWeight: 800 }}>💬 Communications</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>All messages are linked to a specific tenancy matter — repairs, deposit, notices. Every thread is timestamped and stored as evidence.</p>
                </div>
                {showNewThread ? (
                  <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16, marginBottom: 12 }}>
                    <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>New thread: {newThreadContext}</p>
                    <input value={newThreadSubject} onChange={e => setNewThreadSubject(e.target.value)} placeholder="Subject (e.g. Bathroom leak)" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, marginBottom: 10, boxSizing: "border-box" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={createThread} style={{ flex: 1, padding: "10px", background: accent, border: "none", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Start Thread</button>
                      <button onClick={() => setShowNewThread(false)} style={{ flex: 1, padding: "10px", background: "#f1f5f9", border: "none", color: "#475569", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => { setShowNewThread(true); setNewThreadContext("General"); }} style={{ width: "100%", padding: "12px", background: "#fff", border: `1px dashed ${accent}`, color: accent, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>+ Start New Thread</button>
                )}
                {chatThreads.map(t => (
                  <div key={t.id} onClick={() => setActiveThread(t.id)} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: accent + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>💬</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{t.subject}</span>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{t.time}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{t.lastMsg.slice(0, 45)}{t.lastMsg.length > 45 ? "…" : ""}</span>
                        {t.unread > 0 && <span style={{ background: accent, color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{t.unread}</span>}
                      </div>
                      <span style={{ fontSize: 10, background: "#f1f5f9", color: "#475569", borderRadius: 4, padding: "1px 6px", marginTop: 4, display: "inline-block" }}>{t.context}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <button onClick={() => setActiveThread(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, display:"flex", alignItems:"center", gap:4 }}><ArrowLeft size={14} strokeWidth={2}/>Back</button>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{thread?.subject}</p>
                    <span style={{ fontSize: 10, background: "#f1f5f9", color: "#475569", borderRadius: 4, padding: "1px 6px" }}>{thread?.context}</span>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
                  {thread?.msgs.map((m, i) => {
                    const mine = m.from === role;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
                        <div style={{ maxWidth: "78%", background: mine ? accent : "#fff", color: mine ? "#fff" : "#1e293b", border: mine ? "none" : "1px solid #e2e8f0", borderRadius: mine ? "14px 14px 2px 14px" : "14px 14px 14px 2px", padding: "10px 12px" }}>
                          <p style={{ margin: "0 0 4px", fontSize: 13, lineHeight: 1.4 }}>{m.text}</p>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                            <span style={{ fontSize: 10, opacity: 0.7, textTransform: "capitalize" }}>{m.from}</span>
                            <span style={{ fontSize: 10, opacity: 0.7 }}>{m.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
                  <input value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message…" style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none" }} />
                  <button onClick={sendMsg} style={{ background: accent, border: "none", color: "#fff", borderRadius: 10, padding: "0 16px", cursor: "pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Send size={15} strokeWidth={2}/></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PAYMENTS TAB ── */}
        {activeTab === "payments" && (
          <div style={{ padding: "14px" }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "14px", marginBottom: 12 }}>
              <h3 style={{ margin: "0 0 4px", color: "#1e293b", fontSize: 15, fontWeight: 800 }}>💷 Payments</h3>
              <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Rent is monitored automatically via open banking. All payments are timestamped and stored as evidence.</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ background: isLandlord ? "#1a1a2e" : "#0f3460", padding: "14px 16px" }}>
                <p style={{ margin: "0 0 2px", color: "#94a3b8", fontSize: 11 }}>Monthly rent</p>
                <p style={{ margin: 0, color: "#fff", fontSize: 26, fontWeight: 800 }}>£1,450 <span style={{ fontSize: 14, color: "#94a3b8" }}>/ month</span></p>
              </div>
              <div style={{ padding: "14px 16px" }}>
                {[
                  { date: "01 Mar 2026", amount: "£1,450", status: "paid" },
                  { date: "01 Feb 2026", amount: "£1,450", status: "paid" },
                  { date: "01 Jan 2026", amount: "£1,450", status: "paid" },
                  { date: "01 Dec 2025", amount: "£1,450", status: "paid" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{p.date}</p>
                      <span style={{ fontSize: 10, color: "#94a3b8" }}>Via open banking · verified</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{p.amount}</p>
                      <span style={{ fontSize: 10, background: "#f0fdf4", color: "#15803d", border: "1px solid #86efac", borderRadius: 4, padding: "1px 5px", fontWeight: 600 }}>✓ {p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "12px 14px", display:"flex", alignItems:"center", gap:10 }}>
              <Lock size={18} strokeWidth={1.8} color="#92400e"/>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#92400e" }}>Deposit held</p>
                <p style={{ margin: 0, fontSize: 13, color: "#92400e" }}>£1,450 · Protected with MyDeposits · Ref: MD2024-88421</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div style={{ position: "fixed", inset: 0, background: "#00000080", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 340, width: "100%" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800 }}>Invite Your Tenant</h3>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>Share this link. Once they join, their obligation checklist activates and they're connected to this tenancy.</p>
            <div style={{ background: "#f1f5f9", borderRadius: 10, padding: "10px 12px", fontFamily: "monospace", fontSize: 12, color: "#0f3460", marginBottom: 14, wordBreak: "break-all" }}>homebound.app/join/xK9m2pQ4rL</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: accent, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📋 Copy Link</button>
              <button onClick={() => setShowInvite(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
