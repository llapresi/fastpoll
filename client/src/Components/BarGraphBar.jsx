import React from 'react';
import styled from '@emotion/styled';
import SpaceBetweenRow from '../Utilities/SpaceBetweenRow';

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

const Bar = styled.div`
  position: relative;
  height: 80px;
  width: 100%;
  background-color: #d6d6d6;
  transition: transform 0.13s;
  transition-timing-function: ease-out;
`;

const BarGraphBar = ({ option, totalVotes, selected }) => {
  const { name, votes, id } = option;
  // Calc our percentage filled
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
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
      key={id}
      votes={votes}
      totalVotes={totalVotes}
    >
      <BarShading width={percentage} selected={selected} />
      <BarFlexContainer>
        <BarTitle>{name}</BarTitle>
        {totalVotes > 0 ? barInfo : null}
      </BarFlexContainer>
    </Bar>
  );
};

export default BarGraphBar;
