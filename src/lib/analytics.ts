"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "view_schedule"
  | "select_event_day"
  | "view_session"
  | "select_session"
  | "remove_session"
  | "start_registration"
  | "complete_registration"
  | "join_waitlist";

/**
 * Thin wrapper around GA4's gtag. No-ops when NEXT_PUBLIC_GA_MEASUREMENT_ID
 * isn't set or gtag hasn't loaded, so this is always safe to call.
 */
export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
