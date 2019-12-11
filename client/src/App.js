import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PollPage from './Pages/PollPage';

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
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/poll/:pollId" component={PollPage} />
        </div>
      </Router>
    </AppContainer>
  );
}

export default App;
