import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';
import * as f from './Firebase';

class Moshe extends Component {

    socket;
    firebase;
    dbRef;

    state = {
        response: '',
        name: ''
    };

    constructor(props) {
        super(props);

        this.firebase = f.initFirebase();
        console.log(this.firebase.app().name);

        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('http://localhost:5000');
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.socket.on('message-from-server', (obj) => {
            this.setState({response: obj.text + ' ' + obj.another});
        })
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));

        this.setState({name: 'dcb'});
        this.dbRef = f.getData();
        this.dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({ name: snapshot.val() });
        });
        this.dbRef.set('12345');
    }

    callApi = async() => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    sayHiToServer() {
        this.socket.emit('message-from-client', 'client say Hi!');
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            {this.state.response}
    </p>
        <button onClick={this.sayHiToServer.bind(this)}>Click</button>
        <div>
        firebase -  {this.state.name}
    </div>
        </div>
    );
    }
}

export default App;
