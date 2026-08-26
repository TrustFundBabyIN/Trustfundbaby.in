"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";


const details = [
  ["Entry", "₹5,00,000 minimum lump sum"],
  ["Withdrawal frequency", "Monthly or quarterly"],
  ["Withdrawal amount", "Set at setup, changeable any time, no cap"],
  ["To open", "Free"],
  ["Whose PAN", "Account holder's own"],
  ["Portfolio", "Conservative / Balanced / Growth"],
  ["Can convert to Deed", "Yes — remaining corpus transfers to a trust folio"],
];

export default function HarvestPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="font-mono text-xs tracking-[0.2em] text-blue/50 uppercase mb-4">TFB Harvest</div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-blue mb-6">
                Put a lump sum to work once.
              </h1>
              <p className="text-xl text-[#4A4A48] max-w-2xl mx-auto mb-8">
                Draw a monthly income from it for as long as it lasts.
                No lock-in. Change the withdrawal whenever you like.
              </p>
              <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
                Start a Harvest →
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

        {/* Guardrail */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="bg-sage/30 border-l-4 border-blue p-6 rounded-sm">
                <h3 className="font-display text-xl font-semibold text-blue mb-3">The one guardrail</h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  Your withdrawal amount is shown as a percentage of the initial corpus:
                  &quot;You are withdrawing 1.4% of your corpus each month — 16.8% a year.&quot;
                  No forward projection accompanies it, ever.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-6 bg-white border border-blue/10 p-6 rounded-sm">
                <h3 className="font-display text-xl font-semibold text-blue mb-3">ITR filing</h3>
                <p className="text-[#4A4A48] leading-relaxed">
                  Every SWP withdrawal is a redemption. Harvest customers very likely need annual ITR filing.
                  TFB can assist with this.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Make your money pay you monthly.
            </h2>
            <p className="text-[#A9BDD2] mb-8">₹5,00,000 minimum. One time.</p>
            <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
              Start a Harvest →
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
