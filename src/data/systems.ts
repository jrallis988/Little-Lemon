import type { ConnectedSystem } from '@/types';

/** Existing business systems Working Intelligence connects — not replaces. */
export const CONNECTED_SYSTEMS: ConnectedSystem[] = [
  {
    id: 'sys-adp',
    name: 'ADP',
    category: 'Payroll',
    status: 'connected',
    description: 'Payroll records, pay runs, and correction workflows.',
  },
  {
    id: 'sys-paychex',
    name: 'Paychex',
    category: 'Payroll',
    status: 'available',
    description: 'Alternate payroll connector for multi-vendor environments.',
  },
  {
    id: 'sys-benefits',
    name: 'Benefits Admin',
    category: 'Benefits',
    status: 'connected',
    description: 'Plans, dependents, and eligibility questions.',
  },
  {
    id: 'sys-ats',
    name: 'ATS',
    category: 'Recruiting',
    status: 'connected',
    description: 'Candidates, stages, and interview scheduling.',
  },
  {
    id: 'sys-timekeeping',
    name: 'Timekeeping',
    category: 'Workforce',
    status: 'connected',
    description: 'Punches, exceptions, and attendance signals.',
  },
  {
    id: 'sys-identity',
    name: 'Identity Verification',
    category: 'Compliance',
    status: 'connected',
    description: 'ID checks and verification records for onboarding.',
  },
  {
    id: 'sys-hris',
    name: 'HRIS',
    category: 'Core HR',
    status: 'connected',
    description: 'Employee records, roles, and org structure.',
  },
  {
    id: 'sys-lms',
    name: 'LMS',
    category: 'Learning',
    status: 'connected',
    description: 'Training completion and skill evidence.',
  },
  {
    id: 'sys-scheduling',
    name: 'Scheduling',
    category: 'Workforce',
    status: 'connected',
    description: 'Shifts, coverage, and swap proposals.',
  },
  {
    id: 'sys-pos',
    name: 'POS',
    category: 'Operations',
    status: 'connected',
    description: 'Transactions and frontline operational signals.',
  },
  {
    id: 'sys-sap',
    name: 'SAP',
    category: 'ERP',
    status: 'pending',
    description: 'Orders, shipments, and supply-chain status.',
  },
  {
    id: 'sys-crm',
    name: 'CRM',
    category: 'Service',
    status: 'connected',
    description: 'Customer cases and follow-ups.',
  },
  {
    id: 'sys-inventory',
    name: 'Inventory',
    category: 'Operations',
    status: 'connected',
    description: 'Stock levels and shortfall signals.',
  },
  {
    id: 'sys-calendar',
    name: 'Calendar',
    category: 'Productivity',
    status: 'connected',
    description: 'Interview and meeting coordination.',
  },
  {
    id: 'sys-email',
    name: 'Email',
    category: 'Productivity',
    status: 'connected',
    description: 'Approved outbound communications.',
  },
  {
    id: 'sys-accounting',
    name: 'Accounting',
    category: 'Finance',
    status: 'available',
    description: 'GL touchpoints for payroll corrections.',
  },
];

export function getSystemById(id: string): ConnectedSystem | undefined {
  return CONNECTED_SYSTEMS.find((system) => system.id === id);
}
