import styled from '@emotion/styled';
import { SpaceBetweenRow } from 'Utilities';

const PageHeader = styled.div`
  width: 100%;
  background-color: rgb(5, 50, 54);
  color: white;
  padding-top: 60px;
  padding-bottom: 60px;

  @media (max-width: 600px) {
    padding-top: 0px;
    padding-bottom: 56px;
  }
`;

const PageTitle = styled.h1`
  font-size: 48px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 36px;
    padding-bottom: 6px;
  }
`;

const HeaderFlexRow = styled(SpaceBetweenRow)`
  align-items: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export {
  PageHeader,
  PageTitle,
  HeaderFlexRow,
};
