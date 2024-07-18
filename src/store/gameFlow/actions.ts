import { createAction } from 'typesafe-actions';

export const gameFlowActions = {
  addScore: createAction('ADD_SCORE')<void>(),
  resetScore: createAction('RESET_SCORE')<void>()
};
