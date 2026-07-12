import ServiceRow from "../components/ServiceRow";
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
          <ServiceRow
            key={item.num}
            num={item.num}
            name={item.name}
            desc={item.desc}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
