import type { Metadata } from "next";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { LaunchListForm } from "@/components/landing/launch-list";

export const metadata: Metadata = {
  title: "Join the launch list",
  alternates: { canonical: "/signup/" },
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 px-6">
          <h1 className="text-4xl font-bold tracking-tight">Be first when we open.</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Accounts open soon. Leave your email and we&apos;ll write to you
            once, the day we open.
          </p>
          <div className="mx-auto max-w-md pt-2 text-left">
            <LaunchListForm />
          </div>
          <a
            href="/"
            className="inline-block mt-4 text-sm underline text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
