import React, { useEffect, useState } from 'react';
import './Timer.css';
import { gameFlowActions } from '../../store/gameFlow';
import { GameConditions } from '../consts';
import { useDispatch } from 'react-redux';

const Timer = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 1) {
        clearInterval(interval);
        dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Game }));
      }
      setTimeLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  return (
    <div className="body_wrapper">
      <div className="instructions">Choose Difficulty Level</div>
      <div className="timer-wrapper">{timeLeft}</div>
    </div>
  );
};

export default Timer;
