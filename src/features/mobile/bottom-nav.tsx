import { Brain, Building2, CheckSquare, MessageCircle, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

const ITEMS = [
  { to: '/app', end: true, label: 'Chats', icon: MessageCircle },
  { to: '/app/team', end: false, label: 'Office', icon: Building2 },
  { to: '/app/intelligence', end: false, label: 'Intelligence', icon: Brain },
  { to: '/app/tasks', end: false, label: 'Tasks', icon: CheckSquare },
  { to: '/app/settings', end: false, label: 'Settings', icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5 px-1 pt-1.5 pb-1">
        {ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              aria-label={item.label}
              className={({ isActive }) =>
                cn(
                  'flex min-h-12 flex-col items-center justify-center rounded-2xl transition-colors',
                  isActive ? 'text-white' : 'text-white/40 active:text-white/70',
                )
              }
            >
              {({ isActive }) => (
                <item.icon
                  className={cn('h-6 w-6', isActive && 'fill-white/15 stroke-[2.25]')}
                  aria-hidden
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
