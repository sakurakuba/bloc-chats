import React, { Component } from 'react';

class RoomList extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
          };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
          });
        }

        createRoom() {

        
        }


    render() {

        return (
            <section className="RoomList">
            <div className="form-list">
                <form className="form-chat">
                    <fieldset>
                        <legend>New Chat</legend>
                        <input type='text' placeholder='Chat Name..' />
                        <button type='submit' className="pure-button pure-button-primary">Create</button>
                    </fieldset>
                </form>
            {this.state.rooms.map( room => 
            <div> {room.name} </div>
            )};
            </div>
            </section>
        );
  }
}

export default RoomList;