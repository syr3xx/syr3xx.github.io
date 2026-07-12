import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang } from "../i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["ru"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "ru" ? "en" : "ru"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
