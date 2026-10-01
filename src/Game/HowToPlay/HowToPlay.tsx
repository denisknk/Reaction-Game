import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

interface Props {
  isOpen: boolean;
  updateClick: (val: boolean) => void;
}

const HowToPlay: React.FC<Props> = ({ isOpen, updateClick }) => {
  const { t } = useTranslation();

  if (isOpen) {
    return (
      <div id="howToPlay">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="info-icon"
          onClick={() => {
            updateClick(false);
          }}
        />
        <div className="how-toplay__header">
          <p>{t('howToPlayHeader', 'Rules of the Game')}</p>
        </div>
        <div className="instraction-list">
          <ol>
            <li>{t('howToPlayStep1', 'Choose a difficulty level by clicking on one of the three dots. The easiest level is on the left.')}</li>
            <li>{t('howToPlayStep2', 'The timer will count down 3 seconds so you have time to get ready.')}</li>
            <li>{t('howToPlayStep3', 'Depending on the selected level, you will see a grid: 3x3 for Easy, 4x4 for Medium, and 5x5 for Hard.')}</li>
            <li>{t('howToPlayStep4', 'One of the boxes will light up green. Click on it before time runs out, otherwise the game is over.')}</li>
            <li>{t('howToPlayStep5', 'The game starts at a relaxed pace for Easy level, and a faster pace for Hard level.')}</li>
            <li>{t('howToPlayStep6', 'Each successful click earns you 1 point, and a new green box will appear immediately.')}</li>
            <li>{t('howToPlayStep7', 'Keep playing as long as you can and test your reaction speed!')}</li>
          </ol>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default HowToPlay;
