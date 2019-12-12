import React from 'react';
import { render, fireEvent, waitForElement  } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { testPollList } from '../../Utilities/testData';

// provided to PollPage component as mock poll id
const match = {
  params: {
    pollId: 'roflcopter'
  }
}

test('fetches and renders list of polls', async () => {
  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls', method: 'GET', response: testPollList}
      ]}
    >
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </FetchMock>
  );
  // Test if bars render
  for(let i = 0; i < testPollList.length; i += 1) {
    await waitForElement(() => getByText(testPollList[i].name));
  }
});
