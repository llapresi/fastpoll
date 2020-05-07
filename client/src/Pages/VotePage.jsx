import React, { useState, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled';
import ReactRouterPropTypes from 'react-router-prop-types';
import { VerticalList, WidthParent } from 'Utilities';
import { PageHeader } from 'Components';
import { PollHeader, VoteForm } from 'Components/VotePoll';
import { usePoll, useHasVoted } from 'Hooks';

const PollParent = styled(WidthParent)`
  background-color: white;
  padding: 18px;
  margin-top: -48px;
`;

const PollPage = ({ match }) => {
  // Hook to store our currently selected vote
  const [vote, setVote] = useState(null);
  // Use hook to check if we voted for an option before
  const [hasVoted, setHasVoted] = useHasVoted(match.params.pollId);
  // Hook to store if we should show voting screen or results
  const [showResults, setShowResults] = useState(false);
  // Hook to get our poll data itself.
  const [poll, setSubscription] = usePoll(match.params.pollId);

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
        setHasVoted(res);
      });
  };

  // Set if we should show the voting controls
  useEffect(() => {
    setShowResults(hasVoted !== false);
  }, [hasVoted]);

  // Subscribes to poll push channel when showing results
  useEffect(() => {
    if (showResults) {
      setSubscription(true);
    }
  }, [showResults]);

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
              hasVoted={showResults}
              vote={vote}
              onChange={(e) => setVote(Number(e.target.value))}
              onResults={(e) => { e.preventDefault(); setShowResults(true); }}
            />
            <div>{hasVoted !== false ? hasVoted : null}</div>
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
