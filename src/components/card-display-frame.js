// === Dependency imports ===
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

// === Stylesheets ===
import '../app.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
/* TODO: edit this file to style the dialog box: https://github.com/GA-MO/react-confirm-alert/blob/master/src/react-confirm-alert.css */

// === Local imports ===
import constants from '../constants';
import yieldThePairs from '../helpers/helper-pairing';
import Card from './card';
import MemberIntakeForm from './member-intake-form';

// === Constants and global functions ===
function createNewProfile(target) {
  return { ...target, id: uuidv4() };
}
function saveRemoveChanges(data) {
  fetch(`/api/members/${data}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(body => alert(body.msg))
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
}
function saveAddChanges(data) {
  fetch('/api/members', {
    method: 'POST',
    body: JSON.stringify(data), // don't forget to convert into JSON!!
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())
    .then(body => alert(body.msg))
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
}
const TEAMS = Object.entries(constants)
  // filter for constants entries that are team names; entry[0] is the key
  .filter(entry => entry[0].includes('TEAMSTR'))
  .map(entry => entry[1]); // get just the team names; entry[1] is the value
const { MODE_START, MODE_PAIRED, MODE_REMOVE } = constants;

export default class CardDisplayFrame extends Component {
  static propTypes = {
    appMode: PropTypes.string.isRequired,
    onModeSwitch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cardArray: [],
      teamNames: TEAMS.map(team => createNewProfile({ name: team })),
      cardPairs: [],
      formOpen: false,
    };
  }

  componentDidMount() {
    if (!process.env.REACT_APP_PASSKEY) { // demo app
      const data = constants.members.map(member => createNewProfile(member));
      this.setState({ cardArray: data });
    } else this.fetchMemberList(); // official app
  }

  fetchMemberList = () => {
    fetch('/api/members', { method: 'GET' })
      .then(response => response.json()) // can't skip this!
      .then((data) => {
        // Rename object keys. Credit: https://stackoverflow.com/a/50101979
        data.forEach((member) => {
          delete Object.assign(member, { id: member.rowid }).rowid;
          delete Object.assign(member, { memberName: member.name }).name;
          delete Object.assign(member, { isAbsent: member.is_absent }).is_absent;
        });
        this.setState({ cardArray: data });
      });
  }

  toggleAbsent = (person) => {
    const updatedCardArray = [...this.state.cardArray];
    const targetIndex = updatedCardArray.indexOf(person);
    updatedCardArray[targetIndex].isAbsent = !person.isAbsent;
    this.setState({ cardArray: updatedCardArray });
  }

  pairCards = () => {
    const result = yieldThePairs(this.state.cardArray);
    const resultWithIds = result.map(pair => createNewProfile(pair));
    this.setState({ cardPairs: resultWithIds });
    this.props.onModeSwitch(MODE_PAIRED);
  }

  unpairCards = () => {
    this.props.onModeSwitch(MODE_START);
  }

  enterRemove = () => {
    this.props.onModeSwitch(MODE_REMOVE);
  }

  cancelRemove = () => {
    this.props.onModeSwitch(MODE_START);
  }

  removeCard = (person) => {
    confirmAlert({
      title: '',
      message: `Are you sure you want to remove ${person.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const updatedCardArray = [...this.state.cardArray];
            const targetIndex = updatedCardArray.indexOf(person);
            updatedCardArray.splice(targetIndex, 1);
            this.setState({ cardArray: updatedCardArray });
            if (process.env.REACT_APP_PASSKEY) saveRemoveChanges(person.id);
          },
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  }

  addMember = () => {
    this.setState({ formOpen: true });
  }

  handleMemberIntake = (values) => {
    const updatedCardArray = [...this.state.cardArray];
    const newMember = { ...values, id: uuidv4(), isAbsent: false };
    updatedCardArray.push(newMember);
    this.setState({ cardArray: updatedCardArray, formOpen: false });
    if (process.env.REACT_APP_PASSKEY) {
      saveAddChanges({ ...values, id: newMember.id });
    }
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  // eslint-disable-next-line consistent-return
  render() {
    const { appMode } = this.props;
    let cards = this.state.cardArray;
    switch (appMode) {
      case MODE_START:
        cards = cards.map(card => <Card key={card.id} person={card} onClick={this.toggleAbsent} />);
        return (
          <div>
            <div className="card-zone__start">{cards}</div>
            <button className="cmd-btn" type="button" onClick={this.pairCards}>
              Pair Up!
          </button>
            <button className="cmd-btn" type="button" onClick={this.addMember}>
              Add Member
          </button>
            <button className="cmd-btn" type="button" onClick={this.enterRemove}>
              Remove Member
          </button>
            <div>
              {this.state.formOpen && (
                <MemberIntakeForm
                  options={this.state.teamNames}
                  onSubmit={this.handleMemberIntake}
                  onClose={this.closeForm}
                />
              )}
            </div>
          </div>
        );
      case MODE_PAIRED:
        cards = this.state.cardPairs.map(pair => (
          <div className="card-pair-block" key={pair.id} style={{ display: 'block' }}>
            <Card person={pair.card1} />
            <Card person={pair.card2} />
          </div>
        ));
        return (
          <div>
            <div className="card-zone__paired">{cards}</div>
            <button
              className="cmd-btn"
              type="button"
              onClick={this.unpairCards}
            >
              Dismiss
          </button>
          </div>
        );
      case MODE_REMOVE:
        cards = cards.map(card => <Card key={card.id} person={card} onClick={this.removeCard} />);
        return (
          <div>
            <div className="card-zone__remove">{cards}</div>
            <button className="cmd-btn" type="button" onClick={this.cancelRemove}>Cancel</button>
          </div>
        );
      default:
    }
  }
}
