import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ServiceRowProps {
  num: string;
  name: string;
  desc: string;
  isFirst: boolean;
}

export default function ServiceRow({ num, name, desc, isFirst }: ServiceRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.6 });

  const descOpacity = useTransform(progress, [0, 1], [0.25, 0.6]);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  const numStyle = { fontSize: "clamp(2.2rem, 7vw, 100px)" } as const;

  return (
    <div
      ref={ref}
      className="relative flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
      style={{
        borderTop: isFirst ? "1px solid rgba(12,12,12,0.15)" : undefined,
        borderBottom: "1px solid rgba(12,12,12,0.15)",
      }}
    >
      {/* Reading progress lives in the numeral itself: an outlined "01"
          sits as the base, and a solid-black copy sweeps in from the left —
          clipped by the same scroll progress that used to drive a separate
          progress bar — so the number fills in as you read. Solid black
          instead of the brand gradient keeps it quiet, matching the
          section's otherwise monochrome palette. */}
      <div className="relative shrink-0" style={numStyle}>
        <span
          aria-hidden
          className="font-normal block whitespace-nowrap"
          style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(12,12,12,0.35)" }}
        >
          {num}
        </span>
        <motion.div className="absolute inset-0 overflow-hidden" style={{ width: fillWidth }}>
          <span className="font-normal block whitespace-nowrap text-[#0C0C0C]">{num}</span>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
        <h3
          className="text-[#0C0C0C] font-normal uppercase"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)" }}
        >
          {name}
        </h3>
        <motion.p
          className="text-[#0C0C0C] font-normal leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(0.8rem, 1.3vw, 1.05rem)", opacity: descOpacity }}
        >
          {desc}
        </motion.p>
      </div>
    </div>
  );
}
