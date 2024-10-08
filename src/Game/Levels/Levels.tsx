import React, { Component, useState } from 'react';
import './Levels.css';
import Dot from './Dot/Dot';
import { useDispatch } from 'react-redux';
import { gameFlowActions } from '../../store/gameFlow';

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

  return (
    <div className="levels__wrapper">
      {colors.map((color, index) => (
        <Dot
          color={color}
          blur={setDefaultColor}
          hover={() => onHover(index)}
          press={() => onGameStart(index)}
          key={index}
        />
      ))}
    </div>
  );
};

export default Levels;
