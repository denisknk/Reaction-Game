import { createStore, applyMiddleware } from 'redux';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from './rootReducer';

export const createRootStore = (history: History) => {
  return createStore(createRootReducer(history), composeWithDevTools(applyMiddleware()));
};
