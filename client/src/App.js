import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Toolbar } from 'Components';
import Routes from './Routes';

const AppContainer = styled.div`
  * {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
  }
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Toolbar />
        <Routes />
      </Router>
    </AppContainer>
  );
}

export default App;
