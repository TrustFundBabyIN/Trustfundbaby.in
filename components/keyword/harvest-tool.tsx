"use client";

import { useMemo, useState } from "react";

import { formatCompactINR, formatINR } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Big,
  Control,
  GrowthBars,
  Illustrative,
  Small,
  lumpFutureValue,
} from "@/components/keyword/kit";

/**
 * Month-by-month simulation so the optional withdrawal plan (SWP) is exact
 * for the assumed rate: grow, then pay out, every month.
 */
function simulate(amount: number, years: number, rate: number, swp: { on: boolean; startYear: number; monthly: number }) {
  const r = rate / 100 / 12;
  let bal = amount;
  let withdrawn = 0;
  let ranOutAt: number | null = null;
  const yearly: { year: number; value: number; withdrawn: number }[] = [];
  for (let m = 1; m <= years * 12; m++) {
    bal *= 1 + r;
    if (swp.on && m > swp.startYear * 12 && bal > 0) {
      const pay = Math.min(bal, swp.monthly);
      bal -= pay;
      withdrawn += pay;
      if (bal <= 0 && ranOutAt === null) ranOutAt = m;
    }
    if (m % 12 === 0) yearly.push({ year: m / 12, value: bal, withdrawn });
  }
  return { bal, withdrawn, ranOutAt, yearly };
}

export function HarvestTool() {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);
  const [swpOn, setSwpOn] = useState(false);
  const [startYear, setStartYear] = useState(10);
  const [monthly, setMonthly] = useState(2000);

  const start = Math.min(startYear, years - 1);

  const s = useMemo(
    () => simulate(amount, years, rate, { on: swpOn, startYear: start, monthly }),
    [amount, years, rate, swpOn, start, monthly]
  );
  const noSwp = lumpFutureValue(amount, years, rate);

  const points = s.yearly
    .filter((_, i, arr) => arr.length <= 20 || i % Math.ceil(arr.length / 20) === 0 || i === arr.length - 1)
    .map((y) => ({ label: `Year ${y.year}`, invested: Math.min(amount, y.value), value: y.value }));

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col gap-7">
          <Control
            label="One-time amount"
            display={formatINR(amount)}
            value={amount}
            min={21000}
            max={2500000}
            step={1000}
            minLabel="₹21,000 (the minimum)"
            maxLabel="₹25 lakh"
            onChange={setAmount}
          />
          <Control
            label="Left to grow for"
            display={`${years} yrs`}
            value={years}
            min={2}
            max={30}
            step={1}
            minLabel="2 years"
            maxLabel="30 years"
            onChange={setYears}
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
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Small className="text-paper/70">You put in, once</Small>
            <p className="font-mono text-xl tabular-nums">{formatINR(amount)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Small className="text-paper/70">
              Illustrative value after {years} years{swpOn ? ", after withdrawals" : ""}
            </Small>
            <Big>{formatCompactINR(s.bal)}</Big>
            {swpOn && (
              <p className="font-mono text-sm tabular-nums text-paper/80">
                + {formatCompactINR(s.withdrawn)} paid out along the way
              </p>
            )}
            <Small className="text-paper/70">
              Assuming {rate}% a year. Not a promise; returns can be lower or negative.
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium">Draw from it later?</h2>
              <p className="text-sm text-muted-foreground">
                Optional. A monthly withdrawal plan (SWP) you can set up later, on your own
                schedule.
              </p>
            </div>
            <Switch checked={swpOn} onCheckedChange={setSwpOn} aria-label="Add a withdrawal plan" />
          </div>

          {swpOn && (
            <>
              <Control
                label="Start withdrawals after"
                display={`${start} yrs`}
                value={start}
                min={1}
                max={Math.max(1, years - 1)}
                step={1}
                minLabel="1 year"
                maxLabel={`${Math.max(1, years - 1)} years`}
                onChange={setStartYear}
              />
              <Control
                label="Every month"
                display={formatINR(monthly)}
                value={monthly}
                min={500}
                max={50000}
                step={500}
                minLabel="₹500"
                maxLabel="₹50,000"
                onChange={setMonthly}
              />
              <p className="text-sm">
                {s.ranOutAt
                  ? `At this rate, the money runs out after about ${Math.ceil(s.ranOutAt / 12)} years.`
                  : `Without withdrawals it would be about ${formatCompactINR(noSwp)} (illustrative).`}
              </p>
              <p className="rounded-lg bg-stamp-sage/70 p-4 text-sm">
                Withdrawals always pay the account holder&apos;s registered bank account, never
                the child directly. Withdrawals within a year of investing carry short-term tax.
              </p>
            </>
          )}

          <GrowthBars points={points} />
          <Illustrative rate={rate} />
        </CardContent>
      </Card>
    </div>
  );
}
