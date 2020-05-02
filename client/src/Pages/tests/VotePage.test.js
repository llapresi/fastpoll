import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { MemoryRouter } from 'react-router-dom';
import { PusherMock } from 'pusher-js-mock';
import { testPoll } from 'Utilities/testData';
import { VotePage } from 'Pages';
import { PusherProvider } from 'Contexts/PusherContext';

// provided to PollPage component as mock poll id
const match = {
  params: {
    pollId: 'roflcopter',
  },
};

test('fetches poll on component mount and renders correctly', async () => {
  const pusher = new PusherMock();

  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/roflcopter', method: 'GET', response: testPoll },
      ]}
    >
      <PusherProvider value={pusher}>
        <MemoryRouter>
          <VotePage match={match} />
        </MemoryRouter>
      </PusherProvider>
    </FetchMock>,
  );
  // Test if bars render
  await waitForElement(() => getByText(/Option Whatever/i));
  // Test of poll title renders
  await waitForElement(() => getByText(/Test poll/i));
});

test('Posts a vote to server and renders a response', async () => {
  const pusher = new PusherMock();

  // Setup mock callback
  const { getByText, getByLabelText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/roflcopter', method: 'GET', response: testPoll },
        { matcher: '/api/vote/', method: 'POST', response: '"You voted for Option Whatever"' },
      ]}
    >
      <PusherProvider value={pusher}>
        <MemoryRouter>
          <VotePage match={match} />
        </MemoryRouter>
      </PusherProvider>
    </FetchMock>,
  );
  // Test if click event works
  await waitForElement(() => getByLabelText(/Option Whatever/i));
  fireEvent.click(getByLabelText(/Option Whatever/i), {
    selector: 'input',
  });
  fireEvent.click(getByText('Vote'));
  // Test of poll title renders
  await waitForElement(() => getByText('You voted for Option Whatever'));
});
