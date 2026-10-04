import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  History,
  Layers,
  Lock,
  PenLine,
  Search,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { GoogleButton } from '@/components/google-button';
import { AgentDemo } from '@/components/agent-demo';
import { AGENTS } from '@/lib/agents';

const AGENT_ICONS = { research: Search, writer: PenLine, analyst: Layers, builder: Terminal } as const;

const FEATURES = [
  { icon: Zap, title: 'Specialist agents', body: 'Pick the agent built for the job: research, writing, analysis or building. Each one has its own instructions and output style.' },
  { icon: Workflow, title: 'Outcome first', body: 'Describe the result you want in plain language. Get back a finished deliverable, not a to-do list.' },
  { icon: History, title: 'Saved history', body: 'Every run is stored in your workspace so you can reopen, copy and build on earlier work.' },
  { icon: BadgeCheck, title: 'Honest by design', body: 'Agents say when they are unsure instead of inventing facts, and never claim actions they cannot take.' },
  { icon: Lock, title: 'Private by default', body: 'Sign in with Google. Your history is protected with row-level security so only you can read it.' },
  { icon: Layers, title: 'Bring your own model', body: 'Runs on any OpenAI-compatible provider, so you choose the model and the cost.' },
];

const STEPS = [
  { n: '01', title: 'Choose an agent', body: 'Select Research, Writer, Analyst or Builder.' },
  { n: '02', title: 'Describe the outcome', body: 'Say what you need in a sentence or a page.' },
  { n: '03', title: 'Review and ship', body: 'Copy the result, refine it, and move on.' },
];

const PLANS = [
  { name: 'Starter', price: '$0', note: 'For trying things out', features: ['All four agents', 'Saved task history', 'Fair-use limits'], cta: 'Start free', featured: false },
  { name: 'Pro', price: '$29', note: 'per month', features: ['Higher usage limits', 'Premium models', 'Priority speed', 'Email support'], cta: 'Get Pro', featured: true },
  { name: 'Team', price: 'Custom', note: 'for growing teams', features: ['Shared workspace', 'Admin controls', 'Custom agents', 'Dedicated support'], cta: 'Talk to us', featured: false },
];

const FAQ = [
  { q: 'Do I need a credit card to start?', a: 'No. Sign in with Google and start running agents right away.' },
  { q: 'Can agents browse the web or send emails?', a: 'Not yet. Today agents work from their built-in knowledge and your instructions. Tools that take outside actions will arrive behind explicit approval steps.' },
  { q: 'Which AI model does Runon use?', a: 'Any OpenAI-compatible model through OpenRouter or another provider. The default is fast and affordable, and you can switch to a more powerful one.' },
  { q: 'Is my data private?', a: 'Your history is tied to your account and protected with row-level security. See our Privacy Policy for details.' },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#07070c]/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#agents" className="hover:text-white">Agents</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden px-3 text-sm text-zinc-300 hover:text-white sm:block">Sign in</Link>
            <Link href="/login" className="btn btn-light !h-10 !px-4 !text-sm">Get started</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-24 pt-20 text-center sm:pt-28">
        <div className="grid-bg absolute inset-0" />
        <div className="orb -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 bg-violet-600/35" />
        <div className="orb right-0 top-40 h-72 w-72 bg-cyan-500/15" />
        <div className="relative mx-auto max-w-4xl">
          <span className="fade-up glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Specialist AI agents, ready in seconds
          </span>
          <h1 className="fade-up mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl" style={{ animationDelay: '80ms' }}>
            <span className="grad-text">AI agents that actually get work done</span>
          </h1>
          <p className="fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400" style={{ animationDelay: '160ms' }}>
            Describe the outcome. Runon&apos;s specialist agents research, write, analyze and build, then hand you a
            finished result you can use.
          </p>
          <div className="fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
            <GoogleButton label="Sign up with Google" />
            <a href="#how" className="btn btn-ghost w-full sm:w-auto">
              See how it works <ArrowRight size={16} />
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Free to start. No credit card required.</p>
        </div>
        <div className="relative mt-16">
          <AgentDemo />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Everything you need to delegate real work</h2>
          <p className="mt-4 text-zinc-400">A focused workspace with the pieces that matter and none of the clutter.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">From idea to result in three steps</h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-7">
              <span className="grad-text font-mono text-4xl font-semibold">{s.n}</span>
              <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-zinc-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">Meet your agents</h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {AGENTS.map((a) => {
            const Icon = AGENT_ICONS[a.id];
            return (
              <div key={a.id} className="card flex gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{a.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{a.tagline}</p>
                  <p className="mt-3 text-sm italic text-zinc-500">&ldquo;{a.placeholder}&rdquo;</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">Simple pricing</h2>
        <p className="mt-4 text-center text-zinc-400">Start free and upgrade when you need more.</p>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`card flex flex-col p-7 ${p.featured ? 'border-violet-400/50 bg-violet-500/[0.07] shadow-xl shadow-violet-900/30' : ''}`}
            >
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="mt-4 text-4xl font-semibold tracking-tight">{p.price}</p>
              <p className="text-sm text-zinc-500">{p.note}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <BadgeCheck size={16} className="text-violet-300" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={`btn mt-8 ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">Questions, answered</h2>
        <div className="mt-12 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex items-center justify-between gap-4 font-medium">
                {f.q}
                <ChevronDown size={18} className="chev shrink-0 text-zinc-400 transition-transform" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-24">
        <div className="glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-16 text-center">
          <div className="orb -top-24 left-1/2 h-64 w-64 -translate-x-1/2 bg-violet-600/40" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-5xl">Put your first agent to work</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">Sign up with Google and have a finished result in under a minute.</p>
          <div className="relative mt-8 flex justify-center">
            <GoogleButton label="Get started with Google" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <Logo />
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
          <p>© {new Date().getFullYear()} Runon AI</p>
        </div>
      </footer>
    </div>
  );
}
