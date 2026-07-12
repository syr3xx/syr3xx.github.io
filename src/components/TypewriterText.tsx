import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  charDelay?: number;
}

const container = (delay: number, charDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: charDelay, delayChildren: delay },
  },
});

const charVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeIn" } },
};

export default function TypewriterText({
  text,
  className,
  style,
  delay = 0,
  charDelay = 0.035,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  // Same word/hyphen-safe tokenizing as AnimatedText: grouping each word's
  // characters in a `white-space: nowrap` box stops the browser from
  // treating every inline-block character gap as a valid line-break point.
  const tokens = text.match(/\S+?-|\S+|\s+/g) ?? [];

  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container(delay, charDelay)}
    >
      {tokens.map((token, ti) => {
        const chars = token.split("").map((char, ci) => (
          <motion.span key={ci} variants={charVariant} style={{ display: "inline-block" }}>
            {char === " " ? " " : char}
          </motion.span>
        ));

        if (/^\s+$/.test(token)) return chars;

        return (
          <span key={ti} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {chars}
          </span>
        );
      })}
    </motion.p>
  );
}
