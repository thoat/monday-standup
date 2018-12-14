// === Dependency imports ===
import PropTypes from 'prop-types';
import React from 'react';

// === Local imports ===
import constants from '../constants';
import getCardColors from '../helpers/helper-color';

// ============ START OF COMPONENT ==================
const Card = ({ person, onClick }) => {
  const handleOnClick = () => onClick(person);
  if (!person) { // render a white card if no profile associated
    return (
      <button
        className="card"
        onClick={handleOnClick}
        style={{ backgroundColor: 'white', borderColor: 'black' }}
      />
    );
  }
  const { name: memberName, team, isAbsent } = person;
  const [fillColor, borderColor] = isAbsent
    ? constants.COLOR_ABSENT
    : getCardColors(team);
  const colorStyle = {
    backgroundColor: fillColor,
    borderColor,
    color: isAbsent ? 'grey' : 'black',
  };
  return (
    <button
      className="card"
      onClick={handleOnClick}
      style={colorStyle}
    >
      {memberName}
    </button>
  );
};

/* eslint-disable react/require-default-props */
Card.propTypes = {
  onClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  person: PropTypes.object,
};

export default Card;
