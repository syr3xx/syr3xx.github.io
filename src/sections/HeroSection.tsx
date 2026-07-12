import FadeIn from "../components/FadeIn";
import ContactButton from "../components/ContactButton";
import GradientBlob from "../components/GradientBlob";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <div
        className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
        }}
      >
        <GradientBlob className="w-[1500px] h-[1500px] sm:w-[1900px] sm:h-[1900px] md:w-[2300px] md:h-[2300px] lg:w-[2700px] lg:h-[2700px] opacity-45 blur-3xl" />
      </div>

      <FadeIn delay={0} y={-20} as="nav">
        <div className="relative flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <ul className="flex flex-wrap justify-start gap-x-3 gap-y-1 sm:gap-x-6 md:gap-10">
            {[
              { id: "about", label: t.nav.about },
              { id: "services", label: t.nav.services },
              { id: "projects", label: t.nav.projects },
              { id: "contact", label: t.nav.contact },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={item.id === "contact" ? "https://t.me/syr3xx" : `#${item.id}`}
                  target={item.id === "contact" ? "_blank" : undefined}
                  rel={item.id === "contact" ? "noopener noreferrer" : undefined}
                  className="whitespace-nowrap text-[#D7E2EA] font-normal uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg transition-opacity duration-300 hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>
      </FadeIn>

      <div className="relative flex-1">
        <div className="overflow-hidden mt-10 sm:mt-12 md:mt-14 px-6 md:px-10">
          <div className="inline-block">
            <p className="text-[#D7E2EA] font-normal uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base">
              {t.hero.subtitle}
            </p>
            <h1 className="glass-text font-normal uppercase tracking-tight leading-none whitespace-nowrap text-[11.3vw] sm:text-[9.3vw] md:text-[10.8vw] lg:text-[8.8vw]">
              {t.hero.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-normal uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[200px] md:max-w-[240px]"
            style={{ fontSize: "clamp(0.7rem, 1.1vw, 1.15rem)" }}
          >
            {t.hero.lead}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label={t.hero.contact} />
        </FadeIn>
      </div>
    </section>
  );
}
