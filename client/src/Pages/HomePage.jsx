import React from 'react';
import { Link } from 'react-router-dom';
import { PollList } from 'Components';
import { WidthParent } from 'Utilities';

const HomePage = () => (
  <WidthParent>
    <h1>Welcome to Fastpoll</h1>
    <p>Fastpoll is the easiest way to create a real-time poll.</p>
    <h2><Link to="/new">Create a New Poll</Link></h2>
    <PollList />
  </WidthParent>
);

export default HomePage;
