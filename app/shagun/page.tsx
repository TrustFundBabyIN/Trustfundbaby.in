import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { ShagunTool } from "@/components/keyword/shagun-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/shagun/" },
  title: "Shagun: a toy, or ₹2,100 invested until 25?",
  description:
    "Compare a ₹1,500 or ₹2,100 toy with the same shagun invested until your child turns 25. An illustration at a rate you choose.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="SHAGUN" title={<>A toy, or <Mark>the same shagun</Mark>, invested?</>}>
        <p>Pick the shagun. Pick the age they get it. Then pick which gift you&apos;d rather give.</p>
      </KwHero>
      <ShagunTool />
      <KwLaunch />
      <KwDisclaimer projections={true} />
    </KwPage>
  );
}
