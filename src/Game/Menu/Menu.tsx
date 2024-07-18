import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Levels from '../Levels/Levels';
import HowToPlay from '../HowToPlay/HowToPlay';
import '../../App.css';
import { startTimeCount, handleTimeout } from '../../services/all';
import { GameConditions } from '../consts';

interface Props {
  changeLevel: (number: number, condition: GameConditions) => void;
}

const Menu: React.FC<Props> = ({ changeLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateClick = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect = (index: number) => {
    let timeOut: any;
    switch (index) {
      case 0:
        timeOut = 1700;
        break;
      case 1:
        timeOut = 1400;
        break;
      case 2:
        timeOut = 540;
        break;
      default:
        return;
    }
    changeLevel(index, GameConditions.Timer);
    setTimeout(() => {
      changeLevel(index, GameConditions.Action);
      startTimeCount();
      // handleTimeout(changeLevel, timeOut);
    }, 3000);
  };

  return (
    <div className="body_wrapper">
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="info-icon"
        onClick={() => setIsOpen(true)}
      />
      <HowToPlay isOpen={isOpen} updateClick={updateClick} />
      <div className="instructions">Choose Difficulty Level</div>
      <Levels onSelect={onSelect} />
    </div>
  );
};

export default Menu;
