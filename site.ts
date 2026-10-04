export const SITE_NAME = 'Runon AI';
export const SITE_TAGLINE = 'AI agents that actually get work done';
export const SITE_DESCRIPTION =
  'Runon AI gives you specialist AI agents for research, writing, analysis and building. Describe the outcome, review the result, ship it.';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');
