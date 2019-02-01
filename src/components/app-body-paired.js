import { arrayOf, func, shape } from 'prop-types';
import React from 'react';

import CardContainer from '../containers/card-container';
import { cardType } from '../prop-types';
import CommandButton from './command-button';

const AppBodyPaired = ({ pairData, onDismiss }) => {
  const doDismiss = () => onDismiss();
  const cards = pairData.map(pair => (
    <div className="card-pair-block" key={pair.id} style={{ display: 'block' }}>
      <CardContainer person={pair.card1} />
      <CardContainer person={pair.card2} />
    </div>
  ));
  return (
    <div>
      <div className="card-zone__paired">{cards}</div>
      <CommandButton text="Dismiss" onClick={doDismiss} />
    </div>
  );
};
AppBodyPaired.propTypes = {
  pairData: arrayOf(shape({
    card1: cardType.isRequired,
    card2: cardType,
  })).isRequired,
  onDismiss: func.isRequired,
};

export default AppBodyPaired;
