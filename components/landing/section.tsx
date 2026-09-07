"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className={cn("flex scroll-mt-24 flex-col", className)} {...props}>
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28"
      >
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <Badge variant="outline" className="w-fit">
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-heading max-w-2xl text-2xl font-medium tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export { Section, SectionHeader };
