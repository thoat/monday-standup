import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';

import constants from '../constants';
import IntakeForm from '../components/intake-form';
import { saveAddChanges } from '../helpers/helper-data';

const teamNames = Object.entries(constants)
  // filter for constants entries that are team names; entry[0] is the key
  .filter(entry => entry[0].includes('TEAMSTR'))
  .map(entry => entry[1]) // get just the team names; entry[1] is the value
  .map(team => ({ name: team, id: uuidv4() }));

const IntakeFormContainer = ({ addToFrontEnd, onClose }) => {
  const handleIntake = (values) => {
    const newMember = { ...values, isAbsent: false, id: uuidv4() };
    if (process.env.REACT_APP_PASSKEY) {
      saveAddChanges({ ...values, id: newMember.id });
    }
    addToFrontEnd(newMember);
  };

  return (
    <IntakeForm options={teamNames} onSubmit={handleIntake} onClose={onClose} />
  );
};
IntakeFormContainer.propTypes = {
  addToFrontEnd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IntakeFormContainer;
