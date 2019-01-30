import PropTypes from 'prop-types';
import React from 'react';

import CardContainer from '../containers/card-container';
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
  // eslint-disable-next-line react/forbid-prop-types
  cardData: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AppBodyRemove;
