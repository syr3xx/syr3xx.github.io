import { useEffect, useRef, useState, type ReactNode } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "./sections/Footer";
import LanguageTransitionOverlay from "./components/LanguageTransitionOverlay";

// Fades the (already-swapped) content back in via plain opacity whenever the
// language changes, without remounting anything underneath — remounting
// would replay every section's scroll-triggered entrance animation.
function ContentFade({ children }: { children: ReactNode }) {
  const { revealKey } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const prevKey = useRef(revealKey);

  useEffect(() => {
    if (revealKey === prevKey.current) return;
    prevKey.current = revealKey;
    setHidden(true);
    // Two rAFs: the first waits for the opacity:0 frame to actually paint,
    // the second then flips it back so the transition has something to
    // animate from instead of jumping straight to opacity:1.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setHidden(false));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [revealKey]);

  return (
    <div
      style={{
        background: "#0C0C0C",
        overflowX: "clip",
        opacity: hidden ? 0 : 1,
        transition: hidden ? "none" : "opacity 350ms ease",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LanguageTransitionOverlay />
      <ContentFade>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer />
      </ContentFade>
    </LanguageProvider>
  );
}

export default App;
