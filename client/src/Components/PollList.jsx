import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { VerticalList } from 'Utilities';

const PollListItem = styled.div`
  background-color: #d6d6d6;
  padding: 8px;
`;

const PollListTitle = styled.h2`
  margin: 0;
`;

const PollListItemParent = ({ item }) => (
  <PollListItem>
    <Link to={`/poll/${item.urlId}`}>
      <PollListTitle>{item.name}</PollListTitle>
    </Link>
  </PollListItem>
);

PollListItemParent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    urlId: PropTypes.string.isRequired,
  }).isRequired,
};

const PollList = () => {
  const [polls, setPolls] = useState({});
  useEffect(() => {
    fetch('/api/polls')
      .then((res) => res.json())
      .then((res) => setPolls(res));
  }, []);

  const pollElements = [];
  for (let i = 0; i < polls.length; i += 1) {
    const newElement = <PollListItemParent key={polls[i].urlId} item={polls[i]} />;
    pollElements.push(newElement);
  }
  return (
    <VerticalList spacing="16">{pollElements}</VerticalList>
  );
};

export default PollList;
