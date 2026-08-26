"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { YearLedger } from "@/components/YearLedger";
import { reveal, stagger, onceInView } from "@/lib/motion";
import { useState, useEffect, useRef } from "react";

/* ── Irrevocability typed animation ── */
function IrrevocableTyping() {
  const WORD = "IRREVOCABLE";
  const [text, setText] = useState(WORD);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const typeLoop = () => {
            const step = () => {
              i++;
              setText(WORD.slice(0, i));
              if (i < WORD.length) {
                setTimeout(step, i > WORD.length - 4 ? 260 : 110);
              } else {
                setTimeout(
                  () => {
                    i = 0;
                    setText("");
                    setTimeout(typeLoop, 900);
                  },
                  4200,
                );
              }
            };
            setText("");
            step();
          };
          typeLoop();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="irrev">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A8A8A] mb-4">
        Step 7 of 10 · confirmation
      </div>
      <p className="text-[15px] leading-[1.65] text-[#2A2A28] mb-[22px]">
        You are about to create an irrevocable trust for{" "}
        <b className="font-semibold">Aarav</b>. This cannot be reversed by you,
        by the trustee, or by Trust Fund Baby. To continue, type the word below.
      </p>
      <div className="border-[1.5px] border-blue rounded-[2px] px-4 py-3.5 font-mono text-[15px] tracking-[0.28em] text-blue flex items-center gap-0.5 bg-paper">
        <span>{text}</span>
        <i className="w-[9px] h-[19px] bg-blue inline-block animate-blink" />
      </div>
      <p className="font-mono text-[10.5px] text-[#9A9A9A] mt-3.5 tracking-[0.06em]">
        This screen has no colour, no logo and no reassurance on purpose.
      </p>
    </div>
  );
}

/* ── Product SVG Glyphs ── */
function SeedGlyph() {
  return (
    <svg
      className="h-[60px] mb-[22px]"
      viewBox="0 0 60 52"
      fill="none"
      aria-hidden="true"
    >
      <line x1="4" y1="46" x2="56" y2="46" stroke="#D8D4C8" strokeWidth="1.4" />
      <path d="M30 46V34" stroke="#1B3A63" strokeWidth="2.4" />
      <ellipse
        cx="30"
        cy="26"
        rx="9"
        ry="12"
        fill="#BFE0C4"
        stroke="#1B3A63"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function HarvestGlyph() {
  return (
    <svg
      className="h-[60px] mb-[22px]"
      viewBox="0 0 60 52"
      fill="none"
      aria-hidden="true"
    >
      <line x1="4" y1="46" x2="56" y2="46" stroke="#D8D4C8" strokeWidth="1.4" />
      <path d="M30 46V22" stroke="#1B3A63" strokeWidth="2.4" />
      <circle cx="30" cy="16" r="12" fill="#BFE0C4" stroke="#1B3A63" strokeWidth="2.4" />
      <circle cx="22" cy="30" r="3.2" fill="#EC9A1E" />
      <circle cx="38" cy="33" r="3.2" fill="#EC9A1E" />
      <circle cx="30" cy="27" r="3.2" fill="#EC9A1E" />
    </svg>
  );
}

function DeedGlyph() {
  return (
    <svg
      className="h-[60px] mb-[22px]"
      viewBox="0 0 60 52"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="14"
        y="6"
        width="32"
        height="40"
        rx="1.5"
        fill="#DDE3DA"
        stroke="#1B3A63"
        strokeWidth="2.2"
      />
      <path
        d="M22 20h16M22 27h16M22 34h9"
        stroke="#1B3A63"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="41" cy="39" r="6" fill="#EC9A1E" />
    </svg>
  );
}

/* ── FAQ Item ── */
function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-6 py-6 text-left font-display text-[clamp(17px,1.9vw,21px)] text-blue hover:text-marigold transition-colors"
      >
        {question}
        <span className="relative w-[15px] h-[15px] flex-shrink-0">
          <span
            className={`absolute left-0 right-0 top-[7px] h-[1.5px] bg-blue transition-transform`}
          />
          <span
            className={`absolute top-0 bottom-0 left-[7px] w-[1.5px] bg-blue transition-transform ${open ? "rotate-90" : ""}`}
          />
        </span>
      </button>
      {open && (
        <div className="pb-[26px] max-w-[74ch] text-[15.2px] text-[#4A4A45] leading-[1.68]">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <header className="relative overflow-hidden pt-[clamp(56px,8vw,104px)] pb-[clamp(48px,6vw,80px)]">
        {/* Canopy wash */}
        <Image
          src="/logos/tfb-shield-plant.png"
          alt=""
          width={560}
          height={560}
          className="absolute top-[-22%] right-[-16%] w-[min(560px,46vw)] opacity-[0.035] pointer-events-none select-none"
        />

        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)] grid grid-cols-1 lg:grid-cols-[1.02fr_.98fr] gap-[clamp(36px,5vw,76px)] items-center">
          <div>
            <ScrollReveal>
              <div className="deed-rule">
                <span>TFB EduVest LLP · ARN-368678</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={50}>
              <h1 className="text-[clamp(38px,6.4vw,74px)] mb-[22px]">
                Start small.
                <span className="text-[#5B7699] block">Set them up for life.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-[clamp(16px,1.45vw,19px)] leading-[1.65] text-[#44443F] max-w-[56ch] mb-[30px]">
                A legally irrevocable trust for your child, or a flexible monthly
                investment tagged to their name. The whole family can contribute —
                and their names stay on it until the day the corpus is theirs.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="flex flex-wrap gap-3.5 mb-[34px]">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2.5 px-7 py-[15px] bg-marigold text-blue font-semibold text-[15px] rounded-[2px] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgba(236,154,30,0.75)] transition-all"
                >
                  Explore the three products{" "}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-2.5 px-7 py-[15px] border-[1.5px] border-blue text-blue font-semibold text-[15px] rounded-[2px] hover:bg-blue hover:text-paper hover:-translate-y-0.5 transition-all"
                >
                  See the Academy
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-wrap gap-[38px] border-t border-line pt-5">
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    ₹1,000
                  </b>
                  a month to begin
                </div>
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    18 / 21 / 25
                  </b>
                  you choose the age, once
                </div>
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    108
                  </b>
                  free lessons from age 13
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Year Ledger */}
          <ScrollReveal delay={100}>
            <YearLedger />
          </ScrollReveal>
        </div>
      </header>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)]">
          <ScrollReveal>
            <div className="max-w-[62ch] mb-[clamp(34px,4vw,54px)]">
              <div className="deed-rule">
                <span>Three products</span>
              </div>
              <h2 className="text-[clamp(28px,4.2vw,46px)] leading-[1.14] mb-4">
                One of these fits where you are right now.
              </h2>
              <p className="text-[clamp(16px,1.45vw,19px)] leading-[1.65] text-[#44443F] max-w-[56ch]">
                Two are fully reversible. One is not, on purpose. The difference
                is the whole decision, so we lead with it rather than burying it.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-[22px]"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={onceInView}
          >
            {/* Seed */}
            <motion.article
              variants={reveal}
              className="relative flex flex-direction-col p-8 pb-7 border border-line rounded-[3px] bg-white overflow-hidden group hover:-translate-y-[5px] hover:shadow-[0_26px_54px_-30px_rgba(27,58,99,0.34)] hover:border-[#D6D2C6] transition-all duration-[280ms] before:absolute before:inset-0 before:bottom-auto before:h-[3px] before:bg-growth before:scale-x-0 before:origin-left before:transition-transform before:duration-[420ms] hover:before:scale-x-100"
            >
              <SeedGlyph />
              <h3 className="text-[clamp(19px,2.2vw,25px)] mb-1.5">TFB Seed</h3>
              <span className="font-mono text-[12px] tracking-[0.1em] text-marigold mb-4 block">
                FROM ₹1,000 / MONTH · FREE TO OPEN
              </span>
              <p className="text-[14.6px] text-[#4E4E48] mb-5 min-h-[4.6em]">
                Small monthly contributions into your child&apos;s future, on your PAN
                or theirs. Stop, pause or withdraw whenever you like.
              </p>
              <ul className="list-none p-0 m-0 mb-6 border-t border-line-soft">
                {[
                  ["Whose PAN", "YOURS OR THEIRS"],
                  ["Reversible", "YES, FULLY"],
                  ["Family can contribute", "YES"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex justify-between gap-3.5 py-[9px] border-b border-line-soft text-[13.2px]"
                  >
                    <span className="text-muted">{k}</span>
                    <span className="font-mono text-[11.5px] text-blue text-right">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/seed"
                className="mt-auto font-mono text-[11.5px] tracking-[0.14em] uppercase text-blue inline-flex gap-2 items-center group-hover:translate-x-1 transition-transform"
              >
                Read about Seed <span>→</span>
              </Link>
            </motion.article>

            {/* Harvest */}
            <motion.article
              variants={reveal}
              className="relative flex flex-direction-col p-8 pb-7 border border-line rounded-[3px] bg-white overflow-hidden group hover:-translate-y-[5px] hover:shadow-[0_26px_54px_-30px_rgba(27,58,99,0.34)] hover:border-[#D6D2C6] transition-all duration-[280ms] before:absolute before:inset-0 before:bottom-auto before:h-[3px] before:bg-sage before:scale-x-0 before:origin-left before:transition-transform before:duration-[420ms] hover:before:scale-x-100"
            >
              <HarvestGlyph />
              <h3 className="text-[clamp(19px,2.2vw,25px)] mb-1.5">
                TFB Harvest
              </h3>
              <span className="font-mono text-[12px] tracking-[0.1em] text-marigold mb-4 block">
                FROM ₹5,00,000 ONCE · FREE TO OPEN
              </span>
              <p className="text-[14.6px] text-[#4E4E48] mb-5 min-h-[4.6em]">
                Put a lump sum to work once, then draw a monthly income from it
                for as long as it lasts. No cap, no tenure, change it whenever.
              </p>
              <ul className="list-none p-0 m-0 mb-6 border-t border-line-soft">
                {[
                  ["Whose PAN", "YOURS"],
                  ["Withdrawal", "YOU SET IT"],
                  ["Can become a Deed", "YES, LATER"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex justify-between gap-3.5 py-[9px] border-b border-line-soft text-[13.2px]"
                  >
                    <span className="text-muted">{k}</span>
                    <span className="font-mono text-[11.5px] text-blue text-right">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/harvest"
                className="mt-auto font-mono text-[11.5px] tracking-[0.14em] uppercase text-blue inline-flex gap-2 items-center group-hover:translate-x-1 transition-transform"
              >
                Read about Harvest <span>→</span>
              </Link>
            </motion.article>

            {/* Deed */}
            <motion.article
              variants={reveal}
              className="relative flex flex-direction-col p-8 pb-7 border border-line rounded-[3px] bg-white overflow-hidden group hover:-translate-y-[5px] hover:shadow-[0_26px_54px_-30px_rgba(27,58,99,0.34)] hover:border-[#D6D2C6] transition-all duration-[280ms] before:absolute before:inset-0 before:bottom-auto before:h-[3px] before:bg-marigold before:scale-x-0 before:origin-left before:transition-transform before:duration-[420ms] hover:before:scale-x-100"
            >
              <DeedGlyph />
              <h3 className="text-[clamp(19px,2.2vw,25px)] mb-1.5">TFB Deed</h3>
              <span className="font-mono text-[12px] tracking-[0.1em] text-marigold mb-4 block">
                ₹20,000 ONCE · IRREVOCABLE
              </span>
              <p className="text-[14.6px] text-[#4E4E48] mb-5 min-h-[4.6em]">
                A real trust with its own PAN. You design how your child receives
                the money — then nobody can change it. Not you. Not us.
              </p>
              <ul className="list-none p-0 m-0 mb-6 border-t border-line-soft">
                {[
                  ["Whose PAN", "THE TRUST'S OWN"],
                  ["Reversible", "NO. THAT'S THE POINT"],
                  ["Payout plans", "FIVE TO CHOOSE FROM"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex justify-between gap-3.5 py-[9px] border-b border-line-soft text-[13.2px]"
                  >
                    <span className="text-muted">{k}</span>
                    <span className="font-mono text-[11.5px] text-blue text-right">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products/deed"
                className="mt-auto font-mono text-[11.5px] tracking-[0.14em] uppercase text-blue inline-flex gap-2 items-center group-hover:translate-x-1 transition-transform"
              >
                Read about Deed <span>→</span>
              </Link>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* ── IRREVOCABILITY TRUTH PANEL ── */}
      <section className="bg-blue text-paper py-[clamp(64px,8vw,110px)] relative overflow-hidden">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(34px,5vw,70px)] items-center">
          <div>
            <ScrollReveal>
              <div
                className="deed-rule"
                style={{ borderColor: "rgba(251,250,246,.4)" }}
              >
                <span>Clause 4 · Irrevocability</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={50}>
              <h2 className="text-paper text-[clamp(28px,4.2vw,46px)] leading-[1.14] mb-4">
                The hard part, before the good part.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-[clamp(16px,1.45vw,19px)] leading-[1.65] text-[#B9C9DA] max-w-[56ch] mb-8">
                Most products in this category tell you what you gain. An
                irrevocable trust is defined by what you give up, so that is what
                we put first.
              </p>
            </ScrollReveal>
            <ul className="list-none p-0 m-0">
              {[
                {
                  n: "01",
                  title: "The money stops being yours",
                  desc: "The day the deed is signed, the corpus belongs to a separate legal entity. Not to you, and not to us.",
                },
                {
                  n: "02",
                  title: "You cannot undo it",
                  desc: "No cooling-off, no emergency clause, no exception for a change of heart. If you might need the money, choose Seed instead — that is a real answer.",
                },
                {
                  n: "03",
                  title: "The payout plan is frozen at signing",
                  desc: "You choose how your child receives it once, in advance. That choice outlives your opinion of it.",
                },
              ].map((item) => (
                <ScrollReveal key={item.n}>
                  <li className="border-t border-white/[0.16] py-5 flex gap-5 last:border-b">
                    <span className="font-mono text-[11px] text-marigold tracking-[0.14em] pt-1 flex-shrink-0">
                      {item.n}
                    </span>
                    <div>
                      <b className="block font-display text-[18px] text-paper font-semibold mb-[5px]">
                        {item.title}
                      </b>
                      <p className="m-0 text-[14.4px] text-[#AEC0D3] leading-[1.62]">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          <ScrollReveal>
            <div>
              <IrrevocableTyping />
              <div className="mt-[18px] border border-white/[0.24] rounded-[3px] p-[22px] flex gap-[22px] items-center justify-between flex-wrap">
                <div>
                  <span className="block text-marigold tracking-[0.18em] font-mono text-[10.5px] mb-2">
                    NOT READY FOR THAT?
                  </span>
                  <p className="m-0 text-[14.2px] text-[#B9C9DA] leading-[1.6] max-w-[44ch]">
                    Then don&apos;t sign it. TFB Seed keeps every rupee reversible,
                    and you can convert to a Deed years later when you&apos;re
                    certain.
                  </p>
                </div>
                <Link
                  href="/products/seed"
                  className="inline-flex items-center gap-2.5 px-[22px] py-3 border-[1.5px] border-white/[0.35] text-paper font-semibold text-[14px] rounded-[2px] hover:bg-paper hover:text-blue hover:border-paper transition-all whitespace-nowrap"
                >
                  Look at Seed <span>→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTRIBUTOR WALL ── */}
      <section className="bg-growth py-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)] grid grid-cols-1 lg:grid-cols-[.95fr_1.05fr] gap-[clamp(34px,5vw,68px)] items-center">
          <ScrollReveal>
            <div className="bg-white rounded-[3px] overflow-hidden shadow-[0_30px_66px_-34px_rgba(27,58,99,0.42)] rotate-[-1.1deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-500">
              <div className="bg-blue px-[26px] pt-[22px] pb-[18px] text-center border-b-4 border-marigold">
                <Image
                  src="/logos/tfb-logo.png"
                  alt=""
                  width={34}
                  height={34}
                  className="mx-auto mb-3 brightness-0 invert"
                />
                <div className="font-mono text-[9.5px] tracking-[0.3em] text-marigold uppercase">
                  A contribution has been made for
                </div>
              </div>
              <div className="bg-growth px-[26px] py-[30px] pb-[26px] text-center">
                <div className="font-display text-[44px] text-blue leading-none mb-[26px]">
                  Aarav
                </div>
                <div className="flex gap-[22px] mb-[26px]">
                  <div className="flex-1">
                    <div className="font-display text-[15px] text-blue border-b border-[#8FA8BE] pb-1.5 mb-[7px]">
                      Nana &amp; Nani
                    </div>
                    <div className="font-mono text-[8.5px] tracking-[0.2em] text-[#5E7A64] uppercase">
                      Contributed by
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-[15px] text-blue border-b border-[#8FA8BE] pb-1.5 mb-[7px]">
                      13 March 2026
                    </div>
                    <div className="font-mono text-[8.5px] tracking-[0.2em] text-[#5E7A64] uppercase">
                      Planted on
                    </div>
                  </div>
                </div>
                <div className="font-display italic text-[14.5px] text-blue">
                  Because love also looks like long-term thinking.
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <div className="deed-rule">
                <span>The well-wisher rail</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={50}>
              <h2 className="text-[clamp(28px,4.2vw,46px)] leading-[1.14] mb-3.5">
                Stop gifting toys.
                <br />
                Gift a future.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-[clamp(16px,1.45vw,19px)] leading-[1.65] text-[#44443F] max-w-[56ch] mb-8">
                Anyone can contribute through a link — no account, no app, no
                login. Grandparents, an aunt, a family friend. They get a
                certificate. The child gets a contributor wall with their name on
                it, and it stays there for twenty years.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="flex flex-wrap gap-[38px] border-t border-blue/20 pt-5">
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    No account
                  </b>
                  needed to contribute
                </div>
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    Permanent
                  </b>
                  name on the wall
                </div>
                <div className="flex-1 min-w-[118px] font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted leading-[1.7]">
                  <b className="block font-display text-[19px] text-blue tracking-normal normal-case">
                    Every occasion
                  </b>
                  shagun, Diwali, birthdays
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── EDUCATION PREVIEW ── */}
      <section className="bg-sage py-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)]">
          <ScrollReveal>
            <div className="max-w-[62ch] mb-[clamp(34px,4vw,54px)]">
              <div className="deed-rule">
                <span>TFB Academy · included, always free</span>
              </div>
              <h2 className="text-[clamp(28px,4.2vw,46px)] leading-[1.14] mb-4">
                They don&apos;t just get money. They get the wisdom to keep it.
              </h2>
              <p className="text-[clamp(16px,1.45vw,19px)] leading-[1.65] text-[#44443F] max-w-[56ch]">
                108 modules across nine years. Watch, learn, do the lab, pass the
                quiz. From &quot;what is money&quot; at 13 to managing the corpus
                they&apos;re about to receive at 21.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-blue/[0.18]">
              {[
                {
                  step: "STEP 1 · WATCH",
                  title: "A short film",
                  desc: "One idea, explained plainly, in under six minutes.",
                },
                {
                  step: "STEP 2 · LEARN & LAB",
                  title: "Read, then do",
                  desc: "The written module, followed by an interactive lab that makes the idea concrete.",
                },
                {
                  step: "STEP 3 · QUIZ",
                  title: "Prove it",
                  desc: "Five questions. Pass, and the next module opens.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`py-[30px] pr-[26px] ${i > 0 ? "pl-[26px] border-l border-blue/[0.18]" : ""} ${i < 2 ? "border-r border-blue/[0.18] md:border-r-0" : ""}`}
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] text-marigold mb-3.5 block">
                    {item.step}
                  </span>
                  <h3 className="text-[20px] mb-2.5">{item.title}</h3>
                  <p className="text-[14.4px] text-[#4E4E48] m-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-[34px]">
              <Link
                href="/education"
                className="inline-flex items-center gap-2.5 px-7 py-[15px] border-[1.5px] border-blue text-blue font-semibold text-[15px] rounded-[2px] hover:bg-blue hover:text-paper hover:-translate-y-0.5 transition-all"
              >
                Open the Academy <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)]">
          <ScrollReveal>
            <div className="max-w-[62ch] mb-[clamp(34px,4vw,54px)]">
              <div className="deed-rule">
                <span>Creating a Deed</span>
              </div>
              <h2 className="text-[clamp(28px,4.2vw,46px)] leading-[1.14]">
                Ten steps, on the website, without a single phone call.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-line">
              {[
                {
                  n: "STEPS 1–3",
                  title: "Name and fund it",
                  desc: "Your child's name and date of birth, the vesting age, and where the money comes from — a new SIP, a lump sum, or an existing Seed or Harvest.",
                },
                {
                  n: "STEPS 4–7",
                  title: "Design the payout, then confirm",
                  desc: "Pick one of five payout plans and set the numbers. Read it back in plain English. Name your trustee. Then type IRREVOCABLE.",
                },
                {
                  n: "STEPS 8–10",
                  title: "Signed and stamped",
                  desc: "The deed is generated from your choices, e-stamped and e-signed. The trust PAN application goes out in parallel. Funding begins.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`py-[30px] pr-[26px] ${i > 0 ? "pl-[26px] border-l border-line" : ""}`}
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] text-marigold mb-3.5 block">
                    {item.n}
                  </span>
                  <h3 className="text-[20px] mb-2.5">{item.title}</h3>
                  <p className="text-[14.4px] text-[#4E4E48] m-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="pt-0 pb-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)]">
          <ScrollReveal>
            <div className="max-w-[62ch] mb-[clamp(34px,4vw,54px)]">
              <div className="deed-rule">
                <span>The plain answers</span>
              </div>
              <h2 className="text-[clamp(28px,4.2vw,46px)] leading-[1.14]">
                The questions parents actually ask.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-line">
              <FaqItem
                question="What if I need the money?"
                answer="Then a trust is not for you yet, and that is a real answer rather than a deflection. TFB Seed keeps everything flexible — stop it, pause it or withdraw whenever you want. Come back to the Deed when you are certain."
                defaultOpen
              />
              <FaqItem
                question="Why not just PPF or Sukanya?"
                answer="Both are good, and you should probably have them. They are also still yours — you can close a PPF. A trust is a separate legal entity: the money stops being yours the day the deed is signed. That is the only meaningful difference, and it is the whole point."
              />
              <FaqItem
                question="If it's free to start, how do you make money?"
                answer="Trail commission from the fund houses on Seed and Harvest, the one-time ₹20,000 fee on a Deed, and an ITR filing fee where a trust or an SWP makes annual filing necessary. We do not charge a management or advisory fee."
              />
              <FaqItem
                question="How much will it grow to?"
                answer="We don't project returns, and we'd gently suggest being wary of anyone who does. What we can tell you exactly is what you have contributed, who contributed it, and how many years remain. That is what the year ledger shows."
              />
              <FaqItem
                question="What happens if Trust Fund Baby shuts down?"
                answer="The trust is a legal entity independent of us, and the investments sit with the asset management companies and their registrars — not with us. If we disappeared tomorrow, the trust would still exist."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
