"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  CalendarHeartIcon,
  FileBadgeIcon,
  LinkIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const features = [
  { icon: FileBadgeIcon, title: "Digital gift certificates" },
  { icon: UsersIcon, title: "Permanent recognition" },
  { icon: LinkIcon, title: "No account needed" },
  { icon: CalendarHeartIcon, title: "Every occasion" },
];

const contributions = [
  { initials: "NN", name: "Nana & Nani", occasion: "1st birthday", amount: 10000 },
  { initials: "RU", name: "Uncle Rohan", occasion: "Diwali", amount: 5000 },
  { initials: "PK", name: "Priya (family friend)", occasion: "Naming ceremony", amount: 2500 },
];

const total = contributions.reduce((sum, item) => sum + item.amount, 0);
const rupees = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function Ticker() {
  // Animating by a percentage of the track's own width (rather than a
  // pixel value measured once via scrollWidth) makes the loop seamless
  // regardless of font-load timing or layout shifts — at -50% the second,
  // identical half of the duplicated list lines up exactly with the first.
  const x = useMotionValue("0%");

  useEffect(() => {
    const controls = animate(x, "-50%", { duration: 22, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [x]);

  const chips = [...contributions, ...contributions];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div style={{ x }} className="flex w-max gap-3 py-5 pl-8">
        {chips.map((contribution, index) => (
          <div
            key={`${contribution.name}-${index}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full bg-muted py-1.5 pr-4 pl-1.5"
          >
            <Avatar size="sm">
              <AvatarFallback>{contribution.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium whitespace-nowrap">{contribution.name}</span>
            <span className="text-xs whitespace-nowrap text-muted-foreground">
              {contribution.occasion}
            </span>
            <span className="text-sm font-medium whitespace-nowrap tabular-nums">
              ₹{rupees.format(contribution.amount)}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Family({ className }: { className?: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "0px 0px -20% 0px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (value) => `₹${rupees.format(Math.round(value))}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, total, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, count]);

  return (
    <Section className={className}>
      <SectionHeader
        eyebrow="The TFB difference"
        title="The whole family builds their future"
        description="Grandparents, aunts, and uncles contribute through a shareable link — no account needed. Every name lives on the child's wall, forever."
      />

      <div
        ref={panelRef}
        className="mt-12 overflow-hidden rounded-3xl bg-card shadow-xl shadow-trust-blue/5 ring-1 ring-foreground/10"
      >
        <div className="flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserIcon className="size-3.5 text-foreground" />
              </div>
              <span className="text-sm font-medium">Aarav&apos;s contributor wall</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-growth-green opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-growth-green" />
              </span>
              Raised so far
            </span>
            <motion.span className="font-heading text-5xl font-medium tracking-tight tabular-nums sm:text-6xl">
              {display}
            </motion.span>
          </div>

          <div className="flex flex-col items-start gap-2.5 lg:items-end">
            <AvatarGroup>
              {contributions.map((contribution) => (
                <Avatar key={contribution.name}>
                  <AvatarFallback>{contribution.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <Badge variant="secondary">{contributions.length} contributions</Badge>
          </div>
        </div>

        <Separator />

        <Ticker />
      </div>

      <div className="mt-10 flex flex-col items-center gap-6 text-center">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium"
            >
              <feature.icon className="size-3.5 text-muted-foreground" />
              {feature.title}
            </li>
          ))}
        </ul>

        <Button className="bg-primary-gradient rounded-full" size="lg" asChild>
          <Link href="/signup">Share your child&apos;s contribution link</Link>
        </Button>
      </div>
    </Section>
  );
}
