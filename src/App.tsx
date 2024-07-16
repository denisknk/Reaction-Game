import React from 'react';
import Game from './Game/Game';
import * as serviceWorker from './serviceWorker';

const App = () => <Game />;

export default App;

serviceWorker.unregister();
