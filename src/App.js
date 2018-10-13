// TODO: writing tests!
// TODO: for addMember and removeMember, will want to save (aka replace) the data file, not just replace the app's state variable. Right now, don't know if fs.writeFile is working.
// TODO: re-order the methods inside CardDisplayFrame, either semantically or alphabetically

// === Third-party modules ===
import { confirmAlert } from 'react-confirm-alert'
import fs from 'browserify-fs'
import React, { Component } from 'react'
import shortid from 'shortid'

// === Stylesheets ===
import './App.css'
import 'react-confirm-alert/src/react-confirm-alert.css' // TODO: edit this file to style the dialog box: https://github.com/GA-MO/react-confirm-alert/blob/master/src/react-confirm-alert.css

// === Custom helpers ===
import config from './config'
import { getCardColors } from './helper-color'
import { yieldThePairs } from './helper-pairing'

// === Constants and global functions ===
function createNewProfile(target) {
  return {...target, id: shortid.generate()}
}
let teams = config.members.map(member => member.team)
teams.push("Others/Visitors")
const TEAMS = [...new Set(teams)]
const MODE_START = "unpaired"
const MODE_PAIRED = "paired"
const MODE_REMOVE = "remove"
const COLOR_ABSENT = ["#999999", "#999999"] // grey

// ============ START OF APP =======================
class SiteInstruction extends Component {
  render() {
    let appMode = this.props.appMode
    let instructionText =
      appMode === MODE_START ? "Click a card to toggle absence" :
      appMode === MODE_REMOVE ? "Choose card to remove" :
      ""
    return (
      <div>
        <h2>{instructionText}</h2>
      </div>
    )
  }
}

class MemberIntakeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personName: "",
      team: this.props.options[0]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  resetState() {
    this.setState({ personName: "", team: this.props.options[0] })
  }

  handleInputChange(e) {
    const attribute = e.target.name
    const newValue = e.target.value
    this.setState({ [attribute]: newValue  })
    // console.log([attribute, newValue])
  }

  handleSubmit(e) {
    if (!this.state.personName) {
      // empty name aka form is invalid! so we do nothing
      return;
    }
    this.props.onSubmit(this.state)
    e.preventDefault()
    this.resetState()
  }

  handleClose(e) {
    this.props.onClose()
    e.preventDefault()
    this.resetState()
  }

  render() {
    let options = this.props.options.map(opt =>
      <option key={opt.id} value={opt.name}>{opt.name}</option>)
    let showOrNot =
      this.props.open ? "modal display-block" : "modal display-none"
    return (
      <div className={showOrNot}>
        <form>
          <label>Name:</label>
          <input
            name="personName"
            type="text"
            required
            value={this.state.personName}
            onChange={this.handleInputChange} />
          <br />
          <label>Team:</label>
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

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.onClick(this.props)
  }

  render() {
    if (!this.props.person) // render a white card if no profile associated
      return (
        <button
          className="card"
          onClick={this.handleOnClick}
          style={{backgroundColor: "white", borderColor: "black"}} />
      )
    let { personName, team, isAbsent } = this.props.person
    let [fillColor, borderColor] = isAbsent ? COLOR_ABSENT : getCardColors(team)
    let colorStyle = {
      backgroundColor: fillColor,
      borderColor: borderColor,
      color: isAbsent ? "grey" : "black"
    }
    return (
      <button
        className="card"
        onClick={this.handleOnClick}
        style={colorStyle} >
        {personName}
      </button>
    )
  }
}

class CardDisplayFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardArray: config.members.map(member => createNewProfile(member)),
      teamNames: TEAMS.map(team => createNewProfile({"name": team})),
      cardPairs: [],
      formOpen: false }
    this.toggleAbsent = this.toggleAbsent.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.addMember = this.addMember.bind(this)
    this.enterRemove = this.enterRemove.bind(this)
    this.cancelRemove = this.cancelRemove.bind(this)
    this.pairCards = this.pairCards.bind(this)
    this.unpairCards = this.unpairCards.bind(this)
    this.handleMemberIntake = this.handleMemberIntake.bind(this)
    this.handleFormClose = this.handleFormClose.bind(this)
  }

  // since the argument "this.props" is passed into Card.handleOnClick(), "e" corresponds to the Card object rather than an event or the <button/> element
  toggleAbsent(e) {
    let updatedCardArray = [...this.state.cardArray]
    let targetIndex = updatedCardArray.indexOf(e.person)
    updatedCardArray[targetIndex].isAbsent = !e.person.isAbsent
    this.setState({ cardArray: updatedCardArray })
  }

  // since the argument "this.props" is passed into Card.handleOnClick(), "e" corresponds to the Card object rather than an event or the <button/> element
  removeCard(e) {
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
              // TODO: how to make this run after state has been updated & rendered?
              // .then(window.alert(e.person.personName + " has been removed from the team."))
            let arrayText = updatedCardArray.map(card => {
              let { personName, team, isAbsent } = card
              return { personName, team, isAbsent }
            })
            arrayText = JSON.stringify(arrayText)
            let newContent = "module.exports = {\n\tmembers: " + arrayText + "\n}"
            console.log(newContent)
            fs.writeFile("./config-2.js", newContent, (err) => {
              if (err) throw err
            })
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    })
  }

  pairCards() {
    let result = yieldThePairs(this.state.cardArray)
    let resultWithIds = result.map(pair => createNewProfile(pair))
    this.setState({ cardPairs: resultWithIds })
    this.props.onModeSwitch(MODE_PAIRED)
  }

  unpairCards() {
    this.props.onModeSwitch(MODE_START)
  }

  addMember() {
    this.setState({ formOpen: true })
  }

  handleMemberIntake(values) {
    let updatedCardArray = [...this.state.cardArray]
    let newMember = {...values, isAbsent: false}
    updatedCardArray.push(newMember)
    this.setState({ cardArray: updatedCardArray, formOpen: false })
  }

  handleFormClose() {
    this.setState({ formOpen: false })
  }

  enterRemove() {
    this.props.onModeSwitch(MODE_REMOVE)
  }

  cancelRemove() {
    this.props.onModeSwitch(MODE_START)
  }

  render() {
    let appMode = this.props.appMode
    let cards = this.state.cardArray
    switch(appMode) {
      case MODE_START:
      cards = cards.map(card =>
        <Card key={card.id} person={card} onClick={this.toggleAbsent}/>
      )
        return (
          <div>
            <div className="card-zone__start">{cards}</div>
            <button className="command-btn" type="button" onClick={this.pairCards}>Pair Up!</button>
            <button className="command-btn" type="button" onClick={this.addMember}>Add Member</button>
            <button className="command-btn" type="button" onClick={this.enterRemove}>Remove Member</button>
            <MemberIntakeForm open={this.state.formOpen} options={this.state.teamNames} onSubmit={this.handleMemberIntake} onClose={this.handleFormClose}/>
        </div>
        )
      case MODE_PAIRED:
        cards = this.state.cardPairs.map(pair =>
          <div className="card-pair-block" key={pair.id} style={{display: "block"}}>
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
          <Card key={card.id} person={card} onClick={this.removeCard}/>
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
    this.handleModeSwitch = this.handleModeSwitch.bind(this)
  }

  handleModeSwitch(newMode) {
    this.setState({ appMode: newMode })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>OI Monday StandUp</h1>
          <SiteInstruction appMode={this.state.appMode}/>
        </header>
        <div className="App-body">
          <CardDisplayFrame
            appMode={this.state.appMode}
            onModeSwitch={this.handleModeSwitch}/>
        </div>
      </div>
    )
  }
}

export default App
