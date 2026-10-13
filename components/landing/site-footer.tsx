import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";

import { CookieSettingsLink } from "@/components/analytics";
import { Brand } from "@/components/brand";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Quick links",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Education", href: "#education" },
      { label: "About us", href: "/about" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Calculators",
    links: [
      { label: "Seed SIP calculator", href: "/seed/" },
      { label: "Harvest lump-sum calculator", href: "/harvest/" },
      { label: "Cost of your child's goals", href: "/cost/" },
      { label: "Shagun calculator", href: "/shagun/" },
      { label: "How a Deed works", href: "/deed/" },
      { label: "Whose-name audit", href: "/audit/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Grievance", href: "/grievance" },
    ],
  },
];

const disclosures = [
  "We are a technology platform. We do not provide financial advice. Consult a registered financial advisor for investment decisions.",
  "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.",
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Brand />
            <p className="max-w-xs text-sm text-muted-foreground">
              Investing for your child, from ₹100 a day.
              Start small. Set them up for life.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:sanchit@trustfundbaby.in"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  <MailIcon className="size-4" />
                  sanchit@trustfundbaby.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919819010129"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  <PhoneIcon className="size-4" />
                  +91 98190 10129
                </a>
              </li>
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className="text-sm font-medium">{column.title}</p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-6 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2">
            {disclosures.map((disclosure) => (
              <p key={disclosure}>{disclosure}</p>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="font-mono">ARN-368678</span> · Grievance
              officer: Sanchit Kedia ·{" "}
              <a
                href="mailto:sanchit@trustfundbaby.in"
                className="underline underline-offset-4 hover:text-foreground"
              >
                sanchit@trustfundbaby.in
              </a>
            </p>
            <p className="flex flex-wrap items-center gap-3">
              <CookieSettingsLink className="underline underline-offset-4 hover:text-foreground" />
              <span>© 2026 TFB EduVest LLP. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
