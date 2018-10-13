// === Dependency imports ===
import PropTypes from 'prop-types'
import React from 'react'

// === Local imports ===
import config from '../config'
import { getCardColors } from '../helpers/helper-color'

// ============ START OF COMPONENT ==================
const Card = props => {
  const handleOnClick = () => {
    props.onClick(props)
  }
  if (!props.person) { // render a white card if no profile associated
    return (
      <button
        className="card"
        onClick={handleOnClick}
        style={{backgroundColor: "white", borderColor: "black"}} />
    )
  }
  let { personName, team, isAbsent } = props.person
  let [fillColor, borderColor] = isAbsent
    ? config.COLOR_ABSENT
    : getCardColors(team)
  let colorStyle = {
    backgroundColor: fillColor,
    borderColor: borderColor,
    color: isAbsent ? "grey" : "black"
  }
  return (
    <button
      className="card"
      onClick={handleOnClick}
      style={colorStyle} >
      {personName}
    </button>
  )
}

Card.propTypes = {
  onClick: PropTypes.func,
  person: PropTypes.object
}

export default Card
