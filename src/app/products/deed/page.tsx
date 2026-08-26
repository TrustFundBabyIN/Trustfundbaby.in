"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";


const details = [
  ["Entry", "₹20,000 flat"],
  ["Setup flow", "Self-serve on the website. No RM call."],
  ["Covers", "Deed drafting, e-stamping, e-sign via Digio, trust PAN, physical folder"],
  ["Whose PAN", "The trust's own"],
  ["Vesting age", "18, 21 or 25 — chosen once, final"],
  ["Payout plan", "Chosen from five templates, customised, frozen at signing"],
  ["Reversible", "No. Not by the parent, not by the trustee, not by us"],
  ["Funding", "New SIP, new lump sum, or conversion from existing Seed or Harvest"],
  ["Academy", "Included"],
];

const templates = [
  { id: "PAYOUT.FULL", name: "Full release", desc: "Entire corpus transfers on vesting day", example: "On Aarav\'s 25th birthday, the full corpus transfers to his account" },
  { id: "PAYOUT.MONTHLY", name: "Monthly allowance", desc: "Fixed amount per month from vesting until exhausted", example: "₹15,000/month from age 25 — roughly 80 payments before the corpus runs out" },
  { id: "PAYOUT.CAP", name: "Annual cap", desc: "Up to X% of corpus per year, the rest stays invested", example: "Up to 25% per year from age 25. Minimum four years of access" },
  { id: "PAYOUT.GRAD", name: "Graduated", desc: "Access increases with each birthday", example: "20% at 25, 25% at 26, 30% at 27, everything left at 28" },
  { id: "PAYOUT.HYBRID", name: "Hybrid", desc: "Lump sum at vesting plus a structured remainder", example: "₹3,00,000 on her 25th birthday, then ₹10,000/month from what is left" },
];

export default function DeedPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="font-mono text-xs tracking-[0.2em] text-blue/50 uppercase mb-4">TFB Deed</div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-blue mb-6">
                Plant it. Lock it.<br />They harvest it their way.
              </h1>
              <p className="text-xl text-[#4A4A48] max-w-2xl mx-auto mb-8">
                A legally irrevocable trust. You design the plan — how much, when, at what age —
                and the deed locks it in. Nobody can change it after.
              </p>
              <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
                Design your Deed →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Irrevocability emphasis */}
        <section className="py-16 px-6 bg-blue">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase mb-4">This is the defining feature</p>
              <h2 className="font-display text-4xl font-bold text-white mb-4">Irrevocable.</h2>
              <p className="text-[#A9BDD2] text-lg max-w-xl mx-auto">
                Not by you. Not by the trustee. Not by us. The money stops being yours the day the deed is signed.
                That is not a bug — it is the entire point.
              </p>
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

        {/* Payout Templates */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-blue mb-3">The five payout templates</h2>
              <p className="text-[#4A4A48] mb-8">Every payout plan is different because every family is different.</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {templates.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.06}>
                  <div className="bg-white border border-blue/10 rounded-sm p-6 h-full">
                    <div className="font-mono text-[10px] tracking-wider text-blue/40 uppercase mb-2">{t.id}</div>
                    <h3 className="font-display text-lg font-semibold text-blue mb-2">{t.name}</h3>
                    <p className="text-sm text-[#4A4A48] mb-3">{t.desc}</p>
                    <p className="text-xs text-blue/50 italic font-mono">{t.example}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Nobody can touch it. That&apos;s the point.
            </h2>
            <p className="text-[#A9BDD2] mb-8">₹20,000 flat. Self-serve. No RM call.</p>
            <Link href="/signup" className="inline-block bg-marigold text-blue font-semibold px-8 py-4 rounded-sm hover:brightness-110 transition">
              Design your Deed →
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
