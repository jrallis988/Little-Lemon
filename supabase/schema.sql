-- Working Intelligence — Supabase schema
-- Enables PostgreSQL tables, RLS policies, and realtime for the AI workforce platform.

create extension if not exists "pgcrypto";

create type public.workspace_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.availability_status as enum ('online', 'away', 'busy', 'offline');
create type public.message_role as enum ('user', 'assistant', 'system');
create type public.task_status as enum ('todo', 'in_progress', 'done');
create type public.task_priority as enum ('low', 'medium', 'high');
create type public.memory_kind as enum ('long_term', 'short_term');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.workspace_role not null default 'member',
  primary key (workspace_id, user_id)
);

create table public.ai_employees (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  slug text not null,
  name text not null,
  job_title text not null,
  department text not null,
  personality text not null,
  system_prompt text not null,
  responsibilities text[] not null default '{}',
  tools text[] not null default '{}',
  permissions text[] not null default '{}',
  knowledge_base text[] not null default '{}',
  guidelines text[] not null default '{}',
  avatar_initials text not null,
  avatar_color text not null,
  avatar_url text,
  status public.availability_status not null default 'online',
  provider text not null default 'demo',
  model text,
  created_at timestamptz not null default now(),
  unique (workspace_id, slug)
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  created_by uuid references public.profiles (id) on delete set null,
  title text not null,
  pinned boolean not null default false,
  last_message_preview text not null default '',
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  role public.message_role not null,
  content text not null,
  parent_id uuid references public.messages (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table public.message_reactions (
  message_id uuid not null references public.messages (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  emoji text not null,
  primary key (message_id, user_id, emoji)
);

create table public.files (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid references public.ai_employees (id) on delete set null,
  conversation_id uuid references public.conversations (id) on delete set null,
  uploaded_by uuid references public.profiles (id) on delete set null,
  name text not null,
  size bigint not null,
  mime_type text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  title text not null,
  description text not null default '',
  status public.task_status not null default 'todo',
  priority public.task_priority not null default 'medium',
  due_date timestamptz,
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  title text not null,
  content text not null default '',
  updated_at timestamptz not null default now()
);

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  title text not null,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  title text not null,
  body text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  employee_id uuid not null references public.ai_employees (id) on delete cascade,
  kind public.memory_kind not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  href text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.is_workspace_member(target_workspace uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace
      and wm.user_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.ai_employees enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.files enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;
alter table public.calendar_events enable row level security;
alter table public.posts enable row level security;
alter table public.memories enable row level security;
alter table public.notifications enable row level security;

create policy "profiles are viewable by workspace peers"
  on public.profiles for select
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.workspace_members mine
      join public.workspace_members theirs
        on mine.workspace_id = theirs.workspace_id
      where mine.user_id = auth.uid()
        and theirs.user_id = profiles.id
    )
  );

create policy "users can update own profile"
  on public.profiles for update
  using (id = auth.uid());

create policy "members can read workspaces"
  on public.workspaces for select
  using (public.is_workspace_member(id));

create policy "members can read workspace members"
  on public.workspace_members for select
  using (public.is_workspace_member(workspace_id));

create policy "members can read employees"
  on public.ai_employees for select
  using (public.is_workspace_member(workspace_id));

create policy "members can read conversations"
  on public.conversations for select
  using (public.is_workspace_member(workspace_id));

create policy "members can insert conversations"
  on public.conversations for insert
  with check (public.is_workspace_member(workspace_id));

create policy "members can read messages"
  on public.messages for select
  using (
    exists (
      select 1
      from public.conversations c
      where c.id = conversation_id
        and public.is_workspace_member(c.workspace_id)
    )
  );

create policy "members can insert messages"
  on public.messages for insert
  with check (
    exists (
      select 1
      from public.conversations c
      where c.id = conversation_id
        and public.is_workspace_member(c.workspace_id)
    )
  );

create policy "users read own notifications"
  on public.notifications for select
  using (user_id = auth.uid());

create policy "users update own notifications"
  on public.notifications for update
  using (user_id = auth.uid());

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.notifications;

insert into storage.buckets (id, name, public)
values ('workspace-files', 'workspace-files', false)
on conflict (id) do nothing;
