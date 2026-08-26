"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Lock,
  BookOpen,
  TrendingUp,
  Shield,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";

const years = [
  { year: 1, age: 13, theme: "Money Basics", icon: BookOpen },
  { year: 2, age: 14, theme: "How Markets Work", icon: TrendingUp },
  { year: 3, age: 15, theme: "Risk & Reward", icon: Shield },
  { year: 4, age: 16, theme: "Personal Finance", icon: Shield },
  { year: 5, age: 17, theme: "Taxes & Law in India", icon: BookOpen },
  { year: 6, age: 18, theme: "Investing as an Adult", icon: TrendingUp },
  { year: 7, age: 19, theme: "Advanced Topics", icon: GraduationCap },
  { year: 8, age: 20, theme: "Wealth Management", icon: Sparkles },
  { year: 9, age: 21, theme: "Life After the Trust", icon: Sparkles },
];

const moduleNamesByYear: Record<number, string[]> = {
  1: ["What is Money?", "Barter & Trade", "History of Currency", "How Banks Work", "Saving vs Spending", "Needs vs Wants", "Your First Budget", "The Power of Compounding", "Digital Money & UPI", "Inflation: Why Money Shrinks", "Setting Financial Goals", "Year 1 Review & Quiz"],
  2: ["Supply & Demand", "What is a Stock?", "What is a Bond?", "Stock Exchanges in India", "IPOs Explained", "Index Funds & ETFs", "How News Moves Markets", "Bull vs Bear Markets", "Reading a Stock Chart", "Market Capitalization", "Dividends & Buybacks", "Year 2 Review & Quiz"],
  3: ["What is Risk?", "Risk & Return Relationship", "Diversification 101", "Mutual Funds Deep Dive", "SIP Strategy", "Volatility & Fear", "Insurance Basics", "Emergency Funds", "Avoiding Scams", "Cryptocurrency Risks", "Behavioral Finance", "Year 3 Review & Quiz"],
  4: ["Your First Bank Account", "Debit vs Credit Cards", "Good Debt vs Bad Debt", "Credit Scores", "Creating a Budget Template", "Tracking Expenses", "Setting Up Auto-Save", "Financial Apps Review", "Part-time Income", "Goal-Based Investing", "Net Worth Calculation", "Year 4 Review & Quiz"],
  5: ["What is Income Tax?", "Tax Slabs Explained", "GST Basics", "TDS & TCS", "Tax Deductions for Young Adults", "Filing Your First ITR", "Capital Gains Tax", "Tax on Inheritance & Gifts", "PAN & Aadhaar Link", "Contracts & Legal Basics", "Your Rights as a Consumer", "Year 5 Review & Quiz"],
  6: ["Opening a Demat Account", "Building Your Portfolio", "Value vs Growth Investing", "Dollar-Cost Averaging", "Real Estate Investing", "Gold & Commodities", "Fixed Deposits & PPF", "National Pension System", "Investing in Startups", "International Investing", "Portfolio Rebalancing", "Year 6 Review & Quiz"],
  7: ["Options & Futures Basics", "Leverage & Margin", "Reading Financial Statements", "Ratio Analysis", "Macroeconomics for Investors", "Currency Exchange Rates", "The RBI & Monetary Policy", "Global Markets & India", "ESG Investing", "Algorithmic Trading Intro", "Wealth Management Basics", "Year 7 Review & Quiz"],
  8: ["Trusts & Estate Planning", "Philanthropy & Giving", "Business Finance Basics", "Angel Investing", "Real Estate Portfolios", "Tax Optimization Strategies", "Risk-Adjusted Returns", "Inflation-Protected Investing", "Family Wealth Preservation", "Impact Investing", "Wealth Transfer Planning", "Year 8 Review & Quiz"],
  9: ["Receiving Your Trust", "First Financial Decisions", "Investing Lump Sums", "Buying vs Renting", "Starting a Business", "Career Investments", "Marriage & Joint Finances", "Teaching Kids About Money", "Creating Your Own Trust", "Legacy & Purpose", "Financial Independence", "Final Review & Graduation"],
};

export default function EducationPage() {
  const [expandedYear, setExpandedYear] = useState<number | null>(1);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">
              TFB Academy — 108 Free Modules
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Financial Literacy for the
              <br />
              <span className="text-gold">Next Generation</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              108 interactive modules across 9 years. Video lessons, labs, and quizzes.
              From &ldquo;What is Money?&rdquo; at 13 to &ldquo;Wealth Management&rdquo; at 21.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4-Step Flow */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🎬", step: "1", label: "Watch", desc: "Video lesson" },
              { icon: "📖", step: "2", label: "Learn", desc: "Read curriculum" },
              { icon: "🧪", step: "3", label: "Lab", desc: "Interactive activity" },
              { icon: "✅", step: "4", label: "Quiz", desc: "5 questions to unlock next" },
            ].map(({ icon, step, label, desc }) => (
              <div key={step} className="text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-ink font-semibold text-sm">Step {step}: {label}</p>
                <p className="text-stone text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Year Grid */}
      <section className="py-20 bg-cloud">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-4">
                9-Year Curriculum
              </h2>
              <p className="text-stone text-lg">
                108 modules across 9 years. All unlocked — start anywhere.
              </p>
            </div>
          </ScrollReveal>

          {years.map(({ year, age, theme, icon: Icon }, i) => {
            const isUnlocked = true;
            const isExpanded = expandedYear === year;
            const modules = moduleNamesByYear[year] || [];

            return (
              <ScrollReveal key={year} delay={i * 50}>
                <div className={`mb-6 rounded-2xl border transition-all ${
                  isUnlocked
                    ? "bg-white border-gold/30 shadow-md"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}>
                  {/* Year Header */}
                  <button
                    onClick={() => setExpandedYear(isExpanded ? null : year)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isUnlocked ? "bg-gold/10 text-gold" : "bg-gray-100 text-stone/40"
                      }`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-ink font-semibold">
                          Year {year} · Age {age}
                        </p>
                        <p className="text-stone text-sm">{theme}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isUnlocked ? (
                        <span className="px-3 py-1 bg-green/10 text-green text-xs font-semibold rounded-full">
                          Unlocked
                        </span>
                      ) : (
                        <>
                          <Lock size={14} className="text-stone/40" />
                          <span className="text-stone text-xs">Complete Year {year - 1} to unlock</span>
                        </>
                      )}
                      <ChevronDown
                        size={20}
                        className={`text-stone/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Module Grid */}
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {modules.map((title, idx) => {
                          const modNum = idx + 1;
                          return (
                            <Link
                              key={modNum}
                              href={isUnlocked
                                ? `/education/module/${year}/${modNum}`
                                : "#"
                              }
                              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                                isUnlocked
                                  ? "bg-gold/5 border-gold/20 hover:bg-gold/10 hover:shadow-sm cursor-pointer"
                                  : "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
                              }`}
                              onClick={(e) => {
                                if (!isUnlocked) e.preventDefault();
                              }}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isUnlocked
                                  ? "bg-gold text-white"
                                  : "bg-gray-200 text-stone/40"
                              }`}>
                                {isUnlocked ? (
                                  <Check size={12} />
                                ) : (
                                  <Lock size={10} />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className={`text-sm font-medium truncate ${
                                  isUnlocked ? "text-ink" : "text-stone/40"
                                }`}>
                                  {modNum}. {title}
                                </p>
                                <p className="text-stone text-xs">
                                  {isUnlocked ? "Watch · Learn · Lab · Quiz" : "Locked"}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              Unlock 108 modules for your child
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Every child with a Trust Fund Baby account gets free access to the full curriculum from age 13.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-semibold text-lg rounded-xl hover:bg-green-light transition-all shadow-lg shadow-green/20"
            >
              Start Their Trust Fund — Free
              <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
