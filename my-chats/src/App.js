import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
