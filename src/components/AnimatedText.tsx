import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.5,
  });

  // Tokenize into words (hyphen-terminated chunks count as their own word, so
  // existing compound-word hyphens remain valid line-break points) and
  // whitespace runs. Each word's characters are wrapped in a single
  // `white-space: nowrap` box so the per-character inline-block spans below
  // never create a wrap opportunity mid-word — only at spaces or hyphens.
  const tokens = text.match(/\S+?-|\S+|\s+/g) ?? [];
  const totalChars = text.length;
  let index = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {tokens.map((token, ti) => {
        const chars = token.split("").map((char) => {
          const i = index++;
          const start = i / totalChars;
          const end = start + 1 / totalChars;
          return <Char key={i} char={char} progress={smoothProgress} start={start} end={end} />;
        });

        if (/^\s+$/.test(token)) {
          return chars;
        }

        return (
          <span key={ti} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {chars}
          </span>
        );
      })}
    </p>
  );
}

function Char({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{char === " " ? " " : char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {char === " " ? " " : char}
      </motion.span>
    </span>
  );
}
