"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  { id: "seed", name: "TFB Seed", desc: "₹1,000/month SIP into your child's future", href: "/products/seed", color: "bg-green/20" },
  { id: "harvest", name: "TFB Harvest", desc: "₹5,00,000 lump sum, monthly income", href: "/products/harvest", color: "bg-sage" },
  { id: "deed", name: "TFB Deed", desc: "₹20,000 irrevocable trust", href: "/products/deed", color: "bg-blue/10" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [selected, setSelected] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-1 rounded-full transition-all ${s <= step ? "bg-marigold" : "bg-blue/10"}`} />
                <span className="font-mono text-[10px] text-blue/40 mt-1 block">
                  {s === 1 ? "Email" : s === 2 ? "PAN" : s === 3 ? "Product" : "Details"}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h1 className="font-display text-3xl font-bold text-blue mb-2">Let&apos;s get started.</h1>
                <p className="text-[#4A4A48] mb-8">Enter your email to begin.</p>
                <label className="block mb-6">
                  <span className="font-mono text-xs tracking-wider text-blue/60 uppercase mb-2 block">Email address</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full border border-blue/20 rounded-sm px-4 py-3 text-[#2A2A28] bg-white focus:outline-none focus:border-marigold transition" />
                </label>
                <button onClick={next} disabled={!email}
                  className="w-full bg-marigold text-blue font-semibold py-4 rounded-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue →
                </button>
              </motion.div>
            )}

            {/* Step 2: PAN */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h1 className="font-display text-3xl font-bold text-blue mb-2">PAN verification</h1>
                <p className="text-[#4A4A48] mb-8">Required by SEBI for mutual fund investments.</p>
                <label className="block mb-6">
                  <span className="font-mono text-xs tracking-wider text-blue/60 uppercase mb-2 block">PAN number</span>
                  <input type="text" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10}
                    className="w-full border border-blue/20 rounded-sm px-4 py-3 text-[#2A2A28] bg-white font-mono tracking-wider focus:outline-none focus:border-marigold transition" />
                </label>
                <div className="flex gap-3">
                  <button onClick={prev} className="flex-1 border border-blue/20 text-blue font-semibold py-4 rounded-sm hover:bg-blue/5 transition">Back</button>
                  <button onClick={next} disabled={pan.length !== 10}
                    className="flex-1 bg-marigold text-blue font-semibold py-4 rounded-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed">Continue →</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Choose Product */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h1 className="font-display text-3xl font-bold text-blue mb-2">Choose a product.</h1>
                <p className="text-[#4A4A48] mb-8">Each one serves a different need.</p>
                <div className="space-y-4 mb-8">
                  {products.map((p) => (
                    <button key={p.id} onClick={() => setSelected(p.id)}
                      className={`w-full text-left border rounded-sm p-5 transition ${selected === p.id ? "border-marigold bg-marigold/5" : "border-blue/10 bg-white hover:border-blue/30"}`}>
                      <h3 className="font-display text-lg font-semibold text-blue">{p.name}</h3>
                      <p className="text-sm text-[#4A4A48]">{p.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} className="flex-1 border border-blue/20 text-blue font-semibold py-4 rounded-sm hover:bg-blue/5 transition">Back</button>
                  <button onClick={next} disabled={!selected}
                    className="flex-1 bg-marigold text-blue font-semibold py-4 rounded-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed">Continue →</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B3A63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h1 className="font-display text-3xl font-bold text-blue mb-2">You&apos;re in.</h1>
                  <p className="text-[#4A4A48]">
                    We&apos;ll send a confirmation to <b>{email}</b>.
                    Your {selected === "seed" ? "Seed" : selected === "harvest" ? "Harvest" : "Deed"} is ready to set up.
                  </p>
                </div>
                <div className="bg-white border border-blue/10 rounded-sm p-6 mb-8">
                  <div className="font-mono text-xs tracking-wider text-blue/50 uppercase mb-3">Summary</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#4A4A48]">Email</span><span className="text-[#2A2A28] font-medium">{email}</span></div>
                    <div className="flex justify-between"><span className="text-[#4A4A48]">PAN</span><span className="text-[#2A2A28] font-mono">{pan}</span></div>
                    <div className="flex justify-between"><span className="text-[#4A4A48]">Product</span><span className="text-[#2A2A28] font-medium">{selected === "seed" ? "TFB Seed" : selected === "harvest" ? "TFB Harvest" : "TFB Deed"}</span></div>
                  </div>
                </div>
                <Link href="/" className="block w-full text-center bg-blue text-white font-semibold py-4 rounded-sm hover:bg-blue-deep transition">
                  Back to home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
