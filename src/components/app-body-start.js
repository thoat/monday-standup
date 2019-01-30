import PropTypes from 'prop-types';
import React from 'react';

import Card from './card';
import CommandButton from './command-button';

const AppBodyStart = ({
  cardData, onCardClick, onPair, onAdd, onRemove,
}) => {
  const doPair = () => onPair();
  const doAdd = () => onAdd();
  const doRemove = () => onRemove();
  const doCardAction = person => onCardClick(person);
  const cards = cardData.map(card => <Card key={card.id} person={card} onClick={doCardAction} />);

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
};

export default AppBodyStart;
