import React from 'react';
import styled from '@emotion/styled';
import { ErrorMessage } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  SecondaryButton,
} from 'Components';

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
  border: ${(props) => props.errorHighlight ? '2px #ff4545 solid' : 'inherit'};
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

const AddPollOption = ({
  index, register, onRemove, errors,
}) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <OptionTextbox
        type="text"
        placeholder="New Option Name:"
        name={`options[${index}]`}
        ref={register({
          required: {
            value: true,
            message: 'Poll Option name is required',
          },
          maxLength: {
            value: 60,
            message: 'Maximum option name length is 60 characters',
          },
        })}
        errorHighlight={(errors.options && errors.options[index]) !== undefined}
      />
      <RemoveButton type="button" onClick={onRemove}>-</RemoveButton>
    </div>
    <ErrorMessage
      errors={errors}
      name={`options[${index}]`}
      style={{ paddingTop: '6px' }}
    >
      {({ message }) => <p style={{ color: '#ff4545', marginTop: '6px' }}>{message}</p>}
    </ErrorMessage>
  </>
);

AddPollOption.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    options: PropTypes.array.isRequired,
  }).isRequired,
};

export default AddPollOption;
