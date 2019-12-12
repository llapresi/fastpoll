import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import { MemoryRouter } from 'react-router-dom';
import Routes from './Routes';
import { testPollList } from './Utilities/testData';

test('navigates to route on click', async () => {
  // Setup mock callback
  const { getByText } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls', method: 'GET', response: testPollList },
      ]}
    >
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    </FetchMock>,
  );
  // <Routes /> loads HomePage component, thus we're testing for the "Create a New Poll" link
  await waitForElement(() => getByText(/Create a New Poll/));
  // Click the link and see if the New Poll page comes up
  fireEvent.click(getByText(/Create a New Poll/));
  await waitForElement(() => getByText(/Poll Name:/));
});
