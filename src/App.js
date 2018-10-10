import React, { Component } from 'react'
import './App.css'
import config from './config'
import { getCardColors } from './helper-color'
import { yieldThePairs } from './helper-pairing'

const MODE_START = "unpaired"
const MODE_PAIRED = "paired"
const MODE_REMOVE = "remove"
const COLOR_ABSENT = ["#999999", "#999999"] // grey

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
      return  (
        <button
          className="card"
          onClick={this.handleOnClick}
          style={{backgroundColor: "white", borderColor: "black"}}
        />
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
        style={colorStyle}
      >
        {personName}
      </button>
    )
  }
}

class CardDisplayFrame extends Component {
  constructor(props) {
    super(props)
    this.state = { cardArray: config.members, cardPairs: [] }
    this.toggleAbsent = this.toggleAbsent.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.addMember = this.addMember.bind(this)
    this.enterRemove = this.enterRemove.bind(this)
    this.cancelRemove = this.cancelRemove.bind(this)
    this.pairCards = this.pairCards.bind(this)
    this.unpairCards = this.unpairCards.bind(this)
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
    let updatedCardArray = [...this.state.cardArray]
    let targetIndex = updatedCardArray.indexOf(e.person)
    updatedCardArray.splice(targetIndex, 1)
    this.setState({ cardArray: updatedCardArray })
  }

  pairCards() {
    let result = yieldThePairs(this.state.cardArray)
    this.setState({ cardPairs: result })
    this.props.onModeSwitch(MODE_PAIRED)
  }

  unpairCards() {
    this.props.onModeSwitch(MODE_START)
  }

  addMember() {
    // TODO
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
        <Card key={card.personName} person={card} onClick={this.toggleAbsent}/>
      )
        return (
          <div>
            <div className="card-zone__start">{cards}</div>
            <button className="command-btn" type="button" onClick={this.pairCards}>Pair Up!</button>
            <button className="command-btn" type="button" onClick={this.addMember}>Add Member</button>
            <button className="command-btn" type="button" onClick={this.enterRemove}>Remove Member</button>
        </div>
        )
      case MODE_PAIRED:
        cards = this.state.cardPairs.map(pair =>
          <div className="card-pair-block" key={pair.card1.personName} style={{display: "block"}}>
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
          <Card key={card.personName} person={card} onClick={this.removeCard}/>
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
