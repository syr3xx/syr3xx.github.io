import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";

// Soft, blurred color blobs bleeding in from each corner — closer to how
// Apple Intelligence's glow actually looks (an organic bloom concentrated
// at the edges, no defined line) than a masked ring ever could be, and with
// no shared boundary/mask math there's no seam or gap to appear at a corner.
const BLOBS: CSSProperties[] = [
  {
    top: "-22%",
    left: "-18%",
    width: "38vw",
    height: "38vw",
    background: "radial-gradient(circle, rgba(182,0,168,0.65) 0%, rgba(182,0,168,0) 70%)",
  },
  {
    top: "-24%",
    right: "-20%",
    width: "42vw",
    height: "42vw",
    background: "radial-gradient(circle, rgba(118,33,176,0.65) 0%, rgba(118,33,176,0) 70%)",
  },
  {
    bottom: "-26%",
    right: "-18%",
    width: "36vw",
    height: "36vw",
    background: "radial-gradient(circle, rgba(190,76,0,0.6) 0%, rgba(190,76,0,0) 70%)",
  },
  {
    bottom: "-24%",
    left: "-20%",
    width: "38vw",
    height: "38vw",
    background: "radial-gradient(circle, rgba(182,0,168,0.55) 0%, rgba(182,0,168,0) 70%)",
  },
];

// A soft gradient bloom, Apple Intelligence-style, that spreads outward from
// the same corner the language-switch wave originates from — timed to start
// right as the wave finishes covering the screen — then fades away. Keyed
// off `lang` (not the click-time transitionKey) so it triggers exactly when
// the wave has actually reached the edges, not the instant the user clicks.
// Desktop only — see the mobile media query in index.css.
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
      >
        {BLOBS.map((blob, i) => (
          <span key={i} className="intelligence-blob" style={blob} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
