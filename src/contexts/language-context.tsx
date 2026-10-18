"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { I18N, Dict, Lang } from "@/data/portfolio";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  /** 0 for pt, 1 for en — indexes the [pt, en] tuples in the data */
  li: 0 | 1;
}

const STORAGE_KEY = "dzk-lang";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after SSR
      if (stored === "en" || stored === "pt") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: I18N[lang], li: lang === "en" ? 1 : 0 }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
