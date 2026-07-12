import FadeIn from "../components/FadeIn";
import ContactButton from "../components/ContactButton";
import GradientBlob from "../components/GradientBlob";
import LanguageToggle from "../components/LanguageToggle";
import TypewriterText from "../components/TypewriterText";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="absolute -top-[18%] -right-[12%] w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] opacity-25 blur-2xl md:blur-[110px]" />
      </div>

      <FadeIn delay={0} y={-20} as="nav">
        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-10 pt-6 md:pt-8">
          <ul className="flex flex-wrap justify-start gap-x-2 gap-y-1 sm:gap-x-6 md:gap-10">
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
                  className="whitespace-nowrap text-[#D7E2EA] font-normal uppercase tracking-wide sm:tracking-wider text-[10px] sm:text-sm md:text-base lg:text-lg transition-opacity duration-300 hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>
      </FadeIn>

      <div className="relative flex-1 flex flex-col justify-between">
        <div className="overflow-hidden mt-10 sm:mt-12 md:mt-14 px-6 md:px-10 flex justify-center sm:block">
          <div className="inline-block text-center sm:text-left">
            <p className="text-gradient-brand font-normal uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base">
              {t.hero.subtitle}
            </p>
            <h1 className="glass-text font-normal uppercase tracking-tight leading-none whitespace-nowrap text-[12.8vw] sm:text-[9.3vw] md:text-[10.8vw] lg:text-[8.8vw]">
              {t.hero.title}
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-end gap-4 pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
          <TypewriterText
            text={t.hero.lead}
            delayMs={350}
            className="text-[#D7E2EA] font-normal uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[200px] md:max-w-[240px]"
            style={{ fontSize: "clamp(0.7rem, 1.1vw, 1.15rem)" }}
          />
          <FadeIn delay={0.5} y={20}>
            <ContactButton label={t.hero.contact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
