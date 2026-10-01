import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './End.css';
import { emptyValuePlaceholder, GameConditions } from '../consts';
import { getAllScoresArray, getReactionTimes, getScore } from '../../store/gameFlow/selectors';
import { gameFlowActions } from '../../store/gameFlow';
import { getAverageReactionTime } from '../utils';

const End: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentScore = useSelector(getScore);
  const reactionTimes = useSelector(getReactionTimes);
  const averageReactionTime = getAverageReactionTime(reactionTimes);
  const allScoresArray = useSelector(getAllScoresArray);
  const handleClick = () => {
    dispatch(gameFlowActions.resetState());
    dispatch(gameFlowActions.gameCondition({ condition: GameConditions.Menu }));
  };
  const highestScore = allScoresArray.length > 0 ? Math.max(...allScoresArray) : currentScore;
  const averageTimeText = averageReactionTime
    ? `${averageReactionTime} ${t('milliseconds', 'milliseconds')}`
    : emptyValuePlaceholder;

  return (
    <div className="body_wrapper">
      <div id="gameover">
        <span className="gameoverheader">{t('gameOver', 'GAME OVER!')}</span>
        <div className="title_header">{t('averageReactionTime', 'Average Reaction Time')}</div>
        <span className="title_body">{averageTimeText}</span>
        <div className="title_header">{t('score', 'Score')}</div>
        <span className="title_body">{currentScore}</span>
        <div className="title_header">{t('highestScore', 'Highest Score')}</div>
        <span className="title_body">{highestScore}</span>
        <span className="restart" onClick={handleClick}>
          {t('restart', 'Restart')}
        </span>
      </div>
    </div>
  );
};

export default End;
