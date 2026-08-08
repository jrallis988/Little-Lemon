import { AI_EMPLOYEES } from '@/data/employees';
import type {
  AgentAction,
  CalendarEvent,
  ChatMessage,
  Conversation,
  FileAttachment,
  ManagerInsight,
  MemoryEntry,
  NoteItem,
  NotificationItem,
  TaskItem,
  UserProfile,
  WorkBadge,
  Workspace,
} from '@/types';
import { createId } from '@/utils/id';

const hoursAgo = (hours: number): string =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

function buildSeedReply(name: string, department: string, responsibilities: string[]): string {
  return [
    `Here's how I'd **handle this as work**, not just an answer — from **${department}**:`,
    '',
    `1. **Investigate** — pull the relevant records for ${responsibilities[0].toLowerCase()}.`,
    `2. **Act inside policy** — start the workflow for ${responsibilities[1]?.toLowerCase() ?? responsibilities[0].toLowerCase()}.`,
    `3. **Coordinate** — notify stakeholders and document the trail for ${responsibilities[2]?.toLowerCase() ?? responsibilities[0].toLowerCase()}.`,
    '',
    `I'll only escalate when human judgment is required. — ${name}`,
  ].join('\n');
}

export function seedWorkspaceData() {
  const user: UserProfile = {
    id: 'user-demo',
    email: 'alex@shift.work',
    fullName: 'Alex Morgan',
    role: 'owner',
  };

  const workspaces: Workspace[] = [
    {
      id: 'ws-shift',
      name: 'Shift HQ',
      slug: 'shift',
      role: 'owner',
      tagline: 'Powered by Working Intelligence',
    },
    {
      id: 'ws-ops',
      name: 'Frontline Ops',
      slug: 'ops',
      role: 'admin',
      tagline: 'Connect existing systems. Coordinate the work.',
    },
  ];

  const conversations: Conversation[] = AI_EMPLOYEES.map((employee, index) => ({
    id: `conv-${employee.slug}`,
    employeeId: employee.id,
    workspaceId: 'ws-shift',
    title: `Work with ${employee.name}`,
    pinned: index < 2,
    unreadCount: index === 2 ? 2 : 0,
    lastMessagePreview:
      employee.slug === 'holly'
        ? 'I found the payroll discrepancy and started the correction workflow.'
        : employee.slug === 'calvin'
          ? 'Six orders risk missing pickup — notifying customers now.'
          : `Ready to ${employee.responsibilities[0].toLowerCase()} inside your existing systems.`,
    lastMessageAt: hoursAgo(index + 1),
    createdAt: hoursAgo(24 + index),
  }));

  const messagesByConversation: Record<string, ChatMessage[]> = {};

  for (const conversation of conversations) {
    const employee = AI_EMPLOYEES.find((item) => item.id === conversation.employeeId)!;
    messagesByConversation[conversation.id] = [
      {
        id: createId('msg'),
        conversationId: conversation.id,
        role: 'assistant',
        content: `I'm **${employee.name}** — ${employee.jobTitle}. I don't just answer questions about ${employee.department.toLowerCase()}; I participate in the workflow across the systems you already use.`,
        createdAt: hoursAgo(26),
        reactions: [],
      },
      {
        id: createId('msg'),
        conversationId: conversation.id,
        role: 'user',
        content:
          employee.slug === 'holly'
            ? 'An employee says last Friday’s paycheck is short. Can you handle it?'
            : `What should we prioritize this week in ${employee.department}?`,
        createdAt: hoursAgo(employee.slug === 'holly' ? 2 : 5),
        reactions: [],
      },
      {
        id: createId('msg'),
        conversationId: conversation.id,
        role: 'assistant',
        content:
          employee.slug === 'holly'
            ? [
                'I treated this as **work to complete**, not a FAQ:',
                '',
                '1. Pulled the payroll record from **ADP**',
                '2. Identified a missed overtime adjustment',
                '3. Started the correction workflow',
                '4. Documented the case and will notify you when resolved',
                '',
                'Human Necessity: **Assist** — I can run the investigation; a human should confirm the payout exception if it exceeds policy.',
                '',
                '— Holly',
              ].join('\n')
            : buildSeedReply(employee.name, employee.department, employee.responsibilities),
        createdAt: hoursAgo(employee.slug === 'holly' ? 1 : 4),
        reactions: [{ emoji: '👍', userIds: ['user-demo'] }],
      },
    ];
  }

  const files: FileAttachment[] = [
    {
      id: 'file-1',
      name: 'Payroll-Correction-Case-4821.md',
      size: 18200,
      mimeType: 'text/markdown',
      url: '#',
      uploadedAt: hoursAgo(2),
      employeeId: 'emp-holly',
      conversationId: 'conv-holly',
    },
    {
      id: 'file-2',
      name: 'Onboarding-Day1-Checklist.pdf',
      size: 90400,
      mimeType: 'application/pdf',
      url: '#',
      uploadedAt: hoursAgo(12),
      employeeId: 'emp-holly',
      conversationId: 'conv-holly',
    },
    {
      id: 'file-3',
      name: 'Connector-Map-ADP-HRIS.md',
      size: 22100,
      mimeType: 'text/markdown',
      url: '#',
      uploadedAt: hoursAgo(20),
      employeeId: 'emp-walter',
      conversationId: 'conv-walter',
    },
  ];

  const tasks: TaskItem[] = [
    {
      id: 'task-1',
      employeeId: 'emp-holly',
      title: 'Complete payroll correction #4821',
      description: 'Confirm overtime adjustment and notify employee when ADP posts.',
      status: 'in_progress',
      priority: 'high',
      dueDate: hoursAgo(-24),
      createdAt: hoursAgo(3),
    },
    {
      id: 'task-2',
      employeeId: 'emp-holly',
      title: 'Coordinate new-hire onboarding — Jordan Lee',
      description: 'ID verify, benefits enrollment, manager 1:1, LMS day-1 modules.',
      status: 'todo',
      priority: 'high',
      dueDate: hoursAgo(-48),
      createdAt: hoursAgo(8),
    },
    {
      id: 'task-3',
      employeeId: 'emp-calvin',
      title: 'Watch Saturday pickup SLA risk',
      description: 'Handle-it mode: notify customers if six orders slip past window.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: hoursAgo(6),
    },
    {
      id: 'task-4',
      employeeId: 'emp-kate',
      title: 'Unstick Product Designer pipeline',
      description: 'Two candidates waiting >5 days for panel feedback.',
      status: 'todo',
      priority: 'medium',
      createdAt: hoursAgo(10),
    },
  ];

  const notes: NoteItem[] = [
    {
      id: 'note-1',
      employeeId: 'emp-holly',
      title: 'Human Necessity — payroll',
      content:
        'Retrieve docs = Automate. Investigate discrepancy = Assist. Sensitive ER = Human+AI. Termination = Human.',
      updatedAt: hoursAgo(6),
    },
    {
      id: 'note-2',
      employeeId: 'emp-isa',
      title: 'ManagerScore watchouts',
      content: 'Training completion lag on night shift; recognition opportunity for stock team.',
      updatedAt: hoursAgo(15),
    },
  ];

  const events: CalendarEvent[] = [
    {
      id: 'evt-1',
      employeeId: 'emp-rachel',
      title: 'Coverage review — weekend',
      description: 'Rachel proposes swaps; Isa reviews exceptions.',
      startsAt: hoursAgo(-26),
      endsAt: hoursAgo(-25),
    },
    {
      id: 'evt-2',
      employeeId: 'emp-kate',
      title: 'Interview panel — Product Designer',
      description: 'Kate coordinated; Holly prepared to onboard on accept.',
      startsAt: hoursAgo(-50),
      endsAt: hoursAgo(-49),
    },
  ];

  const actions: AgentAction[] = [
    {
      id: 'action-1',
      employeeId: 'emp-holly',
      title: 'Initiate payroll correction in ADP',
      summary:
        'Missing overtime on pay run 2026-08-01 for employee #18422. Correction package prepared.',
      rationale:
        'Records match timekeeping punches; discrepancy is a processing miss, not a policy dispute.',
      systemsTouched: ['ADP', 'Timekeeping'],
      autonomyLevel: 2,
      humanNecessity: 'assist',
      status: 'pending',
      createdAt: hoursAgo(1),
    },
    {
      id: 'action-2',
      employeeId: 'emp-holly',
      title: 'Retrieve W-2 for employee self-service request',
      summary: 'Document located in payroll archive; ready to deliver via secure link.',
      rationale: 'Routine document retrieval — Automate under policy.',
      systemsTouched: ['ADP'],
      autonomyLevel: 3,
      humanNecessity: 'automate',
      status: 'pending',
      createdAt: hoursAgo(3),
    },
    {
      id: 'action-3',
      employeeId: 'emp-calvin',
      title: 'Notify customers of delayed pickups',
      summary: 'Six orders will miss the 3 PM carrier cutoff. Approved template ready.',
      rationale: 'Handle-it within notification policy; escalate only if customers reject new ETA.',
      systemsTouched: ['POS', 'SAP'],
      autonomyLevel: 3,
      humanNecessity: 'assist',
      status: 'pending',
      createdAt: hoursAgo(2),
    },
    {
      id: 'action-4',
      employeeId: 'emp-isa',
      title: 'Enroll night-shift associates in safety refreshers',
      summary: 'LMS shows 4 associates overdue. Propose enrollment + manager note.',
      rationale: 'Explainable from LMS completion evidence; ManagerScore watch item.',
      systemsTouched: ['LMS', 'HRIS'],
      autonomyLevel: 2,
      humanNecessity: 'assist',
      status: 'pending',
      createdAt: hoursAgo(5),
    },
    {
      id: 'action-5',
      employeeId: 'emp-penny',
      title: 'Update Work Badge after training completion',
      summary: 'Jordan Lee completed Food Safety Level 1 — badge + CareerScore evidence ready.',
      rationale: 'Conditional autonomy: verified LMS completion updates living identity.',
      systemsTouched: ['LMS'],
      autonomyLevel: 3,
      humanNecessity: 'automate',
      status: 'approved',
      createdAt: hoursAgo(8),
    },
  ];

  const workBadge: WorkBadge = {
    employeeName: 'Jordan Lee',
    role: 'Frontline Associate',
    careerScore: 72,
    skills: [
      { name: 'Customer service', level: 4 },
      { name: 'POS operations', level: 3 },
      { name: 'Food safety', level: 3 },
      { name: 'Inventory basics', level: 2 },
    ],
    training: ['Food Safety Level 1', 'De-escalation basics', 'Shift opener checklist'],
    accomplishments: [
      'Resolved 18 delayed-order customer recoveries last month',
      'Cross-trained on click-and-collect expediting',
    ],
    verified: ['LMS completion', 'Manager observation', 'Time-in-role evidence'],
  };

  const managerInsights: ManagerInsight[] = [
    {
      id: 'insight-1',
      title: 'Training gap — night shift',
      body: '4 associates overdue on safety refreshers. Isa proposes enrollment.',
      severity: 'action',
    },
    {
      id: 'insight-2',
      title: 'Recognition opportunity',
      body: 'Stock team recovered Saturday shortfall with zero missed pickups.',
      severity: 'info',
    },
    {
      id: 'insight-3',
      title: 'Coverage pattern',
      body: 'Friday evenings repeatedly thin after 7 PM — Rachel has two swap options.',
      severity: 'watch',
    },
  ];

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Holly needs approval',
      body: 'Payroll correction #4821 is ready in ADP.',
      read: false,
      createdAt: hoursAgo(1),
      href: '/app/holly',
    },
    {
      id: 'notif-2',
      title: 'Calvin is handling delays',
      body: 'Customer notifications queued for 6 at-risk orders.',
      read: false,
      createdAt: hoursAgo(2),
      href: '/app/calvin',
    },
    {
      id: 'notif-3',
      title: 'Work Badge updated',
      body: 'Jordan Lee — Food Safety Level 1 verified.',
      read: true,
      createdAt: hoursAgo(8),
      href: '/app/penny',
    },
  ];

  const memories: MemoryEntry[] = [
    {
      id: 'mem-1',
      employeeId: 'emp-holly',
      kind: 'long_term',
      content:
        'Company keeps ADP + existing benefits admin. Holly integrates; does not replace payroll.',
      createdAt: hoursAgo(80),
    },
    {
      id: 'mem-2',
      employeeId: 'emp-calvin',
      kind: 'long_term',
      content:
        'Handle-it autonomy allowed for approved delay notifications; refunds remain human-gated.',
      createdAt: hoursAgo(90),
    },
  ];

  return {
    user,
    workspaces,
    activeWorkspaceId: 'ws-shift',
    favoriteEmployeeIds: AI_EMPLOYEES.filter((employee) => employee.favorite).map(
      (employee) => employee.id,
    ),
    conversations,
    messagesByConversation,
    drafts: Object.fromEntries(conversations.map((conversation) => [conversation.id, ''])),
    files,
    tasks,
    notes,
    events,
    posts: [],
    actions,
    workBadge,
    managerInsights,
    notifications,
    memories,
    activeConversationId: 'conv-holly',
  };
}
