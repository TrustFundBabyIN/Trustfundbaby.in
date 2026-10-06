import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { Section, SectionHeader } from "@/components/landing/section";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language writing on investing for a child in India — SIPs, taxation, compounding, and the paperwork behind an irrevocable trust.",
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Section>
          <SectionHeader
            eyebrow="Blog"
            title="Money, explained"
            description="Plain-language writing on investing for a child in India. No jargon, no projections, no sales pitch — just how things actually work."
          />

          <div className="mx-auto mt-12 flex max-w-3xl flex-col divide-y">
            {sorted.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-2">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {post.displayDate}
                  </time>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                  <span className="mt-1 text-sm underline underline-offset-4">
                    Read
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
