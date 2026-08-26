import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FaqSection from "@/components/FaqSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Trust Fund Baby",
  description: "Honest answers to the questions every parent has about irrevocable trust funds for children in India.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Frequently Asked
              <br />
              <span className="text-gold">Questions</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Honest answers. No jargon. No hedging.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cloud">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <FaqSection />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 text-center bg-white rounded-2xl p-10 border border-gray-200">
              <h3 className="font-serif text-2xl text-ink mb-3">Still have questions?</h3>
              <p className="text-stone mb-6">
                We&apos;re happy to answer anything. No commitment required.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
