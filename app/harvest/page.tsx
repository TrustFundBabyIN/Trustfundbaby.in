import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { HarvestTool } from "@/components/keyword/harvest-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/harvest/" },
  title: "Harvest calculator: a lump sum for your child",
  description:
    "See what a one-time amount from ₹21,000 could grow to for your child, with an optional monthly withdrawal plan later.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="HARVEST" title={<>One amount, <Mark>left to grow</Mark>.</>}>
        <p>A Harvest is a lump sum set aside for your child, from ₹21,000. Choose an amount and how long it stays invested; add a withdrawal plan if you like.</p>
      </KwHero>
      <HarvestTool />
      <KwLaunch />
      <KwDisclaimer projections={true} />
    </KwPage>
  );
}
