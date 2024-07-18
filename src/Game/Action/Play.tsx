import React, { useEffect, useState } from 'react';
import './Action.css';
import {
  updateScore,
  endTimeCount,
  getAverageReactionTime,
  handleTimeout
} from '../../services/all';
import { GameConditions } from '../consts';
import { getRandomNumbersArray, getRenderMatrix } from '../utils';
import { StyledCell } from './styles';

interface Props {
  columnsCount: number;
  changeLevel: (number: number, condition: GameConditions) => void;
  timeOut: any;
}

const Play: React.FC<Props> = ({ columnsCount, changeLevel, timeOut }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [randomNumbersArr, setRandomNumbersArr] = useState(
    getRandomNumbersArray(columnsCount)
  );
  const [matrix, setMatrix] = useState(getRenderMatrix(columnsCount));
  const [xAxis, yAxis] = matrix;

  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     if (!isGameStarted) {
  //       changeLevel(columnsCount - 2, GameConditions.End);
  //     }
  //     clearInterval(interval);
  //   }, timeOut);
  //
  //   return () => clearInterval(interval);
  // }, []);

  const [check, setCheck] = useState(false);

  const onClick = (isActiveElement: boolean) => {
    setIsGameStarted(true);
    // endTimeCount();

    if (isActiveElement) {
      handleTimeout(changeLevel, timeOut);

      updateScore(); // добавляем балл за правильно нажатый квадратик
      setCheck(true); // сравнить рандомы тут, иметь переменную в которой хранить прошлое значение квадратика
    } else {
      getAverageReactionTime();
      changeLevel(columnsCount - 2, GameConditions.End);
    }
  };

  if (check) {
    setRandomNumbersArr(getRandomNumbersArray(columnsCount));
    setCheck(false);
  }

  return (
    <table>
      <tbody>
        {xAxis.map((el, i) => {
          return (
            <tr key={i}>
              {yAxis.map((el, idx) => {
                if (
                  i + 1 === randomNumbersArr[0] &&
                  idx + 1 === randomNumbersArr[1]
                ) {
                  return (
                    <StyledCell
                      isActive
                      key={idx}
                      onClick={() => onClick(true)}
                    />
                  );
                }
                return <StyledCell key={idx} onClick={() => onClick(false)} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Play;
