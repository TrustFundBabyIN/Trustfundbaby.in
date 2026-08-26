"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";


const details = [
  ["Entry", "₹1,000/month minimum"],
  ["Frequency", "Monthly or quarterly"],
  ["To open", "Free"],
  ["Whose PAN", "Parent's own (default), or the child's — existing, or TFB applies at ₹500"],
  ["Reversible", "Yes, fully, any time"],
  ["Portfolio", "Conservative / Balanced / Growth"],
  ["Goal tagging", "Child's name plus a goal label"],
  ["Well-wisher link", "Yes — short code and contributor wall"],
  ["Can become a Deed", "Yes — existing corpus transfers, future SIP redirects to the trust PAN"],
];

export default function SeedPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="font-mono text-xs tracking-[0.2em] text-blue/50 uppercase mb-4">TFB Seed</div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-blue mb-6">
                Start ₹1,000 a month.
              </h1>
              <p className="text-xl text-[#4A4A48] max-w-2xl mx-auto mb-8">
                Small monthly contributions into your child&apos;s future, on your own PAN or theirs.
                Change your mind whenever you like.
              </p>
              <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
                Start a Seed →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Details Table */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-blue mb-8">The details</h2>
              <div className="border border-blue/10 rounded-sm overflow-hidden">
                {details.map(([label, value], i) => (
                  <div key={label} className={`flex flex-col sm:flex-row px-6 py-4 ${i % 2 === 0 ? "bg-paper" : "bg-white"}`}>
                    <span className="font-mono text-xs tracking-wider text-blue/60 uppercase sm:w-48 shrink-0 mb-1 sm:mb-0">{label}</span>
                    <span className="text-[#2A2A28]">{value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PAN Choice */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-blue mb-6">The PAN choice</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-blue/10 rounded-sm p-6">
                  <h3 className="font-display text-xl font-semibold text-blue mb-3">Your PAN</h3>
                  <p className="text-[#4A4A48] text-sm leading-relaxed">
                    The simplest path. You retain full control. The folio is in your name.
                    Same SIP, same portfolio, same features.
                  </p>
                </div>
                <div className="bg-white border border-green/30 rounded-sm p-6">
                  <h3 className="font-display text-xl font-semibold text-blue mb-3">Child&apos;s PAN</h3>
                  <p className="text-[#4A4A48] text-sm leading-relaxed">
                    The folio goes in the child&apos;s name. It becomes theirs at 18.
                    If they don&apos;t have a PAN yet, TFB applies at ₹500.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Start small. Set them up for life.
            </h2>
            <p className="text-[#A9BDD2] mb-8">₹1,000 a month. Change your mind whenever you like.</p>
            <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
              Start a Seed →
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
