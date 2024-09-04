import React from 'react';
import { useSelector } from 'react-redux';
import './Action';
import Play from './Play';
import { getSelectedLevel } from '../../store/gameFlow/selectors';
import { LevelTimes } from '../consts';

const Action: React.FC = () => {
  const selectedLevel = useSelector(getSelectedLevel);
  // TODO make logic for x2 times, and implement logic which will subtract time from the timer on each correct click

  switch (selectedLevel) {
    case 0:
      return <Play columnsCount={3} timeOut={LevelTimes.Easy} />;
    case 1:
      return <Play columnsCount={4} timeOut={LevelTimes.Medium} />;
    case 2:
      return <Play columnsCount={5} timeOut={LevelTimes.Hard} />;
    default:
      return null;
  }
};

export default Action;
