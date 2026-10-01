import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Action.css';
import { GameWrapper, GridContainer, GridItem, ProgressBar, ProgressBarWrapper } from './styles';
import { gameFlowActions } from '../../store/gameFlow';
import { getActiveBox, getScore } from '../../store/gameFlow/selectors';
import { GameConditions } from '../consts';

interface Props {
  columnsCount: number;
  timeOut: number;
}

const Play: React.FC<Props> = ({ columnsCount, timeOut }) => {
  const dispatch = useDispatch();
  const activeBox = useSelector(getActiveBox);
  const score = useSelector(getScore);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const isGameOverRef = useRef<boolean>(false);
  const gameBoxesArray = Array.from({ length: columnsCount * columnsCount }, (_, i) => i);
  const { clickOnBox, gameCondition } = gameFlowActions;

  useEffect(() => {
    isGameOverRef.current = false;
    const start = Date.now();
    startTimeRef.current = start;
    let animId: number;

    const tick = () => {
      if (isGameOverRef.current) return;
      const elapsed = Date.now() - start;
      const remainingRatio = Math.max(0, 1 - elapsed / timeOut);

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${remainingRatio})`;
      }

      if (elapsed >= timeOut) {
        isGameOverRef.current = true;
        dispatch(gameCondition({ condition: GameConditions.EndScreen }));
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      isGameOverRef.current = true;
      cancelAnimationFrame(animId);
    };
  }, [score, dispatch, timeOut, gameCondition]);

  const onClick = (clickedIndex: number) => {
    if (isGameOverRef.current) return;
    const isCurrentBoxActive = activeBox === clickedIndex;
    if (isCurrentBoxActive) {
      dispatch(clickOnBox({ timeSpent: Date.now() - startTimeRef.current }));
    } else {
      isGameOverRef.current = true;
      dispatch(gameCondition({ condition: GameConditions.EndScreen }));
    }
  };

  return (
    <GameWrapper>
      <ProgressBarWrapper>
        <ProgressBar ref={progressBarRef} />
      </ProgressBarWrapper>
      <GridContainer size={columnsCount}>
        {gameBoxesArray.map(idx => (
          <GridItem isActive={idx === activeBox} key={idx} onClick={() => onClick(idx)} />
        ))}
      </GridContainer>
    </GameWrapper>
  );
};

export default Play;
