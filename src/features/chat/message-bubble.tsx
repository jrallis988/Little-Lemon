import { Copy, RefreshCw, SmilePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MarkdownMessage } from '@/features/chat/markdown-message';
import type { AiEmployee, ChatMessage } from '@/types';
import { cn } from '@/utils/cn';
import { formatMessageTime } from '@/utils/format';

interface MessageBubbleProps {
  message: ChatMessage;
  employee: AiEmployee;
  onCopy: () => void;
  onRegenerate?: () => void;
  onDelete: () => void;
  onReact: (emoji: string) => void;
}

const QUICK_REACTIONS = ['👍', '🙌', '❤️', '🧠'];

export function MessageBubble({
  message,
  employee,
  onCopy,
  onRegenerate,
  onDelete,
  onReact,
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [showReactions, setShowReactions] = useState(false);

  return (
    <article
      className={cn('group flex gap-2.5 px-3 md:gap-3 md:px-8', isUser ? 'flex-row-reverse' : 'flex-row')}
      aria-label={`${isUser ? 'You' : employee.name} message`}
    >
      {!isUser && (
        <Avatar
          initials={employee.avatar.initials}
          color={employee.avatar.color}
          size="sm"
          name={employee.name}
          className="mt-1"
        />
      )}
      <div className={cn('max-w-[min(720px,85%)]', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-3xl px-4 py-3 shadow-[var(--shadow-soft)]',
            isUser
              ? 'rounded-tr-lg bg-[var(--message-user)] text-white'
              : 'rounded-tl-lg bg-[var(--message-assistant)] text-[var(--text-primary)] ring-1 ring-[var(--border-subtle)]',
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownMessage content={message.content || (message.streaming ? '…' : '')} />
          )}
          {message.streaming && (
            <span className="mt-1 inline-block h-4 w-1 animate-pulse bg-current opacity-60" />
          )}
        </div>

        <div
          className={cn(
            'mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]',
            isUser && 'justify-end',
          )}
        >
          <time dateTime={message.createdAt}>{formatMessageTime(message.createdAt)}</time>
          {message.reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              type="button"
              className="rounded-full bg-[var(--color-panel)] px-2 py-0.5"
              onClick={() => onReact(reaction.emoji)}
            >
              {reaction.emoji} {reaction.userIds.length}
            </button>
          ))}
          <div
            className={cn(
              'flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
              isUser && 'flex-row-reverse',
            )}
          >
            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Copy" onClick={onCopy}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            {!isUser && onRegenerate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                aria-label="Regenerate"
                onClick={onRegenerate}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label="React"
              onClick={() => setShowReactions((value) => !value)}
            >
              <SmilePlus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label="Delete"
              onClick={onDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {showReactions && (
          <div className={cn('mt-1 flex gap-1', isUser && 'justify-end')}>
            {QUICK_REACTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="rounded-xl bg-[var(--color-surface-elevated)] px-2 py-1 shadow-sm ring-1 ring-[var(--border-subtle)]"
                onClick={() => {
                  onReact(emoji);
                  setShowReactions(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
