import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { SpaceBetweenRow } from 'Utilities';
import { PollForm } from 'Components';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
};

const PollPage = ({ match }) => {
  // Hold our fetched poll in use state and use useEffect to load on mount
  const [poll, setPoll] = useState({});
  const [vote, setVote] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedForText, setVotedForText] = useState(null);

  // Fetch our data on component mount
  useEffect(() => {
    // Intiial call for data
    getData(`/api/polls/${match.params.pollId}`, setPoll);

    // Start polling
    let timer = 0;
    const pollApi = () => {
      getData(`/api/polls/${match.params.pollId}`, setPoll);
      timer = setTimeout(pollApi, 1300);
    };
    timer = setTimeout(pollApi, 1300);

    // Cancel polling on component unmount
    return () => {
      clearTimeout(timer);
      timer = 0;
    };
  }, []);

  // Submit poll vote
  useEffect(() => {
    // Vote = null is used as a 'toggle' to know when to run this command again
    if (hasVoted === false && vote !== null) {
      fetch('/api/vote/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optionId: vote }),
      })
        .then((res) => res.json())
        .then((res) => {
          setVotedForText(res);
          setHasVoted(true);
        })
        .then(() => {
          // Poll for our data after we get confirmation that we voted from server
          getData(`/api/polls/${match.params.pollId}`, setPoll);
        });
    } else {
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div>
      <h3><Link to="/">Back</Link></h3>
      <h1>{poll.name}</h1>
      <SpaceBetweenRow>
        <p>{`Total Votes: ${poll.totalVotes}`}</p>
        { !hasVoted && <button type="button" onClick={() => setHasVoted(true)}>Skip Voting and Show Results</button>}
      </SpaceBetweenRow>
      <PollForm
        poll={poll}
        selected={vote}
        onChange={(e) => setVote(Number(e.target.value))}
        onSubmit={(e) => {
          setSubmit(true);
          e.preventDefault();
        }}
        showResults={hasVoted}
      />
      {/* Show vote message if not voted and there isn't a reponse */}
      <div>{votedForText === null && !hasVoted ? null : votedForText}</div>
    </div>
  );
};

PollPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PollPage;
