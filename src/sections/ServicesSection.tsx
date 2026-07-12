import FadeIn from "../components/FadeIn";
import { useLanguage } from "../context/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="flex justify-center mb-16 sm:mb-20 md:mb-28">
        <h2
          className="glass-text-dark font-normal uppercase text-center px-2"
          style={{ fontSize: "clamp(2.2rem, 7.2vw, 93px)" }}
        >
          {t.services.heading}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        {t.services.items.map((item, i) => (
          <FadeIn key={item.num} delay={i * 0.1} y={24} duration={0.8}>
            <div
              className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "1px solid rgba(12,12,12,0.15)" : undefined,
                borderBottom: "1px solid rgba(12,12,12,0.15)",
              }}
            >
              <span
                className="font-normal text-[#0C0C0C] shrink-0"
                style={{ fontSize: "clamp(2.2rem, 7vw, 100px)" }}
              >
                {item.num}
              </span>
              <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
                <h3
                  className="text-[#0C0C0C] font-normal uppercase"
                  style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-normal leading-relaxed max-w-2xl"
                  style={{ fontSize: "clamp(0.8rem, 1.3vw, 1.05rem)", opacity: 0.6 }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
