import PropTypes from 'prop-types';
import React from 'react';

const CommandButton = ({ onClick, text }) => (
  <button className="cmd-btn" type="button" onClick={onClick}>
    {text}
  </button>
);/* eslint-disable react/require-default-props */
CommandButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default CommandButton;
