"use client";

/**
 * "What will it cost?" Today's published costs, grown at an inflation rate the
 * visitor picks, and the monthly SIP that would get there at an assumed return.
 *
 * Today's costs were looked up on 13 October 2026. Update them, with sources,
 * at least once a year. USD costs use ₹95.76 per dollar (12 Oct 2026).
 */

import { useMemo, useState } from "react";

import { formatCompactINR, formatINR, sipFutureValue } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Big, Control, Illustrative, Small, sipNeeded } from "@/components/keyword/kit";

const GOALS = [
  {
    id: "iit",
    name: "B.Tech at an IIT",
    age: 18,
    today: 858000,
    basis: "Total 4-year fee at IIT Delhi or IIT Madras, 2025 session. Hostel and food extra.",
    source: { label: "Careers360, IIT fee structure 2025", href: "https://engineering.careers360.com/articles/iit-fee-structure" },
  },
  {
    id: "mbbs",
    name: "MBBS at a private college",
    age: 18,
    today: 8000000,
    basis: "Mid-range of ₹50 lakh to ₹1.38 crore for the full course at private medical colleges.",
    source: { label: "Vedantu, MBBS fees in government vs private colleges", href: "https://www.vedantu.com/neet/mbbs-fees-in-government-vs-private-colleges" },
  },
  {
    id: "iim",
    name: "MBA at IIM Ahmedabad",
    age: 23,
    today: 2750000,
    basis: "Total PGP fee for the 2025–27 batch, including ₹20.1 lakh tuition.",
    source: { label: "Cracku, citing IIMA's published fee", href: "https://cracku.in/iim-ahmedabad-mba-fees-2026-28" },
  },
  {
    id: "usms",
    name: "Master's in the US",
    age: 22,
    today: Math.round(92594 * 95.76),
    basis: "Two years at a public university: about $92,600 for tuition and living, at ₹95.76 a dollar.",
    source: { label: "IDP India, cost of MS in USA", href: "https://www.idp.com/india/study-in-usa/cost-of-study-ms-in-usa-for-indian-student/" },
  },
  {
    id: "wedding",
    name: "A wedding",
    age: 27,
    today: 3950000,
    basis: "Average Indian wedding budget in 2025, from WedMeGood's survey of couples.",
    source: { label: "Free Press Journal (PTI), WedMeGood 2025", href: "https://www.freepressjournal.in/business/2025-lavish-indian-weddings-thrive-with-8-higher-spending-despite-soaring-gold-prices" },
  },
] as const;

export function CostTool() {
  const [goalId, setGoalId] = useState<(typeof GOALS)[number]["id"]>("iit");
  const [age, setAge] = useState(0);
  const [inflation, setInflation] = useState(8);
  const [rate, setRate] = useState(12);

  const goal = GOALS.find((g) => g.id === goalId)!;
  const years = Math.max(1, goal.age - age);

  const r = useMemo(() => {
    const future = goal.today * Math.pow(1 + inflation / 100, years);
    const need = sipNeeded(future, years, rate);
    const daily100 = sipFutureValue((100 * 365) / 12, years, rate);
    return { future, need, daily100, share: Math.min(100, (daily100 / future) * 100) };
  }, [goal, years, inflation, rate]);

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col gap-5">
          <h2 className="text-xl font-medium tracking-tight">Pick a goal</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === goalId}
                onClick={() => {
                  setGoalId(g.id);
                  setAge((a) => Math.min(a, g.age - 1));
                }}
                className={cn(
                  "flex items-baseline justify-between gap-3 rounded-xl border p-4 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  g.id === goalId ? "border-trust-blue bg-trust-blue text-paper" : "bg-background hover:bg-muted"
                )}
              >
                <span className="text-sm font-medium">{g.name}</span>
                <span className="font-mono text-sm tabular-nums">{formatCompactINR(g.today)}</span>
              </button>
            ))}
          </div>
          <Small>
            Today: {goal.basis} Source:{" "}
            <a href={goal.source.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {goal.source.label}
            </a>
            .
          </Small>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-7">
          <Control
            label="Your child's age today"
            display={age === 0 ? "Newborn" : `${age} ${age === 1 ? "yr" : "yrs"}`}
            value={age}
            min={0}
            max={goal.age - 1}
            step={1}
            minLabel="Newborn"
            maxLabel={`${goal.age - 1}`}
            onChange={setAge}
          />
          <Control
            label="Costs rise every year by"
            display={`${inflation}%`}
            value={inflation}
            min={4}
            max={12}
            step={0.5}
            minLabel="4%"
            maxLabel="12%"
            onChange={setInflation}
          />
          <Control
            label="Assumed return a year (you choose)"
            display={`${rate}%`}
            value={rate}
            min={7}
            max={15}
            step={0.5}
            minLabel="7%"
            maxLabel="15%"
            onChange={setRate}
          />
        </CardContent>
      </Card>

      <Card className="bg-trust-blue text-paper">
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Small className="text-paper/70">Today</Small>
              <p className="font-mono text-xl tabular-nums">{formatCompactINR(goal.today)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Small className="text-paper/70">In {years} years, at {inflation}% a year</Small>
              <p className="font-mono text-xl tabular-nums">{formatCompactINR(r.future)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Small className="text-paper/70">To get there, put aside about</Small>
            <Big>{formatINR(Math.ceil(r.need / 100) * 100)}<span className="text-xl"> a month</span></Big>
            <Small className="text-paper/70">
              That&apos;s about {formatINR(r.need / 30)} a day, assuming {rate}% a year. Not a promise.
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">And if you start with just ₹100 a day?</h2>
          <p className="text-sm text-muted-foreground">
            ₹100 a day for {years} years is {formatCompactINR(100 * 365 * years)} put in. At {rate}% a
            year that illustrates to {formatCompactINR(r.daily100)}, about{" "}
            {Math.round(r.share)}% of the way there.
          </p>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-growth-green transition-all duration-500" style={{ width: `${r.share}%` }} />
          </div>
          <Illustrative rate={rate} />
        </CardContent>
      </Card>
    </div>
  );
}
