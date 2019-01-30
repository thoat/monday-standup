import PropTypes from 'prop-types';
import React from 'react';

import CardContainer from '../containers/card-container';
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
  // eslint-disable-next-line react/forbid-prop-types
  cardData: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onPair: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default AppBodyStart;
