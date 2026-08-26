"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tick, onceInView } from "@/lib/motion";

/**
 * THE YEAR LEDGER
 *
 * One tick per year from birth to vesting. Filled ticks are years elapsed;
 * hollow ticks are years remaining; the marigold tick is now.
 *
 * This component exists to make a compounding chart unnecessary. TFB-02
 * MKT.COMP.004 forbids forward projections on every surface, and a rupee axis
 * is the fastest way to break that rule by accident. The ledger measures the
 * one quantity we can state with certainty — time.
 *
 * It renders no money. Do not add a corpus value to it.
 */

const VESTING_AGES = [18, 21, 25] as const;
type VestingAge = (typeof VESTING_AGES)[number];

export function YearLedger({
  childName = "Aarav",
  birthYear: initialBirthYear = 2022,
  vestingAge: initialVestingAge = 25,
  editable = true,
  compact = false,
}: {
  childName?: string;
  birthYear?: number;
  vestingAge?: VestingAge;
  editable?: boolean;
  compact?: boolean;
}) {
  const [birthYear, setBirthYear] = useState(initialBirthYear);
  const [vestingAge, setVestingAge] = useState<VestingAge>(initialVestingAge);
  const reduced = useReducedMotion();

  const { total, elapsed, remaining, endYear } = useMemo(() => {
    const thisYear = new Date().getFullYear();
    const end = birthYear + vestingAge;
    const totalYears = Math.max(1, end - birthYear);
    const done = Math.max(0, Math.min(totalYears, thisYear - birthYear));
    return {
      total: totalYears,
      elapsed: done,
      remaining: totalYears - done,
      endYear: end,
    };
  }, [birthYear, vestingAge]);

  return (
    <div className="rounded-[3px] border border-line bg-white p-6 sm:p-8 shadow-[0_24px_60px_-34px_rgba(27,58,99,0.3)]">
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-muted">
            THE YEAR LEDGER
          </p>
          <p className="font-display text-xl text-blue">{childName}</p>
        </div>
        <p className="font-mono text-[12px] tracking-[0.08em] text-muted">
          VESTS {endYear}
        </p>
      </div>

      <div
        className={`mb-3.5 flex items-end gap-1 ${compact ? "h-16" : "h-24"}`}
        role="img"
        aria-label={`${elapsed} years elapsed, ${remaining} years remaining until age ${vestingAge}`}
      >
        {Array.from({ length: total }, (_, i) => {
          const state =
            i < elapsed - 1 ? "done" : i === elapsed - 1 ? "now" : "left";
          const colour =
            state === "done"
              ? "bg-blue"
              : state === "now"
                ? "bg-marigold"
                : "bg-[#CFD8E2]";
          const height = state === "left" ? "h-[52%]" : "h-full";
          return (
            <motion.i
              key={`${birthYear}-${vestingAge}-${i}`}
              className={`flex-1 origin-bottom rounded-[1px] ${colour} ${height}`}
              variants={reduced ? undefined : tick(Math.abs(i - elapsed))}
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={onceInView}
            />
          );
        })}
      </div>

      <div className="mb-5 flex justify-between border-t border-line pt-2.5 font-mono text-[10.5px] tracking-[0.12em] text-muted">
        <span>BORN {birthYear}</span>
        <span>TODAY</span>
        <span>AGE {vestingAge}</span>
      </div>

      <div className="flex border-t border-line pt-4">
        <Readout label="Years behind" value={elapsed} />
        <Readout label="Years ahead" value={remaining} bordered />
      </div>

      {editable && (
        <div className="mt-5 flex flex-wrap gap-3.5 border-t border-line pt-4">
          <label className="min-w-[132px] flex-1">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Child&apos;s birth year
            </span>
            <input
              type="number"
              min={2008}
              max={new Date().getFullYear()}
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full rounded-[2px] border border-line bg-paper px-3 py-2.5 font-mono text-[13px] text-blue transition-colors focus:border-blue focus:outline-none"
            />
          </label>
          <div className="min-w-[132px] flex-1">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Vesting age
            </span>
            <div className="flex gap-1.5">
              {VESTING_AGES.map((age) => (
                <button
                  key={age}
                  type="button"
                  aria-pressed={age === vestingAge}
                  onClick={() => setVestingAge(age)}
                  className={`flex-1 rounded-[2px] border py-2.5 font-mono text-[12.5px] transition-all ${
                    age === vestingAge
                      ? "border-blue bg-blue text-paper"
                      : "border-line bg-paper text-muted hover:border-blue hover:text-blue"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-muted">
        This ledger counts years, never rupees. We do not project returns, and
        you should be wary of anyone who does.
      </p>
    </div>
  );
}

function Readout({
  label,
  value,
  bordered,
}: {
  label: string;
  value: number;
  bordered?: boolean;
}) {
  return (
    <div className={`flex-1 ${bordered ? "border-l border-line pl-[18px]" : ""}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <b className="font-display text-3xl font-semibold text-blue">{value}</b>
    </div>
  );
}
