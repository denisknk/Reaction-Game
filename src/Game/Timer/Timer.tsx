import React, { useEffect, useState } from 'react';
import './Timer.css';
import { gameFlowActions } from '../../store/gameFlow';
import { GameConditions } from '../consts';
import { useDispatch } from 'react-redux';

const Timer = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Game }));
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, dispatch]);

  return (
    <div className="body_wrapper">
      <div className="instructions">Get Ready!</div>
      <div className="timer-wrapper">{timeLeft > 0 ? timeLeft : ''}</div>
    </div>
  );
};

export default Timer;
