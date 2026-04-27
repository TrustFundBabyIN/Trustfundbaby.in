import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowRight, Shield, Heart, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Trust Fund Baby",
  description: "We started Trust Fund Baby because we believe every Indian child deserves a financial head start. Not a piggy bank. A real, irrevocable trust fund.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Every Child Deserves a
              <br />
              <span className="text-gold">Financial Head Start</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We started Trust Fund Baby because we were tired of saying
              &ldquo;I&apos;ll do it later.&rdquo; So we built the tool we wished existed.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              <h2 className="font-serif text-3xl text-ink mb-6">Our Story</h2>
              <p className="text-stone leading-relaxed mb-6">
                Like most Indian parents, we wanted to &ldquo;do something&rdquo; for our kids&apos; future.
                Open a savings account. Start a SIP. Set aside money that couldn&apos;t be touched.
              </p>
              <p className="text-stone leading-relaxed mb-6">
                But every option felt half-baked. Savings accounts get raided.
                FDs in a child&apos;s name are really the parent&apos;s money.
                Mutual funds in a minor&apos;s name? The parent operates them — and can withdraw anytime.
              </p>
              <p className="text-stone leading-relaxed mb-6">
                The only real solution was an irrevocable trust — a legal structure where the money
                is truly ring-fenced for the child. But creating one required a lawyer (₹40,000+),
                months of paperwork, and navigating PAN applications most CAs had never done.
              </p>
              <p className="text-stone leading-relaxed mb-6">
                So we asked: <strong>What if we made it as easy as ordering groceries online?</strong>
              </p>
              <p className="text-stone leading-relaxed font-semibold text-ink">
                Trust Fund Baby was born. 10 minutes. Free to start. Legally irrevocable.
                The only platform in India that lets you create a real trust fund for your child — instantly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-4">
                What We Believe
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Protection Over Returns",
                desc: "Returns matter. But what matters more is that the money is actually there when your child turns 21. We optimize for protection first.",
              },
              {
                icon: Heart,
                title: "Built for Indian Families",
                desc: "Every feature — from well-wisher gifting to Aadhaar eKYC — is designed for how Indian families actually work. Not a copy-paste from Silicon Valley.",
              },
              {
                icon: Target,
                title: "Simplicity is the Product",
                desc: "If a parent can't set it up during their baby's nap time, we haven't done our job. Every interaction is designed to be 10 minutes or less.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                  <div className="w-14 h-14 rounded-xl bg-navy/10 text-navy flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3">{title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              Ready to start?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              10 minutes. ₹0 to start. Protected for 21 years.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-semibold text-lg rounded-xl hover:bg-green-light transition-all shadow-lg shadow-green/20"
            >
              Start Their Trust Fund
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
