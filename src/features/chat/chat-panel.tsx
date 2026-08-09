import { format, isSameDay, parseISO } from 'date-fns';
import { Download, LoaderCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { Button } from '@/components/ui/button';
import { MessageBubble } from '@/features/chat/message-bubble';
import { MessageComposer } from '@/features/chat/message-composer';
import { streamChatCompletion } from '@/services/ai';
import type { AiEmployee, ChatMessage } from '@/types';
import { useWorkspaceStore } from '@/store/workspace-store';
import { createId } from '@/utils/id';
import { formatDateSeparator } from '@/utils/format';

interface ChatPanelProps {
  employee: AiEmployee;
  conversationId: string;
}

const EMPTY_MESSAGES: ChatMessage[] = [];

type Row =
  | { type: 'separator'; id: string; label: string }
  | { type: 'message'; id: string; message: ChatMessage };

export function ChatPanel({ employee, conversationId }: ChatPanelProps) {
  const messagesByConversation = useWorkspaceStore((state) => state.messagesByConversation);
  const messages = messagesByConversation[conversationId] ?? EMPTY_MESSAGES;
  const draft = useWorkspaceStore((state) => state.drafts[conversationId] ?? '');
  const setDraft = useWorkspaceStore((state) => state.setDraft);
  const appendMessage = useWorkspaceStore((state) => state.appendMessage);
  const updateMessage = useWorkspaceStore((state) => state.updateMessage);
  const appendToMessage = useWorkspaceStore((state) => state.appendToMessage);
  const deleteMessage = useWorkspaceStore((state) => state.deleteMessage);
  const addReaction = useWorkspaceStore((state) => state.addReaction);
  const setTyping = useWorkspaceStore((state) => state.setTyping);
  const markConversationRead = useWorkspaceStore((state) => state.markConversationRead);
  const addMemory = useWorkspaceStore((state) => state.addMemory);
  const addNotification = useWorkspaceStore((state) => state.addNotification);

  const [sending, setSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    markConversationRead(conversationId);
  }, [conversationId, markConversationRead, messages.length]);

  const rows = useMemo(() => buildRows(messages), [messages]);

  const suggestions =
    employee.slug === 'mia'
      ? [
          'Payroll looks short — investigate it',
          'Retrieve the missing W-2',
          'Reconcile last Friday’s timekeeping punches',
        ]
      : employee.slug === 'calvin'
        ? [
            'Document an employee relations intake',
            'Coordinate onboarding for a new hire',
            'What compliance deadlines are coming up?',
          ]
        : [
            `Handle ${employee.responsibilities[0].toLowerCase()} end-to-end`,
            `Which systems should you connect for ${employee.department}?`,
            `Apply the Human Necessity Test to ${employee.responsibilities[1]?.toLowerCase() ?? 'this work'}`,
          ];

  const sendMessage = async (content: string, regenerateFrom?: ChatMessage) => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;

    setSending(true);
    setDraft(conversationId, '');

    let history = messages;

    if (!regenerateFrom) {
      const userMessage: ChatMessage = {
        id: createId('msg'),
        conversationId,
        role: 'user',
        content: trimmed,
        createdAt: new Date().toISOString(),
        reactions: [],
      };
      appendMessage(conversationId, userMessage);
      history = [...messages, userMessage];
    }

    const assistantId = createId('msg');
    const assistantMessage: ChatMessage = {
      id: assistantId,
      conversationId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      reactions: [],
      streaming: true,
    };
    appendMessage(conversationId, assistantMessage);
    setTyping(conversationId, true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const full = await streamChatCompletion({
        employee,
        messages: history,
        signal: controller.signal,
        onToken: (token) => {
          appendToMessage(conversationId, assistantId, token);
        },
      });

      updateMessage(conversationId, assistantId, {
        content: full,
        streaming: false,
        updatedAt: new Date().toISOString(),
      });

      addMemory({
        employeeId: employee.id,
        kind: 'short_term',
        content: `User discussed: ${trimmed.slice(0, 180)}`,
      });

      addNotification({
        title: `${employee.name} replied`,
        body: full.slice(0, 100),
        href: `/app/${employee.slug}`,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        updateMessage(conversationId, assistantId, {
          content: 'I hit a snag generating that reply. Please try again.',
          streaming: false,
          error: (error as Error).message,
        });
      }
    } finally {
      setTyping(conversationId, false);
      setSending(false);
      abortRef.current = null;
    }
  };

  const exportConversation = () => {
    const payload = messages
      .map((message) => {
        const who = message.role === 'user' ? 'You' : employee.name;
        return `[${format(parseISO(message.createdAt), 'yyyy-MM-dd HH:mm')}] ${who}:\n${message.content}`;
      })
      .join('\n\n');
    const blob = new Blob([payload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${employee.slug}-conversation.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="hidden items-center justify-between px-4 py-2 md:flex md:px-6">
        <p className="text-xs text-[var(--text-muted)]">
          Streaming responses · markdown · local draft autosave
        </p>
        <Button variant="ghost" size="sm" onClick={exportConversation}>
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Virtuoso
          ref={listRef}
          data={rows}
          className="scrollbar-thin h-full"
          followOutput="smooth"
          initialTopMostItemIndex={Math.max(rows.length - 1, 0)}
          itemContent={(_index, row) => {
            if (row.type === 'separator') {
              return (
                <div className="flex items-center justify-center py-4">
                  <span className="date-sep rounded-full bg-[var(--color-panel)] px-3 py-1 text-xs text-[var(--text-muted)]">
                    {row.label}
                  </span>
                </div>
              );
            }

            return (
              <div className="py-2">
                <MessageBubble
                  message={row.message}
                  employee={employee}
                  onCopy={() => navigator.clipboard.writeText(row.message.content)}
                  onDelete={() => deleteMessage(conversationId, row.message.id)}
                  onReact={(emoji) => addReaction(conversationId, row.message.id, emoji)}
                  onRegenerate={
                    row.message.role === 'assistant'
                      ? () => {
                          const priorUser = [...messages]
                            .reverse()
                            .find(
                              (message) =>
                                message.role === 'user' &&
                                +new Date(message.createdAt) <= +new Date(row.message.createdAt),
                            );
                          if (priorUser) {
                            deleteMessage(conversationId, row.message.id);
                            void sendMessage(priorUser.content, row.message);
                          }
                        }
                      : undefined
                  }
                />
              </div>
            );
          }}
        />
        {sending && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--color-surface-elevated)] px-3 py-1.5 text-xs text-[var(--text-muted)] shadow-[var(--shadow-soft)]">
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            {employee.name} is responding…
          </div>
        )}
      </div>

      <MessageComposer
        value={draft}
        onChange={(value) => setDraft(conversationId, value)}
        onSend={() => void sendMessage(draft)}
        disabled={sending}
        suggestions={suggestions}
        placeholder={`Message ${employee.name}…`}
      />
    </div>
  );
}

function buildRows(messages: ChatMessage[]): Row[] {
  const rows: Row[] = [];
  let lastDate: Date | null = null;

  for (const message of messages) {
    const date = parseISO(message.createdAt);
    if (!lastDate || !isSameDay(lastDate, date)) {
      rows.push({
        type: 'separator',
        id: `sep-${message.createdAt}`,
        label: formatDateSeparator(message.createdAt),
      });
      lastDate = date;
    }
    rows.push({ type: 'message', id: message.id, message });
  }

  return rows;
}
