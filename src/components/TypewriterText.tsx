import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delayMs?: number;
  charDelayMs?: number;
}

export default function TypewriterText({
  text,
  className,
  style,
  delayMs = 350,
  charDelayMs = 35,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    // Re-runs whenever `text` changes too (e.g. a language switch mid-type),
    // restarting the reveal for the new string instead of freezing at
    // whatever character count the old text had reached. Only the very
    // first run waits out the entrance delay — restarts type immediately.
    const isFirstRun = !startedRef.current;
    startedRef.current = true;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    setCount(0);
    setShowCursor(false);

    const startTimer = setTimeout(
      () => {
        if (cancelled) return;
        setShowCursor(true);
        let i = 0;
        const tick = () => {
          i += 1;
          setCount(i);
          if (i < text.length) {
            timeouts.push(setTimeout(tick, charDelayMs));
          } else {
            timeouts.push(setTimeout(() => setShowCursor(false), 900));
          }
        };
        tick();
      },
      isFirstRun ? delayMs : 0,
    );
    timeouts.push(startTimer);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [inView, text, delayMs, charDelayMs, reduceMotion]);

  return (
    <p ref={ref} className={className} style={style}>
      {text.slice(0, count)}
      {showCursor && (
        <span
          aria-hidden
          className="typewriter-cursor"
          style={{
            display: "inline-block",
            width: "0.09em",
            marginLeft: "0.06em",
            height: "0.85em",
            verticalAlign: "-0.08em",
            background: "currentColor",
          }}
        />
      )}
    </p>
  );
}
