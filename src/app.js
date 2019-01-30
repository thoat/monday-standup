import React, { Component } from 'react';

import './app.css';

import constants from './constants';
import AppBody from './containers/app-body';
import AppHeader from './components/app-header';

const { MODE_START } = constants;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { appMode: MODE_START };
  }

  handleModeSwitch = (newMode) => {
    this.setState({ appMode: newMode });
  }

  render() {
    const { appMode } = this.state;
    return (
      <div className="App">
        <AppHeader appMode={appMode} />
        <AppBody appMode={appMode} switchModeTo={this.handleModeSwitch} />
      </div>
    );
  }
}
