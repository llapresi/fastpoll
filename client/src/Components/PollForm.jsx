import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { VerticalList } from 'Utilities';
import GraphBar from './GraphBar';

const VoteButton = styled.input`
  display: block;
  opacity: ${(props) => (props.showResults ? '0' : '1')};
  transition: opacity 0.14s;
  transition-timing-function: ease-in-out;
`;

const InputRow = styled.label`
  display: flex;
  transform: ${(props) => (props.showResults ? 'translateX(-18px)' : 'inherit')};
  transition: transform 0.14s;
  transition-timing-function: ease-in-out;
`;

const PollInput = ({
  option, totalVotes, showResults, checked, onChange,
}) => (
  <InputRow showResults={showResults}>
    <VoteButton
      type="radio"
      name="poll"
      value={option.id}
      onChange={onChange}
      checked={checked}
      showResults={showResults}
    />
    <GraphBar
      animationDelay={0.16}
      option={option}
      totalVotes={totalVotes}
      showResults={showResults}
    />
  </InputRow>
);

PollInput.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  totalVotes: PropTypes.number.isRequired,
  showResults: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};


// Displays bar graph
const PollForm = ({
  selected, poll, onChange, onSubmit, showResults,
}) => {
  const { PollOptions, totalVotes } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = PollOptions ? PollOptions.map((option) => (
    <PollInput
      option={option}
      totalVotes={totalVotes}
      onChange={onChange}
      showResults={showResults}
      checked={selected === option.id}
      key={option.id}
    />
  )) : <div />;
  return (
    <form>
      <VerticalList spacing="12">
        {optionList}
        {!showResults && <button type="submit" onClick={onSubmit} disabled={selected === null}>Vote</button>}
      </VerticalList>
    </form>
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
  onSubmit: PropTypes.func.isRequired,
  showResults: PropTypes.bool,
  selected: PropTypes.number,
};

PollForm.defaultProps = {
  showResults: true,
  selected: null,
};

export default PollForm;
