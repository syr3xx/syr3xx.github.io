import { AnimatePresence, motion } from "framer-motion";
import {
  LANG_TRANSITION_COVER_MS,
  LANG_TRANSITION_TOTAL_MS,
  useLanguage,
} from "../context/LanguageContext";

const coverFraction = LANG_TRANSITION_COVER_MS / LANG_TRANSITION_TOTAL_MS;

export default function LanguageTransitionOverlay() {
  const { transitionKey } = useLanguage();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={transitionKey}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 96% 4%, #B600A8 0%, #7621B0 45%, #BE4C00 100%)",
        }}
        initial={{ opacity: 1, clipPath: "circle(0% at 96% 4%)" }}
        animate={{
          opacity: [1, 1, 0],
          clipPath: ["circle(0% at 96% 4%)", "circle(150% at 96% 4%)", "circle(150% at 96% 4%)"],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: LANG_TRANSITION_TOTAL_MS / 1000,
          times: [0, coverFraction, 1],
          ease: "easeInOut",
        }}
      />
    </AnimatePresence>
  );
}
