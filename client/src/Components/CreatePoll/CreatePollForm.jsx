/* eslint-disable react/no-array-index-key */

import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import {
  VerticalList, SpaceBetweenRow, WidthParent,
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

const OptionList = ({
  options, remove, errors, register,
}) => (
  <VerticalList spacing="12">
    {options.map((item, index) => (
      <AddPollOption
        key={item.id}
        index={index}
        errors={errors}
        register={register}
        onRemove={() => remove(index)}
      />
    ))}
  </VerticalList>
);

OptionList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const CreatePollForm = ({ onSubmit }) => {
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

  // Create a textbox and button for each of our poll options
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
          <OptionList options={fields} remove={remove} register={register} errors={errors} />
          <SpaceBetweenRow>
            <SecondaryButton type="button" onClick={() => append({ name: '' })}>+ Add Option</SecondaryButton>
            <Button type="submit">Submit</Button>
          </SpaceBetweenRow>
        </VerticalList>
      </PollParent>
    </form>
  );
};

CreatePollForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePollForm;
