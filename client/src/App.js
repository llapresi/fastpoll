import React from 'react';
import styled from '@emotion/styled'
import PollList from './Components/PollList';

const AppContainer = styled.div`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  return (
    <AppContainer>
      <PollList>
      </PollList>
    </AppContainer>
  );
}

export default App;
