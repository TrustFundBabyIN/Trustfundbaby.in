import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { Section, SectionHeader } from "@/components/landing/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Trust Fund Baby is built by TFB EduVest LLP, an AMFI-registered mutual fund distributor (ARN-368678), so parents can start small for a child and make it permanent when they are ready.",
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Section>
          <SectionHeader
            eyebrow="About us"
            title="A parent's instinct, made practical"
            description="Almost every parent wants to put something aside for their child. Most of us never quite start — because it feels like it needs a big number, a right moment, or a CA."
          />

          <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p>
              Trust Fund Baby exists to remove that friction. You can begin with{" "}
              <strong>₹100 a month</strong>, in your own name, with your child's
              name riding along as a tag. Nothing is locked in. If life changes,
              you can pause, change the amount, or withdraw.
            </p>
            <p>
              When you are ready to make it permanent, that same account can
              become a legally irrevocable trust — a structure that cannot be
              undone, by you or by anyone else. That is the difference between
              money you have set aside and money that is genuinely your child's.
            </p>
            <p>
              Alongside the money, we built an education layer:{" "}
              <strong>108 lessons across nine years</strong>, with hands-on games
              that teach compounding, credit, risk and scams. The point is that a
              child who understands money is far harder to separate from it.
            </p>

            <h2 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-foreground">
              Who we are
            </h2>
            <p>
              Trust Fund Baby is operated by{" "}
              <strong>TFB EduVest LLP</strong>, an AMFI-registered mutual fund
              distributor holding <strong>ARN-368678</strong>. We earn trail
              commission from the asset management companies whose schemes you
              choose. We do not charge an advisory or management fee on your
              investments.
            </p>
            <p>
              We are a distributor, not an adviser. We do not tell you what to
              buy. We build the structure, do the paperwork, and stay out of the
              way of your decisions.
            </p>

            <h2 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-foreground">
              What we are building next
            </h2>
            <p>
              <strong>TFB Deed</strong> — the irrevocable trust — is not open for
              sign-up yet. The infrastructure it depends on is still being
              completed, and we would rather say so plainly than promise a date
              we cannot hold. You can join the list on the{" "}
              <Link href="/signup">sign-up page</Link> and we will write to you
              when it opens.
            </p>

            <div className="mt-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/signup">Join the list</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
