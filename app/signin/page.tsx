import type { Metadata } from "next";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";

export const metadata: Metadata = { title: "Sign In" };

export default function SigninPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 px-6">
          <h1 className="text-4xl font-bold tracking-tight">Sign In</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Sign in will be available soon. Stay tuned!
          </p>
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
