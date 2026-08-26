import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Fund Baby — Start small. Set them up for life.",
  description:
    "Irrevocable trusts and tagged investments for Indian parents and their children. TFB EduVest LLP, AMFI-registered mutual fund distributor, ARN-368678.",
  keywords:
    "trust fund india, children investment, child future fund, SIP for child, irrevocable trust india, mutual fund for kids, ARN-368678",
  openGraph: {
    title: "Trust Fund Baby — Start small. Set them up for life.",
    description:
      "Irrevocable trusts and tagged investments for Indian parents and their children.",
    url: "https://trustfundbaby.in",
    type: "website",
    siteName: "Trust Fund Baby",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Fund Baby — Start small. Set them up for life.",
    description:
      "Irrevocable trusts and tagged investments for Indian parents and their children.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logos/tfb-logo-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased text-ink bg-paper">
        {children}
      </body>
    </html>
  );
}
