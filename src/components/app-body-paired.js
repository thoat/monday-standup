import PropTypes from 'prop-types';
import React from 'react';

import Card from './card';
import CommandButton from './command-button';

const AppBodyPaired = ({ pairData, onDismiss }) => {
  const doDismiss = () => onDismiss();
  const cards = pairData.map(pair => (
    <div className="card-pair-block" key={pair.id} style={{ display: 'block' }}>
      <Card person={pair.card1} />
      <Card person={pair.card2} />
    </div>
  ));
  return (
    <div>
      <div className="card-zone__paired">{cards}</div>
      <CommandButton text="Dismiss" onClick={doDismiss} />
    </div>
  );
};/* eslint-disable react/require-default-props */
AppBodyPaired.propTypes = {
};

export default AppBodyPaired;
