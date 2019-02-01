import { arrayOf, func } from 'prop-types';
import React from 'react';

import CardContainer from '../containers/card-container';
import { cardType } from '../prop-types';
import CommandButton from './command-button';

const AppBodyRemove = ({ cardData, onCardClick, onCancel }) => {
  const doCancel = () => onCancel();
  const doCardAction = person => onCardClick(person);
  const cards = cardData.map(
    card => <CardContainer key={card.id} person={card} onClick={doCardAction} />
  );

  return (
    <div>
      <div className="card-zone__remove">{cards}</div>
      <CommandButton text="Cancel" onClick={doCancel} />
    </div>
  );
};
AppBodyRemove.propTypes = {
  cardData: arrayOf(cardType).isRequired,
  onCardClick: func.isRequired,
  onCancel: func.isRequired,
};

export default AppBodyRemove;
