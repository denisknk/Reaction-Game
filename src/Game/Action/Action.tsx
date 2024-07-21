import React from 'react';
import { useSelector } from 'react-redux';
import './Action';
import Play from './Play';
import { getSelectedLevel } from '../../store/gameFlow/selectors';

const Action: React.FC = () => {
  const selectedLevel = useSelector(getSelectedLevel);

  switch (selectedLevel) {
    case 0:
      return <Play columnsCount={3} timeOut={1700} />;
    case 1:
      return <Play columnsCount={4} timeOut={1400} />;
    case 2:
      return <Play columnsCount={5} timeOut={1000} />;
    default:
      return null;
  }
};

export default Action;
