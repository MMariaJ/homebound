import type { Phase, Task } from '../types'

export const PHASES: Phase[] = [
  'Pre-Move-In',
  'Move-In',
  'During Tenancy',
  'Move-Out',
  'Post-Tenancy',
]

export const TASK_DATA: Record<'landlord' | 'tenant', Record<Phase, Task[]>> = {
  landlord: {
    'Pre-Move-In': [
      {
        id: 'l0',
        label: 'Upload Tenancy Agreement (AST)',
        type: 'legal',
        detail:
          'This is the contract engine. All obligations for both parties are derived from this document. Upload first to unlock the full checklist.',
        isContractUpload: true,
      },
      {
        id: 'l1',
        label: 'Register deposit with TDP scheme',
        type: 'legal',
        detail:
          'Register within 30 days of receipt. Homebound logs the scheme reference and notifies the tenant automatically.',
        blocked: true,
      },
      {
        id: 'l2',
        label: 'Upload EPC (min. rating E)',
        type: 'legal',
        detail: 'Valid Energy Performance Certificate required before tenancy begins.',
        blocked: true,
        vaultDoc: 'EPC Certificate',
      },
      {
        id: 'l3',
        label: 'Upload Gas Safety Certificate',
        type: 'legal',
        detail: 'Annual check by Gas Safe registered engineer. Stored in shared vault.',
        blocked: true,
        vaultDoc: 'Gas Safety Certificate',
      },
      {
        id: 'l4',
        label: 'Upload EICR (Electrical Report)',
        type: 'legal',
        detail: 'Required every 5 years. Stored in shared vault and tenant is notified.',
        blocked: true,
        vaultDoc: 'EICR Report',
      },
      {
        id: 'l5',
        label: "Provide 'How to Rent' guide",
        type: 'legal',
        detail:
          'Must be provided before tenancy begins. Homebound sends this to the tenant and logs receipt.',
        blocked: true,
      },
      {
        id: 'l6',
        label: 'Upload property inventory + photos',
        type: 'suggested',
        detail:
          'Timestamped photographic record stored in the shared vault. Critical for deposit protection.',
        blocked: true,
        vaultDoc: 'Move-In Inventory',
      },
      {
        id: 'l7',
        label: 'Set initial meter readings',
        type: 'suggested',
        detail:
          'Log gas, electricity and water readings. Both parties confirm and these are stored as evidence.',
        blocked: true,
      },
    ],
    'Move-In': [
      {
        id: 'l8',
        label: 'Hand over keys (log in app)',
        type: 'suggested',
        detail: 'Log key handover — date, time, and number of sets. Creates a timestamped record.',
      },
      {
        id: 'l9',
        label: 'Confirm smoke & CO alarm check',
        type: 'legal',
        detail: 'Legally required on the first day of every tenancy. Both parties confirm in-app.',
      },
      {
        id: 'l10',
        label: 'Provide signed inventory to tenant',
        type: 'suggested',
        detail:
          'Both parties sign the move-in inventory in-app. Stored immediately in shared vault.',
      },
      {
        id: 'l11',
        label: 'Confirm deposit scheme reference sent',
        type: 'legal',
        detail: 'Provide tenant with TDP certificate and prescribed information within 30 days.',
      },
    ],
    'During Tenancy': [
      {
        id: 'l12',
        label: 'Respond to repair requests (28 days)',
        type: 'legal',
        detail:
          'Legally required. Open a repair thread in Comms to respond — creates a timestamped audit trail.',
        hasChat: true,
        chatContext: 'Repair Request',
      },
      {
        id: 'l13',
        label: 'Annual gas safety certificate renewal',
        type: 'legal',
        detail: 'Renew every 12 months. Homebound alerts you 60 days before expiry.',
        vaultDoc: 'Gas Safety Certificate',
      },
      {
        id: 'l14',
        label: 'Log contractor visits',
        type: 'suggested',
        detail: 'Record contractor access, reason and outcome. Attach any invoices to the vault.',
      },
      {
        id: 'l15',
        label: 'Review & agree rent increase (if applicable)',
        type: 'legal',
        detail:
          'Serve correct notice via the app. Tenant confirms or disputes — full record kept.',
        hasChat: true,
        chatContext: 'Rent Review',
      },
    ],
    'Move-Out': [
      {
        id: 'l16',
        label: 'Complete check-out inspection',
        type: 'suggested',
        detail: 'Compare to move-in inventory. Upload timestamped photos — stored in vault.',
      },
      {
        id: 'l17',
        label: 'Upload damage evidence (if applicable)',
        type: 'suggested',
        detail: 'Timestamped photos of any damage beyond fair wear and tear.',
        vaultDoc: 'Move-Out Photos',
      },
      {
        id: 'l18',
        label: 'Submit itemised deposit deduction request',
        type: 'legal',
        detail:
          'Itemised list required. Open a deposit thread to discuss with tenant if needed.',
        hasChat: true,
        chatContext: 'Deposit Deduction',
      },
      {
        id: 'l19',
        label: 'Return deposit within 10 days',
        type: 'legal',
        detail:
          'Legal obligation once deductions are agreed. Homebound tracks the 10-day window.',
      },
      {
        id: 'l20',
        label: 'Record final meter readings',
        type: 'suggested',
        detail: 'Both parties confirm final readings — stored as evidence.',
      },
    ],
    'Post-Tenancy': [
      {
        id: 'l21',
        label: 'Issue tenant reference',
        type: 'suggested',
        detail: 'Provide a reference via the app — sent directly to tenant profile.',
      },
    ],
  },
  tenant: {
    'Pre-Move-In': [
      {
        id: 't1',
        label: 'Review & sign AST in-app',
        type: 'legal',
        detail:
          "Sign tenancy agreement electronically. This triggers all your obligations and the landlord's. Contract stored in shared vault.",
        isContractSign: true,
      },
      {
        id: 't2',
        label: 'Pay & log holding deposit',
        type: 'legal',
        detail: 'Payment is verified and timestamped. Homebound stores the receipt automatically.',
      },
      {
        id: 't3',
        label: 'Pay security deposit',
        type: 'legal',
        detail: 'Full deposit verified via open banking and logged with timestamp.',
      },
      {
        id: 't4',
        label: 'Confirm TDP scheme receipt',
        type: 'legal',
        detail: 'Acknowledge receipt of deposit protection certificate from landlord.',
      },
      {
        id: 't5',
        label: "Confirm receipt of 'How to Rent' guide",
        type: 'legal',
        detail: 'Confirm you have received and read the guide. Logged as evidence.',
      },
      {
        id: 't6',
        label: 'Confirm move-in date',
        type: 'suggested',
        detail: 'Agree move-in date with your landlord. Logged in the tenancy timeline.',
      },
    ],
    'Move-In': [
      {
        id: 't7',
        label: 'Report pre-existing damage',
        type: 'suggested',
        detail:
          'Log and photograph any damage before moving in. Critical for protecting your deposit.',
        hasChat: true,
        chatContext: 'Pre-existing Damage',
      },
      {
        id: 't8',
        label: 'Take & upload move-in photos',
        type: 'suggested',
        detail:
          'Timestamped photos stored in shared vault. Your strongest deposit protection tool.',
        vaultDoc: 'Move-In Photos',
      },
      {
        id: 't9',
        label: 'Confirm & sign move-in inventory',
        type: 'suggested',
        detail:
          'Agree property condition at move-in. Disputes can be raised here before signing.',
      },
      {
        id: 't10',
        label: 'Confirm meter readings',
        type: 'suggested',
        detail: 'Agree readings with landlord in-app. Both parties sign off.',
      },
      {
        id: 't11',
        label: 'Confirm smoke & CO alarm tested',
        type: 'legal',
        detail: 'Confirm alarms are working on move-in day. Legally required check.',
      },
    ],
    'During Tenancy': [
      {
        id: 't12',
        label: 'Pay rent on time',
        type: 'legal',
        detail:
          'Rent is tracked via open banking. Homebound flags any missed payments automatically.',
      },
      {
        id: 't13',
        label: 'Report repairs & issues',
        type: 'suggested',
        detail:
          'Log issues in-app — opens a repair thread with landlord. Creates timestamped evidence.',
        hasChat: true,
        chatContext: 'Repair Request',
      },
      {
        id: 't14',
        label: 'Allow access for inspections (24hr notice)',
        type: 'legal',
        detail:
          'Landlord must give 24hrs notice. Confirm access via the app — date and time logged.',
      },
      {
        id: 't15',
        label: 'Log any unresolved landlord repair failures',
        type: 'suggested',
        detail:
          'If landlord fails to respond within 28 days, log this — important legal protection.',
        hasChat: true,
        chatContext: 'Unresolved Repair',
      },
    ],
    'Move-Out': [
      {
        id: 't16',
        label: 'Serve correct notice period',
        type: 'legal',
        detail: 'Notice served and timestamped in-app per your AST terms.',
      },
      {
        id: 't17',
        label: 'Take move-out photos',
        type: 'suggested',
        detail: 'Timestamped photos stored in vault. Compare against move-in record.',
        vaultDoc: 'Move-Out Photos',
      },
      {
        id: 't18',
        label: 'Return all keys (logged)',
        type: 'suggested',
        detail: 'Key return logged with date and time stamp.',
      },
      {
        id: 't19',
        label: 'Record final meter readings',
        type: 'suggested',
        detail: 'Agree final readings with landlord — both parties confirm.',
      },
      {
        id: 't20',
        label: 'Dispute deposit deductions (if needed)',
        type: 'suggested',
        detail: 'Raise disputes in-app. Full evidence pack generated automatically.',
        hasChat: true,
        chatContext: 'Deposit Deduction',
      },
    ],
    'Post-Tenancy': [
      {
        id: 't21',
        label: 'Confirm deposit return',
        type: 'legal',
        detail: 'Confirm receipt within the 10-day window. Raises alert if not received.',
      },
      {
        id: 't22',
        label: 'Request tenancy reference',
        type: 'suggested',
        detail: 'Request reference from landlord via the app.',
      },
    ],
  },
}
