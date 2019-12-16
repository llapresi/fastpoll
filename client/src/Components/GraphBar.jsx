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
  transform: translateX(${(props) => (props.selected ? '0px' : '-8px')});
  transition: transform 0.14s;
  will-change: transform;
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
  transition-delay: ${(props) => props.delay};
  will-change: transform;
`;

const BarSelectedShading = styled(BarShading)`
  width: 8px;
`;

const BarTitle = styled.h2`
  display: inline;
  margin-left: 8px;
  font-weight: 400;
`;

const BarInfo = styled.span`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.showResults ? '1' : '0')};
  transition: opacity 0.7s;
  transition-timing-function: ease-out;
  transition-delay: 0.13s;
  will-change: opacity;
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
  transition: transform 0.13s, border-radius 0.14s;
  transition-timing-function: ease-out;
  border-radius: ${(props) => {
    if (props.selected) {
      return '0px 12px 12px 0px';
    }
    if (props.showResults) {
      return '0px';
    }
    return '12px';
  }};
  overflow: hidden;
  will-change: border-radius, transform;
`;

const GraphBar = ({
  option, totalVotes, showResults, animationDelay, selected,
}) => {
  const { name, votes, id } = option;
  // Calc our percentage filled
  const percentage = Math.round((votes / totalVotes) * 100);
  // Create our bar info if we have more than 0 votes
  const barInfo = (
    <BarInfo showResults={showResults}>
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
      selected={selected}
      showResults={showResults}
    >
      <BarShading width={100} color="#d5d5d5" />
      <BarShading width={showResults ? percentage : 0} color="blue" delay={`${animationDelay}s`} />
      <BarFlexContainer selected={selected}>
        <BarSelectedShading color="green" />
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
  showResults: PropTypes.bool,
  animationDelay: PropTypes.number,
  selected: PropTypes.bool,
};

GraphBar.defaultProps = {
  showResults: true,
  animationDelay: 0,
  selected: false,
};

export default GraphBar;
