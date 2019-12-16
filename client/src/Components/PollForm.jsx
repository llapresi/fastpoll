import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { VerticalList } from 'Utilities';
import GraphBar from './GraphBar';

const VoteButton = styled.input`
opacity:0;
position:absolute;
`;

const InputRow = styled.div`
  display: flex;
  position:relative;
  border-radius: 12px;
  overflow: hidden;

  ${(props) => {
    if (!props.showResults) {
      return (`
        input:hover + label,
        input:focus + label {
          .shadow {
            box-shadow: inset 0 3px 30px rgba(0,0,0, 0.2), inset 0 3px 8px rgba(0,0,0, 0.2);
          }
        }
      `);
    }
    return null;
  }}
`;

const OptionShadow = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  box-shadow: inherit;
  transition: box-shadow 0.13s ease-out;
`;

const PollInput = ({
  option, totalVotes, showResults, checked, onChange, animationDelay,
}) => (
  <InputRow showResults={showResults}>
    <VoteButton
      type="radio"
      name="poll"
      value={option.id}
      id={`option${option.id}`}
      onChange={onChange}
      checked={checked}
      showResults={showResults}
    />
    <label style={{width: '100%'}} htmlFor={`option${option.id}`}>
      <GraphBar
        animationDelay={0.16 + animationDelay}
        option={option}
        totalVotes={totalVotes}
        showResults={showResults}
        selected={!showResults ? checked : false}
      />
      <OptionShadow className="shadow" />
    </label>
  </InputRow>
);

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
    <form>
      <VerticalList spacing="12">
        {optionList}
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
  showResults: PropTypes.bool,
  selected: PropTypes.number,
};

PollForm.defaultProps = {
  showResults: true,
  selected: null,
};

export default PollForm;
