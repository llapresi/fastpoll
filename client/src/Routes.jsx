import React from 'react';
import {
  Route,
} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import VotePage from './Pages/VotePage';
import CreatePollPage from './Pages/CreatePollPage';

const Routes = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <Route path="/poll/:pollId" component={VotePage} />
    <Route path="/new" component={CreatePollPage} />
  </div>
);

export default Routes;
