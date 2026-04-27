import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Fund Baby — Start Small. Set Them Up for Life.",
  description: "Create an irrevocable trust fund for your child in 10 minutes. Invest ₹5,000/month in regulated mutual funds. They receive the full corpus at 21. Free to start.",
  keywords: "trust fund india, children investment, child future fund, SIP for child, irrevocable trust india, mutual fund for kids",
  openGraph: {
    title: "Trust Fund Baby — Start Small. Set Them Up for Life.",
    description: "Invest ₹5,000/month in a trust fund your child receives at 21. Irrevocable. Regulated. Compounding.",
    url: "https://trustfundbaby.in",
    type: "website",
    siteName: "Trust Fund Baby",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Fund Baby — Start Small. Set Them Up for Life.",
    description: "Invest ₹5,000/month in a trust fund your child receives at 21. Irrevocable. Regulated. Compounding.",
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
      <body className="font-sans antialiased text-ink bg-snow">
        {children}
      </body>
    </html>
  );
}
