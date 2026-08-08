import { MessageCircle, Settings, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

const ITEMS = [
  { to: '/app', end: true, label: 'Chats', icon: MessageCircle },
  { to: '/app/team', end: false, label: 'Team', icon: Users },
  { to: '/app/settings', end: false, label: 'Settings', icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom surface-glass fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border-subtle)] md:hidden"
    >
      <ul className="grid grid-cols-3 px-2 pt-1 pb-1">
        {ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium transition-colors',
                  isActive
                    ? 'text-[var(--color-brand)]'
                    : 'text-[var(--text-muted)] active:bg-[var(--color-panel)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.25]')} />
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
