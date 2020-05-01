import React from 'react';
import { PollList } from 'Components';
import { WidthParent } from 'Utilities';

const PublicPolls = () => (
  <WidthParent>
    <h1>Polls:</h1>
    <PollList />
  </WidthParent>
);

export default PublicPolls;
