import React, { Component } from 'react';
import './Action';
import Play from './Play';
import { GameConditions } from '../consts';

interface Props {
  level: any;
  changeLevel: (number: number, condition: GameConditions) => void;
}

const Action: React.FC<Props> = ({ level, changeLevel }) => {
  switch (level) {
    case 0:
      return <Play columnsCount={3} changeLevel={changeLevel} timeOut={1700} />;
    case 1:
      return <Play columnsCount={4} changeLevel={changeLevel} timeOut={1400} />;
    case 2:
      return <Play columnsCount={5} changeLevel={changeLevel} timeOut={1000} />;
    default:
      return null;
  }
};

export default Action;
