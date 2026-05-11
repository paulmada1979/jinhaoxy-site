"use client";

// PostHog analytics provider for the Next.js App Router.
//
// Required env vars (set in Vercel → Production + Preview):
//   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN  — phc_… token from PostHog Project Settings
//   NEXT_PUBLIC_POSTHOG_HOST           — https://us.i.posthog.com (or eu)
//
// (Legacy NEXT_PUBLIC_POSTHOG_KEY is also accepted as a fallback in case the
// older name is already provisioned somewhere.)
//
// If the token is missing this no-ops cleanly — no events sent, no errors.

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const POSTHOG_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

function ensureInitialized() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!POSTHOG_TOKEN) return; // No token → silent no-op
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    // Pin to 2026-01-30 default semantics so PostHog's evolving config
    // defaults don't silently shift behavior on us. See:
    // https://posthog.com/docs/libraries/js/config#defaults
    defaults: "2026-01-30",
    // We capture pageviews ourselves below so App Router route changes
    // (including search-param changes) get tracked correctly.
    capture_pageview: false,
    respect_dnt: true,
    loaded: (ph) => {
      if (process.env.NODE_ENV !== "production") {
        ph.opt_out_capturing(); // Don't pollute prod stats from dev sessions
      }
    },
  });
  initialized = true;
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_TOKEN) return;
    if (!pathname) return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  ensureInitialized();

  // If no token, just pass children through — don't mount the provider.
  if (!POSTHOG_TOKEN) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
