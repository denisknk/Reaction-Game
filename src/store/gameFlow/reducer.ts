import { ActionType, createReducer } from 'typesafe-actions';
import { gameFlowActions } from './actions';
import { getRandomNumber } from '../../Game/utils';
import { GameConditions } from '../../Game/consts';

export interface GameFlowState {
  score: number;
  allScores: number[];
  isGameStarted: boolean;
  isGameOver: boolean;
  currentBox: null | number;
  reactionTimes: number[];
  currentGameCondition: GameConditions;
  selectedLevel: number;
}

const gameFlowDefaultState: GameFlowState = {
  score: 0,
  allScores: [],
  isGameOver: false,
  isGameStarted: false,
  currentBox: null,
  reactionTimes: [],
  currentGameCondition: GameConditions.Menu,
  selectedLevel: 0
};

export const gameFlowReducer = createReducer<GameFlowState, ActionType<typeof gameFlowActions>>(gameFlowDefaultState)
  .handleAction(
    gameFlowActions.resetState,
    (state): GameFlowState => ({
      ...state,
      ...gameFlowDefaultState,
      allScores: state.allScores
    })
  )
  .handleAction(
    gameFlowActions.clickOnBox,
    (state, { payload }): GameFlowState => ({
      ...state,
      reactionTimes: [...state.reactionTimes, payload.timeSpent],
      score: state.score + 1,
      currentBox: getRandomNumber(state.selectedLevel + 3, state.currentBox)
    })
  )
  .handleAction(
    gameFlowActions.startGame,
    (state, { payload }): GameFlowState => ({
      ...state,
      isGameStarted: true,
      isGameOver: false,
      reactionTimes: [],
      currentBox: getRandomNumber(payload.columnsCount),
      currentGameCondition: GameConditions.Timer,
      selectedLevel: payload.selectedLevel
    })
  )
  .handleAction(
    gameFlowActions.gameCondition,
    (state, { payload }): GameFlowState => ({
      ...state,
      currentGameCondition: payload.condition,
      ...(payload.condition === GameConditions.EndScreen
        ? {
            isGameOver: true,
            isGameStarted: false,
            currentBox: null,
            allScores: [...state.allScores, state.score]
          }
        : {})
    })
  )
  .handleAction(
    gameFlowActions.gameOver,
    (state): GameFlowState => ({
      ...state,
      isGameOver: true,
      isGameStarted: false,
      currentBox: null
    })
  );
