create extension if not exists pgcrypto;
create table if not exists public.agents(id uuid primary key default gen_random_uuid(),name text not null,description text,model text,system_prompt text,tools jsonb default '[]'::jsonb,created_at timestamptz default now());
create table if not exists public.tasks(id uuid primary key default gen_random_uuid(),user_id uuid,name text not null,input text not null,status text not null default 'queued',result text,created_at timestamptz default now(),completed_at timestamptz);
create table if not exists public.task_events(id uuid primary key default gen_random_uuid(),task_id uuid references public.tasks(id) on delete cascade,event_type text not null,message text not null,created_at timestamptz default now());
create table if not exists public.memories(id uuid primary key default gen_random_uuid(),user_id uuid,content text not null,metadata jsonb default '{}'::jsonb,created_at timestamptz default now());
