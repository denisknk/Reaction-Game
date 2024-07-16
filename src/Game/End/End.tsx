import React from 'react';
import './End.css';
import { clearScore } from '../../services/all';
import { GameConditions } from '../consts';

interface Props {
  averageReaction?: number;
  score?: number;
  highestScore?: number;
  changeLevel: (number: number, condition: GameConditions) => void;
}

const End: React.FC<Props> = ({
  averageReaction,
  score,
  highestScore,
  changeLevel
}) => {
  const handleClick = () => {
    clearScore();
    changeLevel(1, GameConditions.Menu);
  };
  return (
    <div className="body_wrapper">
      <div id="gameover">
        <span className="gameoverheader">GAME OVER!</span>
        <div className="title_header">Average Reaction Time</div>
        <span className="title_body">{averageReaction} milliseconds</span>
        <div className="title_header">Score</div>
        <span className="title_body">{score}</span>
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
