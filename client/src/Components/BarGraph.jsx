import React from 'react';
import PropTypes from 'prop-types';
import VerticalList from '../Utilities/VerticalList';
import BarGraphBar from './BarGraphBar';
import withOnClick from '../Utilities/withOnClick';

const BarButton = withOnClick(BarGraphBar);

// Displays bar graph
const PollBarGraph = ({ poll, callback, selected, showResults }) => {
  const { totalVotes, PollOptions } = poll;
  // Wrapped in terniary to prevent rendering undefined polloptions
  const optionList = PollOptions ? PollOptions.map((option, index) => (
    <BarButton
      option={option}
      totalVotes={showResults ? totalVotes : 0}
      selected={selected === option.id}
      onClick={() => callback(option.id)}
      tabIndex={index}
    />
  )) : <div />;
  return (
    <VerticalList spacing="12">
      {optionList}
    </VerticalList>
  );
};

PollBarGraph.propTypes = {
  poll: PropTypes.shape({
    name: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    PollOptions: PropTypes.array.isRequired,
  }).isRequired,
  callback: PropTypes.func,
  selected: PropTypes.number,
  showResults: PropTypes.bool,
};

PollBarGraph.defaultProps = {
  callback: null,
  selected: null,
  showResults: true,
};

export default PollBarGraph;
