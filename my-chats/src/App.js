import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAWetwx3lhUXLm3UbyVMrjE7K5kHwLn9NA",
    authDomain: "bloc-chat-a1617.firebaseapp.com",
    databaseURL: "https://bloc-chat-a1617.firebaseio.com",
    projectId: "bloc-chat-a1617",
    storageBucket: "bloc-chat-a1617.appspot.com",
    messagingSenderId: "680960936205"
  };
  firebase.initializeApp(config);


class App extends Component {

  constructor(){
    super();
    this.state = {
      activeRoom: null
    };
    this.changeRoom = this.changeRoom.bind(this);
  }

  changeRoom(room){
    this.setState({ activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} changeRoomEvent={this.changeRoom} />
        <h3>{this.state.activeRoom && 'Room: ' + this.state.activeRoom.name}</h3>
        <div>
          <MessageList firebase={firebase} room={this.state.activeRoom} />
        </div>
      </div>
    );
  }
}

export default App;