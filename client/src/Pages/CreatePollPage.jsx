/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import {
  VerticalList, SpaceBetweenRow, handleErrors, WidthParent,
} from 'Utilities';

import {
  Button, SecondaryButton, PageHeader,
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

const PollNameRow = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorIcon = ({ msg }) => (
  <BsFillExclamationCircleFill fontSize="24px" title={msg} style={{ marginRight: '6px' }} color="#ff6161" />
);

ErrorIcon.propTypes = {
  msg: PropTypes.string.isRequired,
};

const CreatePollPage = () => {
  // Stores page to redirect to when our poll is submitted
  const [redirectUrl, setRedirectUrl] = useState(null);

  // Display error message:
  const [errorMessage, setErrorMessage] = useState('');

  // Setup react-hook-form
  const {
    register, control, handleSubmit, errors,
  } = useForm({
    defaultValues: {
      options: [
        '',
        '',
      ],
    },
  });

  // Use useFieldArray for poll options
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  function onSubmit(data) {
    console.log(data);
    const optionsObj = data.options.map((name) => (
      { name }
    ));
    const toSend = {
      name: data.name,
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
  const inputElements = (
    <>
      {fields.map((item, index) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
          {(errors.options && errors.options[index]) && <ErrorIcon msg="Poll Option name is required" />}
          <OptionTextbox type="text" placeholder="New Option Name:" name={`options[${index}]`} ref={register({ required: true })} />
          <RemoveButton type="button" onClick={() => remove(index)}>-</RemoveButton>
        </div>
      ))}
    </>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader>
        <WidthParent>
          <PollNameRow>
            {errors.name && <ErrorIcon msg="Poll Name is a required field" /> }
            <NameTextbox placeholder="New Poll Name:" type="text" name="name" ref={register({ required: true })} />
          </PollNameRow>
        </WidthParent>
      </PageHeader>
      <PollParent>
        <VerticalList spacing="12">
          <VerticalList spacing="12">
            {inputElements}
          </VerticalList>
          <SpaceBetweenRow>
            <SecondaryButton type="button" onClick={() => append({ name: '' })}>+ Add Option</SecondaryButton>
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
