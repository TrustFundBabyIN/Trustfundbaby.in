"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, BadgeCheckIcon, ShieldCheckIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import { BrandMark } from "@/components/brand";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCompactINR, sipFutureValue } from "@/lib/format";

const AGES = [18, 21, 25] as const;
const MONTHLY_SIP = 5000;
const CAGR = 12;

const assurances = ["Irrevocable by design", "Bank-grade security", "108 free lessons"];
const contributors = ["N", "D", "M", "A"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const [ageIndex, setAgeIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const interval = setInterval(() => {
      setAgeIndex((index) => (index + 1) % AGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused]);

  // Subtle parallax tilt on the projection card, tracking the pointer.
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const tiltX = useTransform(pointerY, [0, 1], [10, -10]);
  const tiltY = useTransform(pointerX, [0, 1], [-10, 10]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
    rotateX.set(tiltX.get());
    rotateY.set(tiltY.get());
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const age = AGES[ageIndex];
  const corpus = sipFutureValue(MONTHLY_SIP, age, CAGR);
  const invested = MONTHLY_SIP * age * 12;
  const multiple = corpus / invested;
  const investedShare = Math.min(100, (invested / corpus) * 100);

  const stats = [
    { value: "₹1K", label: "SIP per month, min" },
    { value: `${age}yr`, label: "Vesting age" },
    { value: "108", label: "Free lessons" },
  ];

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="bg-ambient pointer-events-none absolute inset-0" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center"
      >
        <div className="flex flex-col items-start gap-6">
          <motion.div variants={item}>
            <Badge variant="outline">
              India&apos;s first irrevocable children&apos;s trust fund
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-gradient font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl"
          >
            Start small. Set them up for life.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-sm text-muted-foreground sm:text-base"
          >
            Start a SIP or lump-sum account today, free — convert it into a
            legally irrevocable trust whenever you&apos;re ready. Your child
            receives the corpus at{" "}
            <span className="font-medium text-foreground tabular-nums">
              {age}
            </span>
            , plus free financial education from age 13.
          </motion.p>

          <motion.div
            variants={item}
            role="group"
            aria-label="Choose your child's payout age"
            className="flex items-center gap-1.5 rounded-full border bg-muted/40 p-1"
          >
            {AGES.map((value, index) => (
              <button
                key={value}
                type="button"
                aria-pressed={index === ageIndex}
                onClick={() => {
                  setAgeIndex(index);
                  setPaused(true);
                }}
                className={cn(
                  "relative h-9 min-w-11 cursor-pointer rounded-full px-3 text-sm font-medium tabular-nums transition-colors",
                  index === ageIndex
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {index === ageIndex && (
                  <motion.span
                    layoutId="age-pill"
                    className="bg-primary-gradient absolute inset-0 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{value}yr</span>
              </button>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <Button size="lg" className="bg-primary-gradient group rounded-full" asChild>
              <Link href="/signup">
                Start free
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="#how-it-works">How it works</Link>
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-medium tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.dl>

          <motion.ul
            variants={item}
            className="flex flex-wrap gap-x-5 gap-y-2 border-t pt-5"
          >
            {assurances.map((assurance) => (
              <li
                key={assurance}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <BadgeCheckIcon className="size-3.5" />
                {assurance}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 24 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 260, damping: 20, mass: 0.9 },
            },
          }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <Card
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="shadow-xl shadow-trust-blue/5"
          >
            <CardHeader className="flex flex-row items-center gap-2.5">
              <BrandMark />
              <div className="grid gap-0.5">
                <span className="text-sm font-medium">Trust Fund Baby</span>
                <span className="text-xs text-muted-foreground">
                  Growing since day one.
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">
                  Projected at 12% CAGR
                </p>
                <p className="font-heading text-4xl font-medium tracking-tight tabular-nums transition-all duration-300">
                  {formatCompactINR(corpus)}
                </p>
                <p className="text-sm text-muted-foreground">
                  At age <span className="tabular-nums">{age}</span> · ₹5K/month
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-primary-gradient h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${investedShare}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Invested {formatCompactINR(invested)}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <ShieldCheckIcon className="size-3.5" />
                    {multiple.toFixed(1)}x growth
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Contributors</p>
                  <p className="text-sm font-medium">4 family members</p>
                </div>
                <AvatarGroup>
                  {contributors.map((initial) => (
                    <Avatar key={initial} size="sm">
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
