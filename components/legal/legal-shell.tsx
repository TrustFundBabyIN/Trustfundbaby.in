import type { ReactNode } from "react";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";

type LegalShellProps = {
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
};

export function LegalShell({ title, intro, updated, children }: LegalShellProps) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Last updated: {updated}
          </p>

          <div className="mt-14 flex flex-col gap-10 border-t pt-12">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <div className="flex flex-col gap-4 text-[0.95rem] leading-relaxed text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
