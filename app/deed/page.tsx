import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { DeedTool } from "@/components/keyword/deed-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/deed/" },
  title: "The Deed: what irrevocable means",
  description:
    "Play through how a Deed works: you plant with a Seed, you sign a private trust that nobody can undo, and your child harvests it at the age you choose.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="DEED" title={<>Once signed, <Mark>nobody can change it.</Mark></>}>
        <p>Not you, not the trustee, not us. Play it through in five steps: you plant, you write the rules, you sign, you try to undo it, your child harvests.</p>
      </KwHero>
      <DeedTool />
      <KwLaunch />
      <KwDisclaimer projections={true} />
    </KwPage>
  );
}
