"use client";

import { useMemo, useState } from "react";

import { formatCompactINR, formatINR, sipFutureValue } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Big,
  Control,
  GrowthBars,
  Illustrative,
  Mark,
  Pills,
  Small,
} from "@/components/keyword/kit";

type Mode = "daily" | "monthly";

export function SeedTool() {
  const [mode, setMode] = useState<Mode>("daily");
  const [daily, setDaily] = useState(100);
  const [monthly, setMonthly] = useState(3000);
  const [age, setAge] = useState(0);
  const [goalAge, setGoalAge] = useState(18);
  const [rate, setRate] = useState(12);
  const [name, setName] = useState("");

  const perMonth = mode === "daily" ? (daily * 365) / 12 : monthly;
  const years = Math.max(1, goalAge - age);

  const r = useMemo(() => {
    const invested = perMonth * 12 * years;
    const value = sipFutureValue(perMonth, years, rate);
    const step = Math.max(1, Math.ceil(years / 18));
    const points = [];
    for (let y = step; y <= years; y += step) {
      points.push({
        label: `Age ${age + y}`,
        invested: perMonth * 12 * y,
        value: sipFutureValue(perMonth, y, rate),
      });
    }
    if (points[points.length - 1]?.label !== `Age ${goalAge}`) {
      points.push({ label: `Age ${goalAge}`, invested, value });
    }
    return { invested, value, points };
  }, [perMonth, years, rate, age, goalAge]);

  const label = name.trim() ? `${name.trim()}, age ${goalAge}` : `My child, age ${goalAge}`;

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">How do you want to put it aside?</span>
            <Pills
              label="Frequency"
              value={mode}
              onChange={setMode}
              options={[
                { value: "daily", label: "Every day" },
                { value: "monthly", label: "Every month" },
              ]}
            />
          </div>

          {mode === "daily" ? (
            <Control
              label="Every day"
              display={formatINR(daily)}
              value={daily}
              min={10}
              max={1000}
              step={10}
              minLabel="₹10"
              maxLabel="₹1,000"
              onChange={setDaily}
            />
          ) : (
            <Control
              label="Every month"
              display={formatINR(monthly)}
              value={monthly}
              min={100}
              max={50000}
              step={100}
              minLabel="₹100 (the minimum)"
              maxLabel="₹50,000"
              onChange={setMonthly}
            />
          )}

          <Control
            label="Your child's age today"
            display={age === 0 ? "Newborn" : `${age} ${age === 1 ? "yr" : "yrs"}`}
            value={age}
            min={0}
            max={17}
            step={1}
            minLabel="Newborn"
            maxLabel="17"
            onChange={(v) => {
              setAge(v);
              if (goalAge <= v) setGoalAge(Math.min(30, v + 1));
            }}
          />

          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">Until they turn</span>
            <Pills
              label="Goal age"
              value={goalAge}
              onChange={setGoalAge}
              options={[18, 21, 25, 30]
                .filter((a) => a > age)
                .map((a) => ({ value: a, label: `${a}` }))}
            />
          </div>

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
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Small className="text-paper/70">You put in over {years} years</Small>
            <p className="font-mono text-xl tabular-nums">{formatINR(r.invested)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Small className="text-paper/70">Illustrative value when they turn {goalAge}</Small>
            <Big>{formatCompactINR(r.value)}</Big>
            <Small className="text-paper/70">
              Assuming {rate}% a year. Not a promise; returns can be lower or negative.
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Year by year</h2>
          <GrowthBars points={r.points} />
          <Illustrative rate={rate} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Give it a name</h2>
          <p className="text-sm text-muted-foreground">
            A Seed runs on <Mark>your own PAN</Mark>. Your child&apos;s name goes on it as a
            label, so everyone knows what this money is for. Try it; nothing you type here is
            saved.
          </p>
          <label htmlFor="seed-name" className="sr-only">
            Child&apos;s name
          </label>
          <Input
            id="seed-name"
            placeholder="Your child's name"
            maxLength={24}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
          <div className="flex flex-col gap-1 rounded-xl border bg-paper p-5 text-trust-blue">
            <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase opacity-70">
              Seed · {mode === "daily" ? `${formatINR(daily)} a day` : `${formatINR(monthly)} a month`}
            </p>
            <p className="font-heading text-2xl font-medium">{label}</p>
            <p className="text-xs opacity-70">Held in your name. Pause, change or stop any time.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
