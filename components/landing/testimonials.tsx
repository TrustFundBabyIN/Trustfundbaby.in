"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";

import { initials } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/landing/section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "I'd been meaning to 'do something' for my daughter for 2 years. Trust Fund Baby made me stop saying I'll do it later. It was literally 10 minutes.",
    name: "Priya Nair",
    role: "Software Engineer · Bengaluru · 2 kids",
  },
  {
    quote:
      "I asked my CA about this. He quoted ₹40,000 and 3 months for the trust deed alone. Trust Fund Baby did the whole thing — deed, PAN, e-sign — for a flat ₹20,000 in an afternoon. I've recommended it to 6 friends.",
    name: "Vikram Shah",
    role: "Business Owner · Mumbai · 1 child",
  },
  {
    quote:
      "My son's dadi contributed ₹25,000 on his first birthday through the wellwisher link. She cried reading the gift certificate. This is what gifting should feel like.",
    name: "Meena Krishnamurthy",
    role: "Doctor · Chennai · New mother",
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <Card className="w-[min(85vw,22rem)] shrink-0">
      <CardContent className="flex h-full flex-col justify-between gap-6">
        <blockquote className="text-sm text-balance">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-2.5">
          <Avatar>
            <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <span className="text-sm font-medium">{testimonial.name}</span>
            <span className="text-xs text-muted-foreground">
              {testimonial.role}
            </span>
          </div>
        </figcaption>
      </CardContent>
    </Card>
  );
}

export function Testimonials({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const x = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!trackRef.current || shouldReduceMotion) return;
    const width = trackRef.current.scrollWidth / 2;
    const controls = animate(x, -width, {
      duration: width / 40,
      ease: "linear",
      repeat: Infinity,
    });
    controlsRef.current = controls;
    return () => controls.stop();
  }, [shouldReduceMotion, x]);

  return (
    <Section className={className}>
      <SectionHeader
        eyebrow="What parents say"
        title="Trusted by families across India"
      />

      <div className="relative mt-12 -mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:-mx-10 lg:mx-0">
        <motion.div
          ref={trackRef}
          style={{ x }}
          onPointerEnter={() => controlsRef.current?.pause()}
          onPointerLeave={() => controlsRef.current?.play()}
          onFocus={() => controlsRef.current?.pause()}
          onBlur={() => controlsRef.current?.play()}
          className="flex w-max gap-6 px-6 py-3 will-change-transform sm:px-10 lg:px-0"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
