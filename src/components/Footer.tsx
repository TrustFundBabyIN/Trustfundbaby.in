import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-mid text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/tfb-logo-512x512.png"
                alt="Trust Fund Baby"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-serif text-lg">Trust Fund Baby</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              India&apos;s first irrevocable trust fund platform for children.
              Start small. Set them up for life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/education", label: "Education" },
                { href: "/about", label: "About Us" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Disclaimer", "Grievance"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail size={16} /> hello@trustfundbaby.in
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone size={16} /> +91 98765 43210
              </li>
            </ul>
            </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-white/40 text-xs text-center mb-4">
            We are a technology platform. We do not provide financial advice. Consult a registered financial advisor for investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; 2026 TFB FinTech LLP. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
