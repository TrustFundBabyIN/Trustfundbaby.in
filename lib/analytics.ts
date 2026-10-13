/**
 * Visitor analytics and sign-up attribution.
 *
 * Two tools, by design:
 *  - Umami (cloud.umami.is): cookieless, counts every visit, page, source and
 *    UTM campaign. No consent needed because it stores nothing on the device.
 *  - Google Analytics 4: loads ONLY after the visitor taps "Allow" on the
 *    cookie banner. Until then no Google script is requested at all.
 *
 * Leave an ID empty to switch that tool off.
 */
export const UMAMI_WEBSITE_ID = "47b246ba-4033-46eb-8ece-bf303765cc1c";
export const GA_MEASUREMENT_ID = "G-0MWDSRVK4R";

export const CONSENT_KEY = "tfb-analytics-consent"; // "granted" | "denied"
export const CONSENT_OPEN_EVENT = "tfb:open-cookie-settings";
const FIRST_TOUCH_KEY = "tfb-first-touch";

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Send one named event to whichever tools are running. Never throws. */
export function track(name: string, data?: EventData) {
  try {
    window.umami?.track(name, data);
  } catch {}
  try {
    window.gtag?.("event", name, data ?? {});
  } catch {}
}

const once = new Set<string>();
/** Like track(), but at most once per page load for the same name. */
export function trackOnce(name: string, data?: EventData) {
  if (once.has(name)) return;
  once.add(name);
  track(name, data);
}

export type FirstTouch = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  first_page: string;
  referrer: string;
};

const EMPTY: FirstTouch = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  first_page: "",
  referrer: "",
};

/**
 * Remember where this visitor first came from (UTM tags, first page, referring
 * site), so a later launch-list sign-up can be credited to the right reel or
 * keyword. Only the referring site's host is kept, never the full URL.
 */
export function recordFirstTouch() {
  try {
    if (localStorage.getItem(FIRST_TOUCH_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    let referrer = "";
    try {
      const r = document.referrer ? new URL(document.referrer) : null;
      if (r && r.host !== window.location.host) referrer = r.host;
    } catch {}
    const touch: FirstTouch = {
      utm_source: (q.get("utm_source") ?? "").slice(0, 60),
      utm_medium: (q.get("utm_medium") ?? "").slice(0, 60),
      utm_campaign: (q.get("utm_campaign") ?? "").slice(0, 80),
      utm_content: (q.get("utm_content") ?? "").slice(0, 80),
      first_page: window.location.pathname.slice(0, 120),
      referrer: referrer.slice(0, 120),
    };
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {}
}

export function getFirstTouch(): FirstTouch {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<FirstTouch>) };
  } catch {}
  return EMPTY;
}
