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
  Button, SecondaryButton, PageHeader, AddPollOption,
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
  border: ${(props) => props.errorHighlight ? '2px #ff4545 solid' : '2px transparent solid'}
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
        <AddPollOption
          key={item.id}
          index={index}
          errors={errors}
          register={register}
          onRemove={() => remove(index)}
        />
      ))}
    </>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader>
        <WidthParent>
          <PollNameRow>
            <NameTextbox
              placeholder="New Poll Name:"
              type="text"
              name="name"
              ref={register({
                required: {
                  value: true,
                  message: 'Poll name is required',
                },
                maxLength: {
                  value: 60,
                  message: 'Maximum poll name length is 60 characters',
                },
              })}
              errorHighlight={errors.name !== undefined}
            />
          </PollNameRow>
          <p style={{
            color: '#ff4545', marginTop: '6px', marginBottom: '0px', visibility: errors.name !== undefined ? 'visible' : 'hidden',
          }}
          >
            {errors.name !== undefined ? errors.name.message : 'No Error'}
          </p>
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
