// Blog listing page — reads posts from src/content/blog/*.md via getAllPosts()
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Trust Fund Baby",
  description: "Financial literacy articles for parents building their child's future.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Blog
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Financial literacy for parents who want to build real wealth for their children.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-cloud">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/images/blog/what-is-money.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-stone text-xs">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-ink mb-3">{post.title}</h3>
                      <p className="text-stone text-sm leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center gap-1 text-navy text-sm font-medium">
                          Read More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
