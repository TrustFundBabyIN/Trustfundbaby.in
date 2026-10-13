import type { Metadata } from "next";

import { Academy } from "@/components/landing/academy";
import { Calculator } from "@/components/landing/calculator";
import { Cta } from "@/components/landing/cta";
import { Family } from "@/components/landing/family";
import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Products } from "@/components/landing/products";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { LaunchList } from "@/components/landing/launch-list";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Products />
        <HowItWorks className="border-y bg-muted/30" />
        <Calculator />
        <Family className="border-y bg-muted/30" />
        <Academy />
        <Pricing />
        <LaunchList className="border-y bg-muted/30" />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
