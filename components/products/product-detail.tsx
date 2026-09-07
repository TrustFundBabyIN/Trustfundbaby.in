import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Section, SectionHeader } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="bg-ambient pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-16">
          <Badge variant="outline" className="flex items-center gap-1.5">
            <product.icon className="size-3.5" />
            {product.emotion}
          </Badge>

          <h1 className="text-gradient font-heading max-w-2xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            {product.tagline}
          </h1>

          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button size="lg" className="bg-primary-gradient group rounded-full" asChild>
              <Link href="/signup">
                Start {product.name}
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="#process">How it works</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-0.5 pt-4">
            <p className="font-heading text-3xl font-medium tracking-tight tabular-nums">
              {product.entry}
            </p>
            <p className="text-xs text-muted-foreground">{product.entryNote}</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow={`Why ${product.name}`}
          title="Built for you"
          description={product.who}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {product.highlights.map((highlight) => (
            <Card key={highlight.title} className="shadow-xl shadow-trust-blue/5">
              <CardHeader className="flex flex-row items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <highlight.icon className="size-4.5 text-foreground" />
                </div>
                <span className="text-sm font-medium">{highlight.title}</span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-pretty text-muted-foreground sm:text-base">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="process" className="border-y bg-muted/30">
        <SectionHeader
          eyebrow="Simple process"
          title={`How ${product.name} works`}
          description="From opening the account to the day it's locked in for good."
        />

        <ol className="mt-12 flex flex-col gap-4">
          {product.steps.map((step, index) => (
            <li key={step.title}>
              <Card className="shadow-trust-blue/5">
                <CardHeader className="flex flex-row items-center gap-2.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pretty text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <section className="relative flex flex-col items-center overflow-hidden">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
        />
        <div className="bg-ambient pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
          <h2 className="text-gradient font-heading text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            Ready to start {product.name}?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Free to open. {product.entryNote}.
          </p>
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
    </>
  );
}
