// === Dependency imports ===
import PropTypes from 'prop-types'
import React from 'react'

// === Local imports ===
import constants from '../constants'

// ============ START OF COMPONENT ==================
const SiteInstruction = ({ appMode }) =>
  <div>
    <h2>{appMode === constants.MODE_START && "Click a card to toggle absence"}</h2>
    <h2>{appMode === constants.MODE_REMOVE && "Choose card to remove"}</h2>
  </div>

SiteInstruction.propTypes = {
  appMode: PropTypes.string.isRequired
}

export default SiteInstruction
