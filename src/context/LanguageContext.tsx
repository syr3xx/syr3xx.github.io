import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { translations, type Lang } from "../i18n/translations";

// The wave overlay covers the whole screen before the content underneath
// swaps language, so the swap is always hidden behind the mask. Keep these
// in sync with the animation timing in LanguageTransitionOverlay.
export const LANG_TRANSITION_COVER_MS = 900;
export const LANG_TRANSITION_TOTAL_MS = 1550;

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["ru"];
  transitionKey: number;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const [transitionKey, setTransitionKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const changeLang = (next: Lang) => {
    if (next === lang) return;
    setTransitionKey((k) => k + 1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setLangState(next), LANG_TRANSITION_COVER_MS);
  };

  const toggleLang = () => changeLang(lang === "ru" ? "en" : "ru");

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLang, setLang: changeLang, t: translations[lang], transitionKey }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
