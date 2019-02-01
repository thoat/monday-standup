import { func, shape, string } from 'prop-types';
import React from 'react';

const Card = ({ colorStyle, onClick, text }) => (
  <button className="card" onClick={onClick} style={colorStyle}>
    {text}
  </button>
);
Card.defaultProps = {
  onClick: () => null,
  text: '',
};
Card.propTypes = {
  colorStyle: shape({
    backgroundColor: string.isRequired,
    borderColor: string.isRequired,
    color: string,
  }).isRequired,
  onClick: func,
  text: string,
};

export default Card;
