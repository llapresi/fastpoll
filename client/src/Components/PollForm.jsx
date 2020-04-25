import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { VerticalList } from 'Utilities';
import GraphBar from './GraphBar';

const VoteButton = styled.input`
  opacity:0;
  position:absolute;
`;

const InputRow = styled.label`
  display: flex;
  position:relative;
`;

const PollInput = ({
  option, totalVotes, showResults, checked, onChange, animationDelay,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <InputRow showResults={showResults}>
      <VoteButton
        type="radio"
        name="poll"
        value={option.id}
        id={`option${option.id}`}
        onChange={onChange}
        checked={checked}
        showResults={showResults}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <GraphBar
        animationDelay={0.16 + animationDelay}
        option={option}
        totalVotes={totalVotes}
        showResults={showResults}
        selected={!showResults ? checked : false}
        focused={focused}
      />
    </InputRow>
  );
};

PollInput.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  totalVotes: PropTypes.number.isRequired,
  showResults: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  animationDelay: PropTypes.number,
};

PollInput.defaultProps = {
  animationDelay: 0,
  showResults: true,
};

// Displays bar graph
const PollForm = ({
  selected, poll, onChange, showResults,
}) => {
  const { PollOptions, totalVotes } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = PollOptions ? PollOptions.map((option, index) => (
    <PollInput
      option={option}
      totalVotes={totalVotes}
      onChange={onChange}
      showResults={showResults}
      checked={selected === option.id}
      key={option.id}
      delay={index * 0.04}
    />
  )) : <div />;
  return (
    <VerticalList spacing="12">
      {optionList}
    </VerticalList>
  );
};

PollForm.propTypes = {
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

PollForm.defaultProps = {
  showResults: true,
  selected: null,
};

export default PollForm;
