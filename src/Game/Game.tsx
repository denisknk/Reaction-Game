import React, { useEffect, useState } from 'react';
import '../App.css';
import Menu from './Menu/Menu';
import Action from './Action/Action';
import Timer from './Timer/Timer';
import End from './End/End';
import {
  getScore,
  getHighestScore,
  getAverageReactionTime
} from '../services/all';
import { addEventListener } from '../services/all';
import { GameConditions, gameConditions } from './consts';

const Game: React.FC = () => {
  // const [seconds, setSeconds] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [level, setLevel] = useState<number | null>(null);
  const [currentCondition, setCurrentCondition] = useState<GameConditions>(
    GameConditions.Menu
  );
  const [score, setScore] = useState<number | undefined>();
  const [highestScore, setHighestScore] = useState<number | undefined>();
  const [averageReaction, setAverageReaction] = useState<number | undefined>();

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const changeLevel = (number: number, condition: GameConditions) => {
    setLevel(number);
    setCurrentCondition(condition);
  };

  useEffect(() => {
    addEventListener(() => {
      setScore(getScore());
      setHighestScore(getHighestScore());
      setAverageReaction(getAverageReactionTime());
      return () => {
        window.removeEventListener('resize', updateWindowDimensions);
      };
    });
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
  }, []);

  switch (currentCondition) {
    case gameConditions.menu:
      return <Menu changeLevel={changeLevel} />;
    case gameConditions.timer:
      return <Timer />;
    case gameConditions.action:
      return <Action level={level} changeLevel={changeLevel} />;
    case gameConditions.end:
      return (
        <End
          score={score}
          highestScore={highestScore}
          changeLevel={changeLevel}
          averageReaction={averageReaction}
        />
      );
    default:
      return <Menu changeLevel={changeLevel} />;
  }
};

export default Game;
