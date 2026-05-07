import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageToggle.scss';

const LanguageToggle = () => {
  const { lang, switchLang } = useLanguage();

  return (
    <div className="lang-toggle">
      <button
        className={`lang-toggle__btn${lang === 'en' ? ' lang-toggle__btn--active' : ''}`}
        onClick={() => switchLang('en')}
      >
        EN
      </button>
      <span className="lang-toggle__sep">|</span>
      <button
        className={`lang-toggle__btn${lang === 'hi' ? ' lang-toggle__btn--active' : ''}`}
        onClick={() => switchLang('hi')}
      >
        हिं
      </button>
    </div>
  );
};

export default LanguageToggle;
