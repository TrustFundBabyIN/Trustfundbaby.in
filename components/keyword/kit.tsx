"use client";

/**
 * Shared building blocks for the Instagram keyword pages (/seed, /harvest,
 * /deed, /audit, /cost, /shagun). These pages are where people land after
 * commenting a keyword, so they are interactive first and explain second.
 *
 * Rules for every keyword page:
 *  - Any projected value is labelled illustrative, uses the visitor's chosen
 *    rate, and sits next to the market-risk line and the ARN.
 *  - No WhatsApp button. The only call to action is the launch list.
 *  - Nothing the visitor types is saved, except the launch-list email.
 */

import Link from "next/link";

import { Brand } from "@/components/brand";
import { LaunchListForm } from "@/components/landing/launch-list";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { trackOnce } from "@/lib/analytics";

export function KwHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-4">
        <Brand />
        <Link
          href="/"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          trustfundbaby.in
        </Link>
      </div>
    </header>
  );
}

export function KwHero({
  keyword,
  title,
  children,
}: {
  keyword: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pt-10 pb-6 sm:pt-14">
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        You commented <span className="text-foreground">{keyword}</span>
      </p>
      <h1 className="text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {children && (
        <div className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export function KwMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 pb-16">
        {children}
      </div>
    </main>
  );
}

/** Marigold underline highlight. Never Marigold text on Paper. */
export function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[linear-gradient(transparent_62%,color-mix(in_oklch,var(--color-marigold),transparent_25%)_62%,color-mix(in_oklch,var(--color-marigold),transparent_25%)_92%,transparent_92%)]">
      {children}
    </span>
  );
}

export function Big({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-heading text-4xl font-medium tracking-tight tabular-nums sm:text-5xl",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Small({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>;
}

export function Control({
  label,
  display,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  display: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-mono text-base font-medium tabular-nums">{display}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        onValueChange={([next]) => {
          trackOnce("calculator_used", { page: window.location.pathname });
          onChange(next);
        }}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function Pills<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "border-trust-blue bg-trust-blue text-paper"
                : "bg-background hover:bg-muted"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Simple bar chart: contributions vs illustrative value, year by year. */
export function GrowthBars({
  points,
}: {
  points: { label: string; invested: number; value: number }[];
}) {
  const max = Math.max(1, ...points.map((p) => p.value));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-40 items-end gap-1" aria-hidden="true">
        {points.map((p) => (
          <div key={p.label} className="relative h-full flex-1">
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-sm bg-growth-green transition-all duration-500"
              style={{ height: `${(p.value / max) * 100}%` }}
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-sm bg-trust-blue transition-all duration-500 dark:bg-paper"
              style={{ height: `${(Math.min(p.invested, p.value) / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{points[0]?.label}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-trust-blue dark:bg-paper" /> What you put in
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-growth-green" /> Illustrative growth
        </span>
      </div>
    </div>
  );
}

export function Illustrative({ rate }: { rate?: number }) {
  return (
    <Small className="leading-snug">
      Illustrative only{rate !== undefined ? `, assuming ${rate}% a year` : ""}. Not a
      promise; mutual fund returns can be lower or negative, and you can get back less than
      you put in.
    </Small>
  );
}

export function KwLaunch({
  title = "Be first when we open.",
  children,
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Card className="bg-stamp-sage/60">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {children ??
            "Seed and Harvest open once our fund-platform and app-store approvals are through. Leave your email and we'll write to you once, the day we open."}
        </p>
        <LaunchListForm />
      </CardContent>
    </Card>
  );
}

export function KwDisclaimer({ projections = true }: { projections?: boolean }) {
  return (
    <div className="flex flex-col gap-2 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
      {projections && (
        <p>
          Every value on this page that is not &ldquo;what you put in&rdquo; is an
          illustration, calculated at the rate you choose. It is not a projection, forecast
          or promise. Actual returns from any mutual fund will differ and may be lower or
          negative.
        </p>
      )}
      <p>
        <strong className="font-medium text-foreground">
          Mutual fund investments are subject to market risks, read all scheme related
          documents carefully.
        </strong>
      </p>
      <p>
        TFB EduVest LLP · AMFI-registered Mutual Fund Distributor · ARN-368678. We distribute
        and explain; we do not give investment advice. Tax treatment depends on your
        circumstances.{" "}
        <Link href="/disclaimer/" className="underline underline-offset-4">
          Full disclaimer
        </Link>
      </p>
    </div>
  );
}

export function KwFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground">
        <span>© TFB EduVest LLP, Mumbai</span>
        <nav className="flex flex-wrap gap-4">
          <Link href="/seed/" className="hover:underline">Seed</Link>
          <Link href="/harvest/" className="hover:underline">Harvest</Link>
          <Link href="/deed/" className="hover:underline">Deed</Link>
          <Link href="/cost/" className="hover:underline">Cost</Link>
          <Link href="/shagun/" className="hover:underline">Shagun</Link>
          <Link href="/audit/" className="hover:underline">Audit</Link>
          <Link href="/privacy/" className="hover:underline">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}

export function KwPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KwHeader />
      <KwMain>{children}</KwMain>
      <KwFooter />
    </>
  );
}

// ---- maths -----------------------------------------------------------------

/** Future value of a one-time amount, compounded monthly at an annual rate. */
export function lumpFutureValue(amount: number, years: number, annualRatePct: number) {
  return amount * Math.pow(1 + annualRatePct / 100 / 12, years * 12);
}

/** Monthly SIP needed to reach a target, contributions at period start. */
export function sipNeeded(target: number, years: number, annualRatePct: number) {
  const r = annualRatePct / 100 / 12;
  const n = Math.max(1, Math.round(years * 12));
  return target / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}
