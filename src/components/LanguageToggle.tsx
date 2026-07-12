import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`glass inline-flex items-center rounded-full p-1 gap-1 ${className ?? ""}`}
    >
      {(["ru", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          aria-label={option === "ru" ? "Русский" : "English"}
          className={`rounded-full px-2.5 py-1 text-xs md:text-sm font-normal uppercase tracking-wider transition-colors duration-300 ${
            lang === option
              ? "bg-[#D7E2EA] text-[#0C0C0C]"
              : "text-[#D7E2EA]/50 hover:text-[#D7E2EA]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
