/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import {
  VerticalList,
} from 'Utilities';
import AddPollOption from './AddOption';

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
        onRemove={() => {
          if (options.length >= 3) {
            remove(index);
          }
        }}
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

export default OptionList;
