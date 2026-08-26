import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Trust Fund Baby",
  description: "Free to start. No hidden charges. Choose the plan that works for your family — Free or Premium.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Simple, Transparent
              <br />
              <span className="text-gold">Pricing</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Free to start. No surprises. You pay for the platform — never for your child&apos;s money.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-cloud">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow h-full flex flex-col">
                <h3 className="font-serif text-2xl text-ink mb-2">Free Plan</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold text-ink font-sans">₹0</span>
                </div>
                <p className="text-stone text-sm mb-8">
                  For SIP investors ₹5K/month
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Mutual Fund investments only",
                    "ITR filing FREE",
                    "All education content FREE",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone">
                      <CheckCircle2 size={18} className="text-green flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-colors"
                >
                  Start Free Now
                </Link>
              </div>
            </ScrollReveal>

            {/* Premium Plan */}
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-2xl p-8 border-2 border-gold relative hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gold text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Most Complete
                </div>
                <h3 className="font-serif text-2xl text-ink mb-2">Premium Plan</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold text-ink font-sans">₹500</span>
                  <span className="text-stone text-sm">/month</span>
                </div>
                <p className="text-stone text-sm mb-8">
                  Stocks + FD + Mutual Funds
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Stocks + FD + Mutual Funds",
                    "ITR filing ₹2,000/year",
                    "All education content",
                    "Premium simulations",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone">
                      <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-light transition-colors"
                >
                  Go Premium
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
