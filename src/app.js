// TODO: writing tests!

// === Dependency imports ===
import React, { Component } from 'react';

// === Stylesheets ===
import './app.css';

// === Local imports ===
import constants from './constants';
import CardDisplayFrame from './components/card-display-frame';
import SiteInstruction from './components/site-instruction';

const { MODE_START } = constants;

// ============ START OF APP =======================
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
        <header className="App-header">
          <h1>OI Monday StandUp</h1>
          <SiteInstruction appMode={appMode} />
        </header>
        <div className="App-body">
          <CardDisplayFrame
            appMode={appMode}
            onModeSwitch={this.handleModeSwitch}
          />
        </div>
      </div>
    );
  }
}
