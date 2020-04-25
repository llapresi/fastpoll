import React from 'react';
import { render } from '@testing-library/react';
import { GraphBar } from 'Components';

const testPollOption = {
  name: 'Test Option',
  id: 2,
  votes: 8,
};

test('renders correct percentage of votes', () => {
  // Setup mock callback
  const { getByText } = render(<GraphBar option={testPollOption} totalVotes={12} />);
  // Test if correct percentage renders
  getByText(/67%/i);
  getByText(/8 votes/i);
});
