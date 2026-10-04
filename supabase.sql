-- Runon AI schema. Run this once in the Supabase SQL editor.
create extension if not exists pgcrypto;

-- Profiles (one row per signed-in user, filled automatically on first Google sign-in)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Agents (optional catalogue, readable by everyone)
create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  model text,
  system_prompt text,
  tools jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Tasks (every agent run)
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  agent text,
  name text not null,
  input text not null,
  status text not null default 'queued',
  result text,
  created_at timestamptz default now(),
  completed_at timestamptz
);
alter table public.tasks add column if not exists agent text;
create index if not exists tasks_user_created_idx on public.tasks (user_id, created_at desc);

create table if not exists public.task_events (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.tasks(id) on delete cascade,
  event_type text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Row level security: users only ever see their own rows.
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.tasks enable row level security;
alter table public.task_events enable row level security;
alter table public.memories enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

drop policy if exists "agents_read_all" on public.agents;
create policy "agents_read_all" on public.agents for select using (true);

drop policy if exists "tasks_select_own" on public.tasks;
create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id);
drop policy if exists "tasks_insert_own" on public.tasks;
create policy "tasks_insert_own" on public.tasks for insert with check (auth.uid() = user_id);
drop policy if exists "tasks_update_own" on public.tasks;
create policy "tasks_update_own" on public.tasks for update using (auth.uid() = user_id);
drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_delete_own" on public.tasks for delete using (auth.uid() = user_id);

drop policy if exists "task_events_select_own" on public.task_events;
create policy "task_events_select_own" on public.task_events for select
  using (exists (select 1 from public.tasks t where t.id = task_id and t.user_id = auth.uid()));

drop policy if exists "memories_all_own" on public.memories;
create policy "memories_all_own" on public.memories for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
