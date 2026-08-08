import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
import { seedWorkspaceData } from '@/data/seed';

interface WorkspaceState {
  user: UserProfile;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  favoriteEmployeeIds: string[];
  conversations: Conversation[];
  messagesByConversation: Record<string, ChatMessage[]>;
  drafts: Record<string, string>;
  files: FileAttachment[];
  tasks: TaskItem[];
  notes: NoteItem[];
  events: CalendarEvent[];
  posts: PostItem[];
  notifications: NotificationItem[];
  memories: MemoryEntry[];
  activeConversationId: string | null;
  setActiveWorkspace: (workspaceId: string) => void;
  setActiveConversation: (conversationId: string | null) => void;
  toggleFavorite: (employeeId: string) => void;
  createConversation: (employeeId: string) => string;
  appendMessage: (conversationId: string, message: ChatMessage) => void;
  updateMessage: (conversationId: string, messageId: string, patch: Partial<ChatMessage>) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  setDraft: (conversationId: string, value: string) => void;
  setTyping: (conversationId: string, typing: boolean) => void;
  markConversationRead: (conversationId: string) => void;
  pinConversation: (conversationId: string) => void;
  addReaction: (conversationId: string, messageId: string, emoji: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  addMemory: (entry: Omit<MemoryEntry, 'id' | 'createdAt'>) => void;
  upsertTask: (task: TaskItem) => void;
  upsertNote: (note: NoteItem) => void;
  addFile: (file: FileAttachment) => void;
  resetDemoData: () => void;
}

const seed = seedWorkspaceData();

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      ...seed,
      setActiveWorkspace: (activeWorkspaceId) => set({ activeWorkspaceId }),
      setActiveConversation: (activeConversationId) => set({ activeConversationId }),
      toggleFavorite: (employeeId) =>
        set((state) => ({
          favoriteEmployeeIds: state.favoriteEmployeeIds.includes(employeeId)
            ? state.favoriteEmployeeIds.filter((id) => id !== employeeId)
            : [...state.favoriteEmployeeIds, employeeId],
        })),
      createConversation: (employeeId) => {
        const employee = AI_EMPLOYEES.find((item) => item.id === employeeId);
        const id = createId('conv');
        const now = new Date().toISOString();
        const conversation: Conversation = {
          id,
          employeeId,
          workspaceId: get().activeWorkspaceId,
          title: employee ? `Chat with ${employee.name}` : 'New conversation',
          pinned: false,
          unreadCount: 0,
          lastMessagePreview: 'Start a conversation',
          lastMessageAt: now,
          createdAt: now,
        };
        set((state) => ({
          conversations: [conversation, ...state.conversations],
          messagesByConversation: {
            ...state.messagesByConversation,
            [id]: [],
          },
          activeConversationId: id,
          drafts: { ...state.drafts, [id]: '' },
        }));
        return id;
      },
      appendMessage: (conversationId, message) =>
        set((state) => {
          const existing = state.messagesByConversation[conversationId] ?? [];
          return {
            messagesByConversation: {
              ...state.messagesByConversation,
              [conversationId]: [...existing, message],
            },
            conversations: state.conversations.map((conversation) =>
              conversation.id === conversationId
                ? {
                    ...conversation,
                    lastMessagePreview: message.content.slice(0, 120),
                    lastMessageAt: message.createdAt,
                    unreadCount:
                      message.role === 'assistant' && state.activeConversationId !== conversationId
                        ? conversation.unreadCount + 1
                        : conversation.unreadCount,
                  }
                : conversation,
            ),
          };
        }),
      updateMessage: (conversationId, messageId, patch) =>
        set((state) => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: (state.messagesByConversation[conversationId] ?? []).map((message) =>
              message.id === messageId ? { ...message, ...patch } : message,
            ),
          },
          conversations: state.conversations.map((conversation) => {
            if (conversation.id !== conversationId) return conversation;
            const messages = (state.messagesByConversation[conversationId] ?? []).map((message) =>
              message.id === messageId ? { ...message, ...patch } : message,
            );
            const last = messages[messages.length - 1];
            return last
              ? {
                  ...conversation,
                  lastMessagePreview: last.content.slice(0, 120),
                  lastMessageAt: last.createdAt,
                }
              : conversation;
          }),
        })),
      deleteMessage: (conversationId, messageId) =>
        set((state) => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: (state.messagesByConversation[conversationId] ?? []).filter(
              (message) => message.id !== messageId,
            ),
          },
        })),
      setDraft: (conversationId, value) =>
        set((state) => ({
          drafts: { ...state.drafts, [conversationId]: value },
        })),
      setTyping: (conversationId, typing) =>
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId ? { ...conversation, typing } : conversation,
          ),
        })),
      markConversationRead: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, unreadCount: 0 }
              : conversation,
          ),
        })),
      pinConversation: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, pinned: !conversation.pinned }
              : conversation,
          ),
        })),
      addReaction: (conversationId, messageId, emoji) =>
        set((state) => {
          const userId = state.user.id;
          return {
            messagesByConversation: {
              ...state.messagesByConversation,
              [conversationId]: (state.messagesByConversation[conversationId] ?? []).map(
                (message) => {
                  if (message.id !== messageId) return message;
                  const existing = message.reactions.find((reaction) => reaction.emoji === emoji);
                  if (existing) {
                    const hasUser = existing.userIds.includes(userId);
                    return {
                      ...message,
                      reactions: message.reactions
                        .map((reaction) =>
                          reaction.emoji === emoji
                            ? {
                                ...reaction,
                                userIds: hasUser
                                  ? reaction.userIds.filter((id) => id !== userId)
                                  : [...reaction.userIds, userId],
                              }
                            : reaction,
                        )
                        .filter((reaction) => reaction.userIds.length > 0),
                    };
                  }
                  return {
                    ...message,
                    reactions: [...message.reactions, { emoji, userIds: [userId] }],
                  };
                },
              ),
            },
          };
        }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: createId('notif'),
              createdAt: new Date().toISOString(),
              read: false,
              ...notification,
            },
            ...state.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        })),
      addMemory: (entry) =>
        set((state) => ({
          memories: [
            {
              id: createId('mem'),
              createdAt: new Date().toISOString(),
              ...entry,
            },
            ...state.memories,
          ],
        })),
      upsertTask: (task) =>
        set((state) => {
          const exists = state.tasks.some((item) => item.id === task.id);
          return {
            tasks: exists
              ? state.tasks.map((item) => (item.id === task.id ? task : item))
              : [task, ...state.tasks],
          };
        }),
      upsertNote: (note) =>
        set((state) => {
          const exists = state.notes.some((item) => item.id === note.id);
          return {
            notes: exists
              ? state.notes.map((item) => (item.id === note.id ? note : item))
              : [note, ...state.notes],
          };
        }),
      addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
      resetDemoData: () => set(seedWorkspaceData()),
    }),
    {
      name: 'wi-workspace',
      partialize: (state) => ({
        user: state.user,
        workspaces: state.workspaces,
        activeWorkspaceId: state.activeWorkspaceId,
        favoriteEmployeeIds: state.favoriteEmployeeIds,
        conversations: state.conversations,
        messagesByConversation: state.messagesByConversation,
        drafts: state.drafts,
        files: state.files,
        tasks: state.tasks,
        notes: state.notes,
        events: state.events,
        posts: state.posts,
        notifications: state.notifications,
        memories: state.memories,
        activeConversationId: state.activeConversationId,
      }),
    },
  ),
);
