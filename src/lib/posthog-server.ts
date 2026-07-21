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

// ⚠️ Querying the events this client emits (analytics gotcha, learned 2026-07-17):
//   • Server-side events carry NO `properties.$host` — that is a client/web
//     autocapture property, so it reads `None` on every server event. NEVER apply
//     the daily-briefing `$host = 'jinhaoxy.com'` filter to a server-event query:
//     it returns 0 rows and looks like a broken pipe. (This hid 63 days of
//     `contact_form_submit` events in project 418385 until 2026-07-17.)
//   • Match a submission to its prior visit on the event's `distinct_id` (the
//     plaintext email on `contact_form_submitted`), NOT `person.properties.email`
//     — that person property is unset for every person in 418385.
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
