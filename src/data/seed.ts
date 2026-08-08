import { AI_EMPLOYEES } from '@/data/employees';
import type {
  CalendarEvent,
  ChatMessage,
  Conversation,
  FileAttachment,
  MemoryEntry,
  NoteItem,
  NotificationItem,
  PostItem,
  TaskItem,
  UserProfile,
  Workspace,
} from '@/types';
import { createId } from '@/utils/id';

const hoursAgo = (hours: number): string =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export function seedWorkspaceData() {
  const user: UserProfile = {
    id: 'user-demo',
    email: 'alex@workingintelligence.com',
    fullName: 'Alex Morgan',
    role: 'owner',
  };

  const workspaces: Workspace[] = [
    { id: 'ws-hq', name: 'Working Intelligence HQ', slug: 'hq', role: 'owner' },
    { id: 'ws-studio', name: 'Studio Ops', slug: 'studio', role: 'admin' },
  ];

  const conversations: Conversation[] = AI_EMPLOYEES.map((employee, index) => ({
    id: `conv-${employee.slug}`,
    employeeId: employee.id,
    workspaceId: 'ws-hq',
    title: `Chat with ${employee.name}`,
    pinned: index < 2,
    unreadCount: index === 2 ? 2 : 0,
    lastMessagePreview:
      index === 0
        ? 'I drafted an onboarding checklist for the new hire.'
        : index === 1
          ? 'Campaign brief for the spring launch is ready.'
          : `Ready when you are — ask me about ${employee.responsibilities[0].toLowerCase()}.`,
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
        content: `Hi, I'm **${employee.name}**, your ${employee.jobTitle}. I can help with ${employee.responsibilities.slice(0, 3).join(', ').toLowerCase()}, and more.`,
        createdAt: hoursAgo(26),
        reactions: [],
      },
      {
        id: createId('msg'),
        conversationId: conversation.id,
        role: 'user',
        content: `What should we prioritize this week in ${employee.department}?`,
        createdAt: hoursAgo(conversation.employeeId === 'emp-calvin' ? 2 : 5),
        reactions: [],
      },
      {
        id: createId('msg'),
        conversationId: conversation.id,
        role: 'assistant',
        content: buildSeedReply(employee.name, employee.department, employee.responsibilities),
        createdAt: hoursAgo(conversation.employeeId === 'emp-calvin' ? 1 : 4),
        reactions: [{ emoji: '👍', userIds: ['user-demo'] }],
      },
    ];
  }

  const files: FileAttachment[] = [
    {
      id: 'file-1',
      name: 'Employee-Handbook-Draft.md',
      size: 48200,
      mimeType: 'text/markdown',
      url: '#',
      uploadedAt: hoursAgo(8),
      employeeId: 'emp-calvin',
      conversationId: 'conv-calvin',
    },
    {
      id: 'file-2',
      name: 'Spring-Launch-Brief.pdf',
      size: 210400,
      mimeType: 'application/pdf',
      url: '#',
      uploadedAt: hoursAgo(12),
      employeeId: 'emp-holly',
      conversationId: 'conv-holly',
    },
    {
      id: 'file-3',
      name: 'Component-Architecture.md',
      size: 33100,
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
      employeeId: 'emp-calvin',
      title: 'Finalize onboarding checklist',
      description: 'Include IT, benefits, and manager 1:1 milestones.',
      status: 'in_progress',
      priority: 'high',
      dueDate: hoursAgo(-48),
      createdAt: hoursAgo(30),
    },
    {
      id: 'task-2',
      employeeId: 'emp-holly',
      title: 'Approve campaign messaging',
      description: 'Review Holly’s spring launch narrative and CTA variants.',
      status: 'todo',
      priority: 'medium',
      dueDate: hoursAgo(-72),
      createdAt: hoursAgo(28),
    },
    {
      id: 'task-3',
      employeeId: 'emp-walter',
      title: 'Accessibility pass on workspace shell',
      description: 'Keyboard nav, focus rings, and contrast audit.',
      status: 'todo',
      priority: 'high',
      createdAt: hoursAgo(18),
    },
    {
      id: 'task-4',
      employeeId: 'emp-stan',
      title: 'Update Q3 forecast',
      description: 'Refresh pipeline stages and close probability.',
      status: 'done',
      priority: 'medium',
      createdAt: hoursAgo(40),
    },
  ];

  const notes: NoteItem[] = [
    {
      id: 'note-1',
      employeeId: 'emp-penny',
      title: 'Homepage narrative',
      content: 'Lead with workforce collaboration, then department depth, then trust.',
      updatedAt: hoursAgo(6),
    },
    {
      id: 'note-2',
      employeeId: 'emp-linda',
      title: 'Privacy policy open questions',
      content: 'Clarify subprocessors list and retention windows for chat memory.',
      updatedAt: hoursAgo(15),
    },
  ];

  const events: CalendarEvent[] = [
    {
      id: 'evt-1',
      employeeId: 'emp-rachel',
      title: 'Weekly leadership sync',
      description: 'Ops + department leads',
      startsAt: hoursAgo(-26),
      endsAt: hoursAgo(-25),
      location: 'Workspace · Main',
    },
    {
      id: 'evt-2',
      employeeId: 'emp-calvin',
      title: 'Candidate interview — Product Designer',
      description: 'Panel with Calvin and Holly',
      startsAt: hoursAgo(-50),
      endsAt: hoursAgo(-49),
    },
    {
      id: 'evt-3',
      employeeId: 'emp-sonny',
      title: 'Social content review',
      description: 'Approve next week’s calendar',
      startsAt: hoursAgo(-70),
      endsAt: hoursAgo(-69),
    },
  ];

  const posts: PostItem[] = [
    {
      id: 'post-1',
      employeeId: 'emp-holly',
      title: 'Brand principle reminder',
      body: 'Clarity over cleverness. Every campaign should explain the value in one breath.',
      tags: ['brand', 'campaign'],
      createdAt: hoursAgo(10),
    },
    {
      id: 'post-2',
      employeeId: 'emp-walter',
      title: 'Engineering note: streaming UX',
      body: 'Prefer optimistic message rows and cancelable streams for long generations.',
      tags: ['engineering', 'ux'],
      createdAt: hoursAgo(22),
    },
  ];

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Calvin finished a draft',
      body: 'Onboarding checklist is ready for review.',
      read: false,
      createdAt: hoursAgo(1),
      href: '/app/calvin',
    },
    {
      id: 'notif-2',
      title: 'Holly shared a brief',
      body: 'Spring launch brief uploaded to Files.',
      read: false,
      createdAt: hoursAgo(3),
      href: '/app/holly',
    },
    {
      id: 'notif-3',
      title: 'Rachel scheduled a meeting',
      body: 'Weekly leadership sync is on your calendar.',
      read: true,
      createdAt: hoursAgo(9),
      href: '/app/rachel',
    },
  ];

  const memories: MemoryEntry[] = [
    {
      id: 'mem-1',
      employeeId: 'emp-calvin',
      kind: 'long_term',
      content: 'Company prefers structured onboarding with day-1, day-7, and day-30 checkpoints.',
      createdAt: hoursAgo(80),
    },
    {
      id: 'mem-2',
      employeeId: 'emp-holly',
      kind: 'long_term',
      content: 'Primary brand voice is confident, warm, and concrete.',
      createdAt: hoursAgo(90),
    },
  ];

  return {
    user,
    workspaces,
    activeWorkspaceId: 'ws-hq',
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
    posts,
    notifications,
    memories,
    activeConversationId: 'conv-calvin',
  };
}

function buildSeedReply(
  name: string,
  department: string,
  responsibilities: string[],
): string {
  return [
    `Here's a focused plan for **${department}** this week:`,
    '',
    `1. **${responsibilities[0]}** — define the outcome and owner.`,
    `2. **${responsibilities[1] ?? responsibilities[0]}** — ship one tangible draft.`,
    `3. **${responsibilities[2] ?? responsibilities[0]}** — review risks and dependencies.`,
    '',
    `I can draft the first artifact whenever you're ready. — ${name}`,
  ].join('\n');
}
