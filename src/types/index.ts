export type AvailabilityStatus = 'online' | 'away' | 'busy' | 'offline';

export type AiProviderId = 'openai' | 'anthropic' | 'gemini' | 'grok' | 'ollama' | 'demo';

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';

export type EmployeeDepartment =
  | 'Human Resources'
  | 'Marketing'
  | 'Social Media'
  | 'Content'
  | 'Engineering'
  | 'Legal'
  | 'Sales'
  | 'Operations';

export interface AiEmployee {
  id: string;
  slug: string;
  name: string;
  jobTitle: string;
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
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  role: WorkspaceRole;
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

export type WorkspaceTab =
  | 'chat'
  | 'files'
  | 'tasks'
  | 'notes'
  | 'calendar'
  | 'posts'
  | 'guidelines';
