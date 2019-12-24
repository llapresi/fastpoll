import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled';
import ReactRouterPropTypes from 'react-router-prop-types';
import { SpaceBetweenRow, VerticalList, WidthParent } from 'Utilities';
import {
  PollForm, Button, PageHeader, PageTitle, HeaderFlexRow,
} from 'Components';

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
    <>
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
          disabled={hasVoted || poll.totalVotes === 0}
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
    </>
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
