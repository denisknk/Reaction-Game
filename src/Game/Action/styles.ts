import styled from 'styled-components';

export const StyledCell = styled.td<{ isActive?: boolean }>`
  ${({ isActive }) => (isActive ? 'background-color: #4ade9b' : null)}
`;

export const GridContainer = styled.div<{ size: number }>`
  display: grid;
  gap: 2px;
  ${({ size }) => `grid-template-columns: repeat(${size}, 1fr);`}
  width: 100vw;
  height: 100vh;
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
