import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class IntakeForm extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    const { options } = this.props;
    this.state = {
      memberName: '',
      team: options[0].name, /* options[0] will yield an object
      {name: ABC, id: DEF} so we here have to extract the field "name" */
    };
  }

  handleInputChange = (e) => {
    const attribute = e.target.name;
    const newValue = e.target.value;
    this.setState({ [attribute]: newValue });
    // console.log([attribute, newValue])
  }

  handleClose = (e) => {
    e.preventDefault();
    const { onClose } = this.props;
    onClose();
    this.resetState();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { memberName } = this.state;
    if (!memberName) {
      // empty name aka form is invalid, so we do nothing
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.resetState();
  }

  resetState() {
    const { options } = this.props;
    this.setState({
      memberName: '',
      team: options[0].name,
    }); /* options[0] will yield an object {name: ABC, id: DEF} so we here have
    to extract the field "name" */
  }

  render() {
    let { options } = this.props;
    options = options.map(opt => <option key={opt.id}>{opt.name}</option>);
    const { memberName, team } = this.state;
    return (
      <div className="modal">
        <form>
          <label htmlFor="nameTextInput">
            Name:
            <input
              id="nameTextInput"
              name="memberName" // this value must be in-sync w/ the property name, or else input won't be recorded
              type="text"
              required
              value={memberName}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label htmlFor="teamSelect">
            Team:
            <select
              id="teamSelect"
              name="team"
              value={team}
              onChange={this.handleInputChange}
            >
              {options}
            </select>
          </label>
          <br />
          <div className="form-button-group">
            <button onClick={this.handleSubmit}>Save</button>
            <button onClick={this.handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
