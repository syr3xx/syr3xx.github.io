import { LanguageProvider } from "./context/LanguageContext";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "./sections/Footer";
import LanguageTransitionOverlay from "./components/LanguageTransitionOverlay";

function App() {
  return (
    <LanguageProvider>
      <LanguageTransitionOverlay />
      <div style={{ background: "#0C0C0C", overflowX: "clip" }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
