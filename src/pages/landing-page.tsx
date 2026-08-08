import { motion } from 'framer-motion';
import { ArrowRight, Bot, Layers3, Link2 } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { ButtonLink } from '@/components/ui/button';
import { AI_EMPLOYEES } from '@/data/employees';
import { useTheme } from '@/hooks/use-theme';

export function LandingPage() {
  useTheme();

  return (
    <div className="min-h-full">
      <div className="safe-top safe-bottom mx-auto flex min-h-full max-w-6xl flex-col px-5 py-5 md:px-6 md:py-6">
        <header className="flex items-center justify-between gap-3">
          <Logo compact className="sm:hidden" />
          <Logo className="hidden sm:flex" />
          <div className="flex items-center gap-2">
            <ButtonLink to="/auth" variant="ghost" className="hidden sm:inline-flex">
              Sign in
            </ButtonLink>
            <ButtonLink to="/app" size="sm" className="sm:h-10 sm:px-4 sm:text-sm">
              <span className="sm:hidden">Open</span>
              <span className="hidden sm:inline">Open workspace</span>
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </header>

        <section className="relative mt-8 grid min-h-[70vh] items-center gap-8 md:mt-10 md:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
              Shift · powered by Working Intelligence
            </p>
            <p className="font-display mt-3 text-[2.75rem] leading-[0.95] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Working
              <br />
              Intelligence
            </p>
            <h1 className="mt-4 max-w-xl text-lg text-[var(--text-secondary)] sm:mt-5 sm:text-xl md:text-2xl">
              AI that doesn’t just answer — it participates in the work.
            </h1>
            <p className="mt-3 max-w-lg text-sm text-[var(--text-muted)] sm:mt-4 sm:text-base">
              The intelligence layer that connects the systems you already use, coordinates
              specialized agents, and figures out what should be automated, assisted, or remain
              human.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <ButtonLink to="/app" size="lg" className="w-full sm:w-auto">
                Enter workspace
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink to="/app/holly" size="lg" variant="secondary" className="w-full sm:w-auto">
                Meet Holly
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5 shadow-[var(--shadow-lift)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_45%),radial-gradient(circle_at_90%_10%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_40%)]" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {AI_EMPLOYEES.slice(0, 6).map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.05 }}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--color-surface-elevated)_88%,transparent)] p-3 backdrop-blur"
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                    style={{ background: employee.avatar.color }}
                  >
                    {employee.avatar.initials}
                  </div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{employee.jobTitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Bot className="h-5 w-5" />,
              title: 'AI that works',
              body: 'Investigate payroll, retrieve documents, coordinate onboarding, notify customers — inside real workflows.',
            },
            {
              icon: <Link2 className="h-5 w-5" />,
              title: 'Connect, don’t replace',
              body: 'Keep ADP, ATS, LMS, POS, CRM, and scheduling. Working Intelligence is the layer that makes them work together.',
            },
            {
              icon: <Layers3 className="h-5 w-5" />,
              title: 'Human Necessity Test',
              body: 'Automate · Assist · Human+AI · Human. Stop making people do work that doesn’t need a human.',
            },
          ].map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)]/80 p-5"
            >
              <div className="mb-3 text-[var(--color-brand)]">{item.icon}</div>
              <h2 className="font-display text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{item.body}</p>
            </motion.article>
          ))}
        </section>

        <footer className="mt-16 border-t border-[var(--border-subtle)] py-6 text-sm text-[var(--text-muted)]">
          Working Intelligence — the intelligence layer for how work actually gets done. Shift is
          the product. Agents like Holly and Calvin are how it shows up in each function.
        </footer>
      </div>
    </div>
  );
}
