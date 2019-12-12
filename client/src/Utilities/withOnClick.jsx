import React from 'react';

const withOnClick = (Component) => ({ onClick, tabIndex = 0, ...props }) => (
  <div role="button" tabIndex={tabIndex} onClick={onClick} onKeyPress={onClick}>
    <Component {...props} />
  </div>
);

export default withOnClick;
