"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Gift,
  CheckCircle2,
  Star,
  ArrowRight,
  Users,
  Sparkles,
  GraduationCap,
  Heart,
  Shield,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SipCalculator from "@/components/SipCalculator";
import FaqSection from "@/components/FaqSection";
import ScrollReveal from "@/components/ScrollReveal";

const year1Modules = [
  { num: 1, title: "What is Money?", status: "unlocked" },
  { num: 2, title: "Barter & Trade", status: "unlocked" },
  { num: 3, title: "History of Currency", status: "unlocked" },
  { num: 4, title: "How Banks Work", status: "unlocked" },
  { num: 5, title: "Saving vs Spending", status: "unlocked" },
  { num: 6, title: "Needs vs Wants", status: "unlocked" },
  { num: 7, title: "Your First Budget", status: "unlocked" },
  { num: 8, title: "The Power of Compounding", status: "unlocked" },
  { num: 9, title: "Digital Money & UPI", status: "unlocked" },
  { num: 10, title: "Inflation: Why Money Shrinks", status: "unlocked" },
  { num: 11, title: "Setting Financial Goals", status: "unlocked" },
  { num: 12, title: "Year 1 Review & Quiz", status: "unlocked" },
];

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            name: "Trust Fund Baby",
            description: "Irrevocable trust fund platform for children in India",
            provider: {
              "@type": "Organization",
              name: "TFB FinTech LLP",
              url: "https://trustfundbaby.in",
            },
          }),
        }}
      />
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-mid via-navy to-navy-light pt-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-green rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse-dot" />
                <span className="text-gold text-sm font-medium">
                  India&apos;s First Irrevocable Children&apos;s Trust Fund
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                Start Small.
                <br />
                <span className="text-gold">Set Them Up</span>
                <br />
                for Life.
              </h1>

              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-4 max-w-xl">
                A legally irrevocable trust fund — plus free financial education from age 13. Grandparents, aunts & uncles can all contribute.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xl">
                Start with ₹0. Every family member grows a corpus your child receives at 21 — ready for life, armed with money wisdom.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-green text-white font-semibold text-base rounded-lg hover:bg-green-light transition-all shadow-lg shadow-green/20 hover:shadow-green/40"
                >
                  Start Free
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-medium text-base rounded-lg hover:bg-white/5 transition-colors"
                >
                  How It Works
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <p className="text-3xl font-bold text-gold font-sans">₹0</p>
                  <p className="text-white/40 text-sm mt-1">To start</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold font-sans">21yr</p>
                  <p className="text-white/40 text-sm mt-1">Lock-in</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold font-sans">108</p>
                  <p className="text-white/40 text-sm mt-1">Free lessons</p>
                </div>
              </div>
            </div>

            {/* Right — Floating card */}
            <div className="relative hidden lg:flex justify-center">
              <div className="relative pl-8 pb-16 pr-16 pt-4">
                {/* Main floating card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl animate-fade-in">
                  <p className="text-white/50 text-sm mb-2">Projected at 12% CAGR</p>
                  <p className="text-5xl font-bold text-gold font-sans mb-1">₹63.2L</p>
                  <p className="text-white/40 text-sm mb-6">At age 21 · ₹5K/month</p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logos/tfb-logo-512x512.png"
                      alt="TFB"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">Trust Fund Baby</p>
                      <p className="text-white/40 text-xs">Irrevocable. Growing.</p>
                    </div>
                  </div>
                </div>

                {/* Small floating stat cards */}
                <div className="absolute top-4 -right-4 bg-green/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg z-10">
                  <p className="text-white text-xs font-medium">Growth</p>
                  <p className="text-white text-xl font-bold font-sans">12.6x</p>
                </div>
                <div className="absolute -bottom-4 -left-8 bg-white/10 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-white/10 z-10">
                  <p className="text-white/60 text-xs">Contributors</p>
                  <p className="text-white text-lg font-bold font-sans flex items-center gap-1">
                    <Users size={14} /> 4 family members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE HOOK: WELL-WISHER CONTRIBUTIONS ============ */}
      <section className="py-20 lg:py-28 bg-navy-mid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">
                <Heart size={14} className="inline mr-1" /> The TFB Difference
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                The Whole Family Builds Their Future
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Every birthday. Every festival. Every achievement. Family members contribute to the trust — and their name is etched in the child&apos;s financial story forever.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Gift Card Preview */}
            <ScrollReveal>
              <div className="relative mx-auto max-w-sm">
                <div className="bg-gradient-to-br from-gold/30 via-gold/10 to-green/10 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Gift size={16} className="text-gold" />
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                      Gift Certificate
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-white font-sans mb-2">₹10,000</p>
                  <p className="text-white/60 text-sm mb-6">
                    For Aarav&apos;s Trust Fund
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                  <p className="text-white/80 text-sm italic mb-2">
                    From: Nana & Nani
                  </p>
                  <p className="text-white/50 text-sm">With love, always 💛</p>
                  <p className="text-white/30 text-xs mt-4">Planted on 13 March 2026</p>
                  <div className="mt-6 bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/40 text-xs">
                      ✅ Their name will appear in Aarav&apos;s contributor wall forever
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Copy */}
            <ScrollReveal delay={100}>
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
                  Stop gifting toys.
                  <br />
                  <span className="text-gold">Gift a future.</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                  Anyone can contribute — no account needed. Grandparents, aunts, uncles, family friends. They get a beautiful digital gift certificate. The child sees their name forever.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { heading: "Digital Gift Certificates", desc: "Beautiful auto-generated certificates for every contribution" },
                    { heading: "Permanent Recognition", desc: "Contributor names live in the child's forever wall" },
                    { heading: "No Account Needed", desc: "Anyone with a link can contribute securely" },
                    { heading: "Every Occasion", desc: "Birthdays, Raksha Bandhan, Diwali, milestones" },
                  ].map(({ heading, desc }) => (
                    <li key={heading} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-semibold">{heading}</p>
                        <p className="text-white/50 text-sm">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Share Your Child&apos;s Trust Link
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ TRUST SIGNALS ============ */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-stone text-sm">
            {[
              { icon: Lock, text: "Irrevocable by design" },
              { icon: CheckCircle2, text: "No hidden fees" },
              { icon: Shield, text: "Bank-grade security" },
              { icon: GraduationCap, text: "108 free lessons" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={16} className="text-green" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDUCATION PREVIEW ============ */}
      <section className="py-20 lg:py-28 bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-sm font-semibold rounded-full mb-4">
                <GraduationCap size={14} className="inline mr-1" /> TFB Academy — Free
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ink mb-4 leading-tight">
                They Don&apos;t Just Get Money.<br className="hidden sm:block" />
                <span className="text-gold"> They Get Wisdom.</span>
              </h2>
              <p className="text-stone max-w-2xl mx-auto text-lg">
                108 modules across 9 years. Your child learns money the way school should have taught it — from basics at 13 to wealth management at 21.
              </p>
            </div>
          </ScrollReveal>

          {/* Year 1 Module Preview */}
          <ScrollReveal delay={100}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-12 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex-shrink-0">
                  <h3 className="font-serif text-lg sm:text-xl text-ink whitespace-nowrap">Year 1 · Money Basics</h3>
                  <p className="text-stone text-xs mt-0.5">All 12 modules · Age 13 · Preview free</p>
                </div>
                <Link href="/education" className="shrink-0 inline-flex items-center gap-1 px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors">
                  View All 108 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                {year1Modules.map(({ num, title }) => (
                  <Link
                    key={num}
                    href={`/education/module/1/${num}`}
                    className="bg-gold/5 rounded-xl p-3 border border-gold/10 text-center hover:bg-gold/10 transition-colors group block flex flex-col items-center justify-between min-h-[100px]"
                  >
                    <div className="w-7 h-7 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center mx-auto mb-1.5">
                      {num}
                    </div>
                    <p className="text-ink text-[10px] sm:text-xs font-medium group-hover:text-navy transition-colors leading-tight line-clamp-2 flex items-center justify-center flex-1">{title}</p>
                    <div className="w-full mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green rounded-full" style={{ width: "100%" }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4-Step Flow Preview */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "1", icon: "🎬", title: "Watch", desc: "Short video lessons that explain complex topics simply" },
                { step: "2", icon: "📖", title: "Learn", desc: "In-depth curriculum with key concepts highlighted" },
                { step: "3", icon: "🧪", title: "Lab", desc: "Interactive activities to practice what you learned" },
                { step: "4", icon: "✅", title: "Quiz", desc: "5 questions to prove mastery and unlock the next module" },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 text-center hover:shadow-md transition-shadow flex flex-col items-center justify-between min-h-[160px] sm:min-h-[180px]">
                  <div>
                    <p className="text-2xl sm:text-3xl mb-2 sm:mb-3">{icon}</p>
                    <h4 className="font-serif text-sm sm:text-lg text-ink mb-1.5 sm:mb-2">Step {step}: {title}</h4>
                  </div>
                  <p className="text-stone text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FREE PLAN ONLY ============ */}
      <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-green/20 text-green text-sm font-semibold rounded-full mb-4">
              One Plan. Everything Included.
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Free. No Premium.
              <br />
              <span className="text-gold">Nothing Hidden.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
              There&apos;s only one plan. Every feature. Every lesson. Every tool.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
                {[
                  { icon: Lock, title: "Trust Fund Creation", text: "Legally valid irrevocable trust deed — ₹0" },
                  { icon: Users, title: "Dashboard", text: "Track corpus, contributions, growth" },
                  { icon: GraduationCap, title: "108 Education Modules", text: "9-year financial literacy curriculum" },
                  { icon: Gift, title: "Well-Wisher Gifting", text: "Family gift certificates & contribution links" },
                  { icon: CheckCircle2, title: "ITR Filing", text: "Trust ITR handled annually — ₹0" },
                  { icon: Shield, title: "Bank-Grade Security", text: "Your data. Your trust. Protected." },
                  { icon: Sparkles, title: "Quiz & Progress Tracking", text: "Parent dashboard with analytics" },
                  { icon: BookOpen, title: "Interactive Labs", text: "108 hands-on activities — all included" },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <Icon size={20} className="text-green flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-semibold">{title}</p>
                      <p className="text-white/50 text-xs">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gold font-sans">₹0</span>
                  <span className="text-white/50 text-lg">forever</span>
                </div>
                <p className="text-white/40 text-sm mb-8">
                  Emergency withdrawal ITR: ₹5,000 (only if needed)
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-semibold text-lg rounded-xl hover:bg-green-light transition-all shadow-lg shadow-green/20 hover:shadow-green/40"
                >
                  Start Free Now
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-sm font-semibold rounded-full mb-4">
                Simple Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mb-4">
                How It Works
              </h2>
              <p className="text-stone max-w-2xl mx-auto text-lg">
                Three steps. Ten minutes. Twenty-one years of growth.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "📋",
                title: "Create the Trust",
                desc: "Fill in your details, complete Aadhaar eKYC, upload your child&apos;s birth certificate. We auto-generate a legally valid irrevocable trust deed — no lawyer needed.",
                time: "⚡ 10 minutes · Fully automated",
              },
              {
                step: "02",
                icon: "🏛️",
                title: "We File Everything",
                desc: "We auto-apply for your Trust PAN card via Protean API, arrange e-stamp paper, get the deed signed digitally — all while you go back to caring for your baby.",
                time: "⏱ 7–15 working days for PAN",
              },
              {
                step: "03",
                icon: "📈",
                title: "Watch It Grow",
                desc: "Start your SIP in any mutual fund. Invite grandparents and family to contribute freely. Your child gets their own dashboard at 13. The corpus is theirs at 21.",
                time: "🔒 Locked. Protected. Growing.",
              },
            ].map(({ step, icon, title, desc, time }) => (
              <ScrollReveal key={step} delay={parseInt(step) * 150}>
                <div className="relative bg-cloud rounded-2xl p-8 border border-gray-100 h-full group hover:border-navy/20 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-4xl">{icon}</span>
                    <span className="text-6xl font-bold text-navy/5 font-sans absolute top-4 right-6">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3">{title}</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">{desc}</p>
                  <p className="text-green text-sm font-medium">{time}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CALCULATOR ============ */}
      <SipCalculator />

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mb-4">
                What Parents Say
              </h2>
              <p className="text-stone max-w-2xl mx-auto text-lg">
                Trusted by families across India.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I'd been meaning to 'do something' for my daughter for 2 years. Trust Fund Baby made me stop saying I'll do it later. It was literally 10 minutes.",
                name: "Priya Nair",
                role: "Software Engineer · Bengaluru · 2 kids",
              },
              {
                quote:
                  "I asked my CA about this. He said they'd charge ₹40,000 and 3 months. Trust Fund Baby did it in 10 minutes for zero rupees. I've recommended it to 6 friends.",
                name: "Vikram Shah",
                role: "Business Owner · Mumbai · 1 child",
              },
              {
                quote:
                  "My son's dadi contributed ₹25,000 on his first birthday through the wellwisher link. She cried reading the gift certificate. This is what gifting should feel like.",
                name: "Meena Krishnamurthy",
                role: "Doctor · Chennai · New mother",
              },
            ].map(({ quote, name, role }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="bg-cloud rounded-2xl p-8 border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-stone text-sm leading-relaxed flex-grow italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-ink font-semibold text-sm">{name}</p>
                    <p className="text-stone text-xs mt-1">{role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 lg:py-28 bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-stone max-w-2xl mx-auto text-lg">
                Honest answers to the questions every parent has.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="max-w-4xl mx-auto">
              <FaqSection />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              The best time to start was the day they were born.{` `}
              <span className="text-gold">The second best time is today.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Free to start. 10 minutes. 108 education lessons. Legally protected for 21 years.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-semibold text-lg rounded-xl hover:bg-green-light transition-all shadow-lg shadow-green/20 hover:shadow-green/40"
            >
              Start Free Now
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
