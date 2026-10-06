import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { getPost, posts } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:underline"
          >
            ← Blog
          </Link>

          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <time
            dateTime={post.date}
            className="mt-4 block font-mono text-xs text-muted-foreground"
          >
            {post.displayDate}
          </time>

          <div className="mt-12 flex flex-col gap-5 border-t pt-12 text-[0.98rem] leading-relaxed text-muted-foreground">
            {post.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <div className="mt-14 border-t pt-8 text-xs text-muted-foreground">
            <p>
              This article is general information, not investment or tax advice.
              Mutual fund investments are subject to market risks. Read all
              scheme-related documents carefully before investing. TFB EduVest
              LLP · ARN-368678 ·{" "}
              <Link href="/disclaimer" className="underline underline-offset-4">
                Full disclaimer
              </Link>
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
