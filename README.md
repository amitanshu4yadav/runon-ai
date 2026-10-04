# Primez Agents

Premium AI-agent startup MVP. Next.js + TypeScript + Tailwind + OpenAI-compatible model API + Supabase-ready schema.

## Run

1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` to `.env.local`.
4. Add an OpenRouter (or another OpenAI-compatible provider) API key.
5. `npm run dev`
6. Open http://localhost:3000

## Important

The current UI task execution is an MVP simulation on the client dashboard. The `/api/agent` endpoint is real model inference, but real browser/search/email tools are deliberately not enabled yet. Add tools behind explicit permissions and approval gates before allowing external side effects.


## Recommended OpenRouter model
The default model is `openai/gpt-5-pro` for high-quality agent planning and execution. For a lower-cost production tier, set `AI_MODEL=openai/gpt-5`. OpenRouter exposes these through its OpenAI-compatible API.

## Security
Never put your OpenRouter API key in frontend code, GitHub, screenshots, or chat. Keep it only in `.env.local`/server-side secrets. If a key has been exposed publicly, revoke it and create a replacement.
