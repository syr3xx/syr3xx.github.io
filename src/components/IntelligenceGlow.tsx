import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// A soft, colorful glow hugging the screen edges — Apple Intelligence-style —
// that briefly frames the viewport on a language switch, then fades away.
export default function IntelligenceGlow() {
  const { transitionKey } = useLanguage();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={transitionKey}
        aria-hidden
        className="intelligence-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 3,
          times: [0, 0.2, 0.55, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </AnimatePresence>
  );
}
