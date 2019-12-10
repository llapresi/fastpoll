import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const PollListItem = styled.div`
`;

const PollList = () => {
  const [polls, setPolls] = useState({});
  useEffect(() => {
    fetch('/polls')
      .then((res) => res.json())
      .then((polls) => setPolls(polls));
  }, []);

  return (
    <div>Polls go here</div>
  );
}

export default PollList;