import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';
import { SpaceBetweenRow } from 'Utilities';
import {
  Button,
} from 'Components';
import OptionList from './OptionList';

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

const VoteForm = ({
  poll, submitVote, hasVoted, vote, onChange, onResults,
}) => (
  <>
    {poll && (
      <form onSubmit={submitVote}>
        <OptionList
          poll={poll}
          selected={vote}
          // onChange={(e) => setVote(Number(e.target.value))}
          onChange={onChange}
          showResults={hasVoted}
        />
        <FormButtons hide={hasVoted}>
          <ResultsButton
            type="button"
            // onClick={(e) => { e.preventDefault(); setHasVoted(true); }}
            onClick={onResults}
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
      </form>
    )}
    {/* Render Placeholder if poll is undefined */}
    {!poll && (
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
    )}
  </>
);

VoteForm.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
  }),
  submitVote: PropTypes.func.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  vote: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onResults: PropTypes.func.isRequired,
};

VoteForm.defaultProps = {
  vote: undefined,
  poll: undefined,
};

export default VoteForm;
