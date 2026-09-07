"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, MenuIcon } from "lucide-react";

import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";

const productLinks = products.map((product) => ({
  href: `/products/${product.slug}`,
  label: product.name,
}));

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#education", label: "Education" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const productsActive = pathname.startsWith("/products");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the nav link for whatever section is crossing the viewport's
  // vertical center — independent of ScrollSmoother's transform-based scroll.
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null);

    // IntersectionObserver only reports elements whose state just changed,
    // so track everyone's current visibility to know when NONE are in view
    // (e.g. scrolled past the last section) and clear the highlight then.
    const visibility = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(`#${entry.target.id}`, entry.isIntersecting);
        }
        const active = links.find((link) => visibility.get(link.href))?.href ?? null;
        setActiveHref(active);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 px-4 transition-[top] duration-300",
        scrolled ? "top-2" : "top-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between gap-4 rounded-full backdrop-blur-md transition-all duration-300",
          scrolled
            ? "h-12 max-w-4xl bg-background/70 px-4 shadow-md ring-1 ring-foreground/5"
            : "h-14 max-w-5xl bg-background/30 px-5 shadow-sm"
        )}
      >
        <Brand showName={false} />

        <nav className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full",
                  productsActive ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
                aria-current={productsActive ? "location" : undefined}
              >
                Products
                <ChevronDownIcon data-icon="inline-end" className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {productLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full",
                  isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
                asChild
              >
                <Link href={link.href} aria-current={isActive ? "location" : undefined}>
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {productLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              {links.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/signin">Sign in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-full md:inline-flex"
            asChild
          >
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button size="sm" className="bg-primary-gradient rounded-full" asChild>
            <Link href="/signup">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
