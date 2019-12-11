import React, { useState, useEffect } from 'react';
import PollBarGraph from '../Components/PollBarGraph';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
}

const PollPage = ({match}) => {
  // Hold our fetched poll in use state and use useEffect to load on mount
  const [poll, setPoll] = useState({});
  const [vote, setVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedForText, setVotedForText] = useState('');

  // Fetch our data on component mount
  useEffect(() => {
    getData(`/api/polls/${match.params.pollId}`, setPoll);
  }, []);

  // Submit poll vote
  useEffect(() => {
    // Vote = null is used as a 'toggle' to know when to run this command again
    if(!hasVoted && vote !== null) {
      fetch('/api/vote/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'optionId': vote })
      }
      )
        .then((res) => res.json())
        .then((res) => {
          setVotedForText(res);
          setHasVoted(true);
        })
        .then(() => {
          getData(`/api/polls/${match.params.pollId}`, setPoll);
        });
    }
  }, [vote]);

  return (
    <div>
      <h1>{poll.name}</h1>
      <p>Total Votes: {poll.totalVotes}</p>
      <PollBarGraph poll={poll} callback={setVote} />
      <div>{votedForText}</div>
    </div>
  );
};

export default PollPage;
