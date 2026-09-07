"use client";

import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Seed",
    description: "Small, regular SIPs for your child's future",
    price: "₹0",
    priceNote: "to open",
    features: [
      "SIP from ₹1,000/mo, on your own PAN or theirs",
      "Full dashboard — track corpus & growth",
      "108 education modules, free",
      "Well-wisher gifting links",
      "Bank-grade security",
    ],
    cta: "Start a Seed account",
    highlighted: true,
  },
  {
    name: "Harvest",
    description: "Invest a lump sum, draw a monthly income",
    price: "₹0",
    priceNote: "to open",
    features: [
      "Lump sum from ₹5,00,000",
      "Monthly income, on your terms",
      "Full dashboard — track corpus & growth",
      "Well-wisher gifting links",
      "Bank-grade security",
    ],
    cta: "Start a Harvest account",
    highlighted: false,
  },
  {
    name: "Deed",
    description: "Make it a legally irrevocable trust",
    price: "₹20,000",
    priceNote: "one-time",
    features: [
      "Convert an existing Seed or Harvest account",
      "Irrevocable trust deed drafting",
      "Trust PAN application",
      "e-KYC & e-sign, fully digital",
      "Choose vesting age & payout plan",
    ],
    cta: "Convert to a Deed",
    highlighted: false,
  },
];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Transparent pricing"
        title="Free to start. Pay only when it's permanent."
        description="Opening a Seed or Harvest account costs nothing. The only real charge is converting to an irrevocable trust."
      />

      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        className="mt-12 grid gap-6 lg:grid-cols-3"
      >
        {tiers.map((tier) => (
          <motion.div key={tier.name} variants={item} className="relative">
            {tier.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Start here
              </Badge>
            )}
            <Card
              className={cn(
                "h-full transition-transform duration-300 ease-out",
                tier.highlighted
                  ? "shadow-xl shadow-trust-blue/10 ring-2 ring-primary"
                  : "hover:-translate-y-1 hover:shadow-xl hover:shadow-trust-blue/5"
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-4xl font-medium tracking-tight tabular-nums">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{tier.priceNote}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span className="text-pretty">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className={cn(
                    "w-full rounded-full",
                    tier.highlighted && "bg-primary-gradient"
                  )}
                  variant={tier.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/signup">{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-8 text-sm text-muted-foreground">
        Optional extras: child PAN application ₹500 · ITR filing ₹5,000 per
        taxable redemption.
      </p>
    </Section>
  );
}
