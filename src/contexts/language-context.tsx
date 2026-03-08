"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { DATA_EN, DATA_PT, DATA as DEFAULT_DATA } from "@/data/resume";
import { User } from "@/types/user";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: User;
}

const STORAGE_KEY = "portfolio-language";

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "pt") return stored;
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("en") ? "en" : "pt";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  const [data, setData] = useState<User>(DEFAULT_DATA);

  useEffect(() => {
    const detected = detectInitialLanguage();
    setLanguageState(detected);
    setData(detected === "en" ? DATA_EN : DATA_PT);
  }, []);

  useEffect(() => {
    setData(language === "en" ? DATA_EN : DATA_PT);
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
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
