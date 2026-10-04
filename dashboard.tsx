'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  Clock,
  Copy,
  Layers,
  Loader2,
  LogOut,
  PenLine,
  Plus,
  Search,
  Send,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { AGENTS, getAgent, type AgentId } from '@/lib/agents';
import type { AppUser, Task } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { supabaseConfigured } from '@/lib/config';

const ICONS = { research: Search, writer: PenLine, analyst: Layers, builder: Terminal } as const;

export function Dashboard({ user, initialTasks }: { user: AppUser; initialTasks: Task[] }) {
  const router = useRouter();
  const [agent, setAgent] = useState<AgentId>('research');
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(initialTasks[0]?.id ?? null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const current = getAgent(agent)!;
  const active = tasks.find((t) => t.id === activeId) ?? null;

  async function run() {
    const text = input.trim();
    if (!text || running) return;
    setRunning(true);
    setError(null);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ agent, input: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setTasks((t) => [data.task as Task, ...t]);
      setActiveId((data.task as Task).id);
      setInput('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setRunning(false);
    }
  }

  async function signOut() {
    if (supabaseConfigured) await createClient().auth.signOut();
    router.push('/');
    router.refresh();
  }

  async function copy() {
    if (!active?.result) return;
    await navigator.clipboard.writeText(active.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function newTask() {
    setActiveId(null);
    setError(null);
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="flex flex-col border-b border-white/5 bg-[#0a0a11] md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-4 md:py-5">
          <Logo href="/dashboard" />
          <button onClick={signOut} className="text-zinc-400 hover:text-white md:hidden" aria-label="Sign out">
            <LogOut size={18} />
          </button>
        </div>

        <div className="px-4 pb-3">
          <button onClick={newTask} className="btn btn-primary !h-10 w-full !text-sm">
            <Plus size={16} /> New task
          </button>
        </div>

        <div className="hidden min-h-0 flex-1 flex-col px-3 md:flex">
          <p className="px-2 pb-2 pt-3 text-xs font-medium uppercase tracking-wider text-zinc-500">History</p>
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pb-3">
            {tasks.length === 0 && <p className="px-2 text-sm text-zinc-500">Your runs will appear here.</p>}
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  t.id === activeId ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                <span className="line-clamp-1">{t.input}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-zinc-600">
                  <Clock size={11} />
                  <span suppressHydrationWarning>{new Date(t.created_at).toLocaleDateString()}</span>
                  {t.agent && <span className="capitalize">· {t.agent}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 border-t border-white/5 p-4 md:flex">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt="" referrerPolicy="no-referrer" className="h-9 w-9 rounded-full" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/30 text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>
          <button onClick={signOut} className="text-zinc-400 hover:text-white" aria-label="Sign out" title="Sign out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="relative flex-1 overflow-x-hidden px-4 py-8 sm:px-8 md:py-12">
        <div className="orb -top-32 right-0 h-80 w-80 bg-violet-600/15" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {active ? 'Result' : `Hi ${user.name.split(' ')[0]}, what should Runon do?`}
          </h1>

          {active ? (
            <div className="mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Your request</p>
                <p className="mt-2 whitespace-pre-wrap text-zinc-200">{active.input}</p>
              </div>
              <div className="glass mt-4 rounded-2xl p-5 sm:p-7">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm text-violet-300">
                    <Sparkles size={16} />
                    <span className="capitalize">{active.agent ?? 'Agent'}</span> agent
                  </span>
                  <button onClick={copy} className="btn btn-ghost !h-9 !px-3 !text-sm">
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="whitespace-pre-wrap break-words text-[0.95rem] leading-relaxed text-zinc-200">
                  {active.result}
                </div>
              </div>
              <button onClick={newTask} className="btn btn-ghost mt-6">
                <Plus size={16} /> Start another task
              </button>
            </div>
          ) : (
            <>
              <p className="mt-2 text-zinc-400">Pick an agent, describe the outcome, and get a finished result.</p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {AGENTS.map((a) => {
                  const Icon = ICONS[a.id];
                  const on = a.id === agent;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAgent(a.id)}
                      aria-pressed={on}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        on ? 'border-violet-400/60 bg-violet-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <Icon size={18} className={on ? 'text-violet-300' : 'text-zinc-400'} />
                      <p className="mt-3 text-sm font-medium">{a.name}</p>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-zinc-500">{current.tagline}</p>

              <div className="glass mt-6 rounded-2xl p-3">
                <label htmlFor="prompt" className="sr-only">
                  Describe your task
                </label>
                <textarea
                  id="prompt"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) run();
                  }}
                  maxLength={4000}
                  rows={6}
                  placeholder={current.placeholder}
                  className="w-full resize-none bg-transparent p-3 text-[0.95rem] text-white placeholder:text-zinc-600 focus:outline-none"
                />
                <div className="flex items-center justify-between px-2 pb-1 pt-2">
                  <span className="text-xs text-zinc-600">Ctrl/⌘ + Enter to run</span>
                  <button onClick={run} disabled={running || !input.trim()} className="btn btn-primary !h-10 !text-sm">
                    {running ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {running ? 'Working…' : 'Run agent'}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              {tasks.length > 0 && (
                <div className="mt-10 md:hidden">
                  <p className="pb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Recent</p>
                  <div className="space-y-2">
                    {tasks.slice(0, 5).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveId(t.id)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm text-zinc-300"
                      >
                        <span className="line-clamp-1">{t.input}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
