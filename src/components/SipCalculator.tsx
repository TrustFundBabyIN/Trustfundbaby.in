"use client";

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function formatCurrency(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function SipCalculator() {
  const [sip, setSip] = useState(5000);
  const [years, setYears] = useState(21);
  const [rate, setRate] = useState(12);

  const { corpus, invested, returns, ppfCorpus } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const corpus = sip * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = sip * n;
    const returns = corpus - invested;

    // PPF comparison
    const ppfR = 7.1 / 100 / 12;
    const ppfCorpus = sip * (((Math.pow(1 + ppfR, n) - 1) / ppfR) * (1 + ppfR));

    return { corpus, invested, returns, ppfCorpus };
  }, [sip, years, rate]);

  return (
    <section className="py-20 lg:py-28 bg-navy-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">
              Interactive Calculator
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              See Your Child&apos;s Future
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Drag the sliders to see how small monthly SIPs compound over time.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Sliders */}
          <ScrollReveal delay={100}>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/10 space-y-8">
              {/* SIP Amount */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-white/80 text-sm font-medium">Monthly SIP</label>
                  <span className="text-2xl font-bold text-gold font-sans">
                    ₹{sip.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={sip}
                  onChange={(e) => setSip(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>₹1,000</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-white/80 text-sm font-medium">Duration</label>
                  <span className="text-2xl font-bold text-gold font-sans">
                    {years} years
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={21}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>5 years</span>
                  <span>21 years</span>
                </div>
              </div>

              {/* Returns */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-white/80 text-sm font-medium">Expected Returns</label>
                  <span className="text-2xl font-bold text-gold font-sans">{rate}%</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={15}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>7%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Mini stat */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-white/50 text-sm">
                <TrendingUp size={16} className="text-green" />
                <span>
                  That&apos;s just <strong className="text-white">₹{Math.round(sip / 30).toLocaleString("en-IN")}</strong> per day
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Result Card */}
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {/* Main result */}
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl p-6 sm:p-8 border border-gold/20">
                <p className="text-white/60 text-sm mb-2">Your child receives at age 21</p>
                <p className="text-5xl sm:text-6xl font-bold text-gold font-sans mb-1">
                  {formatCurrency(corpus)}
                </p>
                <p className="text-white/40 text-sm">
                  ({formatCurrency(corpus / (years * 12) / sip)} growth multiple)
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Invested</p>
                  <p className="text-xl font-bold text-white font-sans">
                    {formatCurrency(invested)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Returns Earned</p>
                  <p className="text-xl font-bold text-green font-sans">
                    {formatCurrency(returns)}
                  </p>
                </div>
              </div>

              {/* PPF comparison */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
                  VS PPF (7.1% fixed)
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-sm">PPF would give</p>
                    <p className="text-lg font-bold text-white/60 font-sans">
                      {formatCurrency(ppfCorpus)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green text-sm font-semibold">Extra with TFB</p>
                    <p className="text-lg font-bold text-green font-sans">
                      +{formatCurrency(corpus - ppfCorpus)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-white/30 text-xs">
                *Based on historical equity MF returns. Not a guarantee. Past performance does not indicate future results.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
