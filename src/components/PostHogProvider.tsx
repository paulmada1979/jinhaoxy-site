"use client";

// PostHog analytics provider for the Next.js App Router.
// Reads NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST from env.
// If the key is missing (e.g., local dev), this no-ops cleanly — no events
// are sent and the rest of the app keeps working.

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

function ensureInitialized() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return; // No key → silent no-op
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Capture pageviews manually via the tracker below so we can include
    // the full URL with query params in App Router.
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    // Respect Do Not Track and avoid local dev noise.
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
    if (!POSTHOG_KEY) return;
    if (!pathname) return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  ensureInitialized();

  // If no key, just pass children through — don't mount the provider.
  if (!POSTHOG_KEY) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
