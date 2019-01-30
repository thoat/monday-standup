import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ onClick, colorStyle, text }) => (
  <button className="card" onClick={onClick} style={colorStyle}>
    {text}
  </button>
);/* eslint-disable react/require-default-props */
Card.propTypes = {
  onClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  colorStyle: PropTypes.object.isRequired,
  text: PropTypes.string,
};

export default Card;
