/* eslint-disable react/no-array-index-key */

import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import {
  VerticalList, WidthParent, Flex,
} from 'Utilities';

import {
  Button, SecondaryButton, PageHeader,
} from 'Components';

import OptionList from './OptionList';
import PollNameTextbox from './PollNameTextbox';

const PollParent = styled(WidthParent)`
  background-color: white;
  padding: 18px;
  margin-top: -48px;
`;

const ErrorIcon = ({ msg }) => (
  <BsFillExclamationCircleFill fontSize="24px" title={msg} style={{ marginRight: '6px' }} color="#ff6161" />
);

ErrorIcon.propTypes = {
  msg: PropTypes.string.isRequired,
};

const CreateForm = ({ onSubmit }) => {
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
          <Flex align="center">
            <PollNameTextbox
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
          </Flex>
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
          <Flex align="center" justify="space-between">
            <SecondaryButton type="button" onClick={() => append({ name: '' })}>+ Add Option</SecondaryButton>
            <Button type="submit">Submit</Button>
          </Flex>
        </VerticalList>
      </PollParent>
    </form>
  );
};

CreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateForm;
