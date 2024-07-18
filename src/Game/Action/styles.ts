import styled from 'styled-components';

export const StyledCell = styled.td<{ isActive?: boolean }>`
  ${({ isActive }) => (isActive ? 'background-color: #4ade9b' : null)}
`;
