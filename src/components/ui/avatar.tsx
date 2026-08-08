import { cn } from '@/utils/cn';

interface AvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imageUrl?: string;
  name?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function Avatar({ initials, color, size = 'md', className, imageUrl, name }: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name ?? initials}
        className={cn('rounded-2xl object-cover', sizes[size], className)}
      />
    );
  }

  return (
    <div
      aria-hidden={!name}
      aria-label={name}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-semibold text-white shadow-[var(--shadow-soft)]',
        sizes[size],
        className,
      )}
      style={{ background: `linear-gradient(145deg, ${color}, color-mix(in oklab, ${color} 70%, #000))` }}
    >
      {initials}
    </div>
  );
}
