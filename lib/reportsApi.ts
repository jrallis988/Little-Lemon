import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export type ReportReason =
  | 'copyright'
  | 'abuse'
  | 'spam'
  | 'impersonation'
  | 'other';

export type ReportTargetKind =
  | 'track'
  | 'artist'
  | 'review'
  | 'list'
  | 'user'
  | 'release';

export type SubmitReportInput = {
  targetKind: ReportTargetKind;
  targetId: string;
  reason: ReportReason;
  details?: string;
  contactEmail?: string;
};

export class ReportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReportError';
  }
}

export async function submitContentReport(
  input: SubmitReportInput,
): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new ReportError(
      'Reporting requires Supabase. Apply Phase 4–7 migration and set env keys.',
    );
  }
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user?.id;
  if (!userId) {
    throw new ReportError('Sign in to submit a report.');
  }

  const details = input.details?.trim() || null;
  if (input.reason === 'other' && !details) {
    throw new ReportError('Please describe the issue.');
  }

  const { error } = await supabase.from('content_reports').insert({
    reporter_id: userId,
    target_kind: input.targetKind,
    target_id: input.targetId,
    reason: input.reason,
    details,
    contact_email: input.contactEmail?.trim() || session.session?.user?.email || null,
    status: 'open',
  });

  if (error) throw new ReportError(error.message);
}

export const REPORT_REASONS: { id: ReportReason; label: string }[] = [
  { id: 'copyright', label: 'Copyright / takedown' },
  { id: 'abuse', label: 'Abuse or harassment' },
  { id: 'spam', label: 'Spam' },
  { id: 'impersonation', label: 'Impersonation' },
  { id: 'other', label: 'Other' },
];
