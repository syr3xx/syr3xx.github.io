import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageTransitionOverlay() {
  const { lang } = useLanguage();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={lang}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 96% 4%, #B600A8 0%, #7621B0 45%, #BE4C00 100%)",
        }}
        initial={{ opacity: 0.45, clipPath: "circle(0% at 96% 4%)" }}
        animate={{ opacity: 0, clipPath: "circle(150% at 96% 4%)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </AnimatePresence>
  );
}
