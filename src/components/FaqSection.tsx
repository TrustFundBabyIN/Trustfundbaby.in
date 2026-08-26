"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: 'I can invest in my child\'s name directly.',
    a: 'A minor cannot legally own investments independently. Any account "in the child\'s name" is operated by the parent — who can withdraw it anytime for anything. An irrevocable trust is the ONLY structure that legally ring-fences money for the child. No parent, no creditor, no divorce can touch it.',
  },
  {
    q: "PPF and Sukanya are safer — government backed.",
    a: "PPF allows partial withdrawal from year 7 and has a 15-year lock-in. Sukanya only covers girls. PPF returns 7.1% fixed — equity MF over 21 years historically returns 12–14%. On ₹5,000/month over 21 years: PPF ≈ ₹28L. Equity MF ≈ ₹55–65L. Neither creates a legal trust.",
  },
  {
    q: "Why pay for something I can do myself?",
    a: "You technically can. But it requires: hiring a lawyer for Trust Deed (₹15,000–50,000), Trust PAN application, CKYC registration, annual ITR filing. Most parents who say 'I'll do it myself' are still saying it 3 years later. We do it in 10 minutes, automatically, free.",
  },
  {
    q: "What if Trust Fund Baby shuts down?",
    a: "The trust is not held by Trust Fund Baby. It is a separate legal entity. The investments are held directly with the AMC/broker/bank in the trust's name. If we shut down tomorrow, the trust exists. The money was never ours — it always belonged to your child.",
  },
  {
    q: "Can I withdraw for emergencies?",
    a: "Yes — for education and healthcare emergencies only, with CA/Trustee review and supporting documents. Educational withdrawals are capped at 25% of corpus; medical withdrawals at 50%. The remaining corpus continues compounding.",
  },
  {
    q: "What does my child get at 21?",
    a: "Full ownership of the entire corpus — the principal you invested plus all accumulated growth. The trust terminates and trustees transfer the entire fund to the child's bank account within 30 days of their 21st birthday. They also receive 6 years of financial literacy education (age 13–18).",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left group"
          >
            <span className="font-semibold text-ink text-sm sm:text-base pr-4 group-hover:text-navy transition-colors">
              {faq.q}
            </span>
            <ChevronDown
              size={20}
              className={`text-stone flex-shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              open === i ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-5 text-stone text-sm leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
