import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-5 sm:px-8 md:px-10 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#D7E2EA]/50 text-xs sm:text-sm uppercase tracking-wider">
        <span>syr3xx © {year}</span>
        <a
          href="https://t.me/syr3xx"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300 hover:text-[#D7E2EA]"
        >
          Telegram — @syr3xx
        </a>
        <span>{lang === "ru" ? "Сделано на React + Vite" : "Built with React + Vite"}</span>
      </div>
    </footer>
  );
}
