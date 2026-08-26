"use client";

import { motion } from "framer-motion";
import { reveal, onceInView } from "@/lib/motion";

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={onceInView}
      transition={{ duration: 0.62, delay: delay / 1000, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
