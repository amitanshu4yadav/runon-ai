# Runon AI

AI agents that actually get work done. Next.js 15 + TypeScript + Tailwind 4, Google sign-in via Supabase Auth, saved task history, and any OpenAI-compatible model API (OpenRouter by default). Built to deploy on Vercel.

## Run locally

1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill it in (see below).
4. `npm run dev` and open http://localhost:3000

Without Supabase variables the landing page still works, and `/login` offers a local dev shortcut to the dashboard. In production the dashboard and API stay locked until sign-in is configured.

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor**, paste the contents of `supabase.sql`, and run it. This creates the tables, the profile trigger and row-level security.
3. Open **Project Settings → API** and copy the Project URL and the anon public key into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 2. Turn on Google sign-in

1. In Google Cloud Console (https://console.cloud.google.com) create a project, then **APIs & Services → OAuth consent screen**. Add your app name, support email, and your Privacy Policy and Terms URLs (`https://YOUR-DOMAIN/privacy` and `/terms`).
2. **Credentials → Create credentials → OAuth client ID → Web application**.
3. Add this under **Authorized redirect URIs**: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback` (shown on the Supabase Google provider page).
4. Copy the Client ID and Client Secret.
5. In Supabase go to **Authentication → Sign In / Providers → Google**, enable it, and paste the Client ID and Secret.
6. In Supabase go to **Authentication → URL Configuration**:
   - Site URL: your production URL, e.g. `https://runon.ai`
   - Redirect URLs: `https://YOUR-DOMAIN/auth/callback`, `http://localhost:3000/auth/callback`, and `https://*-YOUR-TEAM.vercel.app/auth/callback` if you want preview deployments to work.

## 3. Add an AI provider key

Create a key at https://openrouter.ai and set `AI_API_KEY`. `AI_MODEL` defaults to `openai/gpt-5-mini` (fast and cheap). Set it to `openai/gpt-5` or `openai/gpt-5-pro` for higher quality; note slower models can hit the 60 second function limit.

## 4. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import it at https://vercel.com/new. The Next.js preset is detected automatically.
3. Add these Environment Variables (Production, and Preview if you use previews):
   - `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your custom domain, once connected)
4. Deploy, then add your custom domain under **Settings → Domains** and update the Supabase Site URL to match.

## Before you launch

- Replace the placeholder pricing in `app/page.tsx` (`PLANS`) with your real plans.
- Have the Privacy Policy and Terms (`app/privacy`, `app/terms`) reviewed by a lawyer and add a support email.
- The API rate limit in `app/api/agent/route.ts` is per serverless instance. Use a shared store such as Upstash Redis for strict limits.
- Agents only generate text. Real browsing, search or email tools should be added behind explicit permission and approval steps.

## Security

Never put your AI key or any secret in frontend code, GitHub, screenshots or chat. Only `NEXT_PUBLIC_*` values reach the browser. If a key has been exposed, revoke it and create a replacement.
