import React, { useState, useEffect } from 'react';
import PollBarGraph from '../Components/PollBarGraph';

const PollPage = ({match}) => {
  // Hold our fetched poll in use state and use useEffect to load on mount
  const [poll, setPoll] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/polls/${match.params.pollId}`);
      const jsonRes = await res.json();
      
      setPoll(jsonRes);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>{poll.name}</h1>
      <p>Total Votes: {poll.totalVotes}</p>
      <PollBarGraph poll={poll} />
    </div>
  );
};

export default PollPage;
