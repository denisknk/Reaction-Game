import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
  // eslint-disable-next-line
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    // clearInterval(timer);
    // let timer = setInterval(() => {
    //   let timeLeftLocal = timeLeft - 1;
    //   if (timeLeft === 1) {
    //     clearInterval(timer);
    //   }
    //   setTimeLeft(timeLeftLocal);
    // }, 1000);
    // return () => {
    //   // clearInterval(timer);
    // };
  }, [timeLeft]);

  return (
    <div className="body_wrapper">
      <div className="instructions">Choose Difficulty Level</div>
      <div className="timer-wrapper">{timeLeft}</div>
    </div>
  );
};

export default Timer;
