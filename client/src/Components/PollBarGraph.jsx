import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import VerticalList from '../Utilities/VerticalList';
import SpaceBetweenRow from '../Utilities/SpaceBetweenRow';

const Bar = styled.div`
  position: relative;
  height: 80px;
  width: 100%;
  background-color: #d6d6d6;
  transition: transform 0.13s;
  transition-timing-function: ease-out;
  
  :hover {
    transform: ${(props) => props.hover ? 'translateY(-4px)' : 'initial'};
  }
`;

const BarFlexContainer = styled(SpaceBetweenRow)`
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 12px;
`;

const BarShading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform-origin: top left;
  transform: scale(${(props) => props.width / 100}, 1);
  background-color: ${(props) => (props.selected ? 'green' : 'blue')};
  transition: transform 0.3s, background-color 0.2s;
  transition-timing-function: ease-out;
`;

const BarTitle = styled.h2`
  display: inline;
  margin: 0;
`;

const BarInfo = styled.span`
  display: flex;
  flex-direction: column;
`;

const BarPercentage = styled.h3`
  display: inline;
  padding: 0px;
  margin: 0px;
`;

// Displays bar graph
const PollBarGraph = ({ poll, callback, selected, hover }) => {
  const { totalVotes, PollOptions } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = PollOptions ? PollOptions.map((option) => {
    const { name, votes, id } = option;
    // Calc our percentage filled
    const percentage = Math.round((votes / totalVotes) * 100);
    const isSelected = selected === id;
    // Create our bar info if we have more than 0 votes
    const barInfo = (
      <BarInfo>
        <BarPercentage>
          {`${percentage}%`}
        </BarPercentage>
        <span>
          {`${votes} Votes`}
        </span>
      </BarInfo>
    );
    return (
      <Bar
        hover={hover} 
        key={id}
        votes={votes}
        totalVotes={totalVotes}
        onClick={() => callback(id)}
      >
        <BarShading width={percentage} selected={isSelected} />
        <BarFlexContainer>
          <BarTitle>{name}</BarTitle>
          {totalVotes > 0 ? barInfo : null}
        </BarFlexContainer>
      </Bar>
    );
  }) : <div />;
  return (
    <VerticalList spacing="12">
      {optionList}
    </VerticalList>
  );
};

PollBarGraph.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    PollOptions: PropTypes.array.isRequired,
  }).isRequired,
  callback: PropTypes.func,
  selected: PropTypes.number,
  hover: PropTypes.bool
};

PollBarGraph.defaultProps = {
  callback: null,
  selected: null,
  hover: false,
};

export default PollBarGraph;
