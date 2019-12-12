/* Prop-spreading is needed to do most HOC components so we're disabling this rule */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

// Attaches onClick handler to wrapped component by placing child in onClicked div
const withOnClick = (Component) => ({ onClick, tabIndex = 0, ...props }) => (
  <div role="button" tabIndex={tabIndex} onClick={onClick} onKeyPress={onClick}>
    <Component {...props} />
  </div>
);

export default withOnClick;
