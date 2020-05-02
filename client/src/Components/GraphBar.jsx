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
  transition-timing-function: ease-out;
  transition-delay: ${(props) => props.delay};
  box-shadow: ${(props) => {
    const opacity = props.focused && !props.showResults ? 0.18 : 0;
    return `inset 0 3px 30px rgba(0,0,0, ${opacity}), inset 0 3px 8px rgba(0,0,0, ${opacity})`;
  }};
  transition: transform 0.3s, background-color 0.2s, box-shadow 0.13s ease-out;

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
  align-items: flex-end;
  opacity: ${(props) => (props.showResults ? '1' : '0')};
  transition: opacity 0.7s;
  transition-timing-function: ease-out;
  transition-delay: 0.13s;
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
`;

const GraphBar = ({
  option, totalVotes, showResults, animationDelay, selected, focused,
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
      <BarShading width={100} color="#d5d5d5" focused={focused} showResults={showResults} />
      <BarShading width={showResults ? percentage : 0} color="rgb(137, 206, 232)" delay={`${animationDelay}s`} />
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
  focused: PropTypes.bool,
};

GraphBar.defaultProps = {
  showResults: true,
  animationDelay: 0,
  selected: false,
  focused: false,
};

export default GraphBar;
