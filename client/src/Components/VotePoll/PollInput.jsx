import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { GraphBar } from 'Components';

const InputRow = styled.label`
  display: flex;
  position:relative;
`;

const VoteButton = styled.input`
  opacity:0;
  position:absolute;
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

export default PollInput;
