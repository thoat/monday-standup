import { arrayOf, func } from 'prop-types';
import React from 'react';

import CardContainer from '../containers/card-container';
import { cardType } from '../prop-types';
import CommandButton from './command-button';

const AppBodyStart = ({
  cardData, onCardClick, onPair, onAdd, onRemove,
}) => {
  const doPair = () => onPair();
  const doAdd = () => onAdd();
  const doRemove = () => onRemove();
  const doCardAction = person => onCardClick(person);
  const cards = cardData.map(
    card => <CardContainer key={card.id} person={card} onClick={doCardAction} />
  );

  return (
    <div>
      <div className="card-zone__start">{cards}</div>
      <CommandButton text="Pair Up!" onClick={doPair} />
      <CommandButton text="Add Member" onClick={doAdd} />
      <CommandButton text="Remove Member" onClick={doRemove} />
    </div>
  );
};
AppBodyStart.propTypes = {
  cardData: arrayOf(cardType).isRequired,
  onCardClick: func.isRequired,
  onPair: func.isRequired,
  onAdd: func.isRequired,
  onRemove: func.isRequired,
};

export default AppBodyStart;
