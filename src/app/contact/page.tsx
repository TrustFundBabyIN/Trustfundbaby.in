"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-6">
              Start Your Child&apos;s
              <br />
              <span className="text-gold">Trust Fund</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Fill in your details and we&apos;ll get you started in 10 minutes. Free. No commitment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-cloud">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <ScrollReveal className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green" />
                    </div>
                    <h3 className="font-serif text-2xl text-ink mb-2">You&apos;re In! 🎉</h3>
                    <p className="text-stone">
                      We&apos;ll reach out within 24 hours to help you set up your child&apos;s trust fund.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-ink mb-6">
                      Let&apos;s get started
                    </h2>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Child&apos;s Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your child's name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Child&apos;s Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Message (optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Any questions or specific requirements?"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-sm resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-all shadow-md"
                      >
                        <Send size={16} />
                        Start Their Trust Fund
                      </button>
                      <p className="text-xs text-stone text-center">
                        By submitting, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={100} className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-serif text-lg text-ink mb-4">Get in Touch</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-stone text-sm">
                      <Mail size={18} className="text-navy" />
                      hello@trustfundbaby.in
                    </li>
                    <li className="flex items-center gap-3 text-stone text-sm">
                      <Phone size={18} className="text-navy" />
                      +91 98765 43210
                    </li>
                    <li className="flex items-start gap-3 text-stone text-sm">
                      <MapPin size={18} className="text-navy flex-shrink-0 mt-0.5" />
                      Mumbai, Maharashtra, India
                    </li>
                  </ul>
                </div>

                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h3 className="font-serif text-lg mb-3">What happens next?</h3>
                  <ul className="space-y-3 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">1.</span>
                      We call you within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">2.</span>
                      Walk you through the 10-min setup
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">3.</span>
                      Your child&apos;s trust fund is live in 7-15 days
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
