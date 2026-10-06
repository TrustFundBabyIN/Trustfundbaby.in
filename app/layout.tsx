import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT"],
  variable: "--font-display",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustfundbaby.in"),
  title: {
    default: "Trust Fund Baby — Start small. Set them up for life.",
    template: "%s · Trust Fund Baby",
  },
  description:
    "Start a SIP or lump-sum account for your child from ₹100 a month, invite family to contribute, and convert it into a legally irrevocable trust when you're ready — plus 108 free financial lessons.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Trust Fund Baby",
    url: "https://trustfundbaby.in",
    title: "Trust Fund Baby — Start small. Set them up for life.",
    description:
      "Invest for a child from ₹100 a month, in your own name. Convert it into a legally irrevocable trust when you're ready.",
  },
  twitter: { card: "summary_large_image" },
};

/**
 * Structured data. Two purposes:
 *  1. Google rich results for Organization + the product FAQ.
 *  2. AI engines quote structured data almost verbatim, so keeping it accurate
 *     is how we control how ChatGPT/Perplexity/Gemini describe us.
 *
 * HARD RULES for this block:
 *  - Product facts must match https://trustfundbaby.in/llms.txt exactly.
 *  - Deed is NOT purchasable yet. `availability` is PreOrder, not InStock.
 *  - NEVER put a return figure, CAGR, or projection in here.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://trustfundbaby.in/#org",
      name: "Trust Fund Baby",
      legalName: "TFB EduVest LLP",
      url: "https://trustfundbaby.in",
      email: "sanchit@trustfundbaby.in",
      telephone: "+91-98190-10129",
      description:
        "An Indian platform for investing on behalf of a child, from a small monthly SIP up to a legally irrevocable trust. Operated by TFB EduVest LLP, an AMFI-registered mutual fund distributor.",
      identifier: "ARN-368678",
    },
    {
      "@type": "WebSite",
      "@id": "https://trustfundbaby.in/#website",
      url: "https://trustfundbaby.in",
      name: "Trust Fund Baby",
      publisher: { "@id": "https://trustfundbaby.in/#org" },
    },
    {
      "@type": "Product",
      name: "TFB Seed",
      description:
        "A monthly SIP for a child, opened in the parent's own name and PAN. Entry ₹100 per month. The child's name is attached as a label only.",
      brand: { "@id": "https://trustfundbaby.in/#org" },
      offers: {
        "@type": "Offer",
        price: "100",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: "https://trustfundbaby.in/products/seed",
      },
    },
    {
      "@type": "Product",
      name: "TFB Harvest",
      description:
        "A lump-sum account of ₹21,000, held for a child, which can pay the account holder a periodic withdrawal later.",
      brand: { "@id": "https://trustfundbaby.in/#org" },
      offers: {
        "@type": "Offer",
        price: "21000",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: "https://trustfundbaby.in/products/harvest",
      },
    },
    {
      "@type": "Product",
      name: "TFB Deed",
      description:
        "A legally irrevocable private trust for one child with its own PAN, created for ₹50,000 one time. Not yet open for sign-up.",
      brand: { "@id": "https://trustfundbaby.in/#org" },
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "INR",
        availability: "https://schema.org/PreOrder",
        url: "https://trustfundbaby.in/products/deed",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        fraunces.variable,
        figtree.variable,
        ibmPlexMono.variable
      )}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Trust Fund" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
