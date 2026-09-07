"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { HandCoinsIcon, LandmarkIcon, SproutIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { SectionHeader } from "@/components/landing/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const products = [
  {
    icon: SproutIcon,
    name: "TFB Seed",
    who: "For a parent with monthly income",
    what: "Small, regular SIPs into your child's future — on your own PAN, or theirs.",
    entry: "₹1,000/mo",
    emotion: "Accumulation",
  },
  {
    icon: HandCoinsIcon,
    name: "TFB Harvest",
    who: "For anyone with a lump sum",
    what: "Invest once, then draw a monthly income from it for as long as it lasts.",
    entry: "₹5,00,000",
    emotion: "Decumulation",
  },
  {
    icon: LandmarkIcon,
    name: "TFB Deed",
    who: "For a parent wanting protection and a plan",
    what: "A legally irrevocable trust with a payout plan you design once, on the website.",
    entry: "₹20,000",
    emotion: "Protection & personalisation",
  },
] as const;

/** True once the viewport matches `query`; updates live on resize. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false // server snapshot — SSR has no viewport to match against
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Card className="shadow-xl shadow-trust-blue/5">
      <CardHeader className="flex flex-row items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <product.icon className="size-4.5 text-foreground" />
        </div>
        <div className="grid gap-0.5">
          <span className="text-sm font-medium">{product.name}</span>
          <span className="text-xs text-muted-foreground">{product.who}</span>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {product.emotion}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-sm text-pretty text-muted-foreground sm:text-base">
          {product.what}
        </p>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Entry</p>
            <p className="font-heading text-3xl font-medium tracking-tight tabular-nums">
              {product.entry}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Products() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinned = isDesktop && !shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!pinned) return;
    const index = Math.min(products.length - 1, Math.floor(latest * products.length));
    setActive(index);
  });

  function handleSelect(index: number) {
    setActive(index);
  }

  return (
    <div
      ref={wrapperRef}
      id="products"
      className="relative scroll-mt-24"
      style={pinned ? { height: `${products.length * 90}vh` } : undefined}
    >
      <div className={cn(pinned && "sticky top-0 flex h-svh flex-col overflow-hidden")}>
        <div className="mx-auto grid w-full max-w-5xl flex-1 content-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:py-12">
          <div className="flex flex-col gap-8">
            <SectionHeader
              eyebrow="Three products, one story"
              title="Seed, Harvest, and Deed"
              description="Two ways to grow a corpus, and one way to lock it in for good. Scroll to move through each one — combine them, or convert one into the other whenever you're ready."
            />

            <ol className="flex flex-col gap-1">
              {products.map((product, index) => (
                <li key={product.name}>
                  <button
                    type="button"
                    onClick={() => handleSelect(index)}
                    className="flex cursor-pointer items-center gap-3 py-1.5"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors",
                        active === index ? "text-foreground" : "text-muted-foreground/60"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-lg font-medium tracking-tight transition-colors sm:text-xl",
                        active === index
                          ? "text-foreground"
                          : "text-muted-foreground/60 hover:text-muted-foreground"
                      )}
                    >
                      {product.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {pinned ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={products[active].name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={products[active]} />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.name}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
