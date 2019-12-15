import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import VerticalList from '../Utilities/VerticalList';
import BarGraphBar from './BarGraphBar';
import withOnClick from '../Utilities/withOnClick';

const VoteButton = styled.input`
  display: block;
  opacity: ${props => props.showResults ? '0': '1'};
  transition: opacity 0.14s;
  transition-timing-function: ease-in-out;
`;

const InputRow = styled.div`
  display: flex;
  transform: ${props => props.showResults ? 'translateX(-18px)' : 'inherit'};
  transition: transform 0.14s;
  transition-timing-function: ease-in-out;
`;

const PollInput = ({option, totalVotes, showResults, checked, onChange}) => (
  <InputRow showResults={showResults}>
    <VoteButton
      type="radio"
      name="poll"
      value={option.id}
      onChange={onChange}
      checked={checked}
      showResults={showResults}
    />
    <BarGraphBar animationDelay={0.16} option={option} totalVotes={totalVotes} showResults={showResults} />
  </InputRow>
);


// Displays bar graph
const PollForm = ({
  selected, poll, onChange, onSubmit, showResults
}) => {
  const { PollOptions, totalVotes } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = PollOptions ? PollOptions.map((option, index) => (
    <PollInput option={option} totalVotes={totalVotes} onChange={onChange} showResults={showResults} checked={selected === option.id} />
  )) : <div />;
  return (
    <form>
      <VerticalList spacing="12">
        {optionList}
        {!showResults && <button type='submit' onClick={onSubmit}>Vote</button>}
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
  callback: PropTypes.func,
  selected: PropTypes.number,
  showResults: PropTypes.bool,
};

PollForm.defaultProps = {
  callback: null,
  selected: null,
  showResults: true,
};

export default PollForm;
