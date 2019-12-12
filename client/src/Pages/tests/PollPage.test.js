import React from 'react';
import { render, fireEvent, waitForElement  } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { MemoryRouter } from 'react-router-dom';
import PollPage from '../PollPage';
import { testPoll } from '../../Utilities/testData';

// provided to PollPage component as mock poll id
const match = {
  params: {
    pollId: 'roflcopter'
  }
}

test('fetches poll on component mount and renders correctly', async () => {
  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/roflcopter', method: 'GET', response: testPoll}
      ]}
    >
      <MemoryRouter>
        <PollPage match={match} />
      </MemoryRouter>
    </FetchMock>
  );
  // Test if bars render
  await waitForElement(() => getByText(/Option Whatever/i));
  // Test of poll title renders
  await waitForElement(() => getByText(/Test poll/i));
});

test('Posts vote to server and renders response', async () => {
  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/roflcopter', method: 'GET', response: testPoll},
        { matcher: '/api/vote/', method: 'POST', response: '"You voted for Option Whatever"'}
      ]}
    >
      <MemoryRouter>
        <PollPage match={match} />
      </MemoryRouter>
    </FetchMock>
  );
  // Test if bars render
  await waitForElement(() => getByText('Option Whatever'));
  fireEvent.click(getByText(/Option Whatever/i))
  // Test of poll title renders
  await waitForElement(() => getByText('You voted for Option Whatever'));
});