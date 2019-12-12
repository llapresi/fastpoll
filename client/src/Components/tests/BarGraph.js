import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BarGraph from '../BarGraph';
import { testPoll } from '../../Utilities/testData';

test('callback correctly recieves selected option id', () => {
  // Setup mock callback
  const onClick = jest.fn();
  const { getByText } = render(<BarGraph poll={testPoll} callback={onClick} />);
  fireEvent.click(getByText(/Option Whatever/i));
  // callback should recieve id of option selected
  expect(onClick).toHaveBeenCalledWith(10);
});
