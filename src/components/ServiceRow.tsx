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

  const numOpacity = useTransform(progress, [0, 1], [0.3, 1]);
  const descOpacity = useTransform(progress, [0, 1], [0.25, 0.6]);
  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className="relative flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
      style={{
        borderTop: isFirst ? "1px solid rgba(12,12,12,0.15)" : undefined,
        borderBottom: "1px solid rgba(12,12,12,0.15)",
      }}
    >
      <motion.span
        className="font-normal text-[#0C0C0C] shrink-0"
        style={{ fontSize: "clamp(2.2rem, 7vw, 100px)", opacity: numOpacity }}
      >
        {num}
      </motion.span>
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

      {/* Reading-progress fill: grows in sync with the same scroll-linked
          progress that drives the opacity above, sitting right on top of
          the row's bottom border. */}
      <motion.div
        className="absolute left-0 bottom-[-1px] h-[2px] bg-[#0C0C0C]"
        style={{ width: barWidth }}
      />
    </div>
  );
}
