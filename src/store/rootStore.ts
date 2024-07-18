import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const createRootStore = (history: History) => {
  const middlewares = [sagaMiddleware];
  return createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(...middlewares)));
};
