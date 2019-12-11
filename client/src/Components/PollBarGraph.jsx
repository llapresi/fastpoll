import React from 'react';
import styled from '@emotion/styled';
import VerticalList from '../Utilities/VerticalList';

const Bar = styled.div`
  position: relative;
  height: 80px;
  width: 100%;
  background-color: grey;
`;

const BarFlexContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

const BarShading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.selected ? 'green' : 'blue'};
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
const PollBarGraph = ({poll, callback, selected}) => {
  const { totalVotes } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = poll.PollOptions ? poll.PollOptions.map((option) => {
    const { name, votes, id } = option;
    const percentage = Math.round((votes / totalVotes) * 100);
    const isSelected = selected === id;
    return (
      <Bar votes={votes} totalVotes={totalVotes} onClick={() => callback(id)}>
        <BarShading width={percentage} selected={isSelected} />
        <BarFlexContainer>
          <BarTitle>{name}</BarTitle>
          {totalVotes !== 0 &&
            <BarInfo>
              <BarPercentage>{percentage}%</BarPercentage>
              <span>{votes} Votes</span>
            </BarInfo>
          }
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

export default PollBarGraph;
