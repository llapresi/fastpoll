import React, { useState, useEffect, useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled';
import ReactRouterPropTypes from 'react-router-prop-types';
import { SpaceBetweenRow, VerticalList, WidthParent } from 'Utilities';
import {
  PollForm, Button, PageHeader, PageTitle, HeaderFlexRow,
} from 'Components';
import PusherContext from 'Contexts/PusherContext';

const getData = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
};

const FormButtons = styled(SpaceBetweenRow)`
  justify-content: flex-end;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: opacity 0.12s;
  margin-top: 12px;
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

const PollParent = styled(WidthParent)`
  background-color: white;
  padding: 18px;
  margin-top: -48px;
`;

const TotalVotes = styled.div`
  font-size: 24px;
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

  const titleElement = poll ? (
    <HeaderFlexRow>
      <PageTitle>{poll.name}</PageTitle>
      <TotalVotes>{`${poll.totalVotes} Votes`}</TotalVotes>
    </HeaderFlexRow>
  ) : (
    <SkeletonTheme color="rgb(32, 73, 76)" highlightColor="rgb(47, 106, 111)">
      <HeaderFlexRow>
        <PageTitle><Skeleton width={400} /></PageTitle>
        <TotalVotes><Skeleton width={100} /></TotalVotes>
      </HeaderFlexRow>
    </SkeletonTheme>
  );

  const formElement = poll ? (
    <form onSubmit={submitVote}>
      <PollForm
        poll={poll}
        selected={vote}
        onChange={(e) => setVote(Number(e.target.value))}
        showResults={hasVoted}
      />
      <FormButtons hide={hasVoted}>
        <ResultsButton
          type="button"
          onClick={(e) => { e.preventDefault(); setHasVoted(true); }}
          disabled={hasVoted}
        >
          Results
        </ResultsButton>
        <Button
          type="submit"
          disabled={vote === null || hasVoted}
        >
          Vote
        </Button>
      </FormButtons>
      { /* Show vote message if not voted and there isn't a reponse */}
      <div>{votedForText === null && !hasVoted ? null : votedForText}</div>
    </form>
  ) : (
    <>
      <div>
        <Skeleton width="100%" height={80} />
      </div>
      <div>
        <Skeleton width="100%" height={80} />
      </div>
      <div>
        <Skeleton width="100%" height={80} />
      </div>
    </>
  );

  return (
    <>
      <PageHeader>
        <WidthParent>
          {titleElement}
        </WidthParent>
      </PageHeader>
      <PollParent>
        <SkeletonTheme color="rgb(232, 232, 232)" highlightColor="rgb(218, 218, 218)">
          <VerticalList spacing="12">
            {formElement}
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
