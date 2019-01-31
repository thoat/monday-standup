import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import '../app.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
/* TODO: edit this file to style the dialog box: https://github.com/GA-MO/react-confirm-alert/blob/master/src/react-confirm-alert.css */

import constants from '../constants';
import { fetchMemberList, saveRemoveChanges } from '../helpers/helper-data';
import yieldThePairs from '../helpers/helper-pairing';
import AppBodyPaired from '../components/app-body-paired';
import AppBodyRemove from '../components/app-body-remove';
import AppBodyStart from '../components/app-body-start';
import IntakeFormContainer from './intake-form-container';

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
      cardPairs: [],
      formOpen: false,
    };
  }

  componentDidMount() {
    if (!process.env.REACT_APP_PASSKEY) { // demo app
      const data = constants.members.map(member => ({ ...member, id: uuidv4() }));
      this.setState({ cardArray: data });
    } else fetchMemberList().then(data => this.setState({ cardArray: data })); // official app
  }

  toggleAbsent = (person) => {
    const { cardArray } = this.state;
    const updatedCardArray = [...cardArray];
    const targetIndex = updatedCardArray.indexOf(person);
    updatedCardArray[targetIndex].isAbsent = !person.isAbsent;
    this.setState({ cardArray: updatedCardArray });
  }

  addCard = (newMember) => {
    const { cardArray } = this.state;
    const updatedCardArray = [...cardArray];
    updatedCardArray.push(newMember);
    this.setState({ cardArray: updatedCardArray, formOpen: false });
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

  pairCards = () => {
    const { cardArray } = this.state;
    const { switchModeTo } = this.props;
    const result = yieldThePairs(cardArray);
    const resultWithIds = result.map(pair => ({ ...pair, id: uuidv4() }));
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

  openForm = () => {
    this.setState({ formOpen: true });
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { appMode } = this.props;
    const { cardArray, cardPairs, formOpen } = this.state;
    return (
      <div>
        <div>
          {appMode === MODE_START && (
            <AppBodyStart
              cardData={cardArray}
              onCardClick={this.toggleAbsent}
              onPair={this.pairCards}
              onAdd={this.openForm}
              onRemove={this.enterRemove}
            />
          )}
        </div>
        <div>
          {formOpen && (
            <IntakeFormContainer
              addToFrontEnd={this.addCard}
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
