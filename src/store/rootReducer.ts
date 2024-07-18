import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import { gameFlowReducer, GameFlowState } from './gameFlow';

export type RootState = {
  gameFlow: GameFlowState;
};

export const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    gameFlow: gameFlowReducer
  });
