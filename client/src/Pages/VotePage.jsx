import React, { useState, useEffect, useContext } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled';
import ReactRouterPropTypes from 'react-router-prop-types';
import { VerticalList, WidthParent } from 'Utilities';
import { PageHeader } from 'Components';
import { PollHeader, VoteForm } from 'Components/VotePoll';
import PusherContext from 'Contexts/PusherContext';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
};

const PollParent = styled(WidthParent)`
  background-color: white;
  padding: 18px;
  margin-top: -48px;
`;


const PollPage = ({ match }) => {
  // Hold our fetched poll in use state and use useEffect to load on mount
  const [poll, setPoll] = useState(null);
  const [vote, setVote] = useState(null);
  // Use local storage to check if we voted for an option before
  const [hasVoted, setHasVoted] = useState(
    (localStorage.getItem(match.params.pollId) !== null) || false,
  );
  const [votedForText, setVotedForText] = useState(null);
  const pusherContext = useContext(PusherContext);
  const [subscribed, setSubscribed] = useState(false);

  // Fetch our data on component mount
  useEffect(() => {
    // Intiial call for data
    getData(`/api/polls/${match.params.pollId}`, setPoll);
  }, []);

  // Subscribe to our pusher channel when user votes
  useEffect(() => {
    if (hasVoted === true) {
      const pusherChannel = pusherContext.subscribe(match.params.pollId);
      setSubscribed(true);
      pusherChannel.bind('voted', () => {
        getData(`/api/polls/${match.params.pollId}`, setPoll);
      });

      // Set voted for message if it's in localStorage
      if (localStorage.getItem(match.params.pollId) !== null) {
        setVotedForText(localStorage.getItem(match.params.pollId));
      }
    }
  }, [hasVoted]);

  // Unsubscribe from our pusher channel when unmounting
  useEffect(() => () => {
    if (subscribed === true) {
      pusherContext.unsubscribe(match.params.pollId);
    }
  }, []);

  // Submit poll vote
  const submitVote = (evt) => {
    evt.preventDefault();
    fetch('/api/vote/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ optionId: vote, pollId: match.params.pollId }),
    })
      .then((res) => res.json())
      .then((res) => {
        setVotedForText(res);
        setHasVoted(true);
        localStorage.setItem(match.params.pollId, res);
      })
      .then(() => {
        // Poll for our data after we get confirmation that we voted from server
        getData(`/api/polls/${match.params.pollId}`, setPoll);
      });
  };

  return (
    <>
      <PageHeader>
        <WidthParent>
          <PollHeader poll={poll} />
        </WidthParent>
      </PageHeader>
      <PollParent>
        <SkeletonTheme color="rgb(232, 232, 232)" highlightColor="rgb(218, 218, 218)">
          <VerticalList spacing="12">
            <VoteForm
              poll={poll}
              submitVote={submitVote}
              hasVoted={hasVoted}
              vote={vote}
              onChange={(e) => setVote(Number(e.target.value))}
              onResults={(e) => { e.preventDefault(); setHasVoted(true); }}
            />
            <div>{votedForText === null && !hasVoted ? null : votedForText}</div>
          </VerticalList>
        </SkeletonTheme>
      </PollParent>
    </>
  );
};

PollPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PollPage;
