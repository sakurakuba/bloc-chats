import React, { Component } from 'react';

class User extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( (user) => {
        this.props.currentUser(user);
      });
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }
    
    render() {
        const displayUser = this.props.user === null ? "Guest" : this.props.user.displayName
        return (
            <div className="login-section">
                <div>
                        <legend>Welcome { displayUser } </legend>
                        <input type="text" />
                        <button onClick={ this.signIn }>Sign in</button>
                        <button onClick={ this.signOut }>Sign Out</button>
                </div>
            </div>
        );
  }
}

export default User;