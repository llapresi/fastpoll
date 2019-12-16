import React from 'react';
import styled from '@emotion/styled';

const TitlebarBackground = styled.div`
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
`;

const TitlebarParent = styled.nav`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

const Titlebar = () => (
  <TitlebarBackground>
    <TitlebarParent>
      Dick
    </TitlebarParent>
  </TitlebarBackground>
);

export default Titlebar;
