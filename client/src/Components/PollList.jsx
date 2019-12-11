import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import VerticalList from '../Utilities/VerticalList';
import {
  Link
} from "react-router-dom";

const PollListItem = styled.div`
  background-color: #d6d6d6;
  padding: 8px;
`;

const PollListTitle = styled.h2`
  margin: 0;
`;

const PollListItemParent = ({item}) => (
  <PollListItem>
    <Link to={`/poll/${item.urlId}`}>
      <PollListTitle>{item.name}</PollListTitle>
    </Link>
  </PollListItem>  
);


const PollList = () => {
  const [polls, setPolls] = useState({});
  useEffect(() => {
    fetch('/api/polls')
      .then((res) => res.json())
      .then((polls) => setPolls(polls));
  }, []);

  const pollElements = [];
  for(let i = 0; i < polls.length; i++) {
    const newElement = <PollListItemParent key={polls[i].urlId} item={polls[i]} />;
    pollElements.push(newElement);
  }
  return (
    <div>
      <h1>Polls:</h1>
      <VerticalList spacing="16">{pollElements}</VerticalList>
    </div>
  );
}

export default PollList;