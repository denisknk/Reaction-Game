import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Action.css';
import { getRenderMatrix } from '../utils';
import { GridContainer, GridItem, StyledCell } from './styles';
import { gameFlowActions } from '../../store/gameFlow';
import { getActiveBox, getReactionTimes, getScore, getSelectedLevel } from '../../store/gameFlow/selectors';
import { GameConditions } from '../consts';

interface Props {
  columnsCount: number;
  timeOut: any;
}

const Play: React.FC<Props> = ({ columnsCount, timeOut }) => {
  const dispatch = useDispatch();
  const currentScore = useSelector(getScore);
  const activeBox = useSelector(getActiveBox);
  const selectedLevel = useSelector(getSelectedLevel);

  const [timeLeft, setTimeLeft] = useState(3);
  const [matrix, setMatrix] = useState(getRenderMatrix(columnsCount));
  const [xAxis, yAxis] = matrix;
  const [startTime, setStartTime] = useState<number | null>(null);
  const gameBoxesArray = Array.from({ length: columnsCount * columnsCount }, (_, i) => i);
  const { gameOver, clickOnBox, gameCondition } = gameFlowActions;

  useEffect(() => {
    setStartTime(Date.now());
    const gameOverTimer = setTimeout(() => {
      dispatch(gameCondition({ condition: GameConditions.EndScreen }));
    }, timeOut);

    return () => clearTimeout(gameOverTimer);
  }, [activeBox, dispatch]);

  const onClick = (clickedIndex: number) => {
    const isCurrentBoxActive = activeBox === clickedIndex;
    if (isCurrentBoxActive) {
      dispatch(clickOnBox({ timeSpent: Date.now() - (startTime as number) }));
    } else {
      dispatch(gameCondition({ condition: GameConditions.EndScreen }));
    }
  };

  return (
    <GridContainer size={columnsCount}>
      {gameBoxesArray.map(idx => (
        <GridItem isActive={idx === activeBox} key={idx} onClick={() => onClick(idx)} />
      ))}
    </GridContainer>
  );
};

export default Play;
