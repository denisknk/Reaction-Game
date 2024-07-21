import { RootState } from '../rootReducer';

export const getScore = (store: RootState) => store.gameFlow.score;
export const getActiveBox = (store: RootState) => store.gameFlow.currentBox;
export const geCurrentGameCondition = (store: RootState) => store.gameFlow.currentGameCondition;
export const getSelectedLevel = (store: RootState) => store.gameFlow.selectedLevel;
export const getReactionTimes = (store: RootState) => store.gameFlow.reactionTimes;
export const getAllScoresArray = (store: RootState) => store.gameFlow.allScores;
