import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { PusherProvider } from '@harelpls/use-pusher';
import { Toolbar } from 'Components';
import Routes from './Routes';

const pusherConfig = {
  clientKey: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: 'mt1',
};

const AppContainer = styled.div`
  * {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
  }
`;

function App() {
  return (
    <PusherProvider clientKey={pusherConfig.clientKey} cluster={pusherConfig.cluster}>
      <AppContainer>
        <Router>
          <Toolbar />
          <Routes />
        </Router>
      </AppContainer>
    </PusherProvider>
  );
}

export default App;
