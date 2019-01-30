import PropTypes from 'prop-types';
import React from 'react';

import constants from '../constants';

const AppHeader = ({ appMode }) => (
  <header>
    <h1>OI Monday StandUp</h1>
    <h2>{appMode === constants.MODE_START && 'Click a card to toggle absence'}</h2>
    <h2>{appMode === constants.MODE_REMOVE && 'Choose card to remove'}</h2>
  </header>
);
AppHeader.propTypes = {
  appMode: PropTypes.string.isRequired,
};

export default AppHeader;
