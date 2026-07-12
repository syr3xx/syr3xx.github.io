import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// A soft gradient frame, Apple Intelligence-style, that spreads outward from
// the same corner the language-switch wave originates from — timed to start
// right as the wave finishes covering the screen — then fades away. Keyed
// off `lang` (not the click-time transitionKey) so it triggers exactly when
// the wave has actually reached the edges, not the instant the user clicks.
export default function IntelligenceGlow() {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <>
      {/* Fractal-noise displacement so the ring's outer edge frays/branches
          instead of reading as a clean geometric line. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="glow-fray" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <AnimatePresence initial={false}>
        <motion.div
          key={lang}
          aria-hidden
          className="intelligence-glow"
          initial={{ opacity: 0, clipPath: "circle(0% at 96% 4%)" }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            clipPath: [
              "circle(0% at 96% 4%)",
              "circle(150% at 96% 4%)",
              "circle(150% at 96% 4%)",
              "circle(150% at 96% 4%)",
            ],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            times: [0, 0.4, 0.65, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </AnimatePresence>
    </>
  );
}
