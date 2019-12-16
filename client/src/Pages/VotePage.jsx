import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { SpaceBetweenRow, VerticalList } from 'Utilities';
import { PollForm, Button } from 'Components';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
};

const FormButtons = styled(SpaceBetweenRow)`
  justify-content: flex-end;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: opacity 0.12s;
`;

const ResultsButton = styled(Button)`
  background-color: transparent;
  border: 1px solid rgb(30, 41, 41);
  border-radius: 12px;
  color: black;

  :hover:enabled,
  :focus:enabled {
      background: rgb(237, 240, 240);
  }
`;

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
    <VerticalList spacing="12">
      <h3><Link to="/">Back</Link></h3>
      <h1>{poll.name}</h1>
      <SpaceBetweenRow>
        <p>{`Total Votes: ${poll.totalVotes}`}</p>
      </SpaceBetweenRow>
      <PollForm
        poll={poll}
        selected={vote}
        onChange={(e) => setVote(Number(e.target.value))}
        showResults={hasVoted}
      />
      <FormButtons hide={hasVoted}>
        <ResultsButton
          type="button"
          onClick={(e) => { setHasVoted(true); e.preventDefault(); }}
          disabled={hasVoted}
        >
          Results
        </ResultsButton>
        <Button
          type="submit"
          onClick={(e) => {
            setSubmit(true);
            e.preventDefault();
          }}
          disabled={vote === null || hasVoted}
        >
            Vote
        </Button>
      </FormButtons>
      { /* Show vote message if not voted and there isn't a reponse */}
      <div>{votedForText === null && !hasVoted ? null : votedForText}</div>
    </VerticalList>
  );
};

PollPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PollPage;
