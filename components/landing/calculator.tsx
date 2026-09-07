"use client";

import { useMemo, useState } from "react";

import { formatCompactINR, formatINR, sipFutureValue } from "@/lib/format";
import { Section, SectionHeader } from "@/components/landing/section";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const PPF_RATE = 7.1;

function Control({
  label,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
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
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="font-heading text-lg font-medium tracking-tight tabular-nums">
          {value}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        onValueChange={([next]) => onChange(next)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(21);
  const [rate, setRate] = useState(12);

  const result = useMemo(() => {
    const corpus = sipFutureValue(monthly, years, rate);
    const invested = monthly * years * 12;
    const ppf = sipFutureValue(monthly, years, PPF_RATE);

    return {
      corpus,
      invested,
      returns: corpus - invested,
      multiple: corpus / invested,
      ppf,
      extra: corpus - ppf,
    };
  }, [monthly, years, rate]);

  return (
    <Section>
      <SectionHeader
        eyebrow="Interactive calculator"
        title="See your child's future"
        description="Drag the sliders to see how small monthly SIPs compound over time."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-8">
          <Control
            label="Monthly SIP"
            value={monthly}
            min={1000}
            max={50000}
            step={500}
            minLabel="₹1,000"
            maxLabel="₹50,000"
            onChange={setMonthly}
          />
          <Control
            label="Duration (years)"
            value={years}
            min={5}
            max={90}
            step={1}
            minLabel="5 years"
            maxLabel="90 years"
            onChange={setYears}
          />
          <Control
            label="Expected returns (%)"
            value={rate}
            min={7}
            max={25}
            step={0.5}
            minLabel="7%"
            maxLabel="25%"
            onChange={setRate}
          />
          <p className="text-sm text-muted-foreground">
            That&apos;s just {formatINR(monthly / 30)} per day.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">
                Your child receives after {years} years
              </p>
              <p className="font-heading text-4xl font-medium tracking-tight tabular-nums transition-all duration-300 sm:text-5xl">
                {formatCompactINR(result.corpus)}
              </p>
              <p className="text-sm text-muted-foreground tabular-nums">
                {result.multiple.toFixed(2)}x growth multiple
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-primary-gradient h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(100, (result.invested / result.corpus) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Invested {formatCompactINR(result.invested)}</span>
                <span>Returns {formatCompactINR(result.returns)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground">
                vs PPF ({PPF_RATE}% fixed)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-muted-foreground">
                    PPF would give
                  </p>
                  <p className="text-sm font-medium tabular-nums">
                    {formatCompactINR(result.ppf)}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-muted-foreground">
                    Difference at {rate}%
                  </p>
                  <p className="text-sm font-medium tabular-nums">
                    {result.extra >= 0 ? "+" : "−"}
                    {formatCompactINR(Math.abs(result.extra))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 max-w-3xl text-xs text-muted-foreground">
        Based on historical equity mutual fund returns. Not a guarantee. Past
        performance does not indicate future results.
      </p>
    </Section>
  );
}
