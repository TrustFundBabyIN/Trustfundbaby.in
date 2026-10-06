import {
  BadgeCheckIcon,
  CalendarClockIcon,
  ClipboardListIcon,
  FileSignatureIcon,
  HandCoinsIcon,
  LandmarkIcon,
  PauseIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SproutIcon,
  UsersIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

export type ProductSlug = "seed" | "harvest" | "deed";

export type Product = {
  slug: ProductSlug;
  icon: LucideIcon;
  name: string;
  emotion: string;
  who: string;
  tagline: string;
  description: string;
  entry: string;
  entryNote: string;
  highlights: { icon: LucideIcon; title: string; description: string }[];
  steps: { title: string; description: string }[];
  /** True when the product is not yet open for sign-up. */
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "seed",
    icon: SproutIcon,
    name: "TFB Seed",
    emotion: "Accumulation",
    who: "For a parent with monthly income",
    tagline: "Small, regular SIPs into your child's future",
    description:
      "A monthly SIP account you can start today, free — on your own PAN, or a trust fund PAN once you've made it permanent. Nothing is locked in: pause, change the amount, or withdraw whenever you need to, then convert it into an irrevocable Deed once you're ready to make it permanent.",
    entry: "₹100/mo",
    entryNote: "Minimum monthly SIP",
    highlights: [
      {
        icon: SlidersHorizontalIcon,
        title: "Flexible by default",
        description: "Change the amount or pause the SIP any month, with no penalty.",
      },
      {
        icon: UsersIcon,
        title: "Family can contribute",
        description: "Share a link so grandparents and relatives can top it up directly.",
      },
      {
        icon: WalletIcon,
        title: "Withdraw anytime",
        description: "It isn't a trust yet — the money stays yours until you convert it.",
      },
      {
        icon: LandmarkIcon,
        title: "Convert to a Deed later",
        description: "Turn the same account into an irrevocable trust whenever you choose.",
      },
    ],
    steps: [
      {
        title: "Set your monthly amount",
        description: "Start from ₹100/month, invested on your own PAN.",
      },
      {
        title: "SIP runs automatically",
        description: "Auto-debit into a diversified mutual fund portfolio you choose.",
      },
      {
        title: "Track the corpus grow",
        description: "Watch contributions, growth, and family top-ups on one dashboard.",
      },
      {
        title: "Convert when ready",
        description: "Turn the account into an irrevocable Deed with a vesting age you pick.",
      },
    ],
  },
  {
    slug: "harvest",
    icon: HandCoinsIcon,
    name: "TFB Harvest",
    emotion: "Decumulation",
    who: "For anyone with a lump sum",
    tagline: "Invest once, draw an income for as long as it lasts",
    description:
      "Put a lump sum to work in one go, then draw a monthly income from it on your own schedule. Ideal for a bonus, an inheritance, or proceeds from selling an asset that you want working for your child instead of sitting idle.",
    entry: "₹21,000",
    entryNote: "Minimum lump sum to open a Harvest account",
    highlights: [
      {
        icon: BadgeCheckIcon,
        title: "One-time investment",
        description: "Deploy a lump sum immediately — no recurring commitment required.",
      },
      {
        icon: CalendarClockIcon,
        title: "Monthly income draws",
        description: "Set a systematic withdrawal plan sized to how long you want it to last.",
      },
      {
        icon: PauseIcon,
        title: "Full flexibility",
        description: "Change the drawdown, pause it, or add to the corpus at any time.",
      },
      {
        icon: LandmarkIcon,
        title: "Convert to a Deed later",
        description: "Lock the remaining corpus into an irrevocable trust whenever you choose.",
      },
    ],
    steps: [
      {
        title: "Invest your lump sum",
        description: "Start from ₹21,000, deployed into a portfolio you choose.",
      },
      {
        title: "Set a drawdown plan",
        description: "Choose a monthly income amount sized to your time horizon.",
      },
      {
        title: "Track the balance",
        description: "See what's been drawn, what's left, and how it's still growing.",
      },
      {
        title: "Convert when ready",
        description: "Turn the remaining corpus into an irrevocable Deed at any time.",
      },
    ],
  },
  {
    slug: "deed",
    comingSoon: true,
    icon: LandmarkIcon,
    name: "TFB Deed",
    emotion: "Protection & personalisation",
    who: "For a parent wanting protection and a plan",
    tagline: "A legally irrevocable trust, designed once, on the website",
    description:
      "The permanent version of Seed or Harvest — a legally irrevocable trust with a vesting age and payout plan you design once. Trust deed drafting, e-stamping, trust PAN application and e-sign are all handled on your behalf, so the deed is executed without a chartered accountant or months of paperwork.",
    entry: "₹50,000",
    entryNote: "One-time, fully digital",
    highlights: [
      {
        icon: ShieldCheckIcon,
        title: "Irrevocable by design",
        description: "Provably out of anyone's reach, including yours, once executed.",
      },
      {
        icon: CalendarClockIcon,
        title: "Choose the vesting age",
        description: "18, 21, or 25 — your child receives the corpus on the plan you set.",
      },
      {
        icon: FileSignatureIcon,
        title: "Fully digital execution",
        description: "Trust PAN application, e-stamping, and e-sign, all handled for you."
      },
      {
        icon: ClipboardListIcon,
        title: "Payout plan you design",
        description: "Full release, monthly allowance, annual cap, or a graduated release.",
      },
    ],
    steps: [
      {
        title: "Choose the plan",
        description: "Pick a vesting age — 18, 21 or 25 — and how the payout should work.",
      },
      {
        title: "Complete e-KYC",
        description: "Verify identity digitally, with no paperwork or branch visit.",
      },
      {
        title: "Trust PAN & e-sign",
        description: "The trust PAN is applied for and the deed is e-signed and e-stamped.",
      },
      {
        title: "Deed executes",
        description: "The trust becomes a legal entity, independent of your account and ours.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
