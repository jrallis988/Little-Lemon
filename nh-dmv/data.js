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
    },
    {
      id: 'america-250',
      title: 'Celebrate America! — 250th commemorative plate',
      body: 'Order the America’s 250th cover plate online — $25 + $4.95 shipping. Display Jan 1, 2026 – Jul 4, 2027. Proceeds support LCHIP.'
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
      { name: 'Replacement decal', amount: '$5.00' },
      { name: 'America’s 250th commemorative cover plate', amount: '$25.00 + $4.95 shipping' }
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
      id: 'appt-tomorrow',
      title: 'Appointment tomorrow — 10:30 AM',
      detail: 'Knowledge test · Concord · you still need 1 document',
      meta: 'Checklist',
      href: 'checklist.html#intent=first-license&demo=almost',
      tone: 'warn'
    },
    {
      id: 'license-exp',
      title: 'Your license expires in 47 days',
      detail: 'You’re eligible to renew now · REAL ID Operator $60.00',
      meta: 'Renew',
      href: 'service.html#dl-renew',
      tone: 'warn'
    },
    {
      id: 'reg-exp',
      title: 'Registration expires next month',
      detail: 'Plate NH 482-193 · pay town/city permit fees first',
      meta: 'Renew',
      href: 'vehicle.html#reg-renew',
      tone: 'alert'
    },
    {
      id: 'real-id-check',
      title: 'REAL ID checklist',
      detail: '4 of 5 requirements ready',
      meta: 'Finish',
      href: 'checklist.html#intent=real-id&demo=almost',
      tone: 'ok'
    }
  ],

  attentionCards: [
    {
      id: 'license',
      eyebrow: 'License',
      title: 'Your license expires in 47 days',
      body: 'You’re eligible to renew now.',
      cta: 'Renew license',
      href: 'service.html#dl-renew',
      tone: 'warn'
    },
    {
      id: 'appt',
      eyebrow: 'Appointment',
      title: 'Tomorrow — 10:30 AM',
      body: 'You still need one required document.',
      cta: 'Review checklist',
      href: 'checklist.html#intent=first-license&demo=almost',
      tone: 'alert'
    },
    {
      id: 'reg',
      eyebrow: 'Registration',
      title: 'Expires next month',
      body: 'Renew after town/city permit fees are paid.',
      cta: 'Renew registration',
      href: 'vehicle.html#reg-renew',
      tone: 'warn'
    },
    {
      id: 'realid',
      eyebrow: 'REAL ID',
      title: '4 of 5 requirements ready',
      body: 'Finish the last residency document before you book.',
      cta: 'Finish checklist',
      href: 'checklist.html#intent=real-id&demo=almost',
      tone: 'ok'
    }
  ],

  services: [
    { id: 'dl-renew', category: 'license', group: 'renewals', name: 'Renew driver license', blurb: 'Operator $50 · REAL ID Operator $60 (as of Jan 1, 2026 fee schedule)', ways: ['online', 'appt'], href: 'service.html#dl-renew', fee: '$50–$60' },
    { id: 'nd-renew', category: 'license', group: 'renewals', name: 'Renew non-driver ID', blurb: 'Non-driver identification card — $20.00', ways: ['online', 'drop', 'appt'], href: 'service.html#nd-renew', fee: '$20' },
    { id: 'real-id', category: 'license', group: 'renewals', name: 'Upgrade to REAL ID', blurb: 'Required for domestic flights & federal facilities — book after document check', ways: ['appt'], href: 'service.html#real-id', fee: '$60' },
    { id: 'first-license', category: 'license', group: 'first', name: 'First-time license or permit', blurb: 'Checklist first, then knowledge test by appointment', ways: ['appt'], href: 'first-license.html' },
    { id: 'transfer', category: 'license', group: 'first', name: 'Transfer out-of-state license', blurb: 'New residents have 60 days after establishing residency', ways: ['appt'], href: 'service.html#transfer' },
    { id: 'non-driver', category: 'license', group: 'first', name: 'Apply for non-driver ID', blurb: 'State photo ID without driving privileges — $20.00', ways: ['appt'], href: 'service.html#non-driver', fee: '$20' },
    { id: 'knowledge', category: 'license', group: 'testing', name: 'Schedule knowledge test', blurb: 'Driver, CDL, and motorcycle knowledge tests are appointment-only', ways: ['appt'], href: 'service.html#knowledge' },
    { id: 'road', category: 'license', group: 'testing', name: 'Book road skills test', blurb: 'Schedule after successful knowledge test completion', ways: ['appt'], href: 'service.html#road' },
    { id: 'motorcycle', category: 'license', group: 'testing', name: 'Motorcycle rider training', blurb: 'Season calendar and registration via motorcycle training path', ways: ['online', 'appt'], href: 'service.html#motorcycle' },
    { id: 'duplicate', category: 'license', group: 'updates', name: 'Duplicate license or ID', blurb: 'Replace lost, stolen, or damaged credentials — $20.00', ways: ['online', 'drop', 'appt'], href: 'service.html#duplicate', fee: '$20' },
    { id: 'address', category: 'license', group: 'updates', name: 'Update address', blurb: 'Address change reprint — $10.00 · drop box friendly', ways: ['drop'], href: 'change-address.html', fee: '$10' },
    { id: 'name-change', category: 'license', group: 'updates', name: 'Name or gender change', blurb: 'Bring certified court or vital records to your appointment', ways: ['appt'], href: 'service.html#name-change' },
    { id: 'cdl-med', category: 'license', group: 'updates', name: 'CDL medical card update', blurb: 'Submit via drop box, email, or mail', ways: ['drop', 'mail'], href: 'service.html#cdl-med' },
    { id: 'reg-renew', category: 'vehicle', group: 'registration', name: 'Renew vehicle registration', blurb: 'Pay town/city permit fees first, then state portion at DMV or municipal agent', ways: ['drop', 'appt'], href: 'vehicle.html#reg-renew' },
    { id: 'reg-new', category: 'vehicle', group: 'registration', name: 'New or transfer registration', blurb: 'Title and plate workflows · first-time plate fee $8.00', ways: ['drop', 'appt'], href: 'vehicle.html#reg-new', fee: '+$8 plates' },
    { id: 'temp-plates', category: 'vehicle', group: 'registration', name: 'Temporary plates', blurb: 'Short-term plates while permanent paperwork clears', ways: ['drop', 'appt'], href: 'vehicle.html#temp-plates' },
    { id: 'boat', category: 'vehicle', group: 'registration', name: 'Boat registration', blurb: 'New, renew, or commercial boat registration', ways: ['drop', 'appt'], href: 'vehicle.html#boat' },
    { id: 'title', category: 'vehicle', group: 'titles', name: 'Certificate of title', blurb: 'New title processing with ownership documents', ways: ['drop', 'appt'], href: 'vehicle.html#title' },
    { id: 'dup-title', category: 'vehicle', group: 'titles', name: 'Duplicate title', blurb: 'Replace a lost or damaged title via drop box or appointment', ways: ['drop', 'appt'], href: 'vehicle.html#dup-title' },
    { id: 'america-250', category: 'vehicle', group: 'specialty', name: 'America’s 250th commemorative plate', blurb: 'Cover plate $25 + $4.95 shipping · display Jan 1, 2026 – Jul 4, 2027 · LCHIP proceeds', ways: ['online'], href: 'america-250.html', fee: '$25 + $4.95 ship' },
    { id: 'vanity', category: 'vehicle', group: 'specialty', name: 'Vanity plates', blurb: 'Personalized plate combinations and other specialty designs', ways: ['online', 'appt'], href: 'vehicle.html#vanity' },
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


  /* Branch visit details (concept — parking/access generalized; notes from public hours page where present) */
  branchDetails: {
    concord: { parking: 'Visitor parking at Hazen Drive complex', accessibility: 'Accessible entrance and counter service', directions: 'Off I-93 Exit 14 · follow signs to Hazen Drive', waitNote: 'Appointment-only; same-day slots release daily when available', servicesList: ['Driver licensing','Registration','Titles','Financial Responsibility','Walking disability','Drop box'] },
    manchester: { parking: 'Park in front of the building (maintenance notice)', accessibility: 'Accessible entrance', directions: '377 South Willow Street', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    nashua: { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '110 Broad Street', waitNote: 'Often busy — book ahead', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    dover: { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '50 Boston Harbor Road', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    salem: { parking: 'Behind Romano’s Pizzeria lot', accessibility: 'Accessible entrance', directions: '154 Main Street', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    raymond: { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '17 Freetown Road', waitNote: 'Extended hours Tue/Thu', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    keene: { parking: 'Suite complex parking', accessibility: 'Accessible entrance', directions: '149 Emerald Street', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    milford: { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '4 Meadowbrook Drive', waitNote: 'Often busy — book ahead', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    newport: { parking: 'Street / nearby lot', accessibility: 'Accessible entrance', directions: '20 North Main Street', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    tamworth: { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '1864 White Mountain Highway', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    'twin-mountain': { parking: 'On-site lot', accessibility: 'Accessible entrance', directions: '549 Route 302 West', waitNote: 'Appointment-only', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    gorham: { parking: 'Mountain Valley Plaza lot', accessibility: 'Accessible entrance', directions: '491 Main Street', waitNote: 'Closed Fridays', servicesList: ['Driver licensing','Registration','Duplicate titles','Driving records*','Drop box'] },
    colebrook: { parking: 'Town Hall parking', accessibility: 'Accessible entrance', directions: '17 Bridge Street (Town Hall)', waitNote: 'Driver licensing appointments only · limited availability', servicesList: ['Driver licensing appointments'] },
    'north-haverhill': { parking: 'Courthouse parking', accessibility: 'Accessible entrance', directions: '3785 Dartmouth College Highway', waitNote: 'Driver licensing appointments only · limited availability', servicesList: ['Driver licensing appointments'] },
    'concord-irp': { parking: 'Hazen Drive complex', accessibility: 'Accessible entrance', directions: '23 Hazen Drive', waitNote: 'IRP only', servicesList: ['IRP'] }
  },

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
  },

  homeTasks: [
    { id: 'renew', label: 'Renew my license', href: 'service.html#dl-renew', hint: 'Often online' },
    { id: 'real-id', label: 'Get a REAL ID', href: 'service.html#real-id', hint: 'Appointment' },
    { id: 'register', label: 'Register a vehicle', href: 'vehicle.html#reg-new', hint: 'Drop box or appt' },
    { id: 'replace', label: 'Replace a lost license', href: 'service.html#duplicate', hint: 'Often online' },
    { id: 'address', label: 'Change my address', href: 'change-address.html', hint: 'Guided form' },
    { id: 'first', label: 'Get my first license', href: 'first-license.html', hint: 'Guided journey' },
    { id: 'road', label: 'Schedule a road test', href: 'service.html#road', hint: 'Appointment' },
    { id: 'branch', label: 'Find a DMV location', href: 'branches.html', hint: 'Map + list' },
    { id: 'america-250', label: 'Order America 250 plate', href: 'america-250.html', hint: 'Online' }
  ],

  onlineGuide: [
    { id: 'dl-renew', title: 'Renew license', status: 'online', blurb: 'Complete entirely online when eligible', href: 'service.html#dl-renew' },
    { id: 'duplicate', title: 'Replace license', status: 'online', blurb: 'Duplicate credential often available online or via drop box', href: 'service.html#duplicate' },
    { id: 'america-250', title: 'America’s 250th plate', status: 'online', blurb: 'Order the commemorative cover plate online — ships to you', href: 'america-250.html' },
    { id: 'address', title: 'Change address', status: 'partial', blurb: 'Start online; reprint may use drop box ($10)', href: 'change-address.html' },
    { id: 'reg-renew', title: 'Renew registration', status: 'partial', blurb: 'Town/city fees first, then state portion online or drop box', href: 'vehicle.html#reg-renew' },
    { id: 'mvr', title: 'Order records', status: 'online', blurb: 'Your own driving record can be requested online', href: 'records.html#mvr' },
    { id: 'real-id', title: 'REAL ID', status: 'visit', blurb: 'Requires an in-person visit with original documents', href: 'service.html#real-id' },
    { id: 'title', title: 'Transfer title', status: 'partial', blurb: 'Start paperwork online; finish by drop box or appointment', href: 'vehicle.html#title' },
    { id: 'road', title: 'Road test', status: 'visit', blurb: 'Requires an in-person skills test appointment', href: 'service.html#road' }
  ],

  serviceDetails: {
    'dl-renew': {
      title: 'Renew your driver license',
      summary: 'Keep your Class D credential current. Many residents can renew online when eligible — no counter visit required.',
      eligible: 'NH license holders within the renewal window (typically the months before expiration). Suspensions, required tests, or REAL ID upgrades may change the path.',
      online: 'online',
      onlineLabel: 'Often completed entirely online',
      docs: ['Current license or ID number', 'Date of birth and last name on file', 'Payment method (card)'],
      cost: 'Operator $50.00 · REAL ID Operator $60.00',
      process: ['Confirm eligibility', 'Verify identity', 'Choose standard or REAL ID path', 'Pay fee', 'Receive confirmation'],
      appointment: false,
      where: 'Online when eligible · otherwise any full-service branch by appointment',
      primaryCta: { label: 'Renew online', href: 'renew.html' },
      secondaryCta: { label: 'Book appointment', href: 'appointments.html#service=other' },
      beforeBegin: ['Check your expiration date', 'Confirm your mailing address is current', 'Decide if you also need REAL ID'],
      related: ['real-id', 'duplicate', 'address']
    },
    'nd-renew': {
      title: 'Renew non-driver ID',
      summary: 'Renew your New Hampshire non-driver identification card.',
      eligible: 'Current NH non-driver ID holders within the renewal window.',
      online: 'online',
      onlineLabel: 'Online, drop box, or appointment',
      docs: ['Non-driver ID number', 'Date of birth', 'Last name'],
      cost: '$20.00',
      process: ['Verify identity', 'Confirm address', 'Pay fee', 'Receive confirmation'],
      appointment: false,
      where: 'Online · drop box · appointment',
      primaryCta: { label: 'Renew online', href: 'renew.html#type=non-driver' },
      secondaryCta: { label: 'Book appointment', href: 'appointments.html' },
      beforeBegin: ['Have your ID number ready', 'Confirm your address'],
      related: ['duplicate', 'address']
    },
    'real-id': {
      title: 'Upgrade to REAL ID',
      summary: 'Get a federally compliant credential for domestic flights and secure federal facilities.',
      eligible: 'NH residents who can present original identity, SSN, and two residency documents.',
      online: 'visit',
      onlineLabel: 'DMV visit required',
      docs: ['Identity document (birth certificate or passport)', 'Social Security evidence', 'Two proofs of NH residency'],
      cost: 'REAL ID Operator $60.00',
      process: ['Run document checklist', 'Book appointment', 'Bring originals', 'Photo and issuance at counter'],
      appointment: true,
      where: 'Any branch offering driver licensing — by appointment',
      primaryCta: { label: 'Book appointment', href: 'appointments.html#service=real-id' },
      secondaryCta: { label: 'Check documents', href: 'checklist.html#intent=real-id' },
      beforeBegin: ['Gather originals (not photocopies)', 'Confirm names match across documents', 'Book only when documents are ready'],
      related: ['dl-renew', 'transfer']
    },
    'first-license': {
      title: 'Get your first driver license',
      summary: 'A guided path from requirements through knowledge and road tests.',
      eligible: 'New drivers meeting age, education, and supervised driving requirements.',
      online: 'partial',
      onlineLabel: 'Start online — testing requires a visit',
      docs: ['Proof of identity', 'Social Security number', 'Two proofs of NH residency', 'Parental consent if under 18'],
      cost: 'Youth Operator $10.00 per year up to age 21 · standard Operator fees after 21',
      process: ['Check requirements', 'Driver education', 'Supervised driving', 'Knowledge test', 'Road test', 'Receive license'],
      appointment: true,
      where: 'Knowledge and road tests at branches that offer testing',
      primaryCta: { label: 'Start journey', href: 'first-license.html' },
      secondaryCta: { label: 'Document checklist', href: 'checklist.html#intent=first-license' },
      beforeBegin: ['Review age requirements', 'Plan driver education', 'Bookmark the NH Driver Manual'],
      related: ['knowledge', 'road']
    },
    transfer: {
      title: 'Transfer an out-of-state license',
      summary: 'New residents have 60 days after establishing NH residency to obtain an NH license.',
      eligible: 'Residents with a valid out-of-state license establishing NH residency.',
      online: 'visit',
      onlineLabel: 'DMV visit required',
      docs: ['Current out-of-state license', 'Social Security evidence', 'Two proofs of NH residency', 'REAL ID docs if upgrading'],
      cost: 'Operator $50.00 · REAL ID Operator $60.00',
      process: ['Establish residency documents', 'Run transfer checklist', 'Book appointment', 'Surrender out-of-state license'],
      appointment: true,
      where: 'Any licensing branch by appointment',
      primaryCta: { label: 'Book appointment', href: 'appointments.html#service=transfer' },
      secondaryCta: { label: 'New resident guide', href: 'new-resident.html' },
      beforeBegin: ['Confirm you have two residency proofs', 'Decide on REAL ID now or later'],
      related: ['real-id', 'reg-new']
    },
    'non-driver': {
      title: 'Apply for non-driver ID',
      summary: 'State photo ID without driving privileges.',
      eligible: 'NH residents who need photo ID but not a license.',
      online: 'visit',
      onlineLabel: 'Appointment required for first issuance',
      docs: ['Proof of identity', 'Social Security number', 'Two proofs of NH residency'],
      cost: '$20.00',
      process: ['Gather documents', 'Book appointment', 'Photo and issuance'],
      appointment: true,
      where: 'Licensing branches by appointment',
      primaryCta: { label: 'Book appointment', href: 'appointments.html' },
      secondaryCta: { label: 'Checklist', href: 'checklist.html#intent=non-driver' },
      beforeBegin: ['Gather originals', 'Confirm residency proofs'],
      related: ['nd-renew']
    },
    knowledge: {
      title: 'Schedule a knowledge test',
      summary: 'Written exam for driver, CDL, or motorcycle knowledge — appointment only.',
      eligible: 'Applicants who have completed prerequisite steps for their credential path.',
      online: 'partial',
      onlineLabel: 'Book online — take the test in person',
      docs: ['Required identity documents for your path', 'Permit or application paperwork if applicable'],
      cost: 'Included in credential fees where applicable — confirm at booking',
      process: ['Confirm readiness', 'Book appointment', 'Arrive with documents', 'Take exam'],
      appointment: true,
      where: 'Branches offering knowledge testing',
      primaryCta: { label: 'Book appointment', href: 'appointments.html#service=knowledge-test' },
      secondaryCta: { label: 'First license journey', href: 'first-license.html' },
      beforeBegin: ['Study the Driver Manual', 'Bring required IDs'],
      related: ['road', 'first-license']
    },
    road: {
      title: 'Book a road skills test',
      summary: 'Behind-the-wheel exam after a successful knowledge test.',
      eligible: 'Applicants who passed knowledge and completed supervised driving requirements.',
      online: 'visit',
      onlineLabel: 'DMV visit required',
      docs: ['Permit / temporary credential', 'Vehicle meeting test requirements', 'Accompanying licensed driver if required'],
      cost: 'Per official testing schedule',
      process: ['Confirm knowledge test passed', 'Book road test', 'Arrive with safe vehicle', 'Complete skills exam'],
      appointment: true,
      where: 'Branches offering road testing',
      primaryCta: { label: 'Book appointment', href: 'appointments.html#service=road-test' },
      secondaryCta: { label: 'Find a branch', href: 'branches.html' },
      beforeBegin: ['Confirm vehicle is roadworthy', 'Bring permit and ID'],
      related: ['knowledge', 'first-license']
    },
    motorcycle: {
      title: 'Motorcycle rider training',
      summary: 'Seasonal training and motorcycle permit / endorsement paths.',
      eligible: 'Residents seeking motorcycle privileges.',
      online: 'partial',
      onlineLabel: 'Register online — training and tests in person',
      docs: ['Identity documents', 'Training registration confirmation'],
      cost: 'Motorcycle only $55.00 · first endorsement $30.00 · renewal $5.00',
      process: ['Review season calendar', 'Register', 'Complete training / testing'],
      appointment: true,
      where: 'Training sites and DMV testing locations',
      primaryCta: { label: 'Start registration', href: 'appointments.html#service=motorcycle' },
      secondaryCta: { label: 'See fees', href: 'fees.html' },
      beforeBegin: ['Check season dates', 'Confirm eligibility age'],
      related: ['knowledge']
    },
    duplicate: {
      title: 'Replace a lost or stolen license',
      summary: 'Request a duplicate license or non-driver ID when your credential is lost, stolen, or damaged.',
      eligible: 'Current NH credential holders needing a replacement.',
      online: 'online',
      onlineLabel: 'Often completed online or via drop box',
      docs: ['Identity verification', 'License / ID number if known'],
      cost: '$20.00',
      process: ['Verify identity', 'Request duplicate', 'Pay fee', 'Receive confirmation'],
      appointment: false,
      where: 'Online · drop box · appointment if needed',
      primaryCta: { label: 'Request duplicate', href: 'renew.html#type=duplicate' },
      secondaryCta: { label: 'Book appointment', href: 'appointments.html' },
      beforeBegin: ['Have your license number ready if possible', 'Update address if you’ve moved'],
      related: ['address', 'dl-renew']
    },
    address: {
      title: 'Change my address',
      summary: 'Update the mailing address on your DMV record. Reprint fee applies.',
      eligible: 'NH credential holders with a new residential mailing address.',
      online: 'partial',
      onlineLabel: 'Start online — drop box friendly',
      docs: ['Completed address change information', 'Proof of new address preferred'],
      cost: 'Address change reprint $10.00',
      process: ['Verify identity', 'Enter new address', 'Review', 'Submit', 'Confirmation'],
      appointment: false,
      where: 'Guided digital form · drop box · appointment',
      primaryCta: { label: 'Start address change', href: 'change-address.html' },
      secondaryCta: { label: 'Checklist', href: 'checklist.html#intent=address' },
      beforeBegin: ['Know your new NH address', 'Have proof of residency if using drop box'],
      related: ['duplicate', 'dl-renew']
    },
    'name-change': {
      title: 'Name or gender change',
      summary: 'Update your credential with certified court or vital records.',
      eligible: 'Residents with certified legal name or gender change documentation.',
      online: 'visit',
      onlineLabel: 'DMV visit required',
      docs: ['Court order or vital records (certified)', 'Current NH credential', 'Updated SSN evidence if name changed'],
      cost: 'Per credential reissue fees',
      process: ['Gather certified documents', 'Book appointment', 'Update credential at counter'],
      appointment: true,
      where: 'Licensing branches by appointment',
      primaryCta: { label: 'Book appointment', href: 'appointments.html' },
      secondaryCta: { label: 'Checklist', href: 'checklist.html#intent=name-change' },
      beforeBegin: ['Obtain certified copies', 'Update SSA records if name changed'],
      related: ['duplicate']
    },
    'cdl-med': {
      title: 'CDL medical card update',
      summary: 'Submit a current medical examiner certificate for your CDL.',
      eligible: 'CDL holders needing to update medical certification.',
      online: 'partial',
      onlineLabel: 'Submit via drop box, email, or mail',
      docs: ['Current medical examiner certificate', 'CDL credential information'],
      cost: 'No separate listed fee for submission — confirm if reissue needed',
      process: ['Obtain medical certificate', 'Submit via drop box / mail / email path', 'Confirm on file'],
      appointment: false,
      where: 'Drop box · mail · email path',
      primaryCta: { label: 'Open checklist', href: 'checklist.html#intent=cdl-med' },
      secondaryCta: { label: 'Find a branch', href: 'branches.html' },
      beforeBegin: ['Have the original or certified certificate'],
      related: []
    },
    'reg-renew': {
      title: 'Renew vehicle registration',
      summary: 'Pay town/city permit fees first, then complete the state portion.',
      eligible: 'Vehicle owners with an upcoming registration expiration.',
      online: 'partial',
      onlineLabel: 'Start at town/city — finish online or drop box',
      docs: ['Registration renewal notice', 'Proof of town/city permit fees paid', 'Insurance information as required'],
      cost: 'Town/city fees vary · state portion per schedule · plates/decals as needed',
      process: ['Pay municipal permit fees', 'Complete state registration', 'Receive decal / confirmation'],
      appointment: false,
      where: 'Municipal agent · DMV drop box · appointment',
      primaryCta: { label: 'Vehicle services', href: 'vehicle.html#reg-renew' },
      secondaryCta: { label: 'Book appointment', href: 'appointments.html#service=registration' },
      beforeBegin: ['Check municipal requirements', 'Confirm insurance'],
      related: ['title']
    },
    'reg-new': {
      title: 'Register a vehicle',
      summary: 'New or transfer registration with title and plate workflows.',
      eligible: 'Owners registering a vehicle in New Hampshire.',
      online: 'partial',
      onlineLabel: 'Paperwork first — finish by drop box or appointment',
      docs: ['Title or ownership documents', 'Proof of identity', 'Insurance', 'Municipal permit fees'],
      cost: 'First-time plate fee $8.00 + registration fees',
      process: ['Gather ownership docs', 'Municipal steps', 'State registration', 'Plates'],
      appointment: false,
      where: 'Drop box or appointment',
      primaryCta: { label: 'Start registration path', href: 'vehicle.html#reg-new' },
      secondaryCta: { label: 'New resident guide', href: 'new-resident.html' },
      beforeBegin: ['Confirm title status', 'Budget for municipal + state fees'],
      related: ['title', 'transfer']
    },
    title: {
      title: 'Certificate of title',
      summary: 'Process a new title with ownership documents.',
      eligible: 'Owners needing NH title issuance or transfer.',
      online: 'partial',
      onlineLabel: 'Start paperwork — finish by drop box or appointment',
      docs: ['Prior title or MSO', 'Bill of sale if applicable', 'ID'],
      cost: 'Per title fee schedule',
      process: ['Assemble ownership chain', 'Submit via drop box or appointment', 'Receive title'],
      appointment: false,
      where: 'Drop box · appointment',
      primaryCta: { label: 'Title services', href: 'vehicle.html#title' },
      secondaryCta: { label: 'Book appointment', href: 'appointments.html#service=registration' },
      beforeBegin: ['Do not laminate titles', 'Bring complete ownership chain'],
      related: ['reg-new', 'dup-title']
    },
    'america-250': {
      title: 'America’s 250th commemorative cover plate',
      summary: 'Order New Hampshire’s Celebrate America commemorative cover plate online. Ships to you — no counter visit required.',
      eligible: 'Anyone ordering a front cover plate for display during the authorized window.',
      online: 'online',
      onlineLabel: 'Order entirely online',
      docs: ['Shipping address', 'Payment method'],
      cost: '$25.00 + $4.95 shipping',
      process: ['Review plate details', 'Order online (up to 4 per order)', 'Allow up to 4 weeks for production & shipping', 'Display on front only with rear registration plate — or keep as souvenir'],
      appointment: false,
      where: 'Online order · ships to you · bulk 25+ at Concord',
      primaryCta: { label: 'Plate details & order', href: 'america-250.html' },
      secondaryCta: { label: 'Vehicle specialty hub', href: 'vehicle.html#specialty' },
      beforeBegin: ['Credit card only — purchases are non-refundable', 'Confirm front cover plate use (rear registration plate stays on)'],
      related: ['vanity', 'reg-renew']
    },
    vanity: {
      title: 'Vanity & specialty plates',
      summary: 'Personalized combinations plus conservation, parks, veteran, and other specialty designs.',
      eligible: 'Vehicle owners requesting vanity or specialty plate types.',
      online: 'partial',
      onlineLabel: 'Start online — some types need documents or an appointment',
      docs: ['Registration information', 'Eligibility docs for veteran / specialty types when required'],
      cost: 'Varies by plate type — see fees',
      process: ['Choose plate type', 'Check availability', 'Submit order or book if documents required'],
      appointment: false,
      where: 'Online · appointment when eligibility review is needed',
      primaryCta: { label: 'Specialty plates', href: 'vehicle.html#specialty' },
      secondaryCta: { label: 'America’s 250th plate', href: 'america-250.html' },
      beforeBegin: ['Decide vanity vs commemorative vs specialty design'],
      related: ['america-250', 'reg-new']
    },
    mvr: {
      title: 'Request your driving record',
      summary: 'Your own motor vehicle record can be requested online. Third-party requests go to Concord.',
      eligible: 'Individuals requesting their own record.',
      online: 'online',
      onlineLabel: 'Available online for your own record',
      docs: ['License / ID number', 'Date of birth'],
      cost: 'Research / records fees may apply ($20.00 Concord research listed)',
      process: ['Verify identity', 'Select record type', 'Submit request', 'Download or receive'],
      appointment: false,
      where: 'Online for your own record · Concord for third-party',
      primaryCta: { label: 'Request record', href: 'records.html#mvr' },
      secondaryCta: { label: 'My DMV records', href: 'records.html' },
      beforeBegin: ['Have your license number ready'],
      related: ['ticket']
    }
  },

  searchIntents: [
    { phrases: ['lost', 'stolen', 'replace', 'duplicate', 'missing license'], title: 'Replace a lost or stolen driver license', blurb: 'Request a duplicate credential — often online.', href: 'service.html#duplicate', badge: 'Often online' },
    { phrases: ['moved', 'move', 'address', 'new address', 'i moved'], title: 'Change my address', blurb: 'Guided address update with $10 reprint fee.', href: 'change-address.html', badge: 'Guided form' },
    { phrases: ['expire', 'expires', 'renew', 'renewal', 'expiring'], title: 'Renew your driver license', blurb: 'You’re likely looking for online renewal eligibility.', href: 'service.html#dl-renew', badge: 'Often online' },
    { phrases: ['bought', 'buy', 'new car', 'purchased', 'register'], title: 'Register a vehicle', blurb: 'New or transfer registration path.', href: 'service.html#reg-new', badge: 'Partial online' },
    { phrases: ['real id', 'realid', 'flight', 'tsa', 'airport'], title: 'Upgrade to REAL ID', blurb: 'In-person visit with original documents.', href: 'service.html#real-id', badge: 'Visit required' },
    { phrases: ['failed', 'fail', 'road test', 'retake'], title: 'Schedule another road test', blurb: 'Book a new skills test appointment after a failed attempt.', href: 'service.html#road', badge: 'Appointment' },
    { phrases: ['name change', 'married', 'divorce', 'gender'], title: 'Name or gender change', blurb: 'Appointment with certified records.', href: 'service.html#name-change', badge: 'Visit required' },
    { phrases: ['new to', 'new hampshire', 'moved here', 'new resident', 'just moved'], title: 'New to New Hampshire?', blurb: 'Build a 60-day plan for license and vehicle.', href: 'new-resident.html', badge: 'Guided' },
    { phrases: ['first license', 'learner', 'permit', 'teen', 'first driver'], title: 'Get your first driver license', blurb: 'Step-by-step journey for new drivers.', href: 'first-license.html', badge: 'Journey' },
    { phrases: ['online', 'skip the trip', 'do this online', 'visit'], title: 'Can I do this online?', blurb: 'See which services skip the counter.', href: 'online.html', badge: 'Guide' },
    { phrases: ['location', 'branch', 'office', 'hours', 'near me'], title: 'Find a DMV location', blurb: 'Map and list of 15 branches.', href: 'branches.html', badge: 'Locations' },
    { phrases: ['fee', 'cost', 'price', 'how much'], title: 'What will this cost?', blurb: 'Search common DMV fees by service.', href: 'fees.html', badge: 'Fees' },
    { phrases: ['america', '250', 'commemorative', 'cover plate', 'celebrate america', 'lchip', 'specialty plate'], title: 'America’s 250th commemorative plate', blurb: 'Order the cover plate online — $25 + shipping.', href: 'america-250.html', badge: 'Online' },
    { phrases: ['vanity', 'personalized plate', 'custom plate', 'moose plate', 'parks plate'], title: 'Vanity & specialty plates', blurb: 'Personalized and specialty plate options.', href: 'vehicle.html#specialty', badge: 'Plates' },
    { phrases: ['video', 'how to appointment', 'how to make an appointment', 'appointment video'], title: 'How to make an appointment', blurb: 'Short how-to video with transcript, then book.', href: 'appointments.html#how-to-video', badge: 'Video' }
  ],

  firstLicenseJourney: [
    { id: 'requirements', title: 'Check requirements', body: 'Confirm age, residency, and parental consent rules for your situation.', action: { label: 'Open checklist', href: 'checklist.html#intent=first-license' }, reqs: ['Confirm eligibility age', 'Review residency proofs needed'] },
    { id: 'education', title: 'Driver education', body: 'Complete approved driver education when required for your age.', action: { label: 'See first-license path', href: 'service.html#first-license' }, reqs: ['Enroll in approved course', 'Keep completion certificate'] },
    { id: 'practice', title: 'Supervised driving', body: 'Log required supervised practice with a licensed adult.', action: { label: 'Continue journey', href: 'first-license.html' }, reqs: ['Track practice hours', 'Use a safe vehicle'] },
    { id: 'knowledge', title: 'Knowledge test', body: 'Pass the written exam — book an appointment and bring documents.', action: { label: 'Book knowledge test', href: 'appointments.html#service=knowledge-test' }, reqs: ['Study Driver Manual', 'Bring identity documents'] },
    { id: 'road', title: 'Road test', body: 'Schedule your skills test after passing knowledge and completing practice.', action: { label: 'Book road test', href: 'appointments.html#service=road-test' }, reqs: ['Passed knowledge test', 'Roadworthy vehicle'] },
    { id: 'license', title: 'Receive license', body: 'Complete issuance steps and pay applicable fees.', action: { label: 'See fees', href: 'fees.html' }, reqs: ['Passed road test', 'Fee payment ready'] }
  ],

  myRecords: {
    availableOnline: [
      { title: 'Driver license status', detail: 'Class D · REAL ID · expires Nov 14, 2026', href: 'dashboard.html', action: 'View' },
      { title: 'Vehicle registrations', detail: 'Plate NH 482-193', href: 'vehicle.html', action: 'Manage' },
      { title: 'Appointments', detail: 'Upcoming knowledge test · Concord', href: 'appointments.html', action: 'Open' },
      { title: 'Receipts & confirmations', detail: 'Demo booking receipts stored in this browser', href: 'confirmation.html', action: 'View' },
      { title: 'Your driving record (MVR)', detail: 'Request your own record online', href: 'records.html#mvr', action: 'Request' }
    ],
    formalRequest: [
      { title: 'Third-party driving records', detail: 'Must go through Concord research — not instant online', href: 'records.html#mvr', action: 'Learn more' },
      { title: 'Accident reports', detail: 'Drop-box request path', href: 'records.html#accident', action: 'Start' },
      { title: 'Certified copies & research', detail: 'Formal records request · fees may apply', href: 'fees.html', action: 'See fees' }
    ]
  },

  problemStates: {
    missingDoc: { title: 'You’re missing one document', body: 'Your visit can still succeed — gather the remaining item before you travel.', next: 'Open checklist', href: 'checklist.html' },
    notAccepted: { title: 'This document isn’t accepted', body: 'Photocopies and expired statements usually fail. Use an original from the accepted list.', next: 'See acceptable documents', href: 'checklist.html#intent=real-id' },
    notOnline: { title: 'This service can’t be completed online', body: 'You’ll need an appointment. Prepare documents first so there are no surprises at the counter.', next: 'Book appointment', href: 'appointments.html' },
    notEligible: { title: 'Your license isn’t currently eligible for online renewal', body: 'You may need a test, REAL ID upgrade, or in-person verification.', next: 'See renewal options', href: 'service.html#dl-renew' },
    noSlots: { title: 'No appointments available at this location', body: 'Try another day or branch. Same-day slots release daily when available.', next: 'Try another branch', href: 'branches.html' }
  },

};
