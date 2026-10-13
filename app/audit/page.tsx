import type { Metadata } from "next";

import { KwDisclaimer, KwHero, KwLaunch, KwPage, Mark } from "@/components/keyword/kit";
import { AuditTool } from "@/components/keyword/audit-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/audit/" },
  title: "Whose-name audit: who really owns your child's money?",
  description:
    "Tick what you've set aside for your child and see whose money it is, who runs it, what happens at 18 and whether it can be spent first. Nothing is saved.",
};

export default function Page() {
  return (
    <KwPage>
      <KwHero keyword="AUDIT" title={<>Whose name is your child&apos;s money <Mark>really</Mark> in?</>}>
        <p>PPF, FD, Sukanya, gold, a fund in your name. Tick what you have; we&apos;ll show what happens to each one at 18. Takes a minute. Nothing is saved.</p>
      </KwHero>
      <AuditTool />
      <KwLaunch />
      <KwDisclaimer projections={false} />
    </KwPage>
  );
}
