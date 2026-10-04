import { NextResponse } from 'next/server';
import { getAgent } from '@/lib/agents';
import { createClient } from '@/lib/supabase/server';
import { isDev, supabaseConfigured } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_INPUT = 4000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

// Best-effort limiter. Serverless instances do not share memory, so use a shared store
// (e.g. Upstash Redis) if you need strict limits.
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  let userId = 'dev';
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null;

  if (supabaseConfigured) {
    supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return fail('Please sign in to run agents.', 401);
    userId = user.id;
  } else if (!isDev) {
    return fail('Sign-in is not configured on this deployment.', 401);
  }

  if (rateLimited(userId)) return fail('You are going a bit fast. Please wait a minute and try again.', 429);

  let body: { agent?: unknown; input?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail('Invalid request.', 400);
  }

  const agent = typeof body.agent === 'string' ? getAgent(body.agent) : undefined;
  const input = typeof body.input === 'string' ? body.input.trim() : '';
  if (!agent) return fail('Unknown agent.', 400);
  if (!input) return fail('Describe what you want the agent to do.', 400);
  if (input.length > MAX_INPUT) return fail(`Please keep your request under ${MAX_INPUT} characters.`, 400);

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') return fail('The AI provider is not configured yet.', 503);

  const baseUrl = (process.env.AI_BASE_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
  const model = process.env.AI_MODEL || 'openai/gpt-5-mini';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55_000);

  let result = '';
  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Runon AI',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: agent.system },
          { role: 'user', content: input },
        ],
      }),
    });

    if (!res.ok) {
      console.error('AI provider error', res.status, (await res.text()).slice(0, 500));
      return fail('The AI provider returned an error. Please try again.', 502);
    }
    const data = await res.json();
    result = data?.choices?.[0]?.message?.content ?? '';
  } catch (e) {
    const aborted = e instanceof Error && e.name === 'AbortError';
    console.error('AI request failed', e);
    return fail(aborted ? 'That took too long. Try a shorter request or a faster model.' : 'Could not reach the AI provider.', 504);
  } finally {
    clearTimeout(timer);
  }

  if (!result.trim()) return fail('The agent returned an empty response. Please try again.', 502);

  const now = new Date().toISOString();
  if (supabase) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        agent: agent.id,
        name: input.slice(0, 80),
        input,
        status: 'completed',
        result,
        completed_at: now,
      })
      .select('id, agent, input, result, status, created_at')
      .single();
    if (!error && data) return NextResponse.json({ task: data });
    console.error('Saving task failed', error?.message);
  }

  return NextResponse.json({
    task: { id: crypto.randomUUID(), agent: agent.id, input, result, status: 'completed', created_at: now },
  });
}
