const getRandomNumber = (columnsCount: number) => {
  return Math.floor(Math.random() * columnsCount) + 1;
};
export const getRandomNumbersArray = (columnsCount: number) => {
  let xRandom = getRandomNumber(columnsCount);
  let yRandom = getRandomNumber(columnsCount);
  return [xRandom, yRandom];
};

export const getRenderMatrix = (columnsCount: number) => {
  const arrX: number[] = [];
  const arrY: number[] = [];
  arrX.length = columnsCount;
  arrX.fill(1);
  arrY.length = columnsCount;
  arrY.fill(1);
  return [arrX, arrY];
};
