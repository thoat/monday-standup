import PropTypes from 'prop-types';
import React from 'react';

import Card from './card';
import CommandButton from './command-button';

const AppBodyRemove = ({ cardData, onCardClick, onCancel }) => {
  const doCancel = () => onCancel();
  const doCardAction = person => onCardClick(person);
  const cards = cardData.map(card => <Card key={card.id} person={card} onClick={doCardAction} />);

  return (
    <div>
      <div className="card-zone__remove">{cards}</div>
      <CommandButton text="Cancel" onClick={doCancel} />
    </div>
  );
};/* eslint-disable react/require-default-props */
AppBodyRemove.propTypes = {
};

export default AppBodyRemove;
