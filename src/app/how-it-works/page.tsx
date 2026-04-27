import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — Trust Fund Baby",
  description: "Three simple steps to create an irrevocable trust fund for your child. 10 minutes to set up. Free to start. Protected for 21 years.",
};

const steps = [
  {
    step: "01",
    icon: "📋",
    title: "Create the Trust",
    desc: "Fill in your details, complete Aadhaar eKYC, upload your child's birth certificate. We auto-generate a legally valid irrevocable trust deed — no lawyer needed.",
    time: "⚡ 10 minutes · Fully automated",
    details: [
      "Sign up with phone number",
      "Complete Aadhaar eKYC verification",
      "Enter child's details + upload birth certificate",
      "AI generates legally valid irrevocable trust deed",
      "Review and digitally sign the deed",
    ],
  },
  {
    step: "02",
    icon: "🏛️",
    title: "We File Everything",
    desc: "We auto-apply for your Trust PAN card via Protean API, arrange e-stamp paper, get the deed signed digitally — all while you go back to caring for your baby.",
    time: "⏱ 7–15 working days for PAN",
    details: [
      "We order e-stamp paper on your behalf",
      "Auto-file Trust PAN application (Form 49A)",
      "Arrange digital signing via DigiSign",
      "Handle CKYC registration",
      "We track and update you at every step",
    ],
  },
  {
    step: "03",
    icon: "📈",
    title: "Watch It Grow",
    desc: "Start your SIP in any mutual fund. Invite grandparents and family to contribute freely. Your child gets their own dashboard at 13. The corpus is theirs at 21.",
    time: "🔒 Locked. Protected. Growing.",
    details: [
      "Choose any mutual fund scheme (any AMC)",
      "Set up monthly SIP auto-debit",
      "Share well-wisher link with family",
      "Child gets education dashboard at age 13",
      "Full corpus transferred at age 21",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Three Steps.
              <br />
              <span className="text-gold">Ten Minutes. Twenty-One Years.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Creating an irrevocable trust fund for your child has never been this simple.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {steps.map(({ step, icon, title, desc, time, details }, i) => (
            <ScrollReveal key={step}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left — icon + number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-navy/10 flex items-center justify-center text-4xl">
                      {icon}
                    </div>
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center font-sans">
                      {step}
                    </span>
                  </div>
                </div>

                {/* Right — content */}
                <div className="flex-grow">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-3">{title}</h2>
                  <p className="text-stone text-base leading-relaxed mb-4">{desc}</p>
                  <p className="text-green text-sm font-medium mb-6">{time}</p>
                  <ul className="space-y-2">
                    {details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-stone">
                        <CheckCircle2 size={16} className="text-green flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="border-b border-gray-100 mt-16" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cloud">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-4">
                Your Journey
              </h2>
              <p className="text-stone text-lg">From setup to your child&apos;s 21st birthday.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green via-navy to-gold" />
              <div className="space-y-12">
                {[
                  { time: "Day 1", label: "Sign up & create trust", color: "green" },
                  { time: "Week 2", label: "PAN card received", color: "navy" },
                  { time: "Week 3", label: "SIP activated", color: "navy" },
                  { time: "Age 13", label: "Child gets education dashboard", color: "navy" },
                  { time: "Age 21", label: "Full corpus transferred to your child 🎉", color: "gold" },
                ].map(({ time, label, color }) => (
                  <div key={time} className="flex items-center gap-6 pl-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        color === "green"
                          ? "bg-green"
                          : color === "gold"
                          ? "bg-gold"
                          : "bg-navy"
                      } text-white text-xs font-bold`}
                    />
                    <div>
                      <p className="text-stone text-sm font-medium">{time}</p>
                      <p className="text-ink font-semibold">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              It takes 10 minutes. Not 3 months.
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join the parents who stopped saying &ldquo;I&apos;ll do it later.&rdquo;
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
