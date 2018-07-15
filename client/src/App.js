import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from './logo.svg';
import ledService from './services/led-service';
import './App.css';

class App extends Component {

  socket;
  state = {
    ledState: 0,
    ledSrc: ''
  };

  constructor() {
    super();
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('');
    this.subscribeToEvents();
  }

  subscribeToEvents = () => {
    this.socket.on('message-from-server', (obj) => {
        this.updateLedState(obj.status);
    })
}

  componentDidMount = () => {
    ledService.getLedState().then(res => {
      let ledState = res.state;
      this.setState({ledState, ledSrc: ledState ? '/images/led_on.jpg' : '/images/led_off.png'});
    }, error => {
      console.error(error);
    });
  };

  toggleLedState = async() => {
    const res = await ledService.setLedState(!this.state.ledState);
    this.updateLedState(res.statusFromServer);
  };

  updateLedState = (statusFromServer) => {
    if (statusFromServer) {
      this.setState({ledState: 1, ledSrc: '/images/led_on.jpg'});
    } else {
      this.setState({ledState: 0, ledSrc: '/images/led_off.png'});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Smart Home</h1>
        </header>
        <img src={this.state.ledSrc} onClick={this.toggleLedState} />
        <div>
          <label>Led state:</label>
          <span className={this.state.ledState ? 'led-on' : 'led-off'}>{this.state.ledState ? 'On' : 'Off'}</span>
        </div>
      </div>
    );
  }
}

export default App;
