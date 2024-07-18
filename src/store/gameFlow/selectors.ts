import { RootState } from '../rootReducer';

export const getScore = (store: RootState) => store.gameFlow.score;
