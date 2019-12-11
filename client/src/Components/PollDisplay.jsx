import React from 'react';
import styled from '@emotion/styled';
import VerticalList from '../Utilities/VerticalList';


const PollOption = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: grey;
  justify-content: space-between; 
`;

const PollTitle = styled.h2`
  display: inline;
  margin: 0;
`;

const PollInfo = styled.span`
`;

const PollDisplay = ({poll}) => {
  let optionList = [];
  let pollName = poll ? poll.name : "pollname";
  if (poll.PollOptions) {
    for(let i = 0; i < poll.PollOptions.length; i++) {
      let newItem = 
      <PollOption>
        <PollTitle>{poll.PollOptions[i].name}</PollTitle>
        <PollInfo>{poll.PollOptions[i].votes} Votes</PollInfo>
      </PollOption>
      optionList.push(newItem);
    }
  }
  return (
    <div>
      <h2>{poll.name}</h2>
      <VerticalList spacing="12">
        {optionList}
      </VerticalList>
    </div>
  );
};

export default PollDisplay;