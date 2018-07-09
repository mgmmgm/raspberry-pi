import React, { Component } from 'react';
import logo from './logo.svg';
import ledService from './services/led-service';
import './App.css';

class App extends Component {

  state = {
    ledState: 0,
    ledSrc: ''
  };

  componentDidMount = () => {
    let ledState = ledService.getLedState();
    this.setState({ledState, ledSrc: ledState ? '/images/led_on.jpg' : '/images/led_off.png'});
  };

  changeLedState = () => {
    if (this.state.ledState) {
      this.setState({ledState: 0, ledSrc: '/images/led_off.png'});
    } else {
      this.setState({ledState: 1, ledSrc: '/images/led_on.jpg'});
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Smart Home</h1>
        </header>
        <img src={this.state.ledSrc} onClick={this.changeLedState} />
        <div>
          <label>Led state:</label>
          <span className={this.state.ledState ? 'led-on' : 'led-off'}>{this.state.ledState ? 'On' : 'Off'}</span>
        </div>
      </div>
    );
  }
}

export default App;
