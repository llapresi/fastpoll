import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import VerticalList from '../Utilities/VerticalList';
import SpaceBetweenRow from '../Utilities/SpaceBetweenRow';

const NameTextbox = styled.input`
  height: auto;
  background-color: lightgrey;
  border:none;

  font-size: 1.5em;
  font-weight: bold;
  padding: 2px;
`;

const OptionTextbox = styled(NameTextbox)`
  height: 80px;
  flex-grow: 1;
  min-width: 0px;
  background-color: #d6d6d6;
  padding: 12px;
`;

const PollButton = styled.button`
  min-width: 40px;
  min-height: 40px;
  font-size: 1.2em;
  font-weight: bold;
`;

const PollHeader = styled.h2`
  display: inline;
  margin: 0;
`;

// Functions used to update the array of poll options in the state
const updateOption = (index, options, newVal, callback) => {
  const newArray = [...options];
  newArray[index] = newVal;
  callback(newArray);
};

const addOption = (options, callback) => {
  const newArray = [...options];
  newArray.push('new option');
  callback(newArray);
};

const removeOption = (index, options, callback) => {
  const newArray = [...options];
  newArray.splice(index, 1);
  callback(newArray);
};

// Pairs a OptionTextbox and a PollButton for removal in one component
const OptionInput = ({ value, onChange, onRemove }) => (
  <div style={{ display: 'flex' }}>
    <OptionTextbox type="text" value={value} onChange={onChange} />
    <PollButton type="button" onClick={onRemove}>-</PollButton>
  </div>
);

OptionInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const CreatePollPage = () => {
  // Stores name of our poll and our poll options
  const [options, setOptions] = useState(['first', 'second']);
  const [pollName, setPollName] = useState('New poll');

  // When set to true, component makes POST to polls to make the new poll
  const [shouldSubmit, setShouldSubmit] = useState(false);

  // Stores page to redirect to when our poll is submitted
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    if (shouldSubmit) {
      const optionsObj = options.map((name) => (
        { name }
      ));
      const toSend = {
        name: pollName,
        endtime: 120000,
        options: optionsObj,
      };
      fetch('/api/polls/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend),
      })
        .then((res) => res.json())
        .then((res) => {
          setRedirectUrl(res.urlId);
        });
    }
  }, [shouldSubmit]);

  // Create a textbox and button for each of our poll options
  const inputElements = options.map((elm, index) => (
    <OptionInput
      value={elm}
      key={index}
      onChange={(e) => updateOption(index, options, e.target.value, setOptions)}
      onRemove={() => removeOption(index, options, setOptions)}
    />
  ));
  return (
    <VerticalList spacing="12">
      <span>
        <PollHeader>Poll Name: </PollHeader>
        <NameTextbox type="text" value={pollName} onChange={(e) => setPollName(e.target.value)} />
      </span>
      <VerticalList spacing="12">
        {inputElements}
      </VerticalList>
      <SpaceBetweenRow>
        <PollButton type="button" onClick={(() => addOption(options, setOptions))}>+ Add Option</PollButton>
        <PollButton type="submit" onClick={(() => setShouldSubmit(true))}>Submit</PollButton>
      </SpaceBetweenRow>
      {redirectUrl !== null ? <Redirect to={`/poll/${redirectUrl}`} /> : null }
    </VerticalList>
  );
};

export default CreatePollPage;
