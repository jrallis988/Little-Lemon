/* Shared demo data for NH DMV concept app */
window.NHDMV = {
  user: {
    name: 'Alex Morgan',
    licenseExpires: '2026-11-14',
    licenseType: 'Class D · REAL ID',
    plate: 'NH 482-193'
  },

  dashboardItems: [
    {
      id: 'appt-knowledge',
      title: 'Knowledge test',
      detail: 'Concord · Thu Mar 12 · 10:30 AM',
      meta: 'Reschedule',
      href: 'appointments.html?service=knowledge-test',
      tone: 'ok'
    },
    {
      id: 'license-exp',
      title: 'License expires in 98 days',
      detail: 'Class D · renew online when eligible',
      meta: 'Renew',
      href: 'renew.html',
      tone: 'warn'
    },
    {
      id: 'real-id',
      title: 'REAL ID verified',
      detail: 'Star credential on file',
      meta: 'View',
      href: 'real-id.html',
      tone: 'ok'
    }
  ],

  services: [
    // Licensing
    { id: 'dl-renew', category: 'license', group: 'renewals', name: 'Renew driver license', blurb: 'Eligible renewals without a branch visit', ways: ['online', 'appt'], href: 'renew.html' },
    { id: 'nd-renew', category: 'license', group: 'renewals', name: 'Renew non-driver ID', blurb: 'Photo ID renewal for non-drivers', ways: ['online', 'drop', 'appt'], href: 'renew.html?type=non-driver' },
    { id: 'real-id', category: 'license', group: 'renewals', name: 'Upgrade to REAL ID', blurb: 'Inline document checker, then book a slot', ways: ['appt'], href: 'real-id.html' },
    { id: 'first-license', category: 'license', group: 'first', name: 'First-time license or permit', blurb: 'Start with checklist + knowledge test booking', ways: ['appt'], href: 'checklist.html?intent=first-license' },
    { id: 'transfer', category: 'license', group: 'first', name: 'Transfer out-of-state license', blurb: 'New residents — 60 days after establishing residency', ways: ['appt'], href: 'checklist.html?intent=transfer' },
    { id: 'non-driver', category: 'license', group: 'first', name: 'Apply for non-driver ID', blurb: 'State photo ID without driving privileges', ways: ['appt'], href: 'checklist.html?intent=non-driver' },
    { id: 'knowledge', category: 'license', group: 'testing', name: 'Schedule knowledge test', blurb: 'Book or reschedule your written exam', ways: ['appt'], href: 'appointments.html?service=knowledge-test' },
    { id: 'road', category: 'license', group: 'testing', name: 'Book road skills test', blurb: 'Available after passing the knowledge test', ways: ['appt'], href: 'appointments.html?service=road-test' },
    { id: 'motorcycle', category: 'license', group: 'testing', name: 'Motorcycle rider training', blurb: 'Register for seasonal training classes', ways: ['online', 'appt'], href: 'appointments.html?service=motorcycle' },
    { id: 'duplicate', category: 'license', group: 'updates', name: 'Duplicate license or ID', blurb: 'Replace lost, stolen, or damaged credentials', ways: ['online', 'drop', 'appt'], href: 'renew.html?type=duplicate' },
    { id: 'address', category: 'license', group: 'updates', name: 'Update address', blurb: 'Drop-box friendly address change', ways: ['drop'], href: 'checklist.html?intent=address' },
    { id: 'name-change', category: 'license', group: 'updates', name: 'Name or gender change', blurb: 'Bring court or vital records to your appointment', ways: ['appt'], href: 'checklist.html?intent=name-change' },
    { id: 'cdl-med', category: 'license', group: 'updates', name: 'CDL medical card update', blurb: 'Submit via drop box, email, or mail', ways: ['drop', 'mail'], href: 'checklist.html?intent=cdl-med' },

    // Vehicle
    { id: 'reg-renew', category: 'vehicle', group: 'registration', name: 'Renew vehicle registration', blurb: 'State portion — drop box or appointment', ways: ['drop', 'appt'], href: 'vehicle.html#reg-renew' },
    { id: 'reg-new', category: 'vehicle', group: 'registration', name: 'New or transfer registration', blurb: 'Title and plate workflows in one path', ways: ['drop', 'appt'], href: 'vehicle.html#reg-new' },
    { id: 'temp-plates', category: 'vehicle', group: 'registration', name: 'Temporary plates', blurb: 'Short-term plates while paperwork clears', ways: ['drop', 'appt'], href: 'vehicle.html#temp-plates' },
    { id: 'boat', category: 'vehicle', group: 'registration', name: 'Boat registration', blurb: 'New, renew, or commercial boat registration', ways: ['drop', 'appt'], href: 'vehicle.html#boat' },
    { id: 'title', category: 'vehicle', group: 'titles', name: 'Certificate of title', blurb: 'New title processing and ownership docs', ways: ['drop', 'appt'], href: 'vehicle.html#title' },
    { id: 'dup-title', category: 'vehicle', group: 'titles', name: 'Duplicate title', blurb: 'Replace a lost or damaged title', ways: ['drop', 'appt'], href: 'vehicle.html#dup-title' },
    { id: 'vanity', category: 'vehicle', group: 'specialty', name: 'Vanity or commemorative plates', blurb: 'Custom plates including America’s 250th', ways: ['appt', 'mail'], href: 'vehicle.html#vanity' },
    { id: 'placard', category: 'vehicle', group: 'specialty', name: 'Walking disability placard', blurb: 'Accessible parking placard applications', ways: ['drop', 'appt'], href: 'vehicle.html#placard' },

    // Records
    { id: 'mvr', category: 'records', group: 'records', name: 'Request your driving record', blurb: 'Secure personal MVR — instant online path', ways: ['online', 'drop', 'appt'], href: 'records.html#mvr' },
    { id: 'accident', category: 'records', group: 'records', name: 'Request accident report', blurb: 'Drop-box request for crash reports', ways: ['drop'], href: 'records.html#accident' },
    { id: 'ticket', category: 'records', group: 'compliance', name: 'Respond to a ticket', blurb: 'Pay or respond without a counter visit', ways: ['online', 'drop', 'appt'], href: 'records.html#ticket' },
    { id: 'restoration', category: 'records', group: 'compliance', name: 'Pay restoration fee', blurb: 'Reinstate after suspension when eligible', ways: ['drop', 'appt'], href: 'records.html#restoration' },
    { id: 'interlock', category: 'records', group: 'compliance', name: 'Ignition interlock info', blurb: 'Removal appointments available in Concord', ways: ['appt'], href: 'records.html#interlock' }
  ],

  branches: [
    { id: 'concord', name: 'Concord', address: '23 Hazen Drive', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'central' },
    { id: 'concord-irp', name: 'Concord IRP', address: '23 Hazen Drive', hours: 'Mon–Fri 8:15–4:15', services: 'IRP only', status: 'open', region: 'central' },
    { id: 'manchester', name: 'Manchester', address: '377 South Willow Street', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'south' },
    { id: 'nashua', name: 'Nashua', address: '110 Broad Street', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'busy', region: 'south' },
    { id: 'dover', name: 'Dover', address: '50 Boston Harbor Road', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'seacoast' },
    { id: 'salem', name: 'Salem', address: '154 Main Street', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'south' },
    { id: 'raymond', name: 'Raymond', address: '17 Freetown Road', hours: 'Mon/Wed/Fri 8–4:30 · Tue/Thu to 5:00', services: 'Full services · Drop box', status: 'open', region: 'south' },
    { id: 'keene', name: 'Keene', address: '149 Emerald Street', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'west' },
    { id: 'milford', name: 'Milford', address: '4 Meadowbrook Drive', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'busy', region: 'south' },
    { id: 'newport', name: 'Newport', address: '20 North Main Street', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'west' },
    { id: 'tamworth', name: 'Tamworth', address: '1864 White Mountain Highway', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'north' },
    { id: 'twin-mountain', name: 'Twin Mountain', address: '549 Route 302 West', hours: 'Mon–Fri 8:00–4:30', services: 'Full services · Drop box', status: 'open', region: 'north' },
    { id: 'gorham', name: 'Gorham', address: '491 Main Street', hours: 'Mon–Thu 8:00–4:30', services: 'Full services · Drop box', status: 'limited', region: 'north' },
    { id: 'colebrook', name: 'Colebrook', address: '17 Bridge Street (Town Hall)', hours: 'Limited availability', services: 'Licensing appointments only', status: 'limited', region: 'north' },
    { id: 'north-haverhill', name: 'North Haverhill', address: '3785 Dartmouth College Highway', hours: 'Limited availability', services: 'Licensing appointments only', status: 'limited', region: 'north' }
  ],

  appointmentServices: [
    { id: 'knowledge-test', label: 'Driver knowledge test' },
    { id: 'road-test', label: 'Road skills test' },
    { id: 'real-id', label: 'REAL ID upgrade' },
    { id: 'transfer', label: 'Out-of-state license transfer' },
    { id: 'registration', label: 'Registration / title' },
    { id: 'motorcycle', label: 'Motorcycle training / permit' },
    { id: 'cdl', label: 'CDL testing' },
    { id: 'other', label: 'Other in-person service' }
  ],

  slots: {
    '2026-03-12': ['9:00 AM', '9:30 AM', '10:30 AM', '11:00 AM', '1:00 PM', '2:30 PM'],
    '2026-03-13': ['8:30 AM', '10:00 AM', '11:30 AM', '1:30 PM', '3:00 PM'],
    '2026-03-14': ['9:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '3:30 PM'],
    '2026-03-17': ['8:30 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM']
  },

  checklistPresets: {
    'first-license': {
      title: 'First-time license checklist',
      docs: [
        { id: 'id', label: 'Proof of identity', hint: 'Birth certificate or valid passport' },
        { id: 'ssn', label: 'Social Security number', hint: 'SSN card or W-2 / SSA document' },
        { id: 'res', label: 'Two proofs of NH residency', hint: 'Utility bill, lease, bank statement, etc.' },
        { id: 'parent', label: 'Parental consent if under 18', hint: 'Required for minors' }
      ]
    },
    transfer: {
      title: 'Out-of-state transfer checklist',
      docs: [
        { id: 'id', label: 'Current out-of-state license', hint: 'Bring the physical credential' },
        { id: 'ssn', label: 'Social Security number', hint: 'Card or acceptable SSA document' },
        { id: 'res', label: 'Two proofs of NH residency', hint: 'Dated within recent months' },
        { id: 'real', label: 'REAL ID documents (if upgrading)', hint: 'Use the REAL ID checker for the full list' }
      ]
    },
    'non-driver': {
      title: 'Non-driver ID checklist',
      docs: [
        { id: 'id', label: 'Proof of identity', hint: 'Birth certificate or passport' },
        { id: 'ssn', label: 'Social Security number', hint: 'Card or acceptable document' },
        { id: 'res', label: 'Two proofs of NH residency', hint: 'Utility, lease, or similar' }
      ]
    },
    'real-id': {
      title: 'REAL ID document checklist',
      docs: [
        { id: 'id', label: 'Identity document', hint: 'Certified birth certificate or unexpired passport' },
        { id: 'ssn', label: 'Social Security evidence', hint: 'SSN card, W-2, or SSA printout' },
        { id: 'res1', label: 'Residency document #1', hint: 'Utility bill, lease, bank statement' },
        { id: 'res2', label: 'Residency document #2', hint: 'Must be a different document type' }
      ]
    },
    address: {
      title: 'Address change checklist',
      docs: [
        { id: 'form', label: 'Completed address change form', hint: 'Printed and signed' },
        { id: 'res', label: 'Proof of new address', hint: 'Utility bill or lease preferred' }
      ]
    },
    'name-change': {
      title: 'Name / gender change checklist',
      docs: [
        { id: 'court', label: 'Court order or vital records', hint: 'Certified copies only' },
        { id: 'id', label: 'Current NH credential', hint: 'License or non-driver ID' },
        { id: 'ssn', label: 'Updated SSN evidence if name changed', hint: 'SSA must match new name' }
      ]
    },
    'cdl-med': {
      title: 'CDL medical card update',
      docs: [
        { id: 'med', label: 'Current medical examiner certificate', hint: 'Original or certified copy' },
        { id: 'cdl', label: 'CDL credential information', hint: 'License number and class' }
      ]
    }
  }
};
