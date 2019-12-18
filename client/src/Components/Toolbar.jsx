import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { WidthParent } from 'Utilities';

const TitlebarBackground = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(2, 33, 36);
  color: white;
`;

const TitlebarParent = styled.nav`
  width: 100%;
  height 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Title = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  color: white;
  text-decoration: none;

  :hover {
    color: rgb(225, 240, 242);
  }
`;


const Titlebar = () => (
  <TitlebarBackground>
    <WidthParent>
      <TitlebarParent>
        <Title to="/">Fastpoll</Title>
      </TitlebarParent>
    </WidthParent>
  </TitlebarBackground>
);

export default Titlebar;
