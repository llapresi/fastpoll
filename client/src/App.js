import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './Routes';
import { Toolbar } from 'Components';

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
        <Routes />
      </Router>
    </AppContainer>
  );
}

export default App;
