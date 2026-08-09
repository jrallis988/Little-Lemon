export type AvailabilityStatus = 'online' | 'away' | 'busy' | 'offline';

export type AiProviderId = 'openai' | 'anthropic' | 'gemini' | 'grok' | 'ollama' | 'demo';

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';

export type EmployeeDepartment =
  | 'Management'
  | 'Human Resources'
  | 'Recruiting'
  | 'Marketing'
  | 'Payroll'
  | 'IT'
  | 'Administration'
  | 'Customer Service';

export type AutonomyLevel = 1 | 2 | 3;

export type HumanNecessity = 'automate' | 'assist' | 'human_ai' | 'human';

export interface JobBoundary {
  mayDo: string[];
  mayNotDo: string[];
}

export interface ConnectedSystem {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'available' | 'pending';
  description: string;
}

export interface AiEmployee {
  id: string;
  slug: string;
  name: string;
  jobTitle: string;
  /** Short role label for inbox list rows (Marblism-style). */
  shortTitle: string;
  department: EmployeeDepartment;
  personality: string;
  systemPrompt: string;
  responsibilities: string[];
  tools: string[];
  permissions: string[];
  avatar: {
    initials: string;
    color: string;
    imageUrl?: string;
  };
  status: AvailabilityStatus;
  provider: AiProviderId;
  model?: string;
  knowledgeBase: string[];
  guidelines: string[];
  favorite?: boolean;
  /** 1 Tell me · 2 Help me · 3 Handle it */
  autonomyLevel: AutonomyLevel;
  jobBoundary: JobBoundary;
  connectedSystems: string[];
  humanNecessityExamples: Array<{
    task: string;
    classification: HumanNecessity;
  }>;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: WorkspaceRole;
  tagline?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: WorkspaceRole;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface MessageReaction {
  emoji: string;
  userIds: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string;
  reactions: MessageReaction[];
  attachments?: FileAttachment[];
  streaming?: boolean;
  error?: string;
}

export interface Conversation {
  id: string;
  employeeId: string;
  workspaceId: string;
  title: string;
  pinned: boolean;
  unreadCount: number;
  lastMessagePreview: string;
  lastMessageAt: string;
  typing?: boolean;
  createdAt: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
  employeeId?: string;
  conversationId?: string;
}

export interface TaskItem {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  employeeId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  location?: string;
}

export interface PostItem {
  id: string;
  employeeId: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  href?: string;
}

export interface MemoryEntry {
  id: string;
  employeeId: string;
  kind: 'long_term' | 'short_term';
  content: string;
  createdAt: string;
}

export type AgentActionStatus = 'pending' | 'approved' | 'snoozed' | 'declined' | 'completed';

export interface AgentAction {
  id: string;
  employeeId: string;
  title: string;
  summary: string;
  rationale: string;
  systemsTouched: string[];
  autonomyLevel: AutonomyLevel;
  humanNecessity: HumanNecessity;
  status: AgentActionStatus;
  createdAt: string;
}

export interface WorkBadgeSkill {
  name: string;
  level: number;
}

export interface WorkBadge {
  employeeName: string;
  role: string;
  careerScore: number;
  skills: WorkBadgeSkill[];
  training: string[];
  accomplishments: string[];
  verified: string[];
}

export interface ManagerInsight {
  id: string;
  title: string;
  body: string;
  severity: 'info' | 'watch' | 'action';
}

export type WorkspaceTab =
  | 'chat'
  | 'actions'
  | 'systems'
  | 'badge'
  | 'files'
  | 'tasks'
  | 'notes'
  | 'calendar'
  | 'guidelines';
