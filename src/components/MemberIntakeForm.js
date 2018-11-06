// === Dependency imports ===
import PropTypes from 'prop-types'
import React, { Component } from 'react'

// ============ START OF COMPONENT ==================
export default class MemberIntakeForm extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    options: PropTypes.array.isRequired
  }

  static defaultProps = {
    options: ['Science', 'Dev', 'Design', 'Others/Visitors']
  }

  constructor(props) {
    super(props)
    this.state = {
      memberName: "",
      team: this.props.options[0].name // options[0] will yield an object {name: ABC, id: DEF} so we here have to extract the field "name"
    }
  }

  resetState() {
    this.setState({
      memberName: "",
      team: this.props.options[0].name
    }) // options[0] will yield an object {name: ABC, id: DEF} so we here have to extract the field "name"
  }

  handleClose = (e) => {
    this.props.onClose()
    e.preventDefault()
    this.resetState()
  }

  handleInputChange = (e) => {
    const attribute = e.target.name
    const newValue = e.target.value
    this.setState({ [attribute]: newValue })
    // console.log([attribute, newValue])
  }

  handleSubmit = (e) => {
    if (!this.state.memberName) {
      // empty name aka form is invalid, so we do nothing
      return;
    }
    this.props.onSubmit(this.state)
    e.preventDefault()
    this.resetState()
  }

  render() {
    let options = this.props.options.map(opt =>
      <option key={opt.id}>{opt.name}</option>)
    return (
      <div className="modal">
        <form>
          <label>Name: </label>
          <input
            name="memberName" // this value must be in-sync w/ the property name, or else input won't be recorded
            type="text"
            required
            value={this.state.memberName}
            onChange={this.handleInputChange} />
          <br />
          <label>Team: </label>
          <select
            name="team"
            value={this.state.team}
            onChange={this.handleInputChange}>
            {options}
          </select>
          <br />
          <div className="form-button-group">
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}
