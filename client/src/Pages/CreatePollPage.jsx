import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
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
  background-color: grey;
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


const OptionInput = ({ elm, onChange, onRemove }) => (
  <div style={{display: 'flex'}}>
    <OptionTextbox type="text" value={elm} onChange={onChange} />
    <PollButton onClick={onRemove}>-</PollButton>
  </div>
);

const CreatePollPage = () => {
  const [options, setOptions] = useState(['first', 'second']);
  const [pollName, setPollName] = useState('New poll');

  const [shouldSubmit, setShouldSubmit] = useState(false);

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
          console.log(res);
        });
    }
  }, [shouldSubmit]);

  const inputElements = options.map((elm, index) => (
    <OptionInput
      elm={elm}
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
        <PollButton onClick={(() => addOption(options, setOptions))}>+ Add Option</PollButton>
        <PollButton onClick={(() => setShouldSubmit(true))}>Submit</PollButton>
      </SpaceBetweenRow>
    </VerticalList>
  );
};

export default CreatePollPage;
