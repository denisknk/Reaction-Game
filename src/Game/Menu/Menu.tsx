import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Levels from '../Levels/Levels';
import HowToPlay from '../HowToPlay/HowToPlay';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import '../../App.css';

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const updateClick = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div className="body_wrapper">
      <FontAwesomeIcon icon={faInfoCircle} className="info-icon" onClick={() => setIsOpen(true)} />
      <LanguageSwitcher />
      <HowToPlay isOpen={isOpen} updateClick={updateClick} />
      <div className="instructions">{t('chooseDifficulty', 'Choose Difficulty Level')}</div>
      <Levels />
    </div>
  );
};

export default Menu;
