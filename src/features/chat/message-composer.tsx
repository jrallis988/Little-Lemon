import { Camera, Mic, Paperclip, SendHorizontal, Smile } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  suggestions?: string[];
  placeholder?: string;
}

export function MessageComposer({
  value,
  onChange,
  onSend,
  disabled,
  suggestions = [],
  placeholder = 'Message your AI coworker…',
}: MessageComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  return (
    <div className="border-t border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--color-surface-elevated)_88%,transparent)] px-4 py-3 backdrop-blur md:px-6">
      {suggestions.length > 0 && !value && (
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="rounded-full bg-[var(--color-panel)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--color-brand-soft)]"
              onClick={() => onChange(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-2 shadow-[var(--shadow-soft)]">
        <textarea
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className="scrollbar-thin max-h-44 min-h-11 w-full resize-none bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-[var(--text-muted)]"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              if (!disabled && value.trim()) onSend();
            }
          }}
          aria-label="Message composer"
        />
        <div className="flex items-center gap-1 px-1 pb-1">
          <IconAction label="Attach file">
            <Paperclip className="h-4 w-4" />
          </IconAction>
          <IconAction label="Emoji" onClick={() => setShowEmoji((value) => !value)}>
            <Smile className="h-4 w-4" />
          </IconAction>
          <IconAction label="Voice input">
            <Mic className="h-4 w-4" />
          </IconAction>
          <IconAction label="Camera">
            <Camera className="h-4 w-4" />
          </IconAction>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-[11px] text-[var(--text-muted)] sm:inline">
              Enter to send · Shift+Enter for line
            </span>
            <Button
              size="icon"
              aria-label="Send message"
              disabled={disabled || !value.trim()}
              onClick={onSend}
              className={cn(!value.trim() && 'opacity-50')}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {showEmoji && (
          <div className="flex flex-wrap gap-1 border-t border-[var(--border-subtle)] px-2 pt-2 pb-1">
            {['😊', '🚀', '✅', '📌', '💡', '🔥', '🙌', '📎'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="rounded-lg px-2 py-1 hover:bg-[var(--color-panel)]"
                onClick={() => {
                  onChange(`${value}${emoji}`);
                  setShowEmoji(false);
                  ref.current?.focus();
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IconAction({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-xl p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--color-panel)] hover:text-[var(--text-primary)]"
    >
      {children}
    </button>
  );
}
