import React, { useState, useEffect } from 'react';
import PollDisplay from '../Components/PollDisplay';

const PollPage = ({match}) => {
  const [poll, setPoll] = useState({});
  useEffect(() => {
    fetch(`/api/polls/${match.params.pollId}`)
      .then((res) => res.json())
      .then((results) => setPoll(results));
  }, []);

  console.log(match.params.pollId);
  return (
    <PollDisplay poll={poll} />
  );
};

export default PollPage;
