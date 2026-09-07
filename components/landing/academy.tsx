"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  CircleCheckIcon,
  FlaskConicalIcon,
  PlayIcon,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const years = [
  "Money Basics",
  "Saving & Budgeting",
  "Banking & Credit",
  "Markets 101",
  "Risk & Insurance",
  "Investing Deeper",
  "Taxes & Filing",
  "Real Assets",
  "Wealth Management",
];

const year1Modules = [
  "What is Money?",
  "Barter & Trade",
  "History of Currency",
  "How Banks Work",
  "Saving vs Spending",
  "The Power of Compounding",
];

const steps = [
  { icon: PlayIcon, title: "Watch" },
  { icon: BookOpenIcon, title: "Learn" },
  { icon: FlaskConicalIcon, title: "Lab" },
  { icon: CircleCheckIcon, title: "Quiz" },
];

const UNLOCKED_MODULES = 12;
const TOTAL_MODULES = 108;
const RADIUS = 40;
const PROGRESS = UNLOCKED_MODULES / TOTAL_MODULES;

export function Academy() {
  const ringHostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ringHostRef, { once: true, margin: "0px 0px -20% 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="education">
      <SectionHeader
        eyebrow="TFB Academy — free"
        title="They don't just get money. They get wisdom."
        description="108 modules across 9 years. Your child learns money the way school should have taught it — from basics at 13 to wealth management at 21."
      />

      <ol className="mt-10 flex flex-wrap items-center gap-1.5">
        {years.map((year, index) => (
          <li key={year} className="group relative shrink-0">
            <div
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-xs transition-colors",
                index === 0
                  ? "bg-primary-gradient text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1.5 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
              {year}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col gap-8">
          <div ref={ringHostRef} className="flex items-center gap-6">
            <svg viewBox="0 0 96 96" className="size-20 shrink-0 -rotate-90" aria-hidden>
              <circle cx="48" cy="48" r={RADIUS} className="fill-none stroke-muted" strokeWidth="8" />
              <motion.circle
                cx="48"
                cy="48"
                r={RADIUS}
                strokeWidth="8"
                strokeLinecap="round"
                className="fill-none stroke-marigold"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? PROGRESS : 0 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="font-heading text-4xl font-medium tracking-tight tabular-nums">
                {UNLOCKED_MODULES}
                <span className="text-lg font-normal text-muted-foreground"> / {TOTAL_MODULES}</span>
              </p>
              <p className="text-xs text-muted-foreground">modules unlocked · Year 1 of 9</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground sm:text-base">
            Watch, learn, practice, prove it. The same loop repeats 108 times
            — each one a little harder, a little closer to real money
            decisions.
          </p>

          <div className="grid grid-cols-4 gap-2.5">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-2 rounded-xl bg-muted/60 py-4 text-center"
              >
                <step.icon className="size-4 text-foreground" />
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="grid gap-1">
              <CardTitle>Year 1 · Money Basics</CardTitle>
              <CardDescription>Age 13 · Preview free</CardDescription>
            </div>
            <Badge variant="secondary">1 of 9 years</Badge>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-6">
            <ol className="grid gap-2.5 sm:grid-cols-2">
              {year1Modules.map((title, index) => (
                <li key={title} className="flex items-baseline gap-2.5 text-sm">
                  <span className="w-5 shrink-0 text-right font-mono text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <span>{title}</span>
                </li>
              ))}
            </ol>

            <Button variant="outline" size="sm" className="w-fit rounded-full" asChild>
              <Link href="/signup">View all 108 modules</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col items-start gap-2">
        <Button className="bg-primary-gradient w-fit rounded-full" size="lg" asChild>
          <Link href="/signup">Start Year 1 free</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Included free on Seed and Deed accounts.
        </p>
      </div>
    </Section>
  );
}
