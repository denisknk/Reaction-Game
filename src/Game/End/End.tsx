import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './End.css';
import { emptyValuePlaceholder, GameConditions } from '../consts';
import { getAllScoresArray, getReactionTimes, getScore } from '../../store/gameFlow/selectors';
import { gameFlowActions } from '../../store/gameFlow';
import { getAverageReactionTime } from '../utils';

const End: React.FC = () => {
  const dispatch = useDispatch();
  const currentScore = useSelector(getScore);
  const reactionTimes = useSelector(getReactionTimes);
  const averageReactionTime = getAverageReactionTime(reactionTimes);
  const allScoresArray = useSelector(getAllScoresArray);
  const handleClick = () => {
    dispatch(gameFlowActions.resetState());
    dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Menu }));
  };
  const highestScore = Math.max(...allScoresArray);
  const averageTimeText = averageReactionTime ? `${averageReactionTime} milliseconds` : emptyValuePlaceholder;

  return (
    <div className="body_wrapper">
      <div id="gameover">
        <span className="gameoverheader">GAME OVER!</span>
        <div className="title_header">Average Reaction Time</div>
        <span className="title_body">{averageTimeText}</span>
        <div className="title_header">Score</div>
        <span className="title_body">{currentScore || emptyValuePlaceholder}</span>
        <div className="title_header">Highest Score</div>
        <span className="title_body">{highestScore}</span>
        <span className="restart" onClick={handleClick}>
          Restart
        </span>
      </div>
    </div>
  );
};

export default End;
