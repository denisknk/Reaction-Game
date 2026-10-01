import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import Game from './Game/Game';
import { createRootStore } from './store/rootStore';

export const appHistory = createBrowserHistory();
export const appStore = createRootStore(appHistory);

const App = () => {
  return (
    <Provider store={appStore}>
      <Game />
    </Provider>
  );
};

export default App;
