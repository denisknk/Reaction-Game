let eventListeners = [];
let score = 0;
let highestScore = 0;
let startTime = 0;
let endTime = 0;
let timeDiff = 0;
// let changedTimeOut = 0;
let countCheck = 0;
const averageReactionTime = [];
// import { minReactionTime } from "../Game/timings";

function emmit() {
  eventListeners.forEach((fn) => {
    fn();
  });
}

function addEventListener(fn) {
  eventListeners.push(fn);
}

const updateScore = () => {
  score = score + 1;
  if (score >= highestScore) {
    highestScore = score;
  }

  emmit();
};
const clearScore = () => {
  score = 0;
  countCheck = 0;
  emmit();
};

const getScore = () => {
  return score;
};
const getHighestScore = () => {
  return highestScore;
};

function startTimeCount() {
  startTime = new Date();
  emmit();
}

function makeTimeDiff() {
  endTime = new Date();
  timeDiff = endTime - startTime;
}

function endTimeCount() {
  endTime = new Date();
  timeDiff = endTime - startTime; //in ms
  averageReactionTime.push(timeDiff);
  // console.log(timeDiff);
  startTimeCount();

  emmit();
}

function getAverageReactionTime() {
  if (averageReactionTime.length === 0) return;
  let timeToReturn = averageReactionTime.reduce((acc, currVal) => {
    return acc + currVal;
  });
  timeToReturn = timeToReturn / averageReactionTime.length;
  // console.log(timeToReturn.toFixed(3));
  return timeToReturn.toFixed(3);
}

function getTimeDiff() {
  return timeDiff;
}

function getAverageReactionTimeArray() {
  return averageReactionTime;
}

function handleTimeout(changeLevel, timeOut) {
  setTimeout(() => {
    if (
      averageReactionTime.length === 0 ||
      averageReactionTime.length === countCheck
    ) {
      console.log("не успел", getTimeDiff());
      changeLevel(1, "end");
      return;
    }
    countCheck = averageReactionTime.length;
  }, timeOut);
}

export {
  updateScore,
  addEventListener,
  getScore,
  getHighestScore,
  clearScore,
  startTimeCount,
  endTimeCount,
  getAverageReactionTime,
  getTimeDiff,
  makeTimeDiff,
  getAverageReactionTimeArray,
  handleTimeout,
};
