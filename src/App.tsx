import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import Game from './Game/Game';
import * as serviceWorker from './serviceWorker';
import { createRootStore } from './store/rootStore';

export const appHistory = createBrowserHistory();
export const appStore = createRootStore(appHistory);

const App = () => {
  const state = appStore.getState();

  return (
    <Provider store={appStore}>
      <Game />
    </Provider>
  );
};

export default App;

serviceWorker.unregister();
