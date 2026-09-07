"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function Cta() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
      />
      <div className="bg-ambient pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
        <div ref={containerRef} className="flex flex-col items-center gap-6">
          <h2 className="text-gradient font-heading text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            The best time to start was the day they were born. The second best
            time is today.
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Free to start. 108 education lessons. Irrevocable and locked in
            for as long as you choose — 18, 21 or 25.
          </p>
        </div>
        <Button size="lg" className="bg-primary-gradient group rounded-full" asChild>
          <Link href="/signup">
            Start free now
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </div>
    </section>
  );
}
