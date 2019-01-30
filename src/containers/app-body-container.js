import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import '../app.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
/* TODO: edit this file to style the dialog box: https://github.com/GA-MO/react-confirm-alert/blob/master/src/react-confirm-alert.css */

import constants from '../constants';
import {
  createNewProfile, fetchMemberList, saveAddChanges, saveRemoveChanges,
} from '../helpers/helper-data';
import yieldThePairs from '../helpers/helper-pairing';
import AppBodyPaired from '../components/app-body-paired';
import AppBodyRemove from '../components/app-body-remove';
import AppBodyStart from '../components/app-body-start';
import IntakeForm from '../components/intake-form';

const TEAMS = Object.entries(constants)
  // filter for constants entries that are team names; entry[0] is the key
  .filter(entry => entry[0].includes('TEAMSTR'))
  .map(entry => entry[1]); // get just the team names; entry[1] is the value
const { MODE_START, MODE_PAIRED, MODE_REMOVE } = constants;

export default class AppBodyContainer extends Component {
  static propTypes = {
    appMode: PropTypes.string.isRequired,
    switchModeTo: PropTypes.func.isRequired,
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
    // } else this.fetchMemberList(); // official app
    } else fetchMemberList().then(data => this.setState({ cardArray: data })); // official app
  }

  // fetchMemberList = () => {
  //   fetch('/api/members', { method: 'GET' })
  //     .then(response => response.json()) // can't skip this!
  //     .then((data) => {
  //       // Rename object keys. Credit: https://stackoverflow.com/a/50101979
  //       data.forEach((member) => {
  //         delete Object.assign(member, { id: member.rowid }).rowid;
  //         delete Object.assign(member, { memberName: member.name }).name;
  //         delete Object.assign(member, { isAbsent: member.is_absent }).is_absent;
  //       });
  //       this.setState({ cardArray: data });
  //     });
  // }

  toggleAbsent = (person) => {
    const { cardArray } = this.state;
    const updatedCardArray = [...cardArray];
    const targetIndex = updatedCardArray.indexOf(person);
    updatedCardArray[targetIndex].isAbsent = !person.isAbsent;
    this.setState({ cardArray: updatedCardArray });
  }

  pairCards = () => {
    const { cardArray } = this.state;
    const { switchModeTo } = this.props;
    const result = yieldThePairs(cardArray);
    const resultWithIds = result.map(pair => createNewProfile(pair));
    this.setState({ cardPairs: resultWithIds });
    switchModeTo(MODE_PAIRED);
  }

  backToStartMode = () => {
    const { switchModeTo } = this.props;
    switchModeTo(MODE_START);
  }

  enterRemove = () => {
    const { switchModeTo } = this.props;
    switchModeTo(MODE_REMOVE);
  }

  removeCard = (person) => {
    confirmAlert({
      title: '',
      message: `Are you sure you want to remove ${person.memberName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { cardArray } = this.state;
            const updatedCardArray = [...cardArray];
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
    const { cardArray } = this.state;
    const updatedCardArray = [...cardArray];
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

  render() {
    const { appMode } = this.props;
    const {
      cardArray, formOpen, teamNames, cardPairs,
    } = this.state;
    return (
      <div>
        <div>
          {appMode === MODE_START && (
            <AppBodyStart
              cardData={cardArray}
              onCardClick={this.toggleAbsent}
              onPair={this.pairCards}
              onAdd={this.addMember}
              onRemove={this.enterRemove}
            />
          )}
        </div>
        <div>
          {formOpen && (
            <IntakeForm
              options={teamNames}
              onSubmit={this.handleMemberIntake}
              onClose={this.closeForm}
            />
          )}
        </div>
        <div>
          {appMode === MODE_REMOVE && (
            <AppBodyRemove
              cardData={cardArray}
              onCardClick={this.removeCard}
              onCancel={this.backToStartMode}
            />
          )}
        </div>
        <div>
          {appMode === MODE_PAIRED && (
            <AppBodyPaired
              pairData={cardPairs}
              onDismiss={this.backToStartMode}
            />
          )}
        </div>
      </div>
    );
  }
}
