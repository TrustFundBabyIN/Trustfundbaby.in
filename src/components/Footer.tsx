import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue text-[#A9BDD2] py-[70px] pb-[34px] text-[14px]">
      <div className="mx-auto max-w-[1220px] px-[clamp(20px,5vw,80px)]">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] gap-[38px] pb-10 border-b border-white/[0.15]">
          {/* Brand */}
          <div>
            <Image
              src="/logos/tfb-logo.png"
              alt="Trust Fund Baby"
              width={36}
              height={36}
              className="mb-4 brightness-0 invert"
            />
            <div className="inline-flex items-center gap-[9px] border border-white/[0.24] rounded-[2px] px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] text-white mb-[18px]">
              <i className="w-[5px] h-[5px] rounded-full bg-growth not-italic inline-block" />
              AMFI REGISTERED · ARN-368678
            </div>
            <p className="text-[13.6px] leading-[1.65] max-w-[32ch] text-[#9AB0C7]">
              Irrevocable trusts and tagged investments for Indian parents and
              their children. Start small. Set them up for life.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-mono text-[10.5px] tracking-[0.18em] uppercase font-normal mb-[18px]">
              Products
            </h4>
            <ul className="list-none p-0 m-0 space-y-[10px]">
              <li>
                <Link href="/products/seed" className="hover:text-marigold transition-colors">
                  TFB Seed
                </Link>
              </li>
              <li>
                <Link href="/products/harvest" className="hover:text-marigold transition-colors">
                  TFB Harvest
                </Link>
              </li>
              <li>
                <Link href="/products/deed" className="hover:text-marigold transition-colors">
                  TFB Deed
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-marigold transition-colors">
                  Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-mono text-[10.5px] tracking-[0.18em] uppercase font-normal mb-[18px]">
              Company
            </h4>
            <ul className="list-none p-0 m-0 space-y-[10px]">
              <li>
                <Link href="/about" className="hover:text-marigold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-marigold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-marigold transition-colors">
                  Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-marigold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-mono text-[10.5px] tracking-[0.18em] uppercase font-normal mb-[18px]">
              Legal
            </h4>
            <ul className="list-none p-0 m-0 space-y-[10px]">
              <li>
                <Link href="#" className="hover:text-marigold transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-marigold transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-marigold transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-marigold transition-colors">
                  Grievance redressal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Block */}
        <div className="pt-[26px] font-mono text-[10.5px] leading-[2] tracking-[0.04em] text-[#7E96B0]">
          <strong className="text-[#B9C9DA] font-normal">
            TFB EduVest LLP
          </strong>{" "}
          · 1901, Sahyadri Tower CHSL, Upper Govind Nagar, Opp. Poddar School,
          Malad (East), Mumbai 400097 · +91 98190 10129
          <br />
          AMFI-registered mutual fund distributor ·{" "}
          <strong className="text-[#B9C9DA] font-normal">ARN-368678</strong> ·
          valid 25 Aug 2026 to 24 Aug 2029
          <br />
          Mutual fund investments are subject to market risks. Read all scheme
          related documents carefully. We do not provide investment advice. Past
          performance is not indicative of future results. Trust structures
          created through this platform are irrevocable and cannot be reversed.
        </div>
      </div>
    </footer>
  );
}
