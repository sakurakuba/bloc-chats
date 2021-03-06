import React, { Component } from 'react';

class MessageList extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
          };
        this.newMessages = this.newMessages.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.room)
            return;

        if (this.props.room){
            if (this.props.room.key === nextProps.room.key){
                return;
            }
            
            this.state.messagesRef.off('child_added');
        }


        this.setState({messages: [], messagesRef: this.props.firebase.database().ref('messages/' + nextProps.room.key)}, ()=> {
            this.state.messagesRef.orderByChild('sentAt').on('child_added', (snapshot) =>{
                this.setState({ startedAt: this.props.firebase.database.ServerValue.TIMESTAMP });
                const message = Object.assign(snapshot.val(), {key: snapshot.key});
                this.setState({ messages: this.state.messages.concat(message)});
            });
        });
    }

    newMessages() {
        this.state.messagesRef.push({ 
            username: this.props.activeUser.displayName,
            content: this.state.newMessage
         });

         this.setState({ newMessage: "" });
    }

    
    handleChange(e) {
        this.setState({ newMessage: e.target.value })
    }

    render() {
        if (!this.props.room)
            return ("");
        return (
            <div>
                <ul>
                    {
                        this.state.messages.map((msg, index)=>{
                            return (<li key={msg.key}>
                                <span>
                                    <h5>{msg.username}</h5>
                                    <div>{msg.sentAt}</div>
                                    <div>{msg.content}</div>
                                </span>
                            </li>);
                        })
                    }
                </ul>
                    <input type="text" placeholder='Write your message here..' value={ this.state.newMessage } onChange={ this.handleChange.bind(this) } />
                    <button onClick={ this.newMessages }>Send</button>
            </div>
        );
  }
}

export default MessageList;