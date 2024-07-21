import React, { useState } from 'react';
import '../App.css';
import Menu from './Menu/Menu';
import Action from './Action/Action';
import Timer from './Timer/Timer';
import End from './End/End';
import { GameConditions } from './consts';
import { geCurrentGameCondition } from '../store/gameFlow/selectors';
import { useSelector } from 'react-redux';

const Game: React.FC = () => {
  const currentGameCondition = useSelector(geCurrentGameCondition);

  switch (currentGameCondition) {
    case GameConditions.Menu:
      return <Menu />;
    case GameConditions.Timer:
      return <Timer />;
    case GameConditions.Game:
      return <Action />;
    case GameConditions.EndScreen:
      return <End />;
    default:
      return <Menu />;
  }
};

export default Game;
