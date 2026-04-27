"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/education", label: "Education" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-mid/95 backdrop-blur-md shadow-lg"
          : "bg-navy-mid"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logos/tfb-logo-512x512.png"
              alt="Trust Fund Baby"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-serif text-xl text-white tracking-tight">
              Trust Fund Baby
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-green text-white font-semibold text-sm rounded-lg hover:bg-green-light transition-colors shadow-md"
            >
              Start Free
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-navy-mid border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 bg-green text-white font-semibold text-sm rounded-lg text-center mt-3"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
