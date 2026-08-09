/* NH DMV concept data — sourced from public dmv.nh.gov pages (Aug 2026).
   Demo-only; not live state systems. */

window.NHDMV = {
  meta: {
    phone: '603-227-4000',
    phoneHref: 'tel:6032274000',
    officialSite: 'https://www.dmv.nh.gov/',
    appointmentInfo: 'https://www.dmv.nh.gov/appointments-and-services',
    hoursSource: 'https://www.dmv.nh.gov/hours-and-locations',
    feesSource: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/licensing-fees',
    customerServiceNote:
      'Call 603-227-4000 and a customer service representative can help book or answer fee questions.'
  },

  notices: [
    {
      id: 'appointments',
      title: 'Fully appointment-based',
      body: 'In-person services require an appointment. Same-day slots are released daily when available.'
    },
    {
      id: 'inspections',
      title: 'Inspections & emissions ended',
      body: 'New Hampshire terminated the inspection and emissions testing programs. See the official inspections page for details.'
    },
    {
      id: 'fees-2026',
      title: 'Fee changes as of January 1, 2026',
      body: 'Review common DMV fees before you visit. Questions: 603-227-4000.'
    },
    {
      id: 'real-id',
      title: 'REAL ID required for domestic flights',
      body: 'Effective May 7, 2025 — a REAL ID license/ID or passport is required for domestic flights and secure federal facilities.'
    },
    {
      id: 'new-resident',
      title: 'New residents: 60 days',
      body: 'After establishing NH residency, you have 60 days to obtain an NH driver license and register your vehicles.'
    },
    {
      id: 'scam',
      title: 'Scam alert',
      body: 'The NH DMV never sends text messages regarding payments.'
    }
  ],

  payments: [
    'Credit card — MasterCard, VISA, or Discover (American Express for phone and in-person)',
    'Cash — counter / in-person only',
    'Personal check, money order, or traveler’s check — payable to “State of NH - DMV”'
  ],

  fees: {
    licensing: [
      { name: 'Operator (not federally compliant)', amount: '$50.00' },
      { name: 'REAL ID Operator (federally compliant)', amount: '$60.00' },
      { name: 'Youth Operator', amount: '$10.00 per year up to age 21' },
      { name: 'Non-US Citizen', amount: '$10.00 per year, not to exceed 5 years' },
      { name: 'Non-Driver Identification Card', amount: '$20.00' },
      { name: 'Motorcycle Only or Motor Driven Cycle Only', amount: '$55.00' },
      { name: 'Moped', amount: '$8.00' },
      { name: 'First-time Motorcycle or 3-Wheel endorsement', amount: '$30.00' },
      { name: 'Renewal of Motorcycle or 3-Wheel endorsement', amount: '$5.00' },
      { name: 'Duplicate license or non-driver ID', amount: '$20.00' },
      { name: 'Address change reprint', amount: '$10.00' }
    ],
    cdl: [
      { name: 'CDL Class A / B / C', amount: '$60.00' },
      { name: 'CDL Learner’s Permit (additional)', amount: '$20.00' },
      { name: 'CDL endorsements (H, N, P, S, T) each', amount: '$10.00' }
    ],
    other: [
      { name: 'Copy of registration', amount: '$20.00' },
      { name: 'Motor vehicle records request (Concord research)', amount: '$20.00' },
      { name: 'First-time plate fee', amount: '$8.00' },
      { name: 'Replacement plate (one)', amount: '$4.00' },
      { name: 'Replacement plate set (both)', amount: '$8.00' },
      { name: 'Replacement decal', amount: '$5.00' }
    ]
  },

  user: {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.demo',
    licenseNumber: 'NHL482193',
    licenseExpires: '2026-11-14',
    licenseType: 'Class D · REAL ID',
    plate: 'NH 482-193',
    address: 'Concord, NH'
  },

  dashboardItems: [
    {
      id: 'appt-knowledge',
      title: 'Knowledge test',
      detail: 'Concord · Thu Mar 12 · 10:30 AM',
      meta: 'Reschedule',
      href: 'appointments.html?service=knowledge-test&reschedule=1',
      tone: 'ok'
    },
    {
      id: 'license-exp',
      title: 'License expires Nov 14, 2026',
      detail: 'REAL ID Operator · renewal fee $60.00 when eligible',
      meta: 'Renew',
      href: 'renew.html',
      tone: 'warn'
    },
    {
      id: 'real-id',
      title: 'REAL ID on file',
      detail: 'Star credential — valid for domestic flights',
      meta: 'View',
      href: 'real-id.html',
      tone: 'ok'
    }
  ],

  services: [
    { id: 'dl-renew', category: 'license', group: 'renewals', name: 'Renew driver license', blurb: 'Operator $50 · REAL ID Operator $60 (as of Jan 1, 2026 fee schedule)', ways: ['online', 'appt'], href: 'renew.html', fee: '$50–$60' },
    { id: 'nd-renew', category: 'license', group: 'renewals', name: 'Renew non-driver ID', blurb: 'Non-driver identification card — $20.00', ways: ['online', 'drop', 'appt'], href: 'renew.html?type=non-driver', fee: '$20' },
    { id: 'real-id', category: 'license', group: 'renewals', name: 'Upgrade to REAL ID', blurb: 'Required for domestic flights & federal facilities — book after document check', ways: ['appt'], href: 'real-id.html', fee: '$60' },
    { id: 'first-license', category: 'license', group: 'first', name: 'First-time license or permit', blurb: 'Checklist first, then knowledge test by appointment', ways: ['appt'], href: 'checklist.html?intent=first-license' },
    { id: 'transfer', category: 'license', group: 'first', name: 'Transfer out-of-state license', blurb: 'New residents have 60 days after establishing residency', ways: ['appt'], href: 'checklist.html?intent=transfer' },
    { id: 'non-driver', category: 'license', group: 'first', name: 'Apply for non-driver ID', blurb: 'State photo ID without driving privileges — $20.00', ways: ['appt'], href: 'checklist.html?intent=non-driver', fee: '$20' },
    { id: 'knowledge', category: 'license', group: 'testing', name: 'Schedule knowledge test', blurb: 'Driver, CDL, and motorcycle knowledge tests are appointment-only', ways: ['appt'], href: 'appointments.html?service=knowledge-test' },
    { id: 'road', category: 'license', group: 'testing', name: 'Book road skills test', blurb: 'Schedule after successful knowledge test completion', ways: ['appt'], href: 'appointments.html?service=road-test' },
    { id: 'motorcycle', category: 'license', group: 'testing', name: 'Motorcycle rider training', blurb: 'Season calendar and registration via motorcycle training path', ways: ['online', 'appt'], href: 'appointments.html?service=motorcycle' },
    { id: 'duplicate', category: 'license', group: 'updates', name: 'Duplicate license or ID', blurb: 'Replace lost, stolen, or damaged credentials — $20.00', ways: ['online', 'drop', 'appt'], href: 'renew.html?type=duplicate', fee: '$20' },
    { id: 'address', category: 'license', group: 'updates', name: 'Update address', blurb: 'Address change reprint — $10.00 · drop box friendly', ways: ['drop'], href: 'checklist.html?intent=address', fee: '$10' },
    { id: 'name-change', category: 'license', group: 'updates', name: 'Name or gender change', blurb: 'Bring certified court or vital records to your appointment', ways: ['appt'], href: 'checklist.html?intent=name-change' },
    { id: 'cdl-med', category: 'license', group: 'updates', name: 'CDL medical card update', blurb: 'Submit via drop box, email, or mail', ways: ['drop', 'mail'], href: 'checklist.html?intent=cdl-med' },
    { id: 'reg-renew', category: 'vehicle', group: 'registration', name: 'Renew vehicle registration', blurb: 'Pay town/city permit fees first, then state portion at DMV or municipal agent', ways: ['drop', 'appt'], href: 'vehicle.html#reg-renew' },
    { id: 'reg-new', category: 'vehicle', group: 'registration', name: 'New or transfer registration', blurb: 'Title and plate workflows · first-time plate fee $8.00', ways: ['drop', 'appt'], href: 'vehicle.html#reg-new', fee: '+$8 plates' },
    { id: 'temp-plates', category: 'vehicle', group: 'registration', name: 'Temporary plates', blurb: 'Short-term plates while permanent paperwork clears', ways: ['drop', 'appt'], href: 'vehicle.html#temp-plates' },
    { id: 'boat', category: 'vehicle', group: 'registration', name: 'Boat registration', blurb: 'New, renew, or commercial boat registration', ways: ['drop', 'appt'], href: 'vehicle.html#boat' },
    { id: 'title', category: 'vehicle', group: 'titles', name: 'Certificate of title', blurb: 'New title processing with ownership documents', ways: ['drop', 'appt'], href: 'vehicle.html#title' },
    { id: 'dup-title', category: 'vehicle', group: 'titles', name: 'Duplicate title', blurb: 'Replace a lost or damaged title via drop box or appointment', ways: ['drop', 'appt'], href: 'vehicle.html#dup-title' },
    { id: 'vanity', category: 'vehicle', group: 'specialty', name: 'Vanity or commemorative plates', blurb: 'Including America’s 250th Anniversary plate', ways: ['appt', 'mail'], href: 'vehicle.html#vanity' },
    { id: 'placard', category: 'vehicle', group: 'specialty', name: 'Walking disability placard', blurb: 'Accessible parking placard applications', ways: ['drop', 'appt'], href: 'vehicle.html#placard' },
    { id: 'mvr', category: 'records', group: 'records', name: 'Request your driving record', blurb: 'Your own record only online · third-party requests must go to Concord', ways: ['online', 'drop', 'appt'], href: 'records.html#mvr', fee: '$20 research' },
    { id: 'accident', category: 'records', group: 'records', name: 'Request accident report', blurb: 'Drop-box request for crash reports', ways: ['drop'], href: 'records.html#accident' },
    { id: 'ticket', category: 'records', group: 'compliance', name: 'Respond to a ticket', blurb: 'Pay or respond online when eligible · Financial Responsibility in Concord', ways: ['online', 'drop', 'appt'], href: 'records.html#ticket' },
    { id: 'restoration', category: 'records', group: 'compliance', name: 'Pay restoration fee', blurb: 'Reinstate after suspension when eligible', ways: ['drop', 'appt'], href: 'records.html#restoration' },
    { id: 'interlock', category: 'records', group: 'compliance', name: 'Ignition interlock info', blurb: 'Removal appointments available in Concord only', ways: ['appt'], href: 'records.html#interlock' }
  ],

  branches: [
    { id: 'concord', name: 'Concord', address: '23 Hazen Drive', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Financial Responsibility; Registration; Walking disability; Title', status: 'open', region: 'central', note: 'Full-service headquarters' },
    { id: 'concord-irp', name: 'Concord IRP', address: '23 Hazen Drive', hours: 'Mon–Fri 8:15 am–4:15 pm', services: 'IRP only', status: 'open', region: 'central' },
    { id: 'manchester', name: 'Manchester', address: '377 South Willow Street', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'south', note: 'Due to building maintenance, park in front of the building' },
    { id: 'nashua', name: 'Nashua', address: '110 Broad Street', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'busy', region: 'south' },
    { id: 'dover', name: 'Dover', address: '50 Boston Harbor Road', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'seacoast' },
    { id: 'salem', name: 'Salem', address: '154 Main Street (behind Romano’s Pizzeria)', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'south' },
    { id: 'raymond', name: 'Raymond', address: '17 Freetown Road', hours: 'Mon/Wed/Fri 8:00–4:30 · Tue/Thu 8:00–5:00', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'south', note: 'Extended hours Tue/Thu' },
    { id: 'keene', name: 'Keene', address: '149 Emerald Street, Suites A-1 and A-2', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'west' },
    { id: 'milford', name: 'Milford', address: '4 Meadowbrook Drive', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'busy', region: 'south' },
    { id: 'newport', name: 'Newport', address: '20 North Main Street', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'west' },
    { id: 'tamworth', name: 'Tamworth', address: '1864 White Mountain Highway', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'north' },
    { id: 'twin-mountain', name: 'Twin Mountain', address: '549 Route 302 West', hours: 'Mon–Fri 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'open', region: 'north' },
    { id: 'gorham', name: 'Gorham', address: '491 Main Street (Mountain Valley Plaza)', hours: 'Mon–Thu 8:00 am–4:30 pm', services: 'Drop box; Driver licensing; Registration; Walking disability; Duplicate titles; Driving records*', status: 'limited', region: 'north', note: 'Closed Fridays' },
    { id: 'colebrook', name: 'Colebrook', address: '17 Bridge Street (Town Hall)', hours: 'Limited availability', services: 'Driver licensing appointments only', status: 'limited', region: 'north' },
    { id: 'north-haverhill', name: 'North Haverhill', address: '3785 Dartmouth College Highway (Grafton County Courthouse)', hours: 'Limited availability', services: 'Driver licensing appointments only', status: 'limited', region: 'north' }
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

  /* Demo inventory — one day intentionally empty for error-state UX */
  slots: {
    '2026-03-12': ['9:00 AM', '9:30 AM', '10:30 AM', '11:00 AM', '1:00 PM', '2:30 PM'],
    '2026-03-13': ['8:30 AM', '10:00 AM', '11:30 AM', '1:30 PM', '3:00 PM'],
    '2026-03-14': [],
    '2026-03-17': ['8:30 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
    '2026-03-18': ['9:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '3:30 PM']
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
