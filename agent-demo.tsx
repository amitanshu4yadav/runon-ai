'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';

const STEPS = [
  'Understanding your goal',
  'Breaking it into steps',
  'Drafting the deliverable',
  'Reviewing for quality',
];

export function AgentDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % (STEPS.length + 2)), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass float mx-auto w-full max-w-3xl rounded-2xl p-1.5 shadow-2xl shadow-violet-900/30">
      <div className="rounded-xl bg-[#0b0b13] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-3 text-xs text-zinc-500">Runon · Research agent</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm text-zinc-300 sm:text-base">
          Compare the top three project-management tools for a 10-person design agency and recommend one.
        </div>

        <ul className="mt-5 space-y-3 text-left">
          {STEPS.map((s, i) => {
            const done = active > i;
            const running = active === i;
            return (
              <li key={s} className={`flex items-center gap-3 text-sm transition-opacity ${done || running ? 'opacity-100' : 'opacity-35'}`}>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    done ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300' : 'border-white/15 text-zinc-400'
                  }`}
                >
                  {done ? <Check size={14} /> : running ? <Loader2 size={14} className="animate-spin" /> : null}
                </span>
                <span className={done ? 'text-zinc-200' : 'text-zinc-400'}>{s}</span>
              </li>
            );
          })}
        </ul>

        <div
          className={`mt-6 flex items-start gap-3 rounded-xl border border-violet-400/25 bg-violet-500/10 p-4 text-left text-sm text-violet-100 transition-opacity duration-500 ${
            active >= STEPS.length ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Sparkles size={18} className="mt-0.5 shrink-0 text-violet-300" />
          <span>Done. Summary, comparison table and a clear recommendation are ready to review.</span>
        </div>
      </div>
    </div>
  );
}
