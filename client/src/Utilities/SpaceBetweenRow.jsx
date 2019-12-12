import styled from '@emotion/styled';

// Created horizontal flex row where elements recieve equal spacing
// Using if you have two children that need to be aligned left and right respectvely
const SpaceBetweenRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default SpaceBetweenRow;
