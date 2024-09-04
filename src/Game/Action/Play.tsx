import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Action.css';
import { GridContainer, GridItem } from './styles';
import { gameFlowActions } from '../../store/gameFlow';
import { getActiveBox } from '../../store/gameFlow/selectors';
import { GameConditions } from '../consts';

interface Props {
  columnsCount: number;
  timeOut: any;
}

const Play: React.FC<Props> = ({ columnsCount, timeOut }) => {
  const dispatch = useDispatch();
  const activeBox = useSelector(getActiveBox);
  const [startTime, setStartTime] = useState<number | null>(null);
  const gameBoxesArray = Array.from({ length: columnsCount * columnsCount }, (_, i) => i);
  const { clickOnBox, gameCondition } = gameFlowActions;

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
