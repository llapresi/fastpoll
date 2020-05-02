import React from 'react';
import { Route } from 'react-router-dom';
import {
  HomePage, VotePage, CreatePollPage, PublicPolls,
} from 'Pages';

const Routes = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <Route path="/poll/:pollId" component={VotePage} />
    <Route path="/new" component={CreatePollPage} />
    <Route path="/polls" component={PublicPolls} />
  </div>
);

export default Routes;
