import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled';
import {
  PageTitle, HeaderFlexRow,
} from 'Components';

const TotalVotes = styled.div`
  font-size: 24px;
`;

const PollHeader = ({ poll }) => (
  <>
    {poll && (
      <HeaderFlexRow>
        <PageTitle>{poll.name}</PageTitle>
        <TotalVotes>{`${poll.totalVotes} Votes`}</TotalVotes>
      </HeaderFlexRow>
    )}
    {!poll && (
    <SkeletonTheme color="rgb(32, 73, 76)" highlightColor="rgb(47, 106, 111)">
      <HeaderFlexRow>
        <PageTitle><Skeleton width={400} /></PageTitle>
        <TotalVotes><Skeleton width={100} /></TotalVotes>
      </HeaderFlexRow>
    </SkeletonTheme>
    )}
  </>
);

PollHeader.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
  }),
};

PollHeader.defaultProps = {
  poll: undefined,
};

export default PollHeader;
