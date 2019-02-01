import { func, string } from 'prop-types';
import React from 'react';

const CommandButton = ({ onClick, text }) => (
  <button className="cmd-btn" type="button" onClick={onClick}>
    {text}
  </button>
);
CommandButton.propTypes = {
  onClick: func.isRequired,
  text: string.isRequired,
};

export default CommandButton;
