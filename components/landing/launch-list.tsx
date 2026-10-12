"use client";

import { useState } from "react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Launch list: email only, with DPDP consent asked before anything is saved.
 *
 * Sign-ups go to a Google Apps Script web app that appends them to the
 * "TFB Launch List" Google Sheet (free). The script lives in
 * brahma-vault/businesses/tfb/website-ops/launch-list-apps-script.gs.
 * Until LAUNCH_LIST_URL is set, the form renders but tells the visitor that
 * sign-ups open shortly.
 */
const LAUNCH_LIST_URL =
  "https://script.google.com/macros/s/AKfycbx9vmGXo8HED4J2wjPt9SZmD6hAZeFf-DJcxuNYGcj89ByXiKUb-eh3SlZMuip5KK9KpQ/exec";

const CONSENT_TEXT =
  "I agree that Trust Fund Baby may email me about the launch and my account. I can withdraw this any time.";

type Status = "idle" | "sending" | "done" | "error";

export function LaunchListForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !email) return;
    if (!LAUNCH_LIST_URL) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const body = new URLSearchParams({
        email,
        consent: "yes",
        consent_text: CONSENT_TEXT,
        page: window.location.pathname,
        company: honeypot,
      });
      await fetch(LAUNCH_LIST_URL, { method: "POST", body, mode: "no-cors" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="text-sm font-medium">
        You&apos;re on the list. We&apos;ll email you once, the day we open.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="launch-email" className="sr-only">
          Email
        </label>
        <Input
          id="launch-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 flex-1"
        />
        <Button
          type="submit"
          size="lg"
          disabled={!consent || status === "sending"}
          className="bg-primary-gradient h-11 rounded-full"
        >
          {status === "sending" ? "Adding…" : "Join the launch list"}
        </Button>
      </div>
      <label className="flex items-start gap-2.5 text-xs leading-snug text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--color-primary)]"
        />
        <span>{CONSENT_TEXT}</span>
      </label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="hidden"
      />
      {status === "error" && (
        <p role="alert" className="text-xs text-muted-foreground">
          Sign-ups open shortly. Please try again in a day or two, or write to
          sanchit@trustfundbaby.in.
        </p>
      )}
    </form>
  );
}

export function LaunchList({ className }: { className?: string }) {
  return (
    <Section id="launch-list" className={className}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          eyebrow="Opening soon"
          title="Be first when we open."
          description="Seed and Harvest open once our fund-platform and app-store approvals are through. Leave your email and we'll write to you once, the day we open."
        />
        <Card>
          <CardContent>
            <LaunchListForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
