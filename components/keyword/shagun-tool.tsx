"use client";

/**
 * Shagun: a toy today, or the same money invested until the child is 25.
 * The visitor picks the amount, the child's age and the age they receive it.
 * Optional: the same shagun every birthday until 18.
 */

import { useMemo, useState } from "react";
import { GiftIcon, SproutIcon } from "lucide-react";

import { formatCompactINR, formatINR } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Big, Control, Illustrative, Mark, Pills, Small, lumpFutureValue } from "@/components/keyword/kit";

const AMOUNTS = [1100, 1500, 2100, 5100, 11000];

export function ShagunTool() {
  const [amount, setAmount] = useState(2100);
  const [age, setAge] = useState(1);
  const [getAt, setGetAt] = useState(25);
  const [rate, setRate] = useState(12);
  const [everyYear, setEveryYear] = useState(false);
  const [chose, setChose] = useState<"toy" | "invest" | null>(null);

  const years = Math.max(1, getAt - age);

  const r = useMemo(() => {
    const once = lumpFutureValue(amount, years, rate);
    // Same shagun on every birthday from now until 18 (inclusive of today).
    let yearly = 0;
    let given = 0;
    for (let a = age; a <= Math.min(18, getAt - 1); a++) {
      yearly += lumpFutureValue(amount, getAt - a, rate);
      given += amount;
    }
    return { once, yearly, given, multiple: once / amount };
  }, [amount, years, rate, age, getAt]);

  const value = everyYear ? r.yearly : r.once;
  const put = everyYear ? r.given : amount;

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">The shagun</span>
            <Pills
              label="Shagun amount"
              value={amount}
              onChange={setAmount}
              options={AMOUNTS.map((a) => ({ value: a, label: formatINR(a) }))}
            />
          </div>
          <Control
            label="The child's age today"
            display={age === 0 ? "Newborn" : `${age} ${age === 1 ? "yr" : "yrs"}`}
            value={age}
            min={0}
            max={15}
            step={1}
            minLabel="Newborn"
            maxLabel="15"
            onChange={setAge}
          />
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">They get it at</span>
            <Pills
              label="Age they receive it"
              value={getAt}
              onChange={setGetAt}
              options={[18, 21, 25, 30].map((a) => ({ value: a, label: `${a}` }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setChose("toy")}
          className="flex flex-col gap-3 rounded-2xl border bg-background p-6 text-left transition-colors hover:bg-muted"
        >
          <GiftIcon className="size-7" />
          <p className="text-lg font-medium">A toy for {formatINR(amount)}</p>
          <p className="text-sm text-muted-foreground">Loved for a few weeks. Outgrown in a year.</p>
          {chose === "toy" && (
            <p className="rounded-lg bg-stamp-sage/70 p-3 text-sm">
              A lovely memory by the time they turn {getAt}. Now tap the other one.
            </p>
          )}
        </button>
        <button
          type="button"
          onClick={() => setChose("invest")}
          className="flex flex-col gap-3 rounded-2xl border bg-trust-blue p-6 text-left text-paper"
        >
          <SproutIcon className="size-7" />
          <p className="text-lg font-medium">The same {formatINR(amount)}, invested</p>
          <p className="text-sm text-paper/70">Left alone until they turn {getAt}. Tap to see.</p>
          {chose === "invest" && (
            <p className="font-heading text-3xl font-medium tabular-nums">{formatCompactINR(r.once)}</p>
          )}
        </button>
      </div>

      {chose && (
        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Make it every birthday?</h2>
                <p className="text-sm text-muted-foreground">
                  The same {formatINR(amount)} on every birthday until 18.
                </p>
              </div>
              <Switch checked={everyYear} onCheckedChange={setEveryYear} aria-label="Every birthday until 18" />
            </div>

            <div className="flex flex-col gap-1">
              <Small>Shagun given{everyYear ? `, ${Math.round(r.given / amount)} birthdays` : ""}</Small>
              <p className="font-mono text-xl tabular-nums">{formatINR(put)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Small>Illustrative value at {getAt}</Small>
              <Big>{formatCompactINR(value)}</Big>
              <p className="text-sm">
                That one {formatINR(amount)} becomes about <Mark>{r.multiple.toFixed(1)} times</Mark>{" "}
                itself over {years} years, at {rate}% a year.
              </p>
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
            <Illustrative rate={rate} />
            <p className="rounded-lg bg-stamp-sage/70 p-4 text-sm">
              With a Seed, every goal gets a gift link. Grandparents, aunts and uncles can add their
              shagun straight to it, and their names are recorded on the child&apos;s goal.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
