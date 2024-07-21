import React, { Component, useState } from 'react';
import './Levels.css';
import Dot from './Dot/Dot';
import { useDispatch } from 'react-redux';
import { gameFlowActions } from '../../store/gameFlow';
import { GameConditions } from '../consts';
import { startTimeCount } from '../../services/all';
// import { Link } from "react-router-dom";

const Levels: React.FC = () => {
  const dispatch = useDispatch();
  const [colors, setColors] = useState(['#555555', '#555555', '#555555']);

  const setDefaultColor = () => {
    setColors(['#555555', '#555555', '#555555']);
  };

  const onHover = (index: number) => {
    switch (index) {
      case 0:
        setColors(['#59DB28', '#555555', '#555555']);
        break;
      case 1:
        setColors(['#F6B921', '#F6B921', '#555555']);

        break;
      case 2:
        setColors(['#CA0424', '#CA0424', '#CA0424']);

        break;
      default:
        return;
    }
  };

  const onGameStart = (index: number) => {
    const matrixWidth = index + 3;
    dispatch(gameFlowActions.startGame({ columnsCount: matrixWidth, selectedLevel: index }));
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
    dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Game }));
    setTimeout(() => {
      dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Game })); // changeLevel(index, GameConditions.Action);
      startTimeCount();
      // handleTimeout(changeLevel, timeOut);
    }, 3000);
  };

  return (
    <div className="levels__wrapper">
      {colors.map((color, index) => (
        <Dot
          color={color}
          blur={setDefaultColor}
          hover={() => onHover(index)}
          // press={() => onSelect(index)}
          press={() => onGameStart(index)}
          key={index}
        />
      ))}
    </div>
  );
};

export default Levels;
