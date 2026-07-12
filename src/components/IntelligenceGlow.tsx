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
  );
}
