import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ja';

export type LocalizedText = {
  en: string;
  ja: string;
};

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const STORAGE_KEY = 'stomii-site-language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const localized = (en: string, ja: string): LocalizedText => ({ en, ja });

export const getText = (text: LocalizedText, language: Language) => text[language];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'ja' ? 'ja' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'ja' : 'en')),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
