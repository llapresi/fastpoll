import React from 'react';
import PropTypes from 'prop-types';
import { VerticalList } from 'Utilities';
import PollInput from './PollInput';

// Displays bar graph
const OptionList = ({
  selected, poll, onChange, showResults,
}) => {
  const { PollOptions, totalVotes } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  return (
    <VerticalList spacing="12">
      {PollOptions.map((option, index) => (
        <PollInput
          option={option}
          totalVotes={totalVotes}
          onChange={onChange}
          showResults={showResults}
          checked={selected === option.id}
          key={option.id}
          delay={index * 0.04}
        />
      ))}
    </VerticalList>
  );
};

OptionList.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    PollOptions: PropTypes.array.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showResults: PropTypes.bool,
  selected: PropTypes.number,
};

OptionList.defaultProps = {
  showResults: true,
  selected: null,
};

export default OptionList;
