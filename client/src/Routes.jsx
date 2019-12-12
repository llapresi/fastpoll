import React from 'react';
import {
  Route,
} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PollPage from './Pages/PollPage';
import CreatePollPage from './Pages/CreatePollPage';

const Routes = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <Route path="/poll/:pollId" component={PollPage} />
    <Route path="/new" component={CreatePollPage} />
  </div>
);

export default Routes;
