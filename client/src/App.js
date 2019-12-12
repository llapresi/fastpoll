import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PollPage from './Pages/PollPage';
import CreatePollPage from './Pages/CreatePollPage';
import Routes from './Routes';

const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
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
