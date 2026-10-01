import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('uk') ? 'uk' : 'en';

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <span className="lang-divider">|</span>
      <button
        type="button"
        className={`lang-btn ${currentLang === 'uk' ? 'active' : ''}`}
        onClick={() => setLanguage('uk')}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
