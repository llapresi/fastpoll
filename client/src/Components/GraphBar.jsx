import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SpaceBetweenRow } from 'Utilities';

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
  background-color: ${(props) => props.color};
  transition: transform 0.3s, background-color 0.2s;
  transition-timing-function: ease-out;
  transition-delay: ${(props) => props.delay}
`;

const BarTitle = styled.h2`
  display: inline;
  margin: 0;
`;

const BarInfo = styled.span`
  display: flex;
  flex-direction: column;
  opacity: ${props => props.showResults ? '1' : '0'};
  transition: opacity 0.7s;
  transition-timing-function: ease-out;
  transition-delay: ${(props) => props.delay}
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
  transition: transform 0.13s;
  transition-timing-function: ease-out;
`;

const GraphBar = ({ option, totalVotes, showResults, animationDelay }) => {
  const { name, votes, id } = option;
  // Calc our percentage filled
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  // Create our bar info if we have more than 0 votes
  const barInfo = (
    <BarInfo showResults={showResults} delay={`${animationDelay}s`}>
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
      <BarShading width={showResults ? 100 : 0} color="#d5d5d5" delay={`${animationDelay}s`} />
      <BarShading width={showResults ? percentage: 0} color="blue" delay={`${animationDelay + 0.1}s`} />
      <BarFlexContainer>
        <BarTitle>{name}</BarTitle>
        {barInfo}
      </BarFlexContainer>
    </Bar>
  );
};

GraphBar.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  totalVotes: PropTypes.number.isRequired,
};

export default GraphBar;
