"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const products = [
  { href: "/products/seed", label: "TFB Seed", desc: "₹1,000/mo SIP" },
  { href: "/products/harvest", label: "TFB Harvest", desc: "₹5L lump sum" },
  { href: "/products/deed", label: "TFB Deed", desc: "₹20,000 irrevocable" },
];

const navLinks = [
  { href: "/#how", label: "How it Works" },
  { href: "/education", label: "Education" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#faq", label: "Questions" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[60] transition-all duration-200 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-[14px] border-b border-line"
          : "bg-paper/82 backdrop-blur-[14px] border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1220px] items-center justify-between px-[clamp(20px,5vw,80px)] h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[11px]">
          <Image
            src="/logos/tfb-logo.png"
            alt="Trust Fund Baby"
            width={30}
            height={30}
          />
          <span className="font-display text-[18px] font-semibold text-blue">
            Trust Fund Baby
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-[30px]">
          {/* Products Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="text-[14.5px] text-[#4A4A45] relative py-1.5 hover:text-blue transition-colors flex items-center gap-1"
            >
              Products
              <svg
                className={`w-3 h-3 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-line rounded-[3px] shadow-lg py-2">
                {products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setProductsOpen(false)}
                    className="flex flex-col px-4 py-3 hover:bg-paper transition-colors"
                  >
                    <span className="text-[14px] font-semibold text-blue">
                      {p.label}
                    </span>
                    <span className="font-mono text-[11px] text-muted tracking-[0.06em]">
                      {p.desc}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14.5px] text-[#4A4A45] relative py-1.5 hover:text-blue transition-colors group"
            >
              {link.label}
              <span className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-marigold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="hidden sm:inline-flex items-center px-5 py-[11px] bg-marigold text-blue font-semibold text-[14px] rounded-[2px] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-10px_rgba(236,154,30,0.75)] transition-all"
          >
            Start at ₹1,000
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-blue p-2"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-paper border-t border-line">
          <div className="px-4 py-4 space-y-1">
            <div className="px-4 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-2">
                Products
              </p>
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-blue text-sm font-medium"
                >
                  {p.label}{" "}
                  <span className="text-muted font-mono text-[11px]">
                    — {p.desc}
                  </span>
                </Link>
              ))}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-[#4A4A45] hover:text-blue text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 bg-marigold text-blue font-semibold text-sm rounded-[2px] text-center mt-3"
            >
              Start at ₹1,000
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
