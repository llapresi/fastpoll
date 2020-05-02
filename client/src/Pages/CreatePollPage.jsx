/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  VerticalList, SpaceBetweenRow, handleErrors, WidthParent,
} from 'Utilities';

import {
  Button, SecondaryButton, PageHeader, HeaderFlexRow,
} from 'Components';

const NameTextbox = styled.input`
  border: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  font-size: 48px;
  font-weight: 700;
  background: rgb(57, 84, 87);
  color: inherit;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 36px;
  }
`;

const OptionTextbox = styled.input`
  height: 80px;
  flex-grow: 1;
  min-width: 0px;
  background-color: #d6d6d6;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 400;
  font-size: 1.5em;

  :focus {
    box-shadow: inset 0 3px 30px rgba(0,0,0, 0.18), inset 0 3px 8px rgba(0,0,0, 0.18);
  }

  transition: box-shadow 0.13s ease-out;
`;

const RemoveButton = styled(SecondaryButton)`
  width: 35px;
  height: 35px;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0;
  border-radius: 50%;
  flex-shrink 0;
`;

const PollParent = styled(WidthParent)`
  background-color: white;
  padding: 18px;
  margin-top: -48px;
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
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <OptionTextbox type="text" value={value} onChange={onChange} />
    <RemoveButton type="button" onClick={onRemove}>-</RemoveButton>
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
  const [pollName, setPollName] = useState('');

  // Stores page to redirect to when our poll is submitted
  const [redirectUrl, setRedirectUrl] = useState(null);

  // Display error message:
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(e) {
    e.preventDefault();
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
      .then(handleErrors)
      .then((res) => res.json())
      .then((res) => {
        setRedirectUrl(res.urlId);
      })
      .catch((err) => {
        setErrorMessage(err.toString());
      });
  }

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
    <form onSubmit={onSubmit}>
      <PageHeader>
        <WidthParent>
          <HeaderFlexRow>
            <NameTextbox placeholder="New Poll Name:" type="text" value={pollName} onChange={(e) => setPollName(e.target.value)} />
          </HeaderFlexRow>
        </WidthParent>
      </PageHeader>
      <PollParent>
        <VerticalList spacing="12">
          <VerticalList spacing="12">
            {inputElements}
          </VerticalList>
          <SpaceBetweenRow>
            <SecondaryButton type="button" onClick={(() => addOption(options, setOptions))}>+ Add Option</SecondaryButton>
            <Button type="submit">Submit</Button>
          </SpaceBetweenRow>
          <div>
            {errorMessage}
          </div>
          {redirectUrl !== null ? <Redirect to={`/poll/${redirectUrl}`} /> : null }
        </VerticalList>
      </PollParent>
    </form>
  );
};

export default CreatePollPage;
