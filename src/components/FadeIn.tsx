import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type ElementType, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 30,
  as = "div",
  className,
}: FadeInProps) {
  // Memoized so re-renders (e.g. language switch) don't recreate the
  // component type, which would remount children and replay the animation.
  const MotionTag = useMemo(() => motion.create(as), [as]);
  // Respect prefers-reduced-motion: keep a quick opacity fade (not spatial
  // motion) but drop the translate and shorten/zero the delay.
  const reduceMotion = useReducedMotion();

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0.3 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
