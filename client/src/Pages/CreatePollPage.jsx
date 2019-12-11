import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import VerticalList from '../Utilities/VerticalList';

const OptionTextbox = styled.input`
  height: 80px;
  flex-grow: 1;
  background-color: lightgrey;
  border:none;
  background-color: grey;

  font-size: 1.5em;
  font-weight: bold;
  padding: 12px;  x
`;

const NameTextbox = styled.input`
  height: auto;
  flex-grow: 1;
  background-color: lightgrey;
  border:none;

  font-size: 1.5em;
  font-weight: bold;
  padding: 2px;
`;

const PollButton = styled.button`
  width: 40px;
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
        <NameTextbox type="text" value={pollName} onChange={(e) => setPollName(e.target.event)} />
      </span>
      <VerticalList spacing="12">
        {inputElements}
      </VerticalList>
      <PollButton onClick={(() => addOption(options, setOptions))}>+</PollButton>
    </VerticalList>
  );
};

export default CreatePollPage;
