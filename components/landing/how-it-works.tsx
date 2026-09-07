"use client";

import { useRef, useState } from "react";
import { ClipboardListIcon, LandmarkIcon, UsersIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardListIcon,
    title: "Start a Seed or Harvest account",
    description:
      "Pick a monthly SIP from ₹1,000, or a lump sum from ₹5,00,000. Nothing is locked in yet — pause, change the amount, or withdraw whenever you need to.",
    note: "5 minutes · no PAN required to start",
  },
  {
    icon: UsersIcon,
    title: "Family grows it with you",
    description:
      "Invite grandparents, aunts and uncles to contribute through a shareable link — no account needed on their side. Every name lands on your child's contributor wall.",
    note: "Optional, any time",
  },
  {
    icon: LandmarkIcon,
    title: "Convert to an irrevocable Deed",
    description:
      "When you're ready to make it permanent, choose a vesting age — 18, 21 or 25 — and a payout plan. e-KYC, trust PAN and e-sign run through Digio, and the deed executes.",
    note: "₹20,000 one-time · fully digital",
  },
];

function Step({
  step,
  index,
  isLast,
  reachedIndex,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
  reachedIndex: number;
}) {
  const reached = index <= reachedIndex;
  const current = index === reachedIndex;

  return (
    <li className="flex gap-4 sm:gap-5">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300",
            reached ? "bg-primary-gradient ring-transparent" : "ring-border"
          )}
        >
          <step.icon
            className={cn(
              "size-4 transition-colors duration-300",
              reached ? "text-primary-foreground" : "text-muted-foreground"
            )}
          />
        </div>
        {!isLast && (
          <div className="my-1 w-px flex-1 overflow-hidden bg-border">
            <div
              className={cn(
                "bg-primary-gradient h-full w-px origin-top transition-transform duration-500 ease-out",
                index < reachedIndex ? "scale-y-100" : "scale-y-0"
              )}
            />
          </div>
        )}
      </div>

      <motion.div
        animate={{
          opacity: current ? 1 : reached ? 0.7 : 0.45,
          scale: current ? 1 : 0.97,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn("relative flex-1 origin-left", !isLast && "pb-5")}
      >
        <Card
          className={cn(
            "relative z-0 shadow-trust-blue/5 transition-shadow duration-300",
            current ? "shadow-xl" : "shadow-none"
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 -right-1 -z-10 font-heading text-8xl font-medium text-foreground/[0.07] select-none sm:text-9xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <CardHeader className="flex flex-row items-center gap-2.5">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium">{step.title}</span>
            <Badge variant="secondary" className="ml-auto">
              {step.note}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-pretty text-muted-foreground sm:text-base">
              {step.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </li>
  );
}

export function HowItWorks({ className }: { className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [reachedIndex, setReachedIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 40%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(latest * steps.length))
    );
    setReachedIndex(index);
  });

  return (
    <Section id="how-it-works" className={className}>
      <SectionHeader
        eyebrow="Simple process"
        title="How it works"
        description="Start free. Grow with the family. Lock it in whenever you're ready."
      />

      <ol ref={listRef} className="mt-12 flex flex-col">
        {steps.map((step, index) => (
          <Step
            key={step.title}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            reachedIndex={reachedIndex}
          />
        ))}
      </ol>
    </Section>
  );
}
