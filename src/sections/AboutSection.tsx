import FadeIn from "../components/FadeIn";
import AnimatedText from "../components/AnimatedText";
import ContactButton from "../components/ContactButton";
import GradientBlob from "../components/GradientBlob";
import { useLanguage } from "../context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GradientBlob className="absolute -bottom-[15%] -left-[10%] w-[380px] h-[380px] sm:w-[600px] sm:h-[600px] md:w-[850px] md:h-[850px] opacity-15 blur-2xl md:blur-[110px]" />
      </div>

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <h2
          className="glass-text font-normal uppercase leading-none tracking-tight text-center px-2"
          style={{ fontSize: "clamp(2.2rem, 7.2vw, 93px)" }}
        >
          {t.about.heading}
        </h2>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={t.about.text}
            className="text-[#D7E2EA] font-normal text-center leading-relaxed max-w-[500px]"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
          />
          <FadeIn delay={0.1} y={20}>
            <ContactButton label={t.about.contact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
