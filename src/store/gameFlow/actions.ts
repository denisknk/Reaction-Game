import { createAction } from 'typesafe-actions';
import { GameConditions } from '../../Game/consts';

interface ClickOnBox {
  timeSpent: number;
}

export const gameFlowActions = {
  resetState: createAction('RESET_SCORE')<void>(),
  clickOnBox: createAction('CLICK_ON_BOX')<ClickOnBox>(),
  gameOver: createAction('GAME_OVER')<void>(),
  startGame: createAction('START_GAME')<{ columnsCount: number; selectedLevel: number }>(),
  gameCondition: createAction('GAME_CONDITION')<{ condition: GameConditions }>()
};
