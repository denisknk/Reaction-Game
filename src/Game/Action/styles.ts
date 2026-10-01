import styled, { keyframes } from 'styled-components';

const shrink = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.08);
  overflow: hidden;
  flex-shrink: 0;
`;

export const ProgressBar = styled.div<{ duration: number }>`
  height: 100%;
  width: 100%;
  background-color: rgba(255, 77, 109, 0.75);
  transform-origin: left center;
  animation: ${shrink} ${({ duration }) => duration}ms linear forwards;
`;

export const StyledCell = styled.td<{ isActive?: boolean }>`
  ${({ isActive }) => (isActive ? 'background-color: #4ade9b' : null)}
`;

export const GridContainer = styled.div<{ size: number }>`
  display: grid;
  gap: 2px;
  ${({ size }) => `grid-template-columns: repeat(${size}, 1fr);`}
  width: 100%;
  flex-grow: 1;
  padding: 2px;
  box-sizing: border-box;
`;

export const GridItem = styled.div<{ isActive?: boolean }>`
  width: 100%;
  position: relative;
  ${({ isActive }) => (isActive ? 'background-color: #4ade9b' : null)};
  border: solid 3px #4ade9b;
  box-sizing: border-box;
`;
