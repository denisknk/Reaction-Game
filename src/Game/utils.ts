export const getRandomNumber = (columnsCount: number, prevCoordinate?: number | null): number => {
  const gridCount = columnsCount * columnsCount;
  let randomNumber = Math.floor(Math.random() * gridCount);
  while (randomNumber === prevCoordinate) {
    randomNumber = Math.floor(Math.random() * gridCount);
  }

  return randomNumber;
};

export const getAverageReactionTime = (reactionTimes: number[]): number => {
  const total = reactionTimes.reduce((acc, time) => acc + time, 0);
  if (total === 0) return 0;
  const average = total / reactionTimes.length;
  return +average.toFixed(0);
};
