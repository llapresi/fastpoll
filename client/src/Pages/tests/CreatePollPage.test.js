import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import { CreatePollPage } from 'Pages';
import { testPoll } from 'Utilities/testData';

test('renders CreatePollPage correctly', async () => {
  // Setup mock callback
  const { getByText } = render(
    <MemoryRouter>
      <CreatePollPage />
    </MemoryRouter>,
  );
  // Test if Add Option Button renders
  await waitForElement(() => getByText(/Add Option/i));
});

test('Adds and removes new poll options', async () => {
  // Setup mock callback
  const {
    getByText, getByTitle, getAllByPlaceholderText,
  } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/', method: 'POST', response: { urlId: testPoll.urlId } },
      ]}
    >
      <MemoryRouter>
        <CreatePollPage />
      </MemoryRouter>
    </FetchMock>,
  );
  // Test if we start with two poll options
  await waitForElement(() => getByText(/Add Option/i));
  expect(getAllByPlaceholderText(/Option/i)).toHaveLength(2);
  // Add a third poll option
  fireEvent.click(getByText(/Add Option/i));
  await waitForElement(() => getAllByPlaceholderText(/Option/i));
  expect(getAllByPlaceholderText(/Option/i)).toHaveLength(3);
  // Remove a poll option
  fireEvent.click(getByTitle(/Remove Option 2/i));
  await waitForElement(() => getAllByPlaceholderText(/Option/i));
  expect(getAllByPlaceholderText(/Option/i)).toHaveLength(2);
});

test('Shows poll name validation errors', async () => {
  // Setup mock callback
  const {
    getByText, getByPlaceholderText,
  } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/', method: 'POST', response: { urlId: testPoll.urlId } },
      ]}
    >
      <MemoryRouter>
        <CreatePollPage />
      </MemoryRouter>
    </FetchMock>,
  );
  // Test if empty poll name returns proper message
  await waitForElement(() => getByText(/Add Option/i));
  fireEvent.change(getByPlaceholderText(/Option 1 Name/i), { target: { value: 'TestOption 1' } });
  fireEvent.change(getByPlaceholderText(/Option 2 Name/i), { target: { value: 'TestOption 2' } });
  fireEvent.click(getByText(/Submit/i));
  await waitForElement(() => getByText(/Poll name is required/i));
  // Test if long poll name returns proper message
  fireEvent.change(getByPlaceholderText(/New Poll Name:/i), { target: { value: 'This is a poll name over 60 characters long to test validation.' } });
  fireEvent.click(getByText(/Submit/i));
  await waitForElement(() => getByText(/Maximum poll name length is 60 characters/i));
});

test('Shows poll option validation errors', async () => {
  // Setup mock callback
  const {
    getByText, getByPlaceholderText,
  } = render(
    <FetchMock
      mocks={[
        { matcher: '/api/polls/', method: 'POST', response: { urlId: testPoll.urlId } },
      ]}
    >
      <MemoryRouter>
        <CreatePollPage />
      </MemoryRouter>
    </FetchMock>,
  );
  // Test if empty poll option name returns proper message
  await waitForElement(() => getByText(/Add Option/i));
  fireEvent.change(getByPlaceholderText(/New Poll Name:/i), { target: { value: 'This is a proper poll name.' } });
  fireEvent.change(getByPlaceholderText(/Option 1 Name/i), { target: { value: '' } });
  fireEvent.change(getByPlaceholderText(/Option 2 Name/i), { target: { value: 'TestOption 2' } });
  fireEvent.click(getByText(/Submit/i));
  await waitForElement(() => getByText(/Poll Option name is required/i));
  // Test if long poll option name returns proper message
  fireEvent.change(getByPlaceholderText(/Option 1 Name/i), { target: { value: 'This is a poll option name over 60 characters long to test validation.' } });
  fireEvent.click(getByText(/Submit/i));
  await waitForElement(() => getByText(/Maximum option name length is 60 characters/i));
});
