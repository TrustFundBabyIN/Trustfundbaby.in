import type { Variants, Transition } from "framer-motion";

/**
 * Motion vocabulary for Trust Fund Baby.
 * TFB-02 §2: 140–280ms, cubic-bezier(.22,.61,.36,1), no bounce, no confetti.
 */

export const EASE = [0.22, 0.61, 0.36, 1] as const;

export const t = (duration = 0.24, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

export const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: t(0.62) },
};

export const stagger = (each = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, when: "beforeChildren" } },
});

export const lift: Variants = {
  rest: { y: 0 },
  hover: { y: -5, transition: t(0.28) },
};

export const onceInView = { once: true, amount: 0.3 } as const;

export const tick = (distance: number): Variants => ({
  hidden: { scaleY: 0.18, opacity: 0.4 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.52, delay: 0.06 + distance * 0.026, ease: EASE },
  },
});
