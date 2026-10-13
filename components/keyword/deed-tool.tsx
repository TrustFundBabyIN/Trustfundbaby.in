"use client";

/**
 * The Deed page is a story the visitor plays through:
 *   1. Plant  — you set aside money (Seed).
 *   2. Write  — you write the rules: who it is for, from what age, for what.
 *   3. Sign   — press and hold to sign. Once signed it is irrevocable.
 *   4. Undo?  — the visitor tries to take it back, and can't.
 *   5. Harvest — at the age in the rules, your child receives it.
 *
 * Deed is not open yet, so this page explains what a trust is and never how
 * to buy one. Nothing typed here is saved.
 */

import { useEffect, useRef, useState } from "react";
import { LockIcon, SproutIcon, FileSignatureIcon, WheatIcon } from "lucide-react";

import { formatCompactINR, formatINR, sipFutureValue } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, Illustrative, Mark, Pills, Small } from "@/components/keyword/kit";

const PURPOSES = ["Education", "A first home", "Starting out in life", "Anything, once they're grown"] as const;

const UNDO_TRIES = [
  { who: "You, the parent", ask: "I'm the one who put the money in. Can I take it back?", answer: "No. Once signed, the money belongs to the trust, not to you." },
  { who: "The trustee", ask: "I run the trust. Can I change the rules?", answer: "No. A trustee must follow the deed as written, for the child." },
  { who: "Trust Fund Baby", ask: "You set it up. Can you undo it?", answer: "No. Not us either. That is the point." },
  { who: "A relative in a hurry", ask: "There's an emergency. Can we borrow from it?", answer: "Only if the deed you wrote allows it. If it doesn't, the answer is no." },
];

function Step({
  n,
  icon,
  title,
  active,
  done,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn("transition-opacity", !active && !done && "pointer-events-none opacity-40")}>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full border",
              done ? "border-trust-blue bg-trust-blue text-paper" : "bg-background"
            )}
          >
            {icon}
          </span>
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">Step {n}</p>
            <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function DeedTool() {
  const [step, setStep] = useState(1);
  const [monthly, setMonthly] = useState(3000);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [payAge, setPayAge] = useState(25);
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]>("Education");
  const [hold, setHold] = useState(0);
  const [signed, setSigned] = useState(false);
  const [tries, setTries] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progress = useRef(0);

  const child = name.trim() || "your child";
  const years = Math.max(1, payAge - age);
  const invested = monthly * 12 * years;
  const value = sipFutureValue(monthly, years, 12);

  function startHold() {
    if (signed || timer.current) return;
    progress.current = 0;
    timer.current = setInterval(() => {
      progress.current += 4;
      if (progress.current >= 100) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setHold(100);
        setSigned(true);
        setStep(4);
      } else {
        setHold(progress.current);
      }
    }, 60);
  }
  function stopHold() {
    if (!timer.current) return;
    clearInterval(timer.current);
    timer.current = null;
    progress.current = 0;
    setHold(0);
  }
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <Step n={1} icon={<SproutIcon className="size-4" />} title="You plant" active={step >= 1} done={step > 1}>
        <p className="text-sm text-muted-foreground">
          It starts small. A Seed is a SIP on your own PAN, from ₹100 a month, with your
          child&apos;s name on it as a label. You can pause or stop it any time. That freedom is
          also its weakness: money in your name can be spent.
        </p>
        <Control
          label="Put aside every month"
          display={formatINR(monthly)}
          value={monthly}
          min={100}
          max={50000}
          step={100}
          minLabel="₹100"
          maxLabel="₹50,000"
          onChange={setMonthly}
        />
        <Input
          aria-label="Child's name"
          placeholder="Your child's name (not saved)"
          maxLength={24}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11"
        />
        <Control
          label={`${name.trim() || "Your child"}'s age today`}
          display={age === 0 ? "Newborn" : `${age} ${age === 1 ? "yr" : "yrs"}`}
          value={age}
          min={0}
          max={17}
          step={1}
          minLabel="Newborn"
          maxLabel="17"
          onChange={setAge}
        />
        {step === 1 && (
          <Button className="bg-primary-gradient h-11 self-start rounded-full px-6" onClick={() => setStep(2)}>
            Now make it permanent
          </Button>
        )}
      </Step>

      <Step n={2} icon={<FileSignatureIcon className="size-4" />} title="You write the rules" active={step >= 2} done={step > 2}>
        <p className="text-sm text-muted-foreground">
          A Deed sets up a private trust for one child. The trust has its own PAN. When you
          settle money into it, the money stops being yours and belongs to the trust, held for{" "}
          {child} under rules you write once.
        </p>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">{name.trim() || "Your child"} receives it from age</span>
          <Pills
            label="Payout age"
            value={payAge}
            onChange={setPayAge}
            options={[18, 21, 25, 30].filter((a) => a > age).map((a) => ({ value: a, label: `${a}` }))}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">For</span>
          <Pills
            label="Purpose"
            value={purpose}
            onChange={setPurpose}
            options={PURPOSES.map((p) => ({ value: p, label: p }))}
          />
        </div>
        {step === 2 && (
          <Button className="bg-primary-gradient h-11 self-start rounded-full px-6" onClick={() => setStep(3)}>
            Read the deed
          </Button>
        )}
      </Step>

      <Step n={3} icon={<LockIcon className="size-4" />} title="You sign. It locks." active={step >= 3} done={signed}>
        <div className="relative overflow-hidden rounded-xl border bg-paper p-6 pb-16 text-trust-blue">
          <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase opacity-70">Deed of private trust · specimen</p>
          <p className="mt-3 font-heading text-xl leading-snug">
            The money in this trust is held for <Mark>{child}</Mark>, to be paid from age{" "}
            {payAge}, for {purpose.toLowerCase()}. These rules cannot be changed or revoked by the
            settlor, the trustee or anyone else.
          </p>
          <p className="mt-4 text-xs opacity-70">
            Specimen for illustration. A real deed is drafted from a counsel-reviewed template
            and explained to you line by line before anyone signs.
          </p>
          {signed && (
            <div className="pointer-events-none absolute right-4 bottom-4 rotate-[-12deg] bg-paper/80 rounded-md border-4 border-trust-blue px-3 py-1 font-mono text-lg font-semibold tracking-[0.2em] opacity-90">
              IRREVOCABLE
            </div>
          )}
        </div>
        {!signed ? (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled={step < 3}
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !e.repeat && startHold()}
              onKeyUp={stopHold}
              className="relative h-12 overflow-hidden rounded-full bg-trust-blue px-6 text-sm font-medium text-paper select-none touch-none"
            >
              <span
                className="absolute inset-y-0 left-0 bg-marigold/80 transition-[width] duration-75"
                style={{ width: `${hold}%` }}
              />
              <span className="relative">{hold > 0 ? "Keep holding…" : "Press and hold to sign"}</span>
            </button>
            <Small>Hold for two seconds. Signing a real deed is just as deliberate.</Small>
          </div>
        ) : (
          <p className="text-sm font-medium">Signed. Now try to undo it.</p>
        )}
      </Step>

      <Step n={4} icon={<LockIcon className="size-4" />} title="Try to undo it" active={step >= 4} done={tries.length === UNDO_TRIES.length}>
        <div className="grid gap-3 sm:grid-cols-2">
          {UNDO_TRIES.map((t, i) => {
            const tried = tries.includes(i);
            return (
              <button
                key={t.who}
                type="button"
                onClick={() => !tried && setTries((x) => [...x, i])}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors",
                  tried ? "bg-stamp-sage/70" : "bg-background hover:bg-muted"
                )}
              >
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">{t.who}</span>
                <span className="text-sm">&ldquo;{t.ask}&rdquo;</span>
                {tried && (
                  <span className="flex items-start gap-2 text-sm font-medium">
                    <LockIcon className="mt-0.5 size-4 shrink-0" /> {t.answer}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {tries.length > 0 && step === 4 && (
          <Button className="bg-primary-gradient h-11 self-start rounded-full px-6" onClick={() => setStep(5)}>
            {tries.length < UNDO_TRIES.length ? "Fine, it's locked. What happens next?" : "So what happens next?"}
          </Button>
        )}
      </Step>

      <Step n={5} icon={<WheatIcon className="size-4" />} title={`${name.trim() || "Your child"} harvests`} active={step >= 5} done={step >= 5}>
        <p className="text-sm text-muted-foreground">
          You planted. The deed kept it safe from everyone, including you. At {payAge},{" "}
          {child} receives it for {purpose.toLowerCase()}, exactly as you wrote.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <Small>You plant</Small>
            <p className="font-mono text-lg tabular-nums">{formatINR(monthly)}/mo</p>
          </div>
          <div className="rounded-xl border p-4">
            <Small>Over {years} years you put in</Small>
            <p className="font-mono text-lg tabular-nums">{formatCompactINR(invested)}</p>
          </div>
          <div className="rounded-xl border bg-trust-blue p-4 text-paper">
            <Small className="text-paper/70">At {payAge}, illustrative</Small>
            <p className="font-mono text-lg tabular-nums">{formatCompactINR(value)}</p>
          </div>
        </div>
        <Illustrative rate={12} />
      </Step>
    </div>
  );
}
