import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { SeedTool } from "@/components/keyword/seed-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/seed/" },
  title: "Seed calculator: ₹100 a day for your child",
  description:
    "See what ₹100 a day, or any monthly SIP, adds up to by the time your child turns 18, 21 or 25. A Seed is a SIP on your own PAN with your child's name as the label.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="SEED" title={<>What does <Mark>₹100 a day</Mark> become?</>}>
        <p>Slide it. What you put in is exact; the value at the end is an illustration at a rate you choose. A Seed is a SIP on your own PAN, from ₹100 a month.</p>
      </KwHero>
      <SeedTool />
      <KwLaunch />
      <KwDisclaimer projections={true} />
    </KwPage>
  );
}
