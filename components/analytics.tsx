"use client";

/**
 * Loads Umami for everyone (cookieless) and Google Analytics only after the
 * visitor allows it. Also shows the cookie banner and records first touch.
 * See lib/analytics.ts for the IDs and the reasoning.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CONSENT_KEY,
  CONSENT_OPEN_EVENT,
  GA_MEASUREMENT_ID,
  UMAMI_WEBSITE_ID,
  recordFirstTouch,
} from "@/lib/analytics";

function addScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  s.defer = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
}

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function Analytics() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    recordFirstTouch();
    if (UMAMI_WEBSITE_ID) {
      addScript("https://cloud.umami.is/script.js", {
        "data-website-id": UMAMI_WEBSITE_ID,
        "data-domains": "trustfundbaby.in",
      });
    }
    if (!GA_MEASUREMENT_ID) return;
    const consent = readConsent();
    if (consent === "granted") loadGoogleAnalytics();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (consent === null) setShowBanner(true);

    const open = () => setShowBanner(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setShowBanner(false);
    if (value === "granted") loadGoogleAnalytics();
    else {
      // Withdrawing consent: delete Google Analytics cookies, then reload so
      // the script is no longer running on this page.
      for (const c of document.cookie.split(";")) {
        const name = c.split("=")[0].trim();
        if (!name.startsWith("_ga")) continue;
        for (const domain of ["", "; domain=.trustfundbaby.in", "; domain=trustfundbaby.in"]) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
        }
      }
      if (window.gtag) window.location.reload();
    }
  }

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border bg-card p-5 text-card-foreground shadow-lg sm:flex-row sm:items-center">
        <p className="text-sm leading-snug">
          May we use one analytics cookie (Google Analytics) to see how the site is used? It
          is off unless you allow it.{" "}
          <Link href="/privacy/" className="underline underline-offset-4">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" className="h-10 rounded-full px-4" onClick={() => choose("denied")}>
            No, thanks
          </Button>
          <Button className="bg-primary-gradient h-10 rounded-full px-5" onClick={() => choose("granted")}>
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so a visitor can change their choice. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
