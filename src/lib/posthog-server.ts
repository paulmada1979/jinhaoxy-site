// Server-side PostHog client. Use from API routes and server actions to
// capture events that can't reliably be sent from the browser (form
// submits that succeed past ad-blockers, server-side conversions).
//
// Pattern: fire .capture() then `await ph.shutdown()` before returning
// the response, so the event flushes before the function instance is
// torn down. On Fluid Compute reused instances would batch otherwise
// and we'd lose the last few events on cold-shutdown.
//
// Token: NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN (with NEXT_PUBLIC_POSTHOG_KEY
// as a legacy fallback — matches the client SDK's env-var precedence).

import { PostHog } from "posthog-node";

const TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function createPosthogServer(): PostHog | null {
  if (!TOKEN) return null;
  return new PostHog(TOKEN, {
    host: HOST,
    // Aggressive flush so single-event captures don't sit in the batch
    // queue waiting for the next event that never comes.
    flushAt: 1,
    flushInterval: 0,
  });
}
