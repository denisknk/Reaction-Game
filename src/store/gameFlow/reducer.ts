import { ActionType, createReducer } from 'typesafe-actions';
import { gameFlowActions } from './actions';

export interface GameFlowState {
  score: number;
}

const gameFlowDefaultState = {
  score: 0
};

export const gameFlowReducer = createReducer<GameFlowState, ActionType<typeof gameFlowActions>>(gameFlowDefaultState)
  .handleAction(
    gameFlowActions.addScore,
    (state): GameFlowState => ({
      ...state,
      score: state.score + 1
    })
  )
  .handleAction(
    gameFlowActions.resetScore,
    (state): GameFlowState => ({
      ...state,
      ...gameFlowDefaultState
    })
  );
