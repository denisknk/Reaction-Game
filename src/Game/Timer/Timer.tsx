import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
  // eslint-disable-next-line
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 1) {
        clearInterval(interval);
      }
      setTimeLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="body_wrapper">
      <div className="instructions">Choose Difficulty Level</div>
      <div className="timer-wrapper">{timeLeft}</div>
    </div>
  );
};

export default Timer;
