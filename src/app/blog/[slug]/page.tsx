import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Trust Fund Baby Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-gold bg-white/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-white/50 text-xs">
                <Clock size={12} /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-white/50 text-xs">
                <Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-white/60 text-lg">{post.excerpt}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-ink
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-stone prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-navy prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ink
              prose-table:text-sm
              prose-th:bg-navy/5 prose-th:text-ink prose-th:font-semibold prose-th:p-3
              prose-td:p-3 prose-td:border-gray-100
              prose-blockquote:border-gold prose-blockquote:bg-gold/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-lg
              prose-li:text-stone prose-li:mb-2
              prose-code:text-navy prose-code:bg-navy/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-navy to-navy-light rounded-2xl text-center">
            <h3 className="font-serif text-2xl text-white mb-3">
              Ready to start your child&apos;s trust fund?
            </h3>
            <p className="text-white/70 mb-6">
              It takes 10 minutes. No paperwork. No hidden fees.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-colors shadow-lg"
            >
              Start Free
            </Link>
          </div>
        </article>
      </section>

      <Footer />
    </>
  );
}
