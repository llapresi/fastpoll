import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { MemoryRouter } from 'react-router-dom';
import { PublicPolls } from 'Pages';
import { testPollList } from 'Utilities/testData';

// Tests that home page can fetch allpolls api and display polls
test('fetches and renders list of polls', async () => {
  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls', method: 'GET', response: testPollList },
      ]}
    >
      <MemoryRouter>
        <PublicPolls />
      </MemoryRouter>
    </FetchMock>,
  );
  // Test if bars render
  const polls = [];

  for (let i = 0; i < testPollList.length; i += 1) {
    polls.push(waitForElement(() => getByText(testPollList[i].name)));
  }
  await Promise.all(polls);
});
