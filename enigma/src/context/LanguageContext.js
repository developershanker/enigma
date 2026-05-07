import React, { createContext, useContext, useState } from 'react';
import en from '../i18n/en';
import hi from '../i18n/hi';

const translations = { en, hi };

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('enigma_lang') || 'en'
  );

  const switchLang = (newLang) => {
    localStorage.setItem('enigma_lang', newLang);
    setLang(newLang);
  };

  const t = (key) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
