// TODO: writing tests!
// TODO: for addMember and removeMember, will want to save (aka replace) the data file, not just replace the app's state variable. Right now, with members import in config.js, the app will automatically reload after EVERY change to the data.js file. Wonder if this is a desired functionality? If not, how we can prevent app auto-reload and only update the "members" variable until the next manual app load?
// TODO: (optional) deploy to one of the engines e.g. Heroku

// === Dependency imports ===
import { confirmAlert } from 'react-confirm-alert'
import React, { Component } from 'react'
import shortid from 'shortid'

// === Stylesheets ===
import './App.css'
import 'react-confirm-alert/src/react-confirm-alert.css' // TODO: edit this file to style the dialog box: https://github.com/GA-MO/react-confirm-alert/blob/master/src/react-confirm-alert.css

// === Local imports ===
import config from './config'
import { yieldThePairs } from './helpers/helper-pairing'
import Card from './components/Card'
import MemberIntakeForm from './components/MemberIntakeForm'
import SiteInstruction from './components/SiteInstruction'

// === Constants and global functions ===
function createNewProfile(target) {
  return { ...target, id: shortid.generate() }
}
function saveUpdatedData(rawData) {
  let dataToSave = rawData.map(card => {
    let { personName, team, isAbsent } = card // to ignore the 'id' property
    return { personName, team, isAbsent }
  })
  let newContent = "const members = " + JSON.stringify(dataToSave) + "\nexport default members"
  // console.log(newContent)
  fetch('/update', {
    method: 'POST',
    body: newContent,
    headers: { "Content-Type": "text/plain" }
  }).then(response => {
    return response.json()
  }).then(body => {
    alert(body.message)
  })
}
const TEAMS = Object.entries(config)
  .filter(entry => entry[0].includes('TEAMSTR')) // filter for config entries that are team names; entry[0] is the key
  .map(entry => entry[1]) // get just the team names; entry[1] is the value
const MODE_START = config.MODE_START
const MODE_PAIRED = config.MODE_PAIRED
const MODE_REMOVE = config.MODE_REMOVE

// ============ START OF APP =======================
class CardDisplayFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardArray: config.members.map(member => createNewProfile(member)),
      teamNames: TEAMS.map(team => createNewProfile({ "name": team })),
      cardPairs: [],
      formOpen: false
    }
  }

  // since the argument "this.props" is passed into Card.handleOnClick(), "e" corresponds to the Card object rather than an event or the <button/> element
  toggleAbsent = (e) => {
    let updatedCardArray = [...this.state.cardArray]
    let targetIndex = updatedCardArray.indexOf(e.person)
    updatedCardArray[targetIndex].isAbsent = !e.person.isAbsent
    this.setState({ cardArray: updatedCardArray })
  }

  pairCards = () => {
    let result = yieldThePairs(this.state.cardArray)
    let resultWithIds = result.map(pair => createNewProfile(pair))
    this.setState({ cardPairs: resultWithIds })
    this.props.onModeSwitch(MODE_PAIRED)
  }

  unpairCards = () => {
    this.props.onModeSwitch(MODE_START)
  }

  enterRemove = () => {
    this.props.onModeSwitch(MODE_REMOVE)
  }

  cancelRemove = () => {
    this.props.onModeSwitch(MODE_START)
  }

  // since the argument "this.props" is passed into Card.handleOnClick(), "e" corresponds to the Card object rather than an event or the <button/> element
  removeCard = (e) => {
    confirmAlert({
      title: "",
      message: "Are you sure you want to remove " + e.person.personName + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let updatedCardArray = [...this.state.cardArray]
            let targetIndex = updatedCardArray.indexOf(e.person)
            updatedCardArray.splice(targetIndex, 1)
            this.setState({ cardArray: updatedCardArray })
            saveUpdatedData(updatedCardArray)
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    })
  }

  addMember = () => {
    this.setState({ formOpen: true })
  }

  handleMemberIntake = (values) => {
    let updatedCardArray = [...this.state.cardArray]
    let newMember = { ...values, isAbsent: false }
    console.log(newMember)
    updatedCardArray.push(createNewProfile(newMember))
    this.setState({ cardArray: updatedCardArray, formOpen: false })
    saveUpdatedData(updatedCardArray)
  }

  closeForm = () => {
    this.setState({ formOpen: false })
  }

  render() {
    let appMode = this.props.appMode
    let cards = this.state.cardArray
    switch (appMode) {
      case MODE_START:
        cards = cards.map(card =>
          <Card key={card.id} person={card} onClick={this.toggleAbsent} />
        )
        return (
          <div>
            <div className="card-zone__start">{cards}</div>
            <button className="command-btn" type="button" onClick={this.pairCards}>Pair Up!</button>
            <button className="command-btn" type="button" onClick={this.addMember}>Add Member</button>
            <button className="command-btn" type="button" onClick={this.enterRemove}>Remove Member</button>
            <div>{this.state.formOpen && (
              <MemberIntakeForm options={this.state.teamNames} onSubmit={this.handleMemberIntake} onClose={this.closeForm} />
            )}</div>
          </div>
        )
      case MODE_PAIRED:
        cards = this.state.cardPairs.map(pair =>
          <div className="card-pair-block" key={pair.id} style={{ display: "block" }}>
            <Card person={pair.card1} />
            <Card person={pair.card2} />
          </div>
        )
        return (
          <div>
            <div className="card-zone__paired">{cards}</div>
            <button className="command-btn" type="button"
              onClick={this.unpairCards}>Dismiss</button>
          </div>
        )
      case MODE_REMOVE:
        cards = cards.map(card =>
          <Card key={card.id} person={card} onClick={this.removeCard} />
        )
        return (
          <div>
            <div className="card-zone__remove">{cards}</div>
            <button className="command-btn" type="button" onClick={this.cancelRemove}>Cancel</button>
          </div>
        )
      default:
        return
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { appMode: MODE_START }
  }

  handleModeSwitch = (newMode) => {
    this.setState({ appMode: newMode })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>OI Monday StandUp</h1>
          <SiteInstruction appMode={this.state.appMode} />
        </header>
        <div className="App-body">
          <CardDisplayFrame
            appMode={this.state.appMode}
            onModeSwitch={this.handleModeSwitch} />
        </div>
      </div>
    )
  }
}

export default App
