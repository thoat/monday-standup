import PropTypes from 'prop-types';
import React from 'react';

import Card from '../components/card';
import constants from '../constants';
import getCardColors from '../helpers/helper-color';

const CardContainer = ({ person, onClick }) => {
  const handleOnClick = () => onClick(person);

  // default is a white, empty card -- no profile associated
  let colorStyle = {
    backgroundColor: 'white',
    borderColor: 'black',
  };
  let textValue = '';

  if (person) {
    const { memberName, team, isAbsent } = person;
    const [fillColor, borderColor] = isAbsent
      ? constants.COLOR_ABSENT
      : getCardColors(team);
    colorStyle = {
      backgroundColor: fillColor,
      borderColor,
      color: isAbsent ? 'grey' : 'black',
    };
    textValue = memberName;
  }
  return (
    <Card onClick={handleOnClick} colorStyle={colorStyle} text={textValue} />
  );
};/* eslint-disable react/require-default-props */
CardContainer.propTypes = {
  onClick: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  person: PropTypes.object,
};

export default CardContainer;
