import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Pusher from 'pusher-js';
import { Toolbar } from 'Components';
import Routes from './Routes';
import { PusherProvider } from './Contexts/PusherContext';

const AppContainer = styled.div`
  * {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
  }
`;


const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: 'mt1',
  forceTLS: true,
});


function App() {
  return (
    <PusherProvider value={pusherClient}>
      <AppContainer>
        <Router>
          <Toolbar />
          <div style={{ marginTop: '60px' }}><Routes /></div>
        </Router>
      </AppContainer>
    </PusherProvider>
  );
}

export default App;
