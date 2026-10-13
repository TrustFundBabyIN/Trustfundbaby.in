import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { CostTool } from "@/components/keyword/cost-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/cost/" },
  title: "What will it cost when your child grows up?",
  description:
    "Today's published costs of an IIT, private MBBS, IIM, a US master's and a wedding, grown at the inflation rate you choose, and the monthly SIP that could get you there.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="COST" title={<>What will it <Mark>cost</Mark> by then?</>}>
        <p>Today&apos;s real costs, with sources. Pick a goal, set your child&apos;s age, and see the price on the day you need it, and what it takes each month.</p>
      </KwHero>
      <CostTool />
      <KwLaunch />
      <KwDisclaimer projections={true} />
    </KwPage>
  );
}
