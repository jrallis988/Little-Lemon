import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authModeLabel, signInWithEmail, signInWithOAuth, signUpWithEmail } from '@/services/auth';
import { useTheme } from '@/hooks/use-theme';
import { useWorkspaceStore } from '@/store/workspace-store';

const schema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export function AuthPage() {
  useTheme();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useWorkspaceStore((state) => state.user);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: 'password123',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signin') {
        await signInWithEmail(values.email, values.password);
      } else {
        await signUpWithEmail(values.email, values.password, values.fullName ?? 'New User');
      }
      navigate('/app');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-6 shadow-[var(--shadow-lift)]">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-semibold">
          {mode === 'signin' ? 'Welcome back' : 'Create your workspace'}
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {authModeLabel()} · Email, Google, Microsoft, and GitHub supported when Supabase is
          configured.
        </p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm" htmlFor="fullName">
                Full name
              </label>
              <Input id="fullName" {...form.register('fullName')} />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
          </div>
          <div>
            <label className="mb-1 block text-sm" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              {...form.register('password')}
            />
          </div>
          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </form>

        <div className="my-4 grid grid-cols-3 gap-2">
          {(
            [
              ['google', 'Google'],
              ['azure', 'Microsoft'],
              ['github', 'GitHub'],
            ] as const
          ).map(([provider, label]) => (
            <Button
              key={provider}
              variant="secondary"
              className="text-xs"
              onClick={() => {
                void signInWithOAuth(provider).catch((err: Error) => setError(err.message));
              }}
            >
              {label}
            </Button>
          ))}
        </div>

        <button
          type="button"
          className="text-sm text-[var(--color-brand)]"
          onClick={() => setMode((value) => (value === 'signin' ? 'signup' : 'signin'))}
        >
          {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>

        <div className="mt-4">
          <Link to="/app" className="text-sm text-[var(--text-muted)] underline">
            Continue in demo mode
          </Link>
        </div>
      </div>
    </div>
  );
}
