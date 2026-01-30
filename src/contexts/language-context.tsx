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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const [data, setData] = useState<User>(DEFAULT_DATA);

  useEffect(() => {
    setData(language === "en" ? DATA_EN : DATA_PT);
  }, [language]);

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
