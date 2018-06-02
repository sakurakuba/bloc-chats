import React, { Component } from 'react';

class RoomList extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
          };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRoom = this.changeRoom.bind(this);

    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }

    changeRoom(e) {
        e.preventDefault();
        this.props.changeRoomEvent(this.state.rooms[e.target.id]);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
          });
    }

    createRoom(newRoomName) {
        this.roomsRef.push({ name: newRoomName });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.createRoom(this.state.newRoomName);
        this.setState({ newRoomName: ''});
    }


    render() {

        return (
            <div>
                <ul>
                    {
                        this.state.rooms.map( (room, index) => <li key={room.key} id={index} onClick={this.changeRoom}>{room.name}</li> )
                    }
                </ul>
                
                <form onSubmit={ (e) => this.handleSubmit(e) } >
                    <fieldset>
                        <legend>New Chat</legend>
                        <input type='text' value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } placeholder='Chat Name..' />
                        <button type='submit' className="pure-button pure-button-primary">Create</button>
                    </fieldset>
                </form>

            </div>
        );
  }
}

export default RoomList;