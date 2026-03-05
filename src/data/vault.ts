import type { VaultDocument } from '../types'

export const INITIAL_VAULT_DOCS: VaultDocument[] = [
  { id: 'v1', name: 'Tenancy Agreement (AST)', owner: 'both', status: 'pending', iconName: 'FileText' },
  { id: 'v2', name: 'Gas Safety Certificate', owner: 'landlord', status: 'pending', iconName: 'Shield' },
  { id: 'v3', name: 'EPC Certificate', owner: 'landlord', status: 'pending', iconName: 'Bell' },
  { id: 'v4', name: 'EICR Report', owner: 'landlord', status: 'pending', iconName: 'AlertTriangle' },
  { id: 'v5', name: 'How to Rent Guide', owner: 'landlord', status: 'pending', iconName: 'ClipboardList' },
  { id: 'v6', name: 'Move-In Inventory', owner: 'both', status: 'pending', iconName: 'CheckSquare' },
  { id: 'v7', name: 'Move-In Photos', owner: 'tenant', status: 'pending', iconName: 'Home' },
  { id: 'v8', name: 'Move-Out Photos', owner: 'both', status: 'pending', iconName: 'PackageOpen' },
  { id: 'v9', name: 'Deposit Protection Certificate', owner: 'landlord', status: 'pending', iconName: 'Lock' },
]
