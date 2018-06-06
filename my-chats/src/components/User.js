import React, { Component } from 'react';

class User extends Component { 
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.setUser = this.props.setUser;
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( (user) => {
        this.props.setUser(user);
        const isOnline = this.props.firebase.database().ref(".info/connected");
        if (user) {
          const userRef = this.props.firebase.database().ref("presence/" + user.uid);
          isOnline.on("value", snapshot => {
            if (snapshot.val()) {
              userRef.update({username: user.displayName, isOnline: true});
              userRef.onDisconnect().update({isOnline: false, activeRoom: ''});
            }
          });
        }

      });
    }

    signIn(e) {
        e.preventDefault();
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut(e) {
        e.preventDefault();
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
              const userRef = this.props.firebase.database().ref("presence/" + user.uid);
              userRef.update({isOnline: false, activeRoom: '' });
            }
          });

        this.props.firebase.auth().signOut().then( () => {
            this.setUser(null);
        });
    }
    
    render() {
        return (
            <div className="login-section">
                <ul>
                        <legend>Welcome {} </legend>
                        <input type='text' placeholder='Username..' />
                        <button type='submit' className="pure-button pure-button-primary"
                        onClick={ this.signIn }>Sign in</button>
                        <button 
                        type='submit' 
                        className="pure-button pure-button-primary"
                        onClick={ this.signOut } >Sign Out</button>
                </ul>
            </div>
        );
  }
}

export default User;